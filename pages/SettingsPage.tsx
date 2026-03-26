
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../context/Store';
import { Moon, Sun, Type, Globe, MapPin, Loader2, Search, Crosshair, Edit2, ChevronDown, ChevronRight, Bell, Download, LogOut, Mic, BookA, BookOpen, Info, ShieldCheck, MessageSquare, Star } from 'lucide-react';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { settings, updateSettings, t, setHeaderTitle, recentSurah, availableTranslations, reciters } = useAppStore();
    const [detecting, setDetecting] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [manualCoords, setManualCoords] = useState({
        lat: settings.location.latitude.toString(),
        lng: settings.location.longitude.toString()
    });

    useEffect(() => {
        setHeaderTitle(t('settings'));
    }, [t, setHeaderTitle]);

    const handleGetCurrentLocation = () => {
        setDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    let address = 'Current Location';

                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${settings.appLanguage === 'bn' ? 'bn' : 'en'}`);
                        if (res.ok) {
                            const data = await res.json();
                            if (data && data.address) {
                                address = data.address.city ||
                                    data.address.town ||
                                    data.address.village ||
                                    data.address.municipality ||
                                    data.address.suburb ||
                                    data.address.county ||
                                    data.address.state ||
                                    'Current Location';
                            }
                        }
                    } catch (e) {
                        console.error("Reverse geocoding failed", e);
                    }

                    updateSettings({
                        location: {
                            latitude: latitude,
                            longitude: longitude,
                            address: address
                        }
                    });
                    setManualCoords({
                        lat: latitude.toString(),
                        lng: longitude.toString()
                    });
                    setDetecting(false);
                },
                (error) => {
                    console.error(error);
                    alert(t('locationError') || 'Could not access location');
                    setDetecting(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setDetecting(false);
        }
    };

    const handleSearchLocation = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&accept-language=${settings.appLanguage === 'bn' ? 'bn' : 'en'}`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    const result = data[0];
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);
                    const shortName = result.display_name.split(',')[0];

                    updateSettings({
                        location: {
                            latitude: lat,
                            longitude: lng,
                            address: shortName
                        }
                    });
                    setManualCoords({
                        lat: result.lat,
                        lng: result.lon
                    });
                    setSearchQuery('');
                } else {
                    alert(t('locationNotFound'));
                }
            } else {
                alert('Error searching location');
            }
        } catch (e) {
            console.error(e);
            alert('Network error');
        } finally {
            setIsSearching(false);
        }
    };

    const handleManualUpdate = () => {
        const lat = parseFloat(manualCoords.lat);
        const lng = parseFloat(manualCoords.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
            updateSettings({
                location: {
                    latitude: lat,
                    longitude: lng,
                    address: 'Custom Coordinates'
                }
            });
        }
    };

    const activeReciter = reciters.find(r => r.id === settings.reciterId)?.reciter_name || 'Mishary Rashid Alafasy';
    const activeTranslation = availableTranslations.find(t => t.id === settings.selectedTranslationIds[0])?.name || 'English (International)';
    const activeTranslationLanguage = availableTranslations.find(t => t.id === settings.selectedTranslationIds[0])?.language_name || 'English';

    return (
        <div className="max-w-xl mx-auto space-y-12 pb-24 px-2 sm:px-0">

            {/* Profile Header */}
            <section className="flex flex-col items-center text-center space-y-4 pt-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                        <img alt="NoorQuran Logo" className="w-full h-full object-cover" src="/logo/logo-v2.png" />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{t('greeting')}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {recentSurah ? `${t('continueWith')}: ${t('surah')} ${recentSurah.name_simple}` : t('readQuran')}
                    </p>
                </div>
            </section>

            <div className="space-y-8">
                {/* Appearance Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                        {t('appearance')}
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Moon size={20} className="text-primary fill-current" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Eye comfort for night reading</p>
                                </div>
                            </div>
                            <button
                                onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                                className={`w-11 h-6 rounded-full relative transition-colors ${settings.theme === 'dark' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                            >
                                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.theme === 'dark' ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>

                        {/* App Language */}
                        <div className="p-5 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Globe size={20} className="text-emerald-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t('appLanguage')}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{settings.appLanguage === 'bn' ? 'Bangla' : 'English'}</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
                                <button
                                    onClick={() => updateSettings({ appLanguage: 'en' })}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${settings.appLanguage === 'en' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => updateSettings({ appLanguage: 'bn' })}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${settings.appLanguage === 'bn' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    BN
                                </button>
                            </div>
                        </div>

                        {/* Font Size Slider */}
                        <div className="p-5 space-y-4 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Type size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t('fontSize')}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Adjust Arabic and translation text</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-2">
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">A</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={settings.fontSize}
                                    onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">A</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                        Content
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">

                        {/* Translation Language */}
                        <div className="relative p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <BookA size={20} className="text-blue-500" />
                                    </div>
                                    <div className="pr-4">
                                        <p className="font-semibold text-gray-900 dark:text-white">{t('translationLanguage')}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">{activeTranslation}</p>
                                    </div>
                                </div>
                                <ChevronDown size={20} className="text-gray-400" />
                            </div>
                            {/* Hidden Native Select overlapping the container for mobile ease */}
                            <select
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                value={settings.selectedTranslationIds[0] || ''}
                                onChange={(e) => updateSettings({ selectedTranslationIds: [parseInt(e.target.value)] })}
                            >
                                {availableTranslations.map(tr => (
                                    <option key={tr.id} value={tr.id}>
                                        {tr.language_name.charAt(0).toUpperCase() + tr.language_name.slice(1)} - {tr.name} ({tr.author_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Reciter Selection */}
                        <div className="relative p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <Mic size={20} className="text-blue-500" />
                                    </div>
                                    <div className="pr-4">
                                        <p className="font-semibold text-gray-900 dark:text-white">{t('reciter')}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-48">{activeReciter}</p>
                                    </div>
                                </div>
                                <ChevronDown size={20} className="text-gray-400" />
                            </div>
                            {/* Hidden Native Select overlapping */}
                            <select
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                value={settings.reciterId}
                                onChange={(e) => updateSettings({ reciterId: parseInt(e.target.value) })}
                            >
                                {reciters.map(reciter => (
                                    <option key={reciter.id} value={reciter.id}>
                                        {reciter.reciter_name} {reciter.style ? `(${reciter.style})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show Arabic / Show Translation Toggles */}
                        <div className="flex items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-gray-900 dark:text-white">{t('showArabic')}</p>
                            </div>
                            <button
                                onClick={() => updateSettings({ showArabic: !settings.showArabic })}
                                className={`w-11 h-6 rounded-full relative transition-colors ${settings.showArabic ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                            >
                                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.showArabic ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-gray-900 dark:text-white">{t('showTranslation')}</p>
                            </div>
                            <button
                                onClick={() => updateSettings({ showTranslation: !settings.showTranslation })}
                                className={`w-11 h-6 rounded-full relative transition-colors ${settings.showTranslation ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                            >
                                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.showTranslation ? 'translate-x-5' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                        Location
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm p-5">

                        {/* Current Location Badge */}
                        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 p-4 rounded-2xl mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{t('location')}</p>
                                <p className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                                    {settings.location.address || 'Unknown Location'}
                                </p>
                                <p className="text-[10px] text-gray-500 font-mono mt-1">
                                    {settings.location.latitude.toFixed(4)}, {settings.location.longitude.toFixed(4)}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-surface-dark p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 text-primary">
                                <MapPin size={24} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* City Search */}
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchLocation()}
                                        placeholder={t('cityPlaceholder')}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                    />
                                </div>
                                <button
                                    onClick={handleSearchLocation}
                                    disabled={isSearching || !searchQuery.trim()}
                                    className="px-4 bg-primary text-white rounded-xl hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                                OR
                                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                            </div>

                            {/* Detect Location Button */}
                            <button
                                onClick={handleGetCurrentLocation}
                                disabled={detecting}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-70 text-sm"
                            >
                                {detecting ? <Loader2 size={18} className="animate-spin" /> : <Crosshair size={18} />}
                                {detecting ? t('detecting') : t('useCurrentLocation')}
                            </button>

                            {/* Manual Coordinates Toggle */}
                            <details className="group pt-2">
                                <summary className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-500 hover:text-primary transition select-none">
                                    <span className="group-open:rotate-90 transition-transform text-[10px]">▶</span>
                                    {t('manualCoordinates')}
                                </summary>
                                <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div>
                                            <label className="text-[10px] text-gray-400 mb-1 block uppercase font-bold">{t('latitude')}</label>
                                            <input
                                                type="text"
                                                value={manualCoords.lat}
                                                onChange={(e) => setManualCoords({ ...manualCoords, lat: e.target.value })}
                                                className="w-full p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 mb-1 block uppercase font-bold">{t('longitude')}</label>
                                            <input
                                                type="text"
                                                value={manualCoords.lng}
                                                onChange={(e) => setManualCoords({ ...manualCoords, lng: e.target.value })}
                                                className="w-full p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:ring-1 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleManualUpdate}
                                        className="w-full py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                                    >
                                        {t('update')}
                                    </button>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4 text-left">
                        {t('aboutUs')}
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">

                        {/* About Us */}
                        <button onClick={() => navigate('/about')} className="w-full flex text-left items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Info size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t('aboutUs')}</p>
                                    <p className="text-xs text-gray-400">{t('appVersionDesc')}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>

                        {/* Privacy Policy */}
                        <button onClick={() => navigate('/privacy')} className="w-full flex items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <ShieldCheck size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t('privacyPolicy')}</p>
                                    <p className="text-xs text-gray-400">Data &amp; permissions</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>

                        {/* Send Feedback */}
                        <button className="w-full text-left flex items-center justify-between p-5 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                    <MessageSquare size={20} className="text-violet-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t('feedback')}</p>
                                    <p className="text-xs text-gray-400">{t('contactUs')}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>

                        {/* Rate the App */}
                        <button className="w-full flex items-center justify-between p-5 group hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Star size={20} className="text-amber-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-amber-600 dark:text-amber-400">{t('rateUs')}</p>
                                    <p className="text-xs text-gray-400">Google Play Store</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-amber-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* App Version Footer Card */}
            <div className="mx-2 bg-gradient-to-br from-primary/10 to-emerald-500/5 border border-primary/20 rounded-3xl p-6 flex flex-col items-center text-center space-y-2">
                <img src="/logo/logo.png" alt="NoorQuran" className="w-14 h-14 object-contain" />
                <p className="font-bold text-gray-900 dark:text-white tracking-tight">{t('appVersion')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('appVersionDesc')}</p>
            </div>

        </div>
    );
};

export default SettingsPage;
