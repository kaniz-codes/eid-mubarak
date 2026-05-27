/* =========================================================
   Journey of Eid — Interactivity and content rendering
   One Eid is chosen at entry; only that journey is rendered.
   ========================================================= */
'use strict';

const state = {
  selectedEid: localStorage.getItem('selectedEid') || null,
  language: localStorage.getItem('language') || 'en',
  theme: localStorage.getItem('theme') || 'dark',
  selectedDua: null,
  isWheelSpinning: false,
  wheelRotation: 0,
  messageVariant: 0,
  currentStoryPage: 0,
  bookOpened: false,
  storyBusy: false
};

const uiText = {
  en: {
    heroEyebrow: 'A Celebration of Faith, Gratitude and Joy', heroTitle: 'Eid Mubarak', heroCopy: 'Begin a meaningful journey through the story, Sunnah, duas and joy of Eid.',
    fitrLabel: 'The Celebration After Ramadan', fitrDescription: 'Explore a journey of fasting, gratitude, generosity and joyful remembrance.', fitrButton: 'Begin Eid al-Fitr Journey',
    adhaLabel: 'The Celebration of Submission', adhaDescription: 'Explore a journey of faith, sacrifice, compassion and sharing.', adhaButton: 'Begin Eid al-Adha Journey',
    navStory: 'Story', navDua: 'Takbir & Dua', navWheel: 'Dua Wheel', navSunnah: 'Sunnah Checklist', navGreeting: 'Greeting Creator', navSources: 'Sources',
    remembranceEyebrow: 'Remembrance', remembranceTitle: 'Remember Allah on Eid', takbirTitle: 'Takbir of Eid', takbirMeaning: 'Allah is the Greatest. There is no deity worthy of worship except Allah, and all praise belongs to Allah.',
    takbirNote: 'A commonly recited wording of takbir.', acceptanceTitle: 'A Dua for Acceptance', showTransliteration: 'Show Transliteration', hideTransliteration: 'Hide Transliteration', showMeaning: 'Show Meaning', hideMeaning: 'Hide Meaning', copyTakbir: 'Copy Takbir', copyArabic: 'Copy Arabic', copyTransliteration: 'Copy Transliteration', copyMeaning: 'Copy Meaning',
    wheelEyebrow: 'Reflection Activity', wheelTitle: 'Spin the Dua Wheel', wheelCopy: 'Discover a meaningful dua to read, reflect on and carry into your Eid celebration.', wheelNote: 'This wheel is a reflection activity featuring selected Qur’anic and authentic supplications. It is not fortune-telling and is not a required Eid practice.',
    duaAcceptance: 'Acceptance', duaGoodness: 'Goodness', duaGratitude: 'Gratitude', duaGuidance: 'Guidance', duaFamily: 'Family', duaForgiveness: 'Forgiveness', spinButton: 'Spin for a Dua', readAnother: 'Read Another Dua', savedDuas: 'My Saved Duas', resultPlaceholderTitle: 'Your reflection card will appear here', resultPlaceholderCopy: 'Spin the wheel to discover a selected dua and its meaning.', saveDua: 'Save Dua', remove: 'Remove', copyDua: 'Copy Dua',
    reflectionQuestion: 'How can I carry the meaning of this dua into my Eid celebration?', reflectionPlaceholder: 'Write a private reflection...', saveReflection: 'Save Reflection', clearReflection: 'Clear',
    practiceEyebrow: 'Practice', checklistCopy: 'Use this gentle checklist as a reminder for your chosen Eid journey.', resetChecklist: 'Reset Checklist', completeMessage: 'MashaAllah! May Allah accept your good deeds.', completedCount: '{done} of {total} completed',
    shareEyebrow: 'Share Joy', greetingCopy: 'Create a thoughtful greeting for family and friends.', recipientLabel: 'Recipient Name', recipientPlaceholder: 'Enter recipient name', senderLabel: 'Sender Name', senderPlaceholder: 'Enter your name', toneLabel: 'Tone', greetingLanguageLabel: 'Greeting Language', toneSimple: 'Simple', toneHeartfelt: 'Heartfelt', toneFormal: 'Formal', toneFamily: 'Family', toneFriend: 'Friend', includeLabel: 'Include', includeDua: 'A short dua', includeEmoji: 'Subtle festive emojis', generateGreeting: 'Generate Greeting', regenerate: 'Regenerate', previewTitle: 'Eid Greeting', copyMessage: 'Copy Message', downloadCard: 'Download Card',
    referencesEyebrow: 'References', referencesTitle: 'Qur’an and Hadith References', referencesCopy: 'Sources connected to the selected journey and the shared dua features.', quranGroup: 'Qur’an References', hadithGroup: 'Hadith References', reviewNote: 'Translations and religious references should be reviewed carefully before publication.',
    footerRespect: 'Made with love and respect for the blessed celebration of Eid.', restartJourney: 'Start a New Journey', modalTitle: 'Start a new journey?', modalCopy: 'Would you like to leave your current journey and choose another Eid?', stayJourney: 'Continue Current Journey', chooseAgain: 'Choose Again',
    copied: 'Copied successfully.', greetingCopied: 'Greeting copied successfully.', duaCopied: 'Dua copied successfully.', savedPrivately: 'Saved privately on this device.', savedFavorite: 'Dua saved to favorites.', removedFavorite: 'Dua removed from favorites.', noSavedDuas: 'No saved duas yet.', downloaded: 'Greeting card downloaded.', selectResult: 'Selected dua: ', resetDone: 'Checklist reset.', madeBy: 'Made by Kaniz Fatema', followWork: 'Follow my work', designedBy: 'Designed & Developed By', authorCopy: 'Thank you for exploring this meaningful journey of Eid. Follow me to discover more creative projects.', linkedIn: 'Follow me on LinkedIn', github: 'Follow me on GitHub', copyright: '© 2026 Kaniz Fatema. Created with care and respect for the celebration of Eid.'
  },
  bn: {
    heroEyebrow: 'বিশ্বাস, কৃতজ্ঞতা ও আনন্দের উদযাপন', heroTitle: 'ঈদ মোবারক', heroCopy: 'ঈদের গল্প, সুন্নাহ, দোয়া ও আনন্দের অর্থবহ যাত্রা শুরু করুন।',
    fitrLabel: 'রমাদানের পরের আনন্দ', fitrDescription: 'রোজা, কৃতজ্ঞতা, দান ও আল্লাহর স্মরণের যাত্রা আবিষ্কার করুন।', fitrButton: 'ঈদুল ফিতরের যাত্রা শুরু করুন',
    adhaLabel: 'আত্মসমর্পণের উদযাপন', adhaDescription: 'বিশ্বাস, ত্যাগ, সহমর্মিতা ও ভাগ করে নেওয়ার যাত্রা আবিষ্কার করুন।', adhaButton: 'ঈদুল আজহার যাত্রা শুরু করুন',
    navStory: 'গল্প', navDua: 'তাকবীর ও দোয়া', navWheel: 'দোয়া চাকা', navSunnah: 'সুন্নাহ তালিকা', navGreeting: 'শুভেচ্ছা তৈরি', navSources: 'সূত্র',
    remembranceEyebrow: 'স্মরণ', remembranceTitle: 'ঈদে আল্লাহকে স্মরণ করুন', takbirTitle: 'ঈদের তাকবীর', takbirMeaning: 'আল্লাহ সর্বশ্রেষ্ঠ। আল্লাহ ছাড়া ইবাদতের যোগ্য কোনো উপাস্য নেই, এবং সকল প্রশংসা আল্লাহর।',
    takbirNote: 'তাকবীরের প্রচলিত একটি পাঠ।', acceptanceTitle: 'কবুল হওয়ার দোয়া', showTransliteration: 'উচ্চারণ দেখুন', hideTransliteration: 'উচ্চারণ লুকান', showMeaning: 'অর্থ দেখুন', hideMeaning: 'অর্থ লুকান', copyTakbir: 'তাকবীর কপি', copyArabic: 'আরবি কপি', copyTransliteration: 'উচ্চারণ কপি', copyMeaning: 'অর্থ কপি',
    wheelEyebrow: 'ভাবনার কার্যক্রম', wheelTitle: 'দোয়া চাকা ঘোরান', wheelCopy: 'ঈদের উদযাপনে সঙ্গে রাখার মতো একটি অর্থবহ দোয়া আবিষ্কার করুন।', wheelNote: 'এই চাকা নির্বাচিত কুরআনিক ও সহিহ বর্ণিত দোয়া নিয়ে ভাবনার একটি কার্যক্রম। এটি ভাগ্য গণনা নয় এবং ঈদের আবশ্যিক আমলও নয়।',
    duaAcceptance: 'কবুল', duaGoodness: 'কল্যাণ', duaGratitude: 'কৃতজ্ঞতা', duaGuidance: 'হিদায়াত', duaFamily: 'পরিবার', duaForgiveness: 'ক্ষমা', spinButton: 'দোয়ার জন্য ঘোরান', readAnother: 'আরেকটি দোয়া পড়ুন', savedDuas: 'সংরক্ষিত দোয়া', resultPlaceholderTitle: 'আপনার দোয়া কার্ড এখানে দেখাবে', resultPlaceholderCopy: 'নির্বাচিত দোয়া ও অর্থ জানতে চাকা ঘোরান।', saveDua: 'দোয়া সংরক্ষণ', remove: 'মুছুন', copyDua: 'দোয়া কপি',
    reflectionQuestion: 'এই দোয়ার শিক্ষা আমি ঈদের উদযাপনে কীভাবে বহন করতে পারি?', reflectionPlaceholder: 'নিজের ভাবনা লিখুন...', saveReflection: 'ভাবনা সংরক্ষণ', clearReflection: 'মুছুন',
    practiceEyebrow: 'অনুশীলন', checklistCopy: 'আপনার নির্বাচিত ঈদের জন্য এই কোমল স্মরণতালিকা ব্যবহার করুন।', resetChecklist: 'তালিকা রিসেট', completeMessage: 'মাশাআল্লাহ! আল্লাহ আপনার নেক আমল কবুল করুন।', completedCount: '{total}টির মধ্যে {done}টি সম্পন্ন',
    shareEyebrow: 'আনন্দ ভাগ করুন', greetingCopy: 'পরিবার ও বন্ধুদের জন্য আন্তরিক শুভেচ্ছা তৈরি করুন।', recipientLabel: 'প্রাপকের নাম', recipientPlaceholder: 'প্রাপকের নাম লিখুন', senderLabel: 'আপনার নাম', senderPlaceholder: 'আপনার নাম লিখুন', toneLabel: 'ধরন', greetingLanguageLabel: 'শুভেচ্ছার ভাষা', toneSimple: 'সহজ', toneHeartfelt: 'আন্তরিক', toneFormal: 'আনুষ্ঠানিক', toneFamily: 'পরিবার', toneFriend: 'বন্ধু', includeLabel: 'যুক্ত করুন', includeDua: 'ছোট দোয়া', includeEmoji: 'সৌম্য উৎসবের ইমোজি', generateGreeting: 'শুভেচ্ছা তৈরি', regenerate: 'আবার তৈরি', previewTitle: 'ঈদ শুভেচ্ছা', copyMessage: 'বার্তা কপি', downloadCard: 'কার্ড ডাউনলোড',
    referencesEyebrow: 'সূত্র', referencesTitle: 'কুরআন ও হাদিসের সূত্র', referencesCopy: 'নির্বাচিত যাত্রা এবং দোয়ার বৈশিষ্ট্যে ব্যবহৃত সূত্র।', quranGroup: 'কুরআনের সূত্র', hadithGroup: 'হাদিসের সূত্র', reviewNote: 'প্রকাশের আগে অনুবাদ ও ধর্মীয় সূত্র সতর্কতার সঙ্গে পুনরায় যাচাই করা উচিত।',
    footerRespect: 'ঈদের বরকতময় উদযাপনের প্রতি ভালোবাসা ও সম্মান রেখে তৈরি।', restartJourney: 'নতুন যাত্রা শুরু', modalTitle: 'নতুন যাত্রা শুরু করবেন?', modalCopy: 'বর্তমান যাত্রা ছেড়ে অন্য ঈদ বেছে নিতে চান?', stayJourney: 'বর্তমান যাত্রায় থাকুন', chooseAgain: 'আবার বেছে নিন',
    copied: 'সফলভাবে কপি হয়েছে।', greetingCopied: 'শুভেচ্ছা সফলভাবে কপি হয়েছে।', duaCopied: 'দোয়া সফলভাবে কপি হয়েছে।', savedPrivately: 'এই ডিভাইসে ব্যক্তিগতভাবে সংরক্ষিত হয়েছে।', savedFavorite: 'দোয়া পছন্দের তালিকায় সংরক্ষিত হয়েছে।', removedFavorite: 'দোয়া পছন্দের তালিকা থেকে মুছে দেওয়া হয়েছে।', noSavedDuas: 'এখনও কোনো দোয়া সংরক্ষণ করা হয়নি।', downloaded: 'শুভেচ্ছা কার্ড ডাউনলোড হয়েছে।', selectResult: 'নির্বাচিত দোয়া: ', resetDone: 'তালিকা রিসেট হয়েছে।', madeBy: 'তৈরি করেছেন কানিজ ফাতেমা', followWork: 'আমার কাজ অনুসরণ করুন', designedBy: 'ডিজাইন ও ডেভেলপ করেছেন', authorCopy: 'ঈদের এই অর্থপূর্ণ যাত্রায় অংশ নেওয়ার জন্য ধন্যবাদ। আমার আরও সৃজনশীল কাজ দেখতে আমার সঙ্গে যুক্ত থাকুন।', linkedIn: 'LinkedIn-এ আমাকে অনুসরণ করুন', github: 'GitHub-এ আমাকে অনুসরণ করুন', copyright: '© ২০২৬ কানিজ ফাতেমা। ঈদের উদযাপনের প্রতি যত্ন ও সম্মান রেখে তৈরি।'
  }
};

