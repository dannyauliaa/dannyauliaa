// Data Creators dengan link ke halaman profil
const creatorsData = [
    {
        name: 'Aria Sakura',
        role: 'Content Creator',
        specialty: 'Gaming & Streaming',
        emoji: '🎮',
        link: 'profile-aria.html' // Bisa diganti dengan link yang sesuai
    },
    {
        name: 'Leo Chen',
        role: 'Video Editor',
        specialty: 'Motion Graphics',
        emoji: '🎬',
        link: 'profile-leo.html'
    },
    {
        name: 'Maya Winters',
        role: 'Illustrator',
        specialty: 'Digital Art',
        emoji: '🎨',
        link: 'profile-maya.html'
    },
    {
        name: 'Kai Storm',
        role: 'Music Producer',
        specialty: 'Electronic Music',
        emoji: '🎵',
        link: 'profile-kai.html'
    },
    {
        name: 'Luna Star',
        role: 'Writer',
        specialty: 'Storytelling',
        emoji: '✍️',
        link: 'profile-luna.html'
    },
    {
        name: 'Nova Ray',
        role: '3D Artist',
        specialty: 'Character Design',
        emoji: '🎭',
        link: 'profile-nova.html'
    }
];

// Data Affiliations
const affiliationsData = [
    { name: 'TechHub Studio', desc: 'Technology & Innovation Partner', type: 'Technology', emoji: '💻' },
    { name: 'Creative Minds', desc: 'Design & Branding Partner', type: 'Design', emoji: '🎨' },
    { name: 'Digital Wave', desc: 'Marketing & Strategy Partner', type: 'Marketing', emoji: '📱' },
    { name: 'StreamPro Network', desc: 'Streaming Platform Partner', type: 'Platform', emoji: '📺' }
];

// Data Projects
const projectsData = [
    { title: 'StarFest 2025', creators: 'Aria, Leo, Maya', desc: 'Annual community festival', emoji: '🎉', tags: ['Event', 'Community'] },
    { title: 'Digital Dreamscape', creators: 'Nova, Kai', desc: '3D Interactive Experience', emoji: '🌌', tags: ['3D', 'Interactive'] },
    { title: 'Story Chronicles', creators: 'Luna, Maya', desc: 'Illustrated Story Series', emoji: '📖', tags: ['Story', 'Art'] },
    { title: 'Beat Fusion', creators: 'Kai, Leo', desc: 'Music & Video Collaboration', emoji: '🎶', tags: ['Music', 'Video'] }
];

// Data Products
const productsData = [
    { name: 'StarLive T-Shirt', price: 'Rp 150.000', tag: 'Limited', emoji: '👕' },
    { name: 'Hoodie Collection', price: 'Rp 350.000', tag: 'Discount', emoji: '🧥' },
    { name: 'Acrylic Stand', price: 'Rp 75.000', tag: null, emoji: '🎴' },
    { name: 'Sticker Pack', price: 'Rp 50.000', tag: 'Limited', emoji: '✨' },
    { name: 'Art Book', price: 'Rp 200.000', tag: null, emoji: '📚' },
    { name: 'Badge Set', price: 'Rp 100.000', tag: 'Discount', emoji: '🏅' }
];

// Data Social Media
const socialMediaData = [
    { name: 'YouTube', handle: '@StarLiveOfficial', desc: 'Subscribe for latest videos', color: '#FF0000', icon: '▶️' },
    { name: 'Twitter / X', handle: '@StarLive_ID', desc: 'Follow for daily updates', color: '#1DA1F2', icon: '🐦' },
    { name: 'Instagram', handle: '@starlive.official', desc: 'Visual stories and behind the scenes', color: '#E1306C', icon: '📷' },
    { name: 'TikTok', handle: '@starlive', desc: 'Short videos and fun content', color: '#000000', icon: '🎵' }
];

