
import React, { useEffect } from 'react';
import { useAppStore } from '../context/Store';
import { ShieldCheck, Database, MapPin, Mic, Bell, Lock, Mail } from 'lucide-react';

const PrivacyPolicyPage = () => {
    const { t, setHeaderTitle, settings } = useAppStore();
    const isBn = settings.appLanguage === 'bn';

    useEffect(() => {
        setHeaderTitle(t('privacyPolicy'));
    }, [t, setHeaderTitle]);

    const sections = [
        {
            icon: <Database size={20} className="text-primary" />,
            bg: 'bg-primary/10',
            title: isBn ? 'আমরা কী ডেটা সংগ্রহ করি?' : 'What Data Do We Collect?',
            content: isBn
                ? 'নূরকুরআন আপনার কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। আপনার সেটিংস, বুকমার্ক এবং পছন্দগুলি শুধুমাত্র আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষণ করা হয়।'
                : 'NoorQuran does not collect any personal information. Your settings, bookmarks, and preferences are stored locally on your device only.',
        },
        {
            icon: <MapPin size={20} className="text-blue-500" />,
            bg: 'bg-blue-500/10',
            title: isBn ? 'অবস্থান অনুমতি' : 'Location Permission',
            content: isBn
                ? 'নামাজের ওয়াক্ত এবং কিবলার দিকনির্দেশনার জন্য আমরা আপনার অবস্থান ব্যবহার করি। এই তথ্য কখনই আমাদের সার্ভারে পাঠানো হয় না — শুধুমাত্র আপনার ডিভাইসে প্রক্রিয়া করা হয়।'
                : 'We use your location for Prayer Times and Qibla direction. This information is never sent to our servers — it is processed only on your device.',
        },
        {
            icon: <Mic size={20} className="text-violet-500" />,
            bg: 'bg-violet-500/10',
            title: isBn ? 'মাইক্রোফোন অনুমতি' : 'Microphone Permission',
            content: isBn
                ? 'আমরা মাইক্রোফোন ব্যবহার করি না। ভবিষ্যতে ভয়েস সার্চ ফিচার যুক্ত হলে, ব্যবহারকারীর স্পষ্ট অনুমতি ছাড়া তা ব্যবহার করা হবে না।'
                : 'We do not use the microphone. If a voice search feature is added in the future, it will not be used without the user\'s explicit permission.',
        },
        {
            icon: <Bell size={20} className="text-amber-500" />,
            bg: 'bg-amber-500/10',
            title: isBn ? 'নোটিফিকেশন' : 'Notifications',
            content: isBn
                ? 'নামাজের ওয়াক্তের অনুস্মারক পাঠাতে নোটিফিকেশন ব্যবহার করা হয়। আপনি যেকোনো সময় ডিভাইস সেটিংস থেকে নোটিফিকেশন বন্ধ করতে পারবেন।'
                : 'Notifications are used to send Prayer Time reminders. You can turn off notifications from your device settings at any time.',
        },
        {
            icon: <Lock size={20} className="text-emerald-500" />,
            bg: 'bg-emerald-500/10',
            title: isBn ? 'তৃতীয় পক্ষের সেবা' : 'Third-Party Services',
            content: isBn
                ? 'কুরআনের আয়াত ও হাদিসের ডেটার জন্য আমরা Quran.com এবং HadeethEnc.com-এর পাবলিক API ব্যবহার করি। নামাজের ওয়াক্তের জন্য Aladhan API এবং AlAdhan ব্যবহার করা হয়। এই সেবাগুলির নিজস্ব গোপনীয়তা নীতি রয়েছে।'
                : 'We use the public APIs of Quran.com and HadeethEnc.com for Quran and Hadith data. Aladhan API is used for Prayer Times. These services have their own privacy policies.',
        },
        {
            icon: <Database size={20} className="text-rose-500" />,
            bg: 'bg-rose-500/10',
            title: isBn ? 'কুকিজ ও ট্র্যাকিং' : 'Cookies & Tracking',
            content: isBn
                ? 'আমরা কোনো কুকিজ ব্যবহার করি না এবং আপনার ব্যবহার ট্র্যাক করি না। অ্যাপটিতে কোনো বিজ্ঞাপন নেটওয়ার্ক বা অ্যানালিটিক্স SDK নেই।'
                : 'We do not use cookies and do not track your usage. The app has no advertising networks or analytics SDKs.',
        },
    ];

    return (
        <div className="max-w-xl mx-auto pb-24 space-y-8 px-2">

            {/* Hero */}
            <div className="flex flex-col items-center text-center pt-6 space-y-3">
                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg">
                    <ShieldCheck size={36} className="text-blue-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {isBn ? 'সর্বশেষ আপডেট: মার্চ ২০২৬' : 'Last Updated: March 2026'}
                    </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl px-5 py-3 max-w-sm">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                        {isBn
                            ? '✅ আমরা আপনার কোনো ব্যক্তিগত তথ্য সংগ্রহ বা বিক্রয় করি না।'
                            : '✅ We do not collect or sell any of your personal data.'}
                    </p>
                </div>
            </div>

            {/* Intro paragraph */}
            <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-loose">
                    {isBn
                        ? 'নূরকুরআন ব্যবহার করার জন্য আপনাকে স্বাগতম। আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কীভাবে আপনার তথ্য পরিচালনা করি — সংক্ষেপে, আমরা আপনার ডেটা সংগ্রহ করি না।'
                        : 'Welcome to NoorQuran. Your privacy matters deeply to us. This Privacy Policy explains how we handle your information — briefly, we do not collect your data.'}
                </p>
            </div>

            {/* Sections */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'বিস্তারিত নীতিমালা' : 'Detailed Policy'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    {sections.map((s, i) => (
                        <div
                            key={i}
                            className={`p-5 ${i < sections.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                                    {s.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{s.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-12">{s.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Children's Privacy */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'শিশুদের গোপনীয়তা' : "Children's Privacy"}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {isBn
                            ? 'আমাদের অ্যাপ সব বয়সের জন্য নিরাপদ। আমরা ১৩ বছরের কম বয়সীদের কাছ থেকে ইচ্ছাকৃতভাবে কোনো তথ্য সংগ্রহ করি না।'
                            : "Our app is safe for all ages. We do not knowingly collect any information from children under 13."}
                    </p>
                </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'যোগাযোগ করুন' : 'Contact Us'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Mail size={20} className="text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {isBn ? 'গোপনীয়তা সম্পর্কে প্রশ্ন আছে?' : 'Questions about privacy?'}
                            </p>
                            <p className="text-xs text-primary mt-0.5">app.noor.quran@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