const eidData = {
  fitr: {
    label: { en: 'The Celebration After Ramadan', bn: 'রমাদানের পরের আনন্দ' },
    title: { en: 'Journey of Eid al-Fitr', bn: 'ঈদুল ফিতরের যাত্রা' },
    intro: { en: 'From the patience of Ramadan to the joy of gratitude, discover the meaning of Eid al-Fitr.', bn: 'রমাদানের ধৈর্য থেকে কৃতজ্ঞতার আনন্দ পর্যন্ত, ঈদুল ফিতরের অর্থ আবিষ্কার করুন।' },
    remembrance: { en: 'Complete the joy of Eid with gratitude and remembrance of Allah.', bn: 'কৃতজ্ঞতা ও আল্লাহর স্মরণের মাধ্যমে ঈদের আনন্দ পূর্ণ করুন।' },
    checklistTitle: { en: 'My Eid al-Fitr Sunnah Checklist', bn: 'আমার ঈদুল ফিতর সুন্নাহ তালিকা' },
    greetingTitle: { en: 'Create Your Eid al-Fitr Greeting', bn: 'আপনার ঈদুল ফিতর শুভেচ্ছা তৈরি করুন' },
    previewTitle: { en: 'Eid al-Fitr Mubarak', bn: 'ঈদুল ফিতর মোবারক' },
    footer: { en: 'Eid al-Fitr Mubarak — May Allah accept your worship and fill your heart with gratitude.', bn: 'ঈদুল ফিতর মোবারক — আল্লাহ আপনার ইবাদত কবুল করুন এবং হৃদয় কৃতজ্ঞতায় পূর্ণ করুন।' },
    chapters: [
      {
        title: { en: 'Ramadan: A Journey of Taqwa', bn: 'রমাদান: তাকওয়ার যাত্রা' },
        body: { en: 'Ramadan is a month of fasting and worship. Muslims practise patience, self-control and mindfulness of Allah through fasting.', bn: 'রমাদান রোজা ও ইবাদতের মাস। রোজার মাধ্যমে মুসলিমরা ধৈর্য, আত্মসংযম এবং আল্লাহ-সচেতনতা অনুশীলন করেন।' },
        arabic: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        meaning: { en: 'Fasting is prescribed for believers so they may grow in mindfulness of Allah.', bn: 'মুমিনদের জন্য রোজা নির্ধারিত হয়েছে, যেন তারা তাকওয়া অর্জন করতে পারে।' },
        reference: 'Surah Al-Baqarah, 2:183', reflection: { en: 'Faith begins with intention.', bn: 'বিশ্বাস শুরু হয় নিয়ত দিয়ে।' }
      },
      {
        title: { en: 'Completing the Month With Gratitude', bn: 'কৃতজ্ঞতার সঙ্গে মাস পূর্ণ করা' },
        body: { en: 'After completing Ramadan, Muslims welcome Eid with joy and gratitude. Eid is connected to remembering Allah for His guidance.', bn: 'রমাদান পূর্ণ করার পর মুসলিমরা আনন্দ ও কৃতজ্ঞতার সঙ্গে ঈদকে স্বাগত জানান। ঈদ আল্লাহর হিদায়াতের জন্য তাঁকে স্মরণ করার সঙ্গে যুক্ত।' },
        arabic: 'وَلِتُكْمِلُواْ ٱلْعِدَّةَ وَلِتُكَبِّرُواْ ٱللَّهَ عَلَىٰ مَا هَدَىٰكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
        meaning: { en: 'Complete the prescribed period, proclaim Allah’s greatness for His guidance, and be grateful.', bn: 'নির্ধারিত সময় পূর্ণ করুন, তাঁর হিদায়াতের জন্য আল্লাহর মহত্ত্ব ঘোষণা করুন এবং কৃতজ্ঞ হোন।' },
        reference: 'Surah Al-Baqarah, 2:185 (excerpt)', reflection: { en: 'Eid begins with gratitude.', bn: 'ঈদ শুরু হয় কৃতজ্ঞতা দিয়ে।' }
      },
      {
        title: { en: 'The Festival of Breaking the Fast', bn: 'রোজা সমাপ্তির আনন্দের দিন' },
        body: { en: 'Eid al-Fitr marks the completion of Ramadan. Muslims gather for Eid prayer, share happiness with family and community, and remember those who need support.', bn: 'ঈদুল ফিতর রমাদান পূর্ণ হওয়ার আনন্দের দিন। মুসলিমরা ঈদের সালাতে একত্র হন, পরিবার ও সমাজের সঙ্গে আনন্দ ভাগ করেন এবং প্রয়োজনমতো মানুষদের স্মরণ করেন।' },
        reflection: { en: 'Joy is more beautiful when shared.', bn: 'ভাগ করে নেওয়া আনন্দই আরও সুন্দর।' }
      },
      {
        title: { en: 'Sharing Joy Through Zakat al-Fitr', bn: 'যাকাতুল ফিতরের মাধ্যমে আনন্দ ভাগ করা' },
        body: { en: 'Zakat al-Fitr is given before the Eid prayer so that generosity is part of the celebration and those in need are remembered.', bn: 'ঈদের সালাতের আগে যাকাতুল ফিতর দেওয়া হয়, যাতে ঈদের আনন্দে দানশীলতা থাকে এবং অসহায় মানুষদের স্মরণ করা হয়।' },
        reference: 'Sahih al-Bukhari 1509', reflection: { en: 'Celebrate with generosity.', bn: 'দানশীলতার সঙ্গে উদযাপন করুন।' }
      },
      {
        title: { en: 'Following the Sunnah on Eid al-Fitr', bn: 'ঈদুল ফিতরে সুন্নাহ অনুসরণ' },
        body: { en: 'Prepare for Eid with remembrance and care. Authentic references support eating an odd number of dates before prayer, giving Zakat al-Fitr before prayer, avoiding fasting on Eid, and returning by another route where possible.', bn: 'স্মরণ ও যত্নের সঙ্গে ঈদের প্রস্তুতি নিন। সালাতের আগে বিজোড় সংখ্যক খেজুর খাওয়া, সালাতের আগে যাকাতুল ফিতর দেওয়া, ঈদের দিন রোজা না রাখা এবং সম্ভব হলে ফেরার সময় ভিন্ন পথ নেওয়ার বিষয়ে সহিহ সূত্র রয়েছে।' },
        bullets: [
          { en: 'Eat an odd number of dates before the Eid prayer.', bn: 'ঈদের সালাতের আগে বিজোড় সংখ্যক খেজুর খান।', source: 'Sahih al-Bukhari 953' },
          { en: 'Give Zakat al-Fitr before the Eid prayer.', bn: 'ঈদের সালাতের আগে যাকাতুল ফিতর দিন।', source: 'Sahih al-Bukhari 1509' },
          { en: 'Return by a different route where possible.', bn: 'সম্ভব হলে ভিন্ন পথ দিয়ে ফিরুন।', source: 'Sahih al-Bukhari 986' },
          { en: 'Do not fast on Eid day.', bn: 'ঈদের দিন রোজা রাখবেন না।', source: 'Sahih Muslim 1137–1138' }
        ]
      },
      {
        title: { en: 'Eid Is Gratitude', bn: 'ঈদ হলো কৃতজ্ঞতা' },
        body: { en: 'Eid al-Fitr reminds us that worship should leave our hearts more thankful, compassionate and connected to Allah.', bn: 'ঈদুল ফিতর মনে করিয়ে দেয় যে ইবাদত আমাদের হৃদয়কে আরও কৃতজ্ঞ, সহমর্মী এবং আল্লাহর নিকটবর্তী করে।' },
        reflection: { en: 'Carry Ramadan’s goodness forward.', bn: 'রমাদানের কল্যাণ সামনে এগিয়ে নিন।' }
      }
    ]
  },
  adha: {
    label: { en: 'The Celebration of Submission', bn: 'আত্মসমর্পণের উদযাপন' },
    title: { en: 'Journey of Eid al-Adha', bn: 'ঈদুল আজহার যাত্রা' },
    intro: { en: 'From sincere submission to generous sharing, discover the meaning of Eid al-Adha.', bn: 'আন্তরিক আত্মসমর্পণ থেকে উদার ভাগাভাগি পর্যন্ত, ঈদুল আজহার অর্থ আবিষ্কার করুন।' },
    remembrance: { en: 'Complete the joy of Eid with remembrance, sincerity and gratitude.', bn: 'স্মরণ, আন্তরিকতা ও কৃতজ্ঞতার মাধ্যমে ঈদের আনন্দ পূর্ণ করুন।' },
    checklistTitle: { en: 'My Eid al-Adha Sunnah Checklist', bn: 'আমার ঈদুল আজহা সুন্নাহ তালিকা' },
    greetingTitle: { en: 'Create Your Eid al-Adha Greeting', bn: 'আপনার ঈদুল আজহা শুভেচ্ছা তৈরি করুন' },
    previewTitle: { en: 'Eid al-Adha Mubarak', bn: 'ঈদুল আজহা মোবারক' },
    footer: { en: 'Eid al-Adha Mubarak — May Allah accept your good deeds and bless your celebration with sincerity and generosity.', bn: 'ঈদুল আজহা মোবারক — আল্লাহ আপনার নেক আমল কবুল করুন এবং আপনার উদযাপনে আন্তরিকতা ও উদারতা দান করুন।' },
    chapters: [
      {
        title: { en: 'Prophet Ibrahim’s Test of Faith', bn: 'নবী ইবরাহিমের বিশ্বাসের পরীক্ষা' },
        body: { en: 'Prophet Ibrahim, peace be upon him, told his son of the command he saw in a dream. Both responded with patience and submission to Allah.', bn: 'নবী ইবরাহিম (আ.) স্বপ্নে দেখা নির্দেশের কথা তাঁর পুত্রকে জানান। উভয়েই ধৈর্য ও আল্লাহর প্রতি আত্মসমর্পণ প্রকাশ করেন।' },
        arabic: 'يَـٰبُنَىَّ إِنِّىٓ أَرَىٰ فِى ٱلْمَنَامِ أَنِّىٓ أَذْبَحُكَ فَٱنظُرْ مَاذَا تَرَىٰ',
        meaning: { en: 'Ibrahim spoke to his son about what he had seen in the dream.', bn: 'ইবরাহিম (আ.) তাঁর পুত্রকে স্বপ্নে দেখা নির্দেশের কথা জানান।' },
        reference: 'Surah As-Saffat, 37:102 (excerpt)', reflection: { en: 'Submission is rooted in trust.', bn: 'আত্মসমর্পণের ভিত্তি হলো আস্থা।' }
      },
      {
        title: { en: 'Allah’s Mercy and the Great Sacrifice', bn: 'আল্লাহর রহমত ও মহান কুরবানি' },
        body: { en: 'When they sincerely submitted, Allah accepted their devotion and ransomed the son with a great sacrifice.', bn: 'তারা আন্তরিকভাবে আত্মসমর্পণ করলে আল্লাহ তাদের ভক্তি কবুল করেন এবং মহান কুরবানির মাধ্যমে পুত্রকে মুক্ত করেন।' },
        arabic: 'وَفَدَيْنَـٰهُ بِذِبْحٍ عَظِيمٍ',
        meaning: { en: 'And We ransomed him with a great sacrifice.', bn: 'এবং আমি তাকে এক মহান কুরবানির বিনিময়ে মুক্ত করলাম।' },
        reference: 'Surah As-Saffat, 37:107', reflection: { en: 'True devotion is sincere.', bn: 'সত্যিকারের ভক্তি আন্তরিক।' }
      },
      {
        title: { en: 'Qurbani and Taqwa', bn: 'কুরবানি ও তাকওয়া' },
        body: { en: 'Muslims who are able offer Qurbani in remembrance of Ibrahim’s devotion and share food with others. The central lesson is piety and sincerity.', bn: 'সামর্থ্যবান মুসলিমরা ইবরাহিমের ভক্তি স্মরণ করে কুরবানি করেন এবং অন্যদের সঙ্গে খাবার ভাগ করেন। এর মূল শিক্ষা হলো তাকওয়া ও আন্তরিকতা।' },
        arabic: 'لَن يَنَالَ ٱللَّهَ لُحُومُهَا وَلَا دِمَآؤُهَا وَلَـٰكِن يَنَالُهُ ٱلتَّقْوَىٰ مِنكُمْ',
        meaning: { en: 'It is not their meat or blood that reaches Allah, but your piety.', bn: 'তাদের গোশত বা রক্ত আল্লাহর কাছে পৌঁছায় না; বরং তোমাদের তাকওয়া তাঁর কাছে পৌঁছায়।' },
        reference: 'Surah Al-Hajj, 22:37 (excerpt)', reflection: { en: 'The heart of sacrifice is taqwa.', bn: 'কুরবানির প্রাণ হলো তাকওয়া।' }
      },
      {
        title: { en: 'Eid al-Adha and the Days of Hajj', bn: 'ঈদুল আজহা ও হজের দিনসমূহ' },
        body: { en: 'Eid al-Adha occurs during the days of Hajj. As pilgrims gather in worship, Muslims worldwide celebrate through prayer, remembrance, generosity and sharing.', bn: 'ঈদুল আজহা হজের দিনগুলোর সময়ে আসে। হাজিরা ইবাদতে একত্র হন, আর বিশ্বজুড়ে মুসলিমরা সালাত, স্মরণ, দানশীলতা ও ভাগাভাগির মাধ্যমে ঈদ উদযাপন করেন।' },
        reflection: { en: 'A worldwide celebration of worship.', bn: 'ইবাদতের বিশ্বব্যাপী উদযাপন।' }
      },
      {
        title: { en: 'Following the Sunnah on Eid al-Adha', bn: 'ঈদুল আজহায় সুন্নাহ অনুসরণ' },
        body: { en: 'Prepare with remembrance and kindness. For those offering Qurbani, it is offered after the Eid prayer, and sharing remains part of the celebration.', bn: 'স্মরণ ও সদাচরণের সঙ্গে প্রস্তুতি নিন। যারা কুরবানি করবেন, তাদের জন্য তা ঈদের সালাতের পরে করা হয় এবং ভাগ করে নেওয়া উদযাপনের অংশ।' },
        bullets: [
          { en: 'Do not fast on Eid day.', bn: 'ঈদের দিন রোজা রাখবেন না।', source: 'Sahih Muslim 1137–1138' },
          { en: 'Offer Qurbani after Eid prayer, if offering it.', bn: 'কুরবানি করলে ঈদের সালাতের পর করুন।', source: 'Sahih al-Bukhari 968' },
          { en: 'Share food and remember people in need.', bn: 'খাবার ভাগ করুন এবং প্রয়োজনমতো মানুষদের স্মরণ করুন।', source: 'Surah Al-Hajj, 22:36' },
          { en: 'Return by a different route where possible.', bn: 'সম্ভব হলে ভিন্ন পথ দিয়ে ফিরুন।', source: 'Sahih al-Bukhari 986' }
        ]
      },
      {
        title: { en: 'Eid Is Submission', bn: 'ঈদ হলো আত্মসমর্পণ' },
        body: { en: 'Eid al-Adha teaches that devotion is shown through sincerity, trust, generosity and obedience to Allah.', bn: 'ঈদুল আজহা শেখায় যে আন্তরিকতা, আস্থা, উদারতা ও আল্লাহর আনুগত্যের মাধ্যমে ভক্তি প্রকাশ পায়।' },
        reflection: { en: 'Let sincerity shape celebration.', bn: 'আন্তরিকতা উদযাপনকে রূপ দিক।' }
      }
    ]
  }
};