// Translations - Multi-language Support
const translations = {
    id: {
        home: {
            title: 'Selamat Datang di StarLive',
            subtitle: 'Menciptakan pengalaman digital yang indah dengan desain yang bersih dan minimalis',
            subtitle2: '星の世界へようこそ',
            exploreBtn: '🚀 Jelajahi Karya',
            contactBtn: '📧 Hubungi Kami',
            aboutTitle: 'Tentang Kami',
            aboutText: 'StarLive adalah organisasi kreatif yang berfokus pada pengembangan konten digital, kolaborasi kreator, dan inovasi teknologi. Kami menghubungkan talenta kreatif dengan peluang untuk berkembang.',
            updatesTitle: 'Pembaruan Terbaru',
            update1: 'Proyek kolaborasi baru diluncurkan!',
            update2: 'Event komunitas bulan depan',
            update3: '5 kreator baru bergabung'
        },
        profile: {
            title: 'Profil Organisasi',
            subtitle: 'Informasi lengkap tentang StarLive',
            personalInfoTitle: 'Informasi Organisasi',
            nameLabel: 'Nama',
            nameValue: 'StarLive Creative',
            establishedLabel: 'Didirikan',
            establishedValue: '2023',
            locationLabel: 'Lokasi',
            locationValue: 'Jakarta, Indonesia',
            typeLabel: 'Tipe',
            typeValue: 'Organisasi Kreatif',
            skillsTitle: 'Keahlian & Spesialisasi',
            skill1: 'Produksi Konten Digital',
            skill2: 'Manajemen Kreator',
            skill3: 'Pengembangan Brand',
            skill4: 'Event & Community'
        },
        creator: {
            title: 'Daftar Kreator',
            subtitle: 'Temui talenta kreatif kami'
        },
        affiliation: {
            title: 'Afiliasi Kami',
            subtitle: 'Mitra dan organisasi yang bekerja sama dengan kami'
        },
        project: {
            title: 'Proyek Kami',
            subtitle: 'Karya dan kolaborasi terbaru',
            by: 'Oleh'
        },
        gallery: {
            title: 'Galeri Dokumentasi',
            subtitle: 'Momen berharga dari kegiatan kami'
        },
        store: {
            title: 'Toko StarLive',
            subtitle: 'Produk eksklusif dan merchandise'
        },
        social: {
            title: 'Media Sosial',
            subtitle: 'Ikuti kami di berbagai platform'
        }
    },
    en: {
        home: {
            title: 'Welcome to StarLive',
            subtitle: 'Creating beautiful digital experiences with clean, minimalist design',
            subtitle2: 'Welcome to the world of stars',
            exploreBtn: '🚀 Explore Work',
            contactBtn: '📧 Contact Us',
            aboutTitle: 'About Us',
            aboutText: 'StarLive is a creative organization focused on digital content development, creator collaboration, and technological innovation.',
            updatesTitle: 'Latest Updates',
            update1: 'New collaboration project launched!',
            update2: 'Community event next month',
            update3: '5 new creators joined'
        },
        profile: {
            title: 'Organization Profile',
            subtitle: 'Complete information about StarLive',
            personalInfoTitle: 'Organization Information',
            nameLabel: 'Name',
            nameValue: 'StarLive Creative',
            establishedLabel: 'Established',
            establishedValue: '2023',
            locationLabel: 'Location',
            locationValue: 'Jakarta, Indonesia',
            typeLabel: 'Type',
            typeValue: 'Creative Organization',
            skillsTitle: 'Skills & Expertise',
            skill1: 'Digital Content Production',
            skill2: 'Creator Management',
            skill3: 'Brand Development',
            skill4: 'Event & Community'
        },
        creator: {
            title: 'Our Creators',
            subtitle: 'Meet our creative talents'
        },
        affiliation: {
            title: 'Our Affiliations',
            subtitle: 'Partners and organizations working with us'
        },
        project: {
            title: 'Our Projects',
            subtitle: 'Latest works and collaborations',
            by: 'By'
        },
        gallery: {
            title: 'Documentation Gallery',
            subtitle: 'Precious moments from our activities'
        },
        store: {
            title: 'StarLive Store',
            subtitle: 'Exclusive products and merchandise'
        },
        social: {
            title: 'Social Media',
            subtitle: 'Follow us on various platforms'
        }
    }
};
