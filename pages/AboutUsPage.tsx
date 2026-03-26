
import React, { useEffect } from 'react';
import { useAppStore } from '../context/Store';
import { Heart, BookOpen, Globe, Star, Shield, MessageSquare } from 'lucide-react';

const AboutUsPage = () => {
    const { t, setHeaderTitle, settings } = useAppStore();
    const isBn = settings.appLanguage === 'bn';

    useEffect(() => {
        setHeaderTitle(t('aboutUs'));
    }, [t, setHeaderTitle]);

    const features = [
        {
            icon: <BookOpen size={22} className="text-primary" />,
            bg: 'bg-primary/10',
            title: isBn ? 'সম্পূর্ণ আল-কুরআন' : 'Complete Al-Qur\'an',
            desc: isBn
                ? 'অডিও তিলাওয়াত সহ ১১৪টি সূরার আরবি পাঠ, অনুবাদ ও তাফসীর'
                : '114 Surahs with Arabic text, translations and audio recitation',
        },
        {
            icon: <Globe size={22} className="text-blue-500" />,
            bg: 'bg-blue-500/10',
            title: isBn ? 'নামাজের সময়' : 'Prayer Times',
            desc: isBn
                ? 'বিশ্বের যেকোনো স্থান থেকে সঠিক নামাজের ওয়াক্ত জানুন'
                : 'Accurate prayer times for any location worldwide',
        },
        {
            icon: <Star size={22} className="text-amber-500" />,
            bg: 'bg-amber-500/10',
            title: isBn ? 'হাদিস সংকলন' : 'Hadith Collection',
            desc: isBn
                ? 'বুখারি, মুসলিম সহ বিখ্যাত হাদিস গ্রন্থসমূহ'
                : 'Major hadith books including Bukhari, Muslim and more',
        },
        {
            icon: <Shield size={22} className="text-emerald-500" />,
            bg: 'bg-emerald-500/10',
            title: isBn ? 'সম্পূর্ণ বিজ্ঞাপনমুক্ত' : 'Completely Ad-Free',
            desc: isBn
                ? 'কোনো বিজ্ঞাপন ছাড়াই নিরবচ্ছিন্ন ইসলামিক শিক্ষায় মনোযোগ দিন'
                : 'Focus on Islamic learning without any interruptions',
        },
    ];

    const paragraphs = isBn
        ? [
            'এই কুরআন অ্যাপটি উম্মাহর সেবায় এবং পবিত্র কুরআনে প্রবেশকে সহজ, সুন্দর ও অর্থবহ করার উদ্দেশ্যে যত্নসহকারে ডিজাইন ও তৈরি করা হয়েছে।',
            'অ্যাপ্লিকেশনটি একজন স্বাধীন ডেভেলপার অত্যন্ত যত্ন ও নিষ্ঠার সাথে তৈরি ও রক্ষণাবেক্ষণ করছেন। একটি মসৃণ ও নির্ভরযোগ্য অভিজ্ঞতা নিশ্চিত করতে সর্বাত্মক প্রচেষ্টা করা হয়েছে, তবুও মাঝেমধ্যে ছোটোখাটো ত্রুটি থাকতে পারে।',
            'আপনার বোঝাপড়ার জন্য আন্তরিক কৃতজ্ঞতা। আপনার মতামত, পরামর্শ বা যেকোনো সমস্যার রিপোর্ট শেয়ার করতে উৎসাহিত করা হচ্ছে — আপনার অংশগ্রহণ অ্যাপটিকে সকলের জন্য আরও উন্নত করতে গুরুত্বপূর্ণ ভূমিকা রাখে।',
            'আমাদের লক্ষ্য হলো একটি পরিষ্কার, বিক্ষেপমুক্ত পরিবেশ প্রদান করা যেখানে ব্যবহারকারীরা সহজে কুরআন পড়তে, শুনতে এবং তার উপর চিন্তা-ভাবনা করতে পারেন।',
            'এটি উন্নতির একটি ক্রমাগত যাত্রা, এবং আমরা সময়ের সাথে সাথে অ্যাপের ফিচার, পারফরম্যান্স ও ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে প্রতিশ্রুতিবদ্ধ।',
            'এই ক্ষুদ্র প্রচেষ্টা যেন উপকারী হয় এবং কবুল হয়।',
        ]
        : [
            'This Quran app has been thoughtfully designed and developed with the intention of serving the Ummah and making access to the Holy Quran simple, beautiful, and meaningful.',
            'The application is created and maintained by an independent developer with great care and dedication. While every effort has been made to ensure a smooth and reliable experience, there may still be occasional bugs or minor issues.',
            'We sincerely appreciate your understanding and encourage you to share your feedback, suggestions, or report any problems you encounter. Your input plays a vital role in improving the app and making it better for everyone.',
            'Our goal is to provide a clean, distraction-free environment where users can read, listen, and reflect on the Quran with ease.',
            'This is a continuous journey of improvement, and we remain committed to enhancing the app\'s features, performance, and user experience over time.',
            'May this small effort be beneficial and accepted.',
        ];

    return (
        <div className="max-w-xl mx-auto pb-24 space-y-8 px-2">

            {/* Hero */}
            <div className="flex flex-col items-center text-center pt-6 pb-2 space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
                    <img src="/logo/logo-v2.png" alt="NoorQuran" className="w-16 h-16 object-contain" />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {isBn ? 'নূরকুরআন' : 'NoorQuran'}
                    </h1>
                    <p className="text-primary font-semibold text-sm mt-1">
                        {isBn ? 'আলোর পথে, কুরআনের সাথে' : 'Walking in light, with the Qur\'an'}
                    </p>
                </div>
            </div>

            {/* About Content */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'আমাদের সম্পর্কে' : 'About'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
                    {paragraphs.map((para, i) => (
                        <p
                            key={i}
                            className={`text-sm leading-loose text-gray-700 dark:text-gray-300 ${i === paragraphs.length - 1 ? 'font-semibold text-primary dark:text-primary italic' : ''}`}
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Mission */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'আমাদের লক্ষ্য' : 'Our Mission'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Heart size={20} className="text-rose-500 fill-current" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-loose">
                            {isBn
                                ? 'আমাদের লক্ষ্য হলো প্রযুক্তির মাধ্যমে মুসলিম উম্মাহকে আল্লাহর বাণীর কাছাকাছি নিয়ে আসা। আমরা বিশ্বাস করি, ডিজিটাল যুগে ইসলামিক জ্ঞান সবার কাছে সহজলভ্য হওয়া উচিত — ভাষার বাধা ছাড়া, অর্থের বাধা ছাড়া।'
                                : 'Our mission is to bring the Muslim Ummah closer to the words of Allah through technology. We believe Islamic knowledge should be accessible to everyone in the digital age — without language barriers, without financial barriers.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'আমাদের ফিচারসমূহ' : 'Our Features'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className={`flex items-start gap-4 p-5 ${i < features.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                                {f.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">{f.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedback CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-emerald-500/5 border border-primary/20 rounded-3xl p-6 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-primary" />
                </div>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                        {isBn ? 'আপনার মতামত দিন' : 'Share Your Feedback'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {isBn
                            ? 'যেকোনো সমস্যা বা পরামর্শ জানাতে আমাদের সাথে যোগাযোগ করুন।'
                            : 'Contact us to report any issues or share suggestions.'}
                    </p>
                    <p className="text-xs text-primary font-semibold mt-2">app.noor.quran@gmail.com</p>
                </div>
            </div>

            {/* Version Info */}
            <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 px-4">
                    {isBn ? 'অ্যাপ তথ্য' : 'App Info'}
                </h2>
                <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    {[
                        { label: isBn ? 'সংস্করণ' : 'Version', value: '1.0.0' },
                        { label: isBn ? 'প্ল্যাটফর্ম' : 'Platform', value: 'Android / Web' },
                        { label: isBn ? 'ডেভেলপার' : 'Developer', value: isBn ? 'স্বাধীন ডেভেলপার' : 'Independent Developer' },
                        { label: isBn ? 'ইমেইল' : 'Email', value: 'app.noor.quran@gmail.com' },
                    ].map((item, i, arr) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between px-5 py-4 ${i < arr.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                        >
                            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Quote */}
            <div className="text-center py-4 space-y-2 opacity-70">
                <p className="text-2xl font-arabic text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isBn ? 'আল্লাহর নামে শুরু করছি যিনি পরম দয়ালু ও করুণাময়' : 'In the name of Allah, the Most Gracious, the Most Merciful'}
                </p>
            </div>
        </div>
    );
};

export default AboutUsPage;