const checklistData = {
  fitr: [
    ['Prepare clean and modest clothing', 'পরিষ্কার ও শালীন পোশাক প্রস্তুত করুন', ''],
    ['Remember Allah with takbir', 'তাকবীরের মাধ্যমে আল্লাহকে স্মরণ করুন', ''],
    ['Give Zakat al-Fitr before the Eid prayer', 'ঈদের সালাতের আগে যাকাতুল ফিতর দিন', 'Sahih al-Bukhari 1509'],
    ['Eat an odd number of dates before leaving for Eid prayer', 'ঈদের সালাতের জন্য বের হওয়ার আগে বিজোড় সংখ্যক খেজুর খান', 'Sahih al-Bukhari 953'],
    ['Attend the Eid prayer', 'ঈদের সালাতে অংশ নিন', ''],
    ['Return by a different route where possible', 'সম্ভব হলে ভিন্ন পথ দিয়ে ফিরুন', 'Sahih al-Bukhari 986'],
    ['Share greetings with kindness', 'সদয়ভাবে শুভেচ্ছা ভাগ করুন', ''],
    ['Help someone in need', 'প্রয়োজনমতো কাউকে সাহায্য করুন', ''],
    ['Remember not to fast on Eid day', 'ঈদের দিন রোজা না রাখার বিষয়টি স্মরণ রাখুন', 'Sahih Muslim 1137–1138']
  ],
  adha: [
    ['Prepare clean and modest clothing', 'পরিষ্কার ও শালীন পোশাক প্রস্তুত করুন', ''],
    ['Remember Allah with takbir', 'তাকবীরের মাধ্যমে আল্লাহকে স্মরণ করুন', ''],
    ['Attend the Eid prayer', 'ঈদের সালাতে অংশ নিন', ''],
    ['Remember not to fast on Eid day', 'ঈদের দিন রোজা না রাখার বিষয়টি স্মরণ রাখুন', 'Sahih Muslim 1137–1138'],
    ['Arrange Qurbani responsibly, if applicable', 'প্রযোজ্য হলে দায়িত্বশীলভাবে কুরবানির ব্যবস্থা করুন', ''],
    ['Perform Qurbani after Eid prayer, if offering it', 'কুরবানি করলে ঈদের সালাতের পরে করুন', 'Sahih al-Bukhari 968'],
    ['Share food and remember those in need', 'খাবার ভাগ করুন এবং প্রয়োজনমতো মানুষদের স্মরণ করুন', 'Surah Al-Hajj, 22:36–37'],
    ['Share greetings with kindness', 'সদয়ভাবে শুভেচ্ছা ভাগ করুন', ''],
    ['Reflect on sincerity and gratitude', 'আন্তরিকতা ও কৃতজ্ঞতা নিয়ে ভাবুন', '']
  ]
};

const duaData = [
  { id: 'acceptance', category: {en:'Acceptance',bn:'কবুল'}, title:{en:'A Dua for Acceptance',bn:'কবুল হওয়ার দোয়া'}, arabic:'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ', transliteration:'Rabbana taqabbal minna, innaka Antas-Sami‘ul-‘Alim.', meaning:{en:'Our Lord, accept this from us. You are indeed the All-Hearing, All-Knowing.',bn:'হে আমাদের প্রতিপালক, আমাদের পক্ষ থেকে এটি কবুল করুন। নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞ।'}, reference:'Surah Al-Baqarah, 2:127' },
  { id: 'goodness', category: {en:'Goodness',bn:'কল্যাণ'}, title:{en:'A Dua for Goodness in Both Worlds',bn:'উভয় জগতের কল্যাণের দোয়া'}, arabic:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', transliteration:'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ‘adhaban-nar.', meaning:{en:'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',bn:'হে আমাদের প্রতিপালক, আমাদের দুনিয়াতে কল্যাণ দিন, আখিরাতেও কল্যাণ দিন এবং আমাদের আগুনের শাস্তি থেকে রক্ষা করুন।'}, reference:'Surah Al-Baqarah, 2:201' },
  { id: 'gratitude', category: {en:'Gratitude',bn:'কৃতজ্ঞতা'}, title:{en:'A Dua for Gratitude and Good Deeds',bn:'কৃতজ্ঞতা ও সৎকর্মের দোয়া'}, arabic:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ', transliteration:'Rabbi awzi‘ni an ashkura ni‘matakal-lati an‘amta ‘alayya wa ‘ala walidayya wa an a‘mala salihan tardah.', meaning:{en:'My Lord, inspire me to be grateful for Your favour upon me and my parents, and to do righteous deeds that please You.',bn:'হে আমার প্রতিপালক, আমার ও আমার পিতা-মাতার প্রতি আপনার অনুগ্রহের জন্য কৃতজ্ঞ হতে এবং আপনার সন্তুষ্টির কাজ করতে আমাকে সাহায্য করুন।'}, reference:'Surah An-Naml, 27:19' },
  { id: 'guidance', category: {en:'Guidance',bn:'হিদায়াত'}, title:{en:'A Dua for Continued Guidance',bn:'হিদায়াত অটুট রাখার দোয়া'}, arabic:'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ', transliteration:'Rabbana la tuzigh qulubana ba‘da idh hadaytana wa hab lana min ladunka rahmah, innaka Antal-Wahhab.', meaning:{en:'Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself. You are truly the Bestower.',bn:'হে আমাদের প্রতিপালক, হিদায়াত দেওয়ার পর আমাদের অন্তরকে বিপথগামী করবেন না এবং আপনার পক্ষ থেকে রহমত দান করুন।'}, reference:'Surah Ali ‘Imran, 3:8' },
  { id: 'family', category: {en:'Family',bn:'পরিবার'}, title:{en:'A Dua for Family and Prayer',bn:'পরিবার ও সালাতের দোয়া'}, arabic:'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ', transliteration:'Rabbij‘alni muqimas-salati wa min dhurriyyati, Rabbana wa taqabbal du‘a.', meaning:{en:'My Lord, make me and those from my descendants devoted to prayer. Our Lord, accept my supplication.',bn:'হে আমার প্রতিপালক, আমাকে ও আমার বংশধরদের সালাত প্রতিষ্ঠাকারী বানান। হে আমাদের প্রতিপালক, আমার দোয়া কবুল করুন।'}, reference:'Surah Ibrahim, 14:40' },
  { id: 'forgiveness', category: {en:'Forgiveness',bn:'ক্ষমা'}, title:{en:'A Dua for Forgiveness',bn:'ক্ষমার দোয়া'}, arabic:'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي', transliteration:'Allahumma innaka ‘afuwwun tuhibbul-‘afwa fa‘fu ‘anni.', meaning:{en:'O Allah, You are Forgiving and love forgiveness, so forgive me.',bn:'হে আল্লাহ, নিশ্চয়ই আপনি ক্ষমাশীল, ক্ষমা করতে ভালোবাসেন; তাই আমাকে ক্ষমা করুন।'}, reference:'Sunan Ibn Majah 3850; Jami‘ at-Tirmidhi 3513', note:{en:'Taught regarding Laylat al-Qadr; displayed here as a general dua for forgiveness, not as an Eid-specific dua.',bn:'লাইলাতুল কদর প্রসঙ্গে শেখানো হয়েছে; এখানে এটি ক্ষমার সাধারণ দোয়া হিসেবে দেখানো হয়েছে, ঈদ-নির্দিষ্ট দোয়া হিসেবে নয়।'} }
];

const sourceData = {
  sharedQuran: [
    ['Surah Al-Baqarah, 2:127 — Dua for acceptance', 'সূরা আল-বাকারা, ২:১২৭ — কবুল হওয়ার দোয়া', 'https://quran.com/2/127'],
    ['Surah Al-Baqarah, 2:201 — Dua for goodness in both worlds', 'সূরা আল-বাকারা, ২:২০১ — উভয় জগতের কল্যাণের দোয়া', 'https://quran.com/2/201'],
    ['Surah Ali ‘Imran, 3:8 — Dua for guidance', 'সূরা আলে ইমরান, ৩:৮ — হিদায়াতের দোয়া', 'https://quran.com/3/8'],
    ['Surah Ibrahim, 14:40 — Dua for prayer and family', 'সূরা ইবরাহিম, ১৪:৪০ — সালাত ও পরিবারের দোয়া', 'https://quran.com/14/40'],
    ['Surah An-Naml, 27:19 — Gratitude and righteous deeds', 'সূরা আন-নামল, ২৭:১৯ — কৃতজ্ঞতা ও সৎকর্ম', 'https://quran.com/27/19']
  ],
  sharedHadith: [
    ['Sahih al-Bukhari 986 — Returning by a different route on Eid', 'সহিহ আল-বুখারি ৯৮৬ — ঈদে ভিন্ন পথে ফিরে আসা', 'https://sunnah.com/bukhari:986'],
    ['Sahih Muslim 1137–1138 — Not fasting on Eid days', 'সহিহ মুসলিম ১১৩৭–১১৩৮ — ঈদের দিন রোজা না রাখা', 'https://sunnah.com/muslim:1138'],
    ['Sunan Ibn Majah 3850 / Jami‘ at-Tirmidhi 3513 — Dua for forgiveness regarding Laylat al-Qadr', 'সুনান ইবন মাজাহ ৩৮৫০ / জামে আত-তিরমিজি ৩৫১৩ — লাইলাতুল কদর প্রসঙ্গে ক্ষমার দোয়া', 'https://sunnah.com/ibnmajah:3850']
  ],
  fitr: {
    quran: [['Surah Al-Baqarah, 2:183–185 — Fasting, Ramadan and gratitude', 'সূরা আল-বাকারা, ২:১৮৩–১৮৫ — রোজা, রমাদান ও কৃতজ্ঞতা', 'https://quran.com/2/183-185']],
    hadith: [
      ['Sahih al-Bukhari 953 — Eating an odd number of dates before Eid al-Fitr prayer', 'সহিহ আল-বুখারি ৯৫৩ — ঈদুল ফিতরের সালাতের আগে বিজোড় সংখ্যক খেজুর খাওয়া', 'https://sunnah.com/bukhari:953'],
      ['Sahih al-Bukhari 1509 — Giving Zakat al-Fitr before the Eid prayer', 'সহিহ আল-বুখারি ১৫০৯ — ঈদের সালাতের আগে যাকাতুল ফিতর দেওয়া', 'https://sunnah.com/bukhari:1509']
    ]
  },
  adha: {
    quran: [
      ['Surah Al-Hajj, 22:34–37 — Sacrifice, sharing and taqwa', 'সূরা আল-হাজ্জ, ২২:৩৪–৩৭ — কুরবানি, ভাগাভাগি ও তাকওয়া', 'https://quran.com/22/34-37'],
      ['Surah As-Saffat, 37:102–107 — Ibrahim’s test and Allah’s mercy', 'সূরা আস-সাফফাত, ৩৭:১০২–১০৭ — ইবরাহিমের পরীক্ষা ও আল্লাহর রহমত', 'https://quran.com/37/102-107']
    ],
    hadith: [['Sahih al-Bukhari 968 — Offering sacrifice after Eid prayer', 'সহিহ আল-বুখারি ৯৬৮ — ঈদের সালাতের পরে কুরবানি করা', 'https://sunnah.com/bukhari:968']]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const text = (key) => uiText[state.language][key] || uiText.en[key] || key;
const localized = (value) => value?.[state.language] || value?.en || value || '';

function initApp() {
  document.documentElement.dataset.theme = state.theme;
  document.body.classList.toggle('lang-bn', state.language === 'bn');
  createStars();
  bindStaticEvents();
  applyTranslations();
  updateThemeButton();
  if (state.selectedEid && eidData[state.selectedEid]) {
    loadJourney(state.selectedEid, false);
  } else {
    showEntry();
  }
}

function createStars() {
  const starContainer = $('#stars');
  starContainer.innerHTML = '';
  for (let i = 0; i < 42; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 82}%`;
    star.style.setProperty('--star-size', `${Math.random() * 2.7 + 1.4}px`);
    star.style.setProperty('--star-opacity', `${Math.random() * 0.48 + 0.32}`);
    star.style.setProperty('--star-duration', `${Math.random() * 4 + 3.3}s`);
    star.style.animationDelay = `${Math.random() * -6}s`;
    starContainer.appendChild(star);
  }
}

function bindStaticEvents() {
  $$('.begin-btn').forEach((button) => button.addEventListener('click', () => selectEid(button.dataset.eid, button)));
  $('#language-toggle').addEventListener('click', toggleLanguage);
  $('#theme-toggle').addEventListener('click', toggleTheme);
  $('#menu-toggle').addEventListener('click', toggleMenu);
  $$('.nav-links a').forEach((link) => link.addEventListener('click', () => $('#nav-links').classList.remove('open')));
  $('#spin-btn').addEventListener('click', spinDuaWheel);
  $('#reset-checklist').addEventListener('click', resetChecklist);
  $('#greeting-form').addEventListener('submit', (event) => { event.preventDefault(); state.messageVariant += 1; generateGreeting(); });
  $('#greeting-form').addEventListener('input', generateGreeting);
  $('#greeting-form').addEventListener('change', generateGreeting);
  $('#regenerate').addEventListener('click', () => { state.messageVariant += 1; generateGreeting(); });
  $('#copy-greeting').addEventListener('click', copyGreeting);
  $('#download-greeting').addEventListener('click', downloadGreetingCard);
  $('#restart-journey').addEventListener('click', () => openRestartModal(true));
  $('#stay-journey').addEventListener('click', () => openRestartModal(false));
  $('#choose-again').addEventListener('click', restartJourney);
  $('#restart-modal').addEventListener('click', (event) => { if (event.target.id === 'restart-modal') openRestartModal(false); });
  document.addEventListener('keydown', handleStoryKeyboard);
  enableStorySwipeNavigation();
  $('#scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', updateScrolledUI, { passive: true });
  document.addEventListener('click', handleDocumentActions);
}

function showEntry() {
  $('#creator-badge').classList.remove('is-visible');
  $('#entry-screen').hidden = false;
  $('#entry-screen').classList.remove('is-leaving');
  $('#journey-app').hidden = true;
  document.body.classList.remove('journey-fitr', 'journey-adha');
}

function selectEid(eid, button) {
  if (!eidData[eid]) return;
  const selectedCard = button.closest('.eid-choice');
  $$('.eid-choice').forEach((card) => card.classList.toggle('faded', card !== selectedCard));
  selectedCard.classList.add('selected');
  state.selectedEid = eid;
  localStorage.setItem('selectedEid', eid);
  $('#entry-screen').classList.add('is-leaving');
  window.setTimeout(() => loadJourney(eid, true), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 10 : 510);
}

function loadJourney(eid, scrollTop = true) {
  state.selectedEid = eid;
  state.currentStoryPage = 0;
  state.bookOpened = false;
  $('#entry-screen').hidden = true;
  $('#journey-app').hidden = false;
  document.body.classList.remove('journey-fitr', 'journey-adha');
  document.body.classList.add(`journey-${eid}`);
  renderJourney(true);
  renderChecklist();
  renderSources();
  renderSavedDuas();
  updateJourneyLabels();
  generateGreeting();
  observeReveals();
  observeChapters();
  window.setTimeout(() => $('#creator-badge').classList.add('is-visible'), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 900);
  if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyTranslations() {
  $$('[data-i18n]').forEach((element) => { element.textContent = text(element.dataset.i18n); });
  $$('[data-placeholder]').forEach((element) => { element.placeholder = text(element.dataset.placeholder); });
  $('#language-toggle').textContent = state.language === 'en' ? 'বাংলা' : 'EN';
  document.documentElement.lang = state.language === 'bn' ? 'bn' : 'en';
  document.body.classList.toggle('lang-bn', state.language === 'bn');
  updateToggleText();
  if (state.selectedEid) {
    renderJourney(false);
    renderChecklist();
    renderSources();
    updateJourneyLabels();
    renderSavedDuas();
    if (state.selectedDua) displaySelectedDua(state.selectedDua);
    generateGreeting();
    observeReveals();
    observeChapters();
  }
}

function toggleLanguage() {
  state.language = state.language === 'en' ? 'bn' : 'en';
  localStorage.setItem('language', state.language);
  applyTranslations();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', state.theme);
  document.documentElement.dataset.theme = state.theme;
  updateThemeButton();
}

function updateThemeButton() {
  const label = state.theme === 'dark' ? (state.language === 'bn' ? 'হালকা থিম চালু করুন' : 'Switch to light theme') : (state.language === 'bn' ? 'গাঢ় থিম চালু করুন' : 'Switch to dark theme');
  $('#theme-toggle').setAttribute('aria-label', label);
}

function toggleMenu() {
  const links = $('#nav-links');
  const open = links.classList.toggle('open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
}

function updateJourneyLabels() {
  const data = eidData[state.selectedEid];
  $('#journey-kicker').textContent = localized(data.label);
  $('#journey-title').textContent = localized(data.title);
  $('#journey-intro').textContent = localized(data.intro);
  $('#remembrance-copy').textContent = localized(data.remembrance);
  $('#acceptance-meaning').textContent = duaData[0].meaning[state.language];
  $('#checklist-title').textContent = localized(data.checklistTitle);
  $('#greeting-title').textContent = localized(data.greetingTitle);
  $('#preview-eid-title').textContent = localized(data.previewTitle);
  $('#footer-message').textContent = localized(data.footer);
  $('#creator-badge-text').textContent = text('madeBy');
  $('#creator-badge-more').textContent = text('followWork');
  $('#creator-badge').setAttribute('aria-label', text('madeBy'));
  $('#author-label').textContent = text('designedBy');
  $('#author-name').textContent = state.language === 'bn' ? 'কানিজ ফাতেমা' : 'Kaniz Fatema';
  $('#author-credit').textContent = text('madeBy');
  $('#author-copy').textContent = text('authorCopy');
  $('#linkedin-label').textContent = text('linkedIn');
  $('#github-label').textContent = text('github');
  $('#copyright').textContent = text('copyright');
  $('#message-language').value = state.language === 'bn' ? 'bn' : 'en';
  updateThemeButton();
}

function renderJourney(playCover = false) {
  if (playCover && !state.bookOpened) {
    renderStoryCover();
    return;
  }
  renderStoryPage(state.currentStoryPage);
}

function renderStoryCover() {
  const data = eidData[state.selectedEid];
  const book = $('#storybook');
  const coverClass = state.selectedEid === 'fitr' ? 'cover-fitr' : 'cover-adha';
  book.innerHTML = `<article class="book-cover ${coverClass} opening" aria-label="${localized(data.title)}">
    <div class="cover-pattern" aria-hidden="true"></div>
    <div class="cover-illustration" aria-hidden="true">${getStorySceneMarkup(state.selectedEid, 5, true)}</div>
    <p class="cover-label">${state.language === 'bn' ? 'একটি পপ-আপ গল্পের বই' : 'An Interactive Pop-up Storybook'}</p>
    <h2>${localized(data.title)}</h2>
    <p>${localized(data.intro)}</p>
    <span class="cover-author">${text('madeBy')}</span>
  </article>`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    state.bookOpened = true;
    renderStoryPage(0, 'open');
  }, reduced ? 80 : 1250);
}

function renderStoryPage(index, arrival = '') {
  const chapters = eidData[state.selectedEid].chapters;
  state.currentStoryPage = Math.max(0, Math.min(index, chapters.length - 1));
  const chapter = chapters[state.currentStoryPage];
  const verse = chapter.arabic ? `<div class="verse-card book-verse"><p class="arabic" lang="ar" dir="rtl">${chapter.arabic}</p><p class="meaning">${localized(chapter.meaning)}</p><p class="reference">${chapter.reference}</p></div>` : (chapter.reference ? `<div class="source-mini book-reference"><p class="reference">${chapter.reference}</p></div>` : '');
  const bullets = chapter.bullets ? `<div class="book-mini-cards">${chapter.bullets.map((item) => `<article><strong>${localized(item)}</strong><small>${item.source}</small></article>`).join('')}</div>` : '';
  const reflection = chapter.reflection ? `<span class="reflection-badge">${localized(chapter.reflection)}</span>` : '';
  const last = state.currentStoryPage === chapters.length - 1;
  const signature = last ? `<div class="book-signature"><span></span>${state.language === 'bn' ? 'এই যাত্রাটি তৈরি করেছেন কানিজ ফাতেমা' : (state.selectedEid === 'fitr' ? 'Journey lovingly created by Kaniz Fatema' : 'Journey thoughtfully created by Kaniz Fatema')}</div>` : '';
  const counter = state.language === 'bn' ? `পৃষ্ঠা ${state.currentStoryPage + 1} / ${chapters.length}` : `Page ${state.currentStoryPage + 1} of ${chapters.length}`;
  const prevText = state.language === 'bn' ? 'আগের পৃষ্ঠা' : 'Previous Page';
  const nextText = state.language === 'bn' ? 'পরের পৃষ্ঠা' : 'Next Page';
  const continueText = state.language === 'bn' ? 'তাকবীর ও দোয়ায় এগিয়ে যান' : 'Continue to Takbir and Duas';
  $('#storybook').innerHTML = `<article class="book-shell ${arrival ? `arrive-${arrival}` : ''}" data-page="${state.currentStoryPage + 1}">
      <div class="book-spine" aria-hidden="true"></div>
      <div class="book-page page-left">
        <p class="chapter-label">${counter}</p>
        <h3>${localized(chapter.title)}</h3>
        <p class="story-copy">${localized(chapter.body)}</p>
        ${verse}${bullets}${reflection}${signature}
      </div>
      <div class="book-page page-right">
        ${getStorySceneMarkup(state.selectedEid, state.currentStoryPage, false)}
        <p class="scene-caption">${localized(chapter.title)}</p>
      </div>
      <div class="story-controls">
        <button class="btn btn-secondary" data-action="story-prev" ${state.currentStoryPage === 0 ? 'disabled' : ''}>${prevText}</button>
        <div class="page-dots" aria-label="${counter}">${chapters.map((_, dot) => `<button class="page-dot ${dot === state.currentStoryPage ? 'active' : ''}" data-action="story-dot" data-index="${dot}" aria-label="${state.language === 'bn' ? `পৃষ্ঠা ${dot + 1}` : `Page ${dot + 1}`}" ${dot === state.currentStoryPage ? 'aria-current="page"' : ''}></button>`).join('')}</div>
        ${last ? `<a href="#takbir-dua" class="btn btn-primary">${continueText}</a>` : `<button class="btn btn-primary" data-action="story-next">${nextText}</button>`}
      </div>
    </article>`;
  $('#announcement').textContent = `${counter}: ${localized(chapter.title)}`;
  if (last) createSparkles($('#storybook'));
}

function getStorySceneMarkup(eid, index, cover = false) {
  const common = `<div class="paper-fold"></div><span class="pop-star star-a"></span><span class="pop-star star-b"></span><span class="pop-star star-c"></span>`;
  const fitr = [
    `<span class="pop-moon"></span><span class="pop-lantern l-one"></span><span class="pop-lantern l-two"></span><span class="home-glow"></span>`,
    `<span class="pop-moon small"></span><span class="pop-calendar"><b>1</b><small>EID</small></span><span class="pop-lantern l-one"></span>`,
    `<span class="pop-mosque"></span><span class="pop-path"></span><span class="pop-dates"></span>`,
    `<span class="pop-basket"></span><span class="pop-gift"></span><span class="pop-heart h-one"></span><span class="pop-heart h-two"></span>`,
    `<span class="pop-mosque"></span><span class="pop-path double"></span><span class="pop-dates"></span><span class="pop-lantern l-two"></span>`,
    `<span class="pop-moon"></span><span class="pop-mosque grand"></span><span class="pop-lantern l-one"></span><span class="pop-lantern l-two"></span><span class="story-ribbon">Eid al-Fitr Mubarak</span>`
  ];
  const adha = [
    `<span class="desert-horizon"></span><span class="gold-path"></span><span class="guiding-star"></span>`,
    `<span class="desert-horizon"></span><span class="mercy-rays"></span><span class="guiding-star"></span>`,
    `<span class="pop-basket"></span><span class="pop-gift"></span><span class="pop-heart h-one"></span><span class="pop-heart h-two"></span>`,
    `<span class="pop-kabah"></span><span class="gold-path"></span><span class="world-ring"></span>`,
    `<span class="pop-mosque"></span><span class="gold-path"></span><span class="pop-gift"></span>`,
    `<span class="pop-kabah grand"></span><span class="gold-path"></span><span class="guiding-star"></span><span class="story-ribbon">Eid al-Adha Mubarak</span>`
  ];
  const art = (eid === 'fitr' ? fitr : adha)[cover ? 5 : index];
  return `<div class="popup-scene ${eid}-popup page-${index + 1}${cover ? ' cover-scene' : ''}" aria-hidden="true">${common}${art}</div>`;
}

function changeStoryPage(nextIndex, direction = 'next') {
  const total = eidData[state.selectedEid].chapters.length;
  if (state.storyBusy || nextIndex < 0 || nextIndex >= total || nextIndex === state.currentStoryPage) return;
  const shell = $('#storybook .book-shell');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  state.storyBusy = true;
  shell?.classList.add(direction === 'prev' ? 'turn-prev' : 'turn-next');
  window.setTimeout(() => {
    renderStoryPage(nextIndex, direction);
    state.storyBusy = false;
  }, reduced ? 10 : 370);
}

function handleStoryKeyboard(event) {
  if (event.key === 'Escape') { openRestartModal(false); return; }
  if (!state.selectedEid || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
  const rect = $('#story')?.getBoundingClientRect();
  const storyIsVisible = rect && rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
  if (!storyIsVisible) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); changeStoryPage(state.currentStoryPage + 1, 'next'); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); changeStoryPage(state.currentStoryPage - 1, 'prev'); }
}

function enableStorySwipeNavigation() {
  const book = $('#storybook');
  let startX = 0; let startY = 0;
  book.addEventListener('touchstart', (event) => { const touch = event.changedTouches[0]; startX = touch.clientX; startY = touch.clientY; }, { passive: true });
  book.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX; const dy = touch.clientY - startY;
    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    if (dx < 0) changeStoryPage(state.currentStoryPage + 1, 'next');
    if (dx > 0) changeStoryPage(state.currentStoryPage - 1, 'prev');
  }, { passive: true });
}

function renderChecklist() {
  const items = checklistData[state.selectedEid];
  const saved = JSON.parse(localStorage.getItem(`checklist_${state.selectedEid}`) || '{}');
  $('#checklist-items').innerHTML = items.map(([en, bn, source], index) => `
    <label class="check-item">
      <input type="checkbox" data-index="${index}" ${saved[index] ? 'checked' : ''}>
      <span class="checkmark" aria-hidden="true"></span>
      <span class="check-copy">${state.language === 'bn' ? bn : en}${source ? `<small class="check-source">${source}</small>` : ''}</span>
    </label>`).join('');
  $$('#checklist-items input').forEach((input) => input.addEventListener('change', saveChecklist));
  updateChecklistProgress();
}

function saveChecklist() {
  const saved = {};
  $$('#checklist-items input').forEach((input) => { saved[input.dataset.index] = input.checked; });
  localStorage.setItem(`checklist_${state.selectedEid}`, JSON.stringify(saved));
  updateChecklistProgress();
}

function updateChecklistProgress() {
  const checks = $$('#checklist-items input');
  const done = checks.filter((item) => item.checked).length;
  const percentage = checks.length ? Math.round((done / checks.length) * 100) : 0;
  $('#progress-percent').textContent = `${percentage}%`;
  $('#progress-ring').style.setProperty('--progress', `${percentage * 3.6}deg`);
  $('#checklist-count').textContent = text('completedCount').replace('{done}', done).replace('{total}', checks.length);
  $('#checklist-complete').hidden = done !== checks.length;
  if (done === checks.length && checks.length) $('#announcement').textContent = text('completeMessage');
}

function resetChecklist() {
  localStorage.removeItem(`checklist_${state.selectedEid}`);
  renderChecklist();
  showToast(text('resetDone'));
}

function spinDuaWheel() {
  if (state.isWheelSpinning) return;
  state.isWheelSpinning = true;
  const resultIndex = Math.floor(Math.random() * duaData.length);
  const desiredModulo = (360 - (resultIndex * 60 + 30)) % 360;
  const currentModulo = ((state.wheelRotation % 360) + 360) % 360;
  const delta = (desiredModulo - currentModulo + 360) % 360;
  state.wheelRotation += 1800 + delta;
  $('#wheel').style.transform = `rotate(${state.wheelRotation}deg)`;
  $('#spin-btn').disabled = true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    state.selectedDua = duaData[resultIndex];
    displaySelectedDua(state.selectedDua);
    state.isWheelSpinning = false;
    $('#spin-btn').disabled = false;
    $('#spin-btn').textContent = text('readAnother');
    $('#announcement').textContent = `${text('selectResult')}${localized(state.selectedDua.title)}`;
    createSparkles($('#dua-result'));
  }, reduced ? 80 : 4300);
}

function displaySelectedDua(dua) {
  const savedReflection = localStorage.getItem(`reflection_${dua.id}`) || '';
  $('#dua-result').classList.remove('empty-state');
  $('#dua-result').innerHTML = `
    <span class="category-badge">${localized(dua.category)}</span>
    <h3>${localized(dua.title)}</h3>
    <p class="arabic" lang="ar" dir="rtl">${dua.arabic}</p>
    <p class="transliteration">${dua.transliteration}</p>
    <p class="meaning">${dua.meaning[state.language]}</p>
    <p class="reference">${dua.reference}</p>
    ${dua.note ? `<p class="reference">${localized(dua.note)}</p>` : ''}
    <div class="result-actions">
      <button class="btn btn-secondary" data-action="copy-selected-dua">${text('copyDua')}</button>
      <button class="btn btn-secondary" data-action="save-selected-dua">${text('saveDua')}</button>
      <button class="btn btn-ghost" data-action="spin-again">${text('readAnother')}</button>
    </div>
    <div class="reflection-box">
      <label for="reflection-text">${text('reflectionQuestion')}</label>
      <textarea id="reflection-text" placeholder="${text('reflectionPlaceholder')}">${escapeHTML(savedReflection)}</textarea>
      <div class="reflection-actions">
        <button class="btn btn-secondary" data-action="save-reflection">${text('saveReflection')}</button>
        <button class="btn btn-ghost" data-action="clear-reflection">${text('clearReflection')}</button>
      </div>
    </div>`;
}

function renderSavedDuas() {
  const ids = JSON.parse(localStorage.getItem('savedDuas') || '[]');
  const panel = $('#saved-duas');
  if (!ids.length) {
    panel.innerHTML = `<p>${text('noSavedDuas')}</p>`;
    return;
  }
  panel.innerHTML = ids.map((id) => {
    const dua = duaData.find((item) => item.id === id);
    return dua ? `<div class="saved-item"><button data-action="open-favorite" data-id="${id}">${localized(dua.title)}</button><button aria-label="${text('remove')}" data-action="remove-favorite" data-id="${id}">×</button></div>` : '';
  }).join('');
}

function saveFavoriteDua() {
  if (!state.selectedDua) return;
  const ids = JSON.parse(localStorage.getItem('savedDuas') || '[]');
  if (!ids.includes(state.selectedDua.id)) ids.push(state.selectedDua.id);
  localStorage.setItem('savedDuas', JSON.stringify(ids));
  renderSavedDuas();
  showToast(text('savedFavorite'));
}

function removeFavoriteDua(id) {
  const ids = JSON.parse(localStorage.getItem('savedDuas') || '[]').filter((item) => item !== id);
  localStorage.setItem('savedDuas', JSON.stringify(ids));
  renderSavedDuas();
  showToast(text('removedFavorite'));
}

function handleDocumentActions(event) {
  const toggle = event.target.closest('.content-toggle');
  if (toggle) {
    const content = $(`#${toggle.dataset.target}`);
    content.hidden = !content.hidden;
    updateToggleText();
    return;
  }
  const copy = event.target.closest('.copy-btn');
  if (copy) { copyStaticContent(copy.dataset.copy); return; }
  const action = event.target.closest('[data-action]');
  if (!action) return;
  if (action.dataset.action === 'story-prev') { changeStoryPage(state.currentStoryPage - 1, 'prev'); return; }
  if (action.dataset.action === 'story-next') { changeStoryPage(state.currentStoryPage + 1, 'next'); return; }
  if (action.dataset.action === 'story-dot') { const targetPage = Number(action.dataset.index); changeStoryPage(targetPage, targetPage < state.currentStoryPage ? 'prev' : 'next'); return; }
  if (action.dataset.action === 'copy-selected-dua') copySelectedDua();
  if (action.dataset.action === 'save-selected-dua') saveFavoriteDua();
  if (action.dataset.action === 'spin-again') spinDuaWheel();
  if (action.dataset.action === 'save-reflection') saveReflection();
  if (action.dataset.action === 'clear-reflection') clearReflection();
  if (action.dataset.action === 'open-favorite') {
    state.selectedDua = duaData.find((dua) => dua.id === action.dataset.id);
    displaySelectedDua(state.selectedDua);
  }
  if (action.dataset.action === 'remove-favorite') removeFavoriteDua(action.dataset.id);
}

function updateToggleText() {
  $$('.content-toggle').forEach((button) => {
    const hidden = $(`#${button.dataset.target}`).hidden;
    if (button.dataset.target.includes('transliteration')) button.textContent = hidden ? text('showTransliteration') : text('hideTransliteration');
    if (button.dataset.target.includes('meaning')) button.textContent = hidden ? text('showMeaning') : text('hideMeaning');
  });
}

function copyStaticContent(key) {
  const contents = {
    takbir: 'اللهُ أَكْبَرُ، اللهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ، اللهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
    'acceptance-ar': duaData[0].arabic,
    'acceptance-trans': duaData[0].transliteration,
    'acceptance-meaning': duaData[0].meaning[state.language]
  };
  copyToClipboard(contents[key], text('copied'));
}

function copySelectedDua() {
  const dua = state.selectedDua;
  if (!dua) return;
  const output = `${dua.arabic}\n${dua.transliteration}\n${dua.meaning[state.language]}\n${dua.reference}`;
  copyToClipboard(output, text('duaCopied'));
}

async function copyToClipboard(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch (error) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    showToast(successMessage);
  }
}

function saveReflection() {
  if (!state.selectedDua) return;
  localStorage.setItem(`reflection_${state.selectedDua.id}`, $('#reflection-text').value.trim());
  showToast(text('savedPrivately'));
}
function clearReflection() {
  if (!state.selectedDua) return;
  localStorage.removeItem(`reflection_${state.selectedDua.id}`);
  $('#reflection-text').value = '';
  showToast(text('savedPrivately'));
}

function generateGreeting() {
  if (!state.selectedEid) return;
  const name = $('#recipient').value.trim() || (state.language === 'bn' ? 'প্রিয়জন' : 'Dear one');
  const sender = $('#sender').value.trim();
  const tone = $('#tone').value;
  const messageLanguage = $('#message-language').value;
  const options = {
    dua: $('#include-dua').checked,
    traditional: $('#include-traditional').checked,
    emoji: $('#include-emoji').checked
  };
  const build = (lang) => buildGreetingMessage(lang, name, sender, tone, options);
  const output = messageLanguage === 'both' ? `${build('en')}\n\n${build('bn')}` : build(messageLanguage);
  $('#generated-message').textContent = output;
}

function buildGreetingMessage(language, recipient, sender, tone, options) {
  const isFitr = state.selectedEid === 'fitr';
  const safeRecipient = recipient || (language === 'bn' ? 'প্রিয়জন' : 'Dear one');
  const signatures = sender ? (language === 'bn' ? ` — ${sender}` : ` — ${sender}`) : '';
  const emoji = options.emoji ? ' ✦🌙' : '';
  const variants = {
    en: {
      fitr: {
        simple: `Eid Mubarak, ${safeRecipient}! May Allah accept your worship and fill your day with peace and happiness.`,
        heartfelt: `Eid Mubarak, ${safeRecipient}! May the blessings of Ramadan remain in your heart, and may Allah fill your home with peace, gratitude and joy.`,
        formal: `Eid al-Fitr Mubarak, ${safeRecipient}. May Allah accept your fasting and good deeds and grant you and your family peace and blessings.`,
        family: `Eid Mubarak, ${safeRecipient}! May our family celebrate with grateful hearts, kindness and the beautiful memories of Ramadan.`,
        friend: `Eid Mubarak, ${safeRecipient}! Wishing you a joyful Eid filled with peace, smiles and blessings after Ramadan.`
      },
      adha: {
        simple: `Eid Mubarak, ${safeRecipient}! May Allah accept your good deeds and bless your Eid with peace and generosity.`,
        heartfelt: `Eid Mubarak, ${safeRecipient}! May this blessed Eid inspire sincerity, faith and compassion, and bring peace to your family.`,
        formal: `Eid al-Adha Mubarak, ${safeRecipient}. May Allah accept your good deeds and bless this occasion with sincerity and generosity.`,
        family: `Eid Mubarak, ${safeRecipient}! May our family celebrate with love, sharing and gratitude, remembering the meaning of sincere devotion.`,
        friend: `Eid Mubarak, ${safeRecipient}! Wishing you a beautiful Eid filled with kindness, sharing, good memories and blessings.`
      },
      dua: ' May Allah accept from us and from you.', traditional: ' Taqabbal Allahu minna wa minkum.'
    },
    bn: {
      fitr: {
        simple: `ঈদ মোবারক, ${safeRecipient}! আল্লাহ আপনার ইবাদত কবুল করুন এবং আপনার দিন শান্তি ও আনন্দে পূর্ণ করুন।`,
        heartfelt: `ঈদ মোবারক, ${safeRecipient}! রমাদানের বরকত আপনার হৃদয়ে অটুট থাকুক এবং আল্লাহ আপনার ঘরকে শান্তি, কৃতজ্ঞতা ও আনন্দে ভরে দিন।`,
        formal: `ঈদুল ফিতর মোবারক, ${safeRecipient}। আল্লাহ আপনার রোজা ও নেক আমল কবুল করুন এবং আপনার পরিবারকে শান্তি ও বরকত দান করুন।`,
        family: `ঈদ মোবারক, ${safeRecipient}! আমাদের পরিবার কৃতজ্ঞ হৃদয়, ভালোবাসা ও রমাদানের সুন্দর শিক্ষা নিয়ে ঈদ উদযাপন করুক।`,
        friend: `ঈদ মোবারক, ${safeRecipient}! রমাদানের পর আপনার ঈদ হোক আনন্দ, শান্তি ও বরকতে ভরা।`
      },
      adha: {
        simple: `ঈদ মোবারক, ${safeRecipient}! আল্লাহ আপনার নেক আমল কবুল করুন এবং আপনার ঈদ শান্তি ও উদারতায় ভরে দিন।`,
        heartfelt: `ঈদ মোবারক, ${safeRecipient}! এই বরকতময় ঈদ আপনার জীবনে আন্তরিকতা, বিশ্বাস ও সহমর্মিতার আলো ছড়িয়ে দিক।`,
        formal: `ঈদুল আজহা মোবারক, ${safeRecipient}। আল্লাহ আপনার নেক আমল কবুল করুন এবং এই উপলক্ষকে আন্তরিকতা ও উদারতায় বরকতময় করুন।`,
        family: `ঈদ মোবারক, ${safeRecipient}! আমাদের পরিবার ভালোবাসা, ভাগাভাগি ও কৃতজ্ঞতার সঙ্গে ঈদ উদযাপন করুক।`,
        friend: `ঈদ মোবারক, ${safeRecipient}! আপনার ঈদ হোক আনন্দ, দয়া, ভাগাভাগি ও বরকতে ভরা।`
      },
      dua: ' আল্লাহ আমাদের ও আপনাদের নেক আমল কবুল করুন।', traditional: ' তাকাব্বালাল্লাহু মিন্না ওয়া মিনকুম।'
    }
  };
  const key = isFitr ? 'fitr' : 'adha';
  let message = variants[language][key][tone] || variants[language][key].simple;
  if (options.dua) message += variants[language].dua;
  if (options.traditional) message += variants[language].traditional;
  return `${message}${emoji}${signatures}`;
}

function copyGreeting() {
  const message = $('#generated-message').textContent.trim();
  if (message) copyToClipboard(message, text('greetingCopied'));
}

async function downloadGreetingCard() {
  const canvas = $('#greeting-canvas');
  const context = canvas.getContext('2d');
  const message = $('#generated-message').textContent.trim();
  if (!message) return;
  if (document.fonts?.ready) await document.fonts.ready;
  const fitr = state.selectedEid === 'fitr';
  const dark = state.theme === 'dark';
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (fitr) {
    gradient.addColorStop(0, dark ? '#071a26' : '#fffaf2');
    gradient.addColorStop(1, dark ? '#11483f' : '#dbece4');
  } else {
    gradient.addColorStop(0, dark ? '#071a26' : '#fffaf2');
    gradient.addColorStop(1, dark ? '#46341d' : '#efe0c7');
  }
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#d4af37'; context.lineWidth = 4; context.strokeRect(54, 54, canvas.width - 108, canvas.height - 108);
  context.strokeStyle = 'rgba(212,175,55,.42)'; context.lineWidth = 2; context.strokeRect(72, 72, canvas.width - 144, canvas.height - 144);
  drawCardDecoration(context, fitr);
  context.textAlign = 'center';
  context.fillStyle = dark ? '#f0d98a' : '#946a16';
  context.font = '600 30px Poppins';
  context.fillText(localized(eidData[state.selectedEid].previewTitle).toUpperCase(), canvas.width / 2, 235);
  context.fillStyle = dark ? '#fff7e5' : '#102e33';
  context.font = state.language === 'bn' ? '700 70px "Hind Siliguri"' : '600 78px "Cormorant Garamond"';
  context.fillText(state.language === 'bn' ? 'ঈদ মোবারক' : 'Eid Mubarak', canvas.width / 2, 335);
  context.font = $('#message-language').value === 'bn' ? '500 31px "Hind Siliguri"' : '400 30px Poppins';
  wrapCanvasText(context, message, canvas.width / 2, 470, 760, 52);
  context.fillStyle = dark ? 'rgba(255,247,229,.72)' : 'rgba(16,46,51,.65)';
  context.font = '500 22px Poppins';
  context.fillText('JOURNEY OF EID', canvas.width / 2, 920);
  const link = document.createElement('a');
  link.download = `eid-${state.selectedEid}-greeting.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast(text('downloaded'));
}

function drawCardDecoration(context, fitr) {
  context.save();
  context.fillStyle = '#f0d98a';
  if (fitr) {
    context.beginPath(); context.arc(540, 152, 42, 0, Math.PI * 2); context.fill();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath(); context.arc(524, 140, 43, 0, Math.PI * 2); context.fill();
    context.globalCompositeOperation = 'source-over';
  } else {
    context.fillStyle = '#151d22'; context.fillRect(500, 119, 80, 66);
    context.fillStyle = '#d4af37'; context.fillRect(500, 119, 80, 8); context.fillRect(500, 147, 80, 5);
  }
  context.restore();
}

function wrapCanvasText(context, value, x, y, maxWidth, lineHeight) {
  const paragraphs = value.split('\n');
  let currentY = y;
  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(' ');
    let line = '';
    words.forEach((word) => {
      const nextLine = `${line}${word} `;
      if (context.measureText(nextLine).width > maxWidth && line) {
        context.fillText(line.trim(), x, currentY);
        line = `${word} `;
        currentY += lineHeight;
      } else {
        line = nextLine;
      }
    });
    context.fillText(line.trim(), x, currentY);
    currentY += lineHeight * 1.35;
  });
}

function renderSources() {
  const eidSources = sourceData[state.selectedEid];
  const quranItems = [...sourceData.sharedQuran, ...eidSources.quran];
  const hadithItems = [...sourceData.sharedHadith, ...eidSources.hadith];
  const renderItems = (items) => `<ul class="source-list">${items.map(([en, bn, url]) => `<li>${state.language === 'bn' ? bn : en} — <a href="${url}" target="_blank" rel="noopener noreferrer">${state.language === 'bn' ? 'সূত্র দেখুন' : 'Open source'}</a></li>`).join('')}</ul>`;
  $('#source-accordions').innerHTML = `
    <details class="accordion" open><summary>${text('quranGroup')}</summary>${renderItems(quranItems)}</details>
    <details class="accordion"><summary>${text('hadithGroup')}</summary>${renderItems(hadithItems)}</details>`;
}

function openRestartModal(show) {
  $('#restart-modal').hidden = !show;
  document.body.classList.toggle('modal-open', show);
  if (show) $('#stay-journey').focus();
}

function restartJourney() {
  localStorage.removeItem('selectedEid');
  state.selectedEid = null;
  state.selectedDua = null;
  state.wheelRotation = 0;
  state.currentStoryPage = 0;
  state.bookOpened = false;
  $('#wheel').style.transform = 'rotate(0deg)';
  $('#spin-btn').textContent = text('spinButton');
  openRestartModal(false);
  $$('.eid-choice').forEach((card) => card.classList.remove('selected', 'faded'));
  showEntry();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateScrolledUI() {
  const scrolled = window.scrollY > 20;
  $('#site-header')?.classList.toggle('scrolled', scrolled);
  $('#scroll-top')?.classList.toggle('visible', window.scrollY > 500 && !!state.selectedEid);
}

function observeReveals() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { $$('.reveal').forEach((element) => element.classList.add('visible')); return; }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((element) => observer.observe(element));
}

function observeChapters() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $$('.nav-links a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.02 });
  $$('main section[id]').forEach((section) => sectionObserver.observe(section));
}

function createSparkles(target) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = target.getBoundingClientRect();
  for (let i = 0; i < 12; i += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + 38}px`;
    sparkle.style.setProperty('--tx', `${(Math.random() - 0.5) * 130}px`);
    sparkle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
    document.body.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 760);
  }
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2300);
}

function escapeHTML(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

document.addEventListener('DOMContentLoaded', initApp);
