import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* ============================================================
   PanditZ copy system — every visible string lives here.
   English + Hindi. Numbers / Sanskrit service names stay put.
   ============================================================ */

const en = {
  brand: { descriptor: "Vedic services · verified" },
  a11y: {
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Choose language",
  },
  nav: {
    home: "Home",
    how: "How It Works",
    services: "Services",
    priests: "For Priests",
    about: "About",
    login: "Login",
    dashboard: "Dashboard",
    book: "Book a Pandit",
    signOut: "Sign out",
  },
  app: {
    title: "Namaste",
    body: "This is where the live PanditZ application opens — your bookings, pandits, schedules and records will appear here once connected to the production environment.",
    guestTitle: "PanditZ Dashboard",
    guestBody: "Sign in from the home page to open your dashboard.",
  },
  hero: {
    eyebrow: "Trusted Vedic services",
    t1: "Connect with trusted pandits for",
    t2: "every sacred occasion.",
    sub: "Book verified priests for pujas, ceremonies and Vedic rituals — with transparent dakshina, clear scheduling and support through every step.",
    cta1: "Book a Pandit",
    cta2: "Become a Pandit",
    checks: ["KYC-verified pandits", "Transparent dakshina", "Secure booking"],
    imgAlt: "A PanditZ verified pandit in traditional saffron attire",
    chip1T: "Verified pandit",
    chip1D: "KYC & tradition checks done",
    chip2T: "Next available slot",
    chip2D: "Today · 6:00 PM · Your city",
    railTitle: "The PanditZ way",
    rail: [
      { t: "Devotee", d: "You share the occasion" },
      { t: "PanditZ", d: "Matched & scheduled" },
      { t: "Verified pandit", d: "Arrives prepared" },
      { t: "Ceremony", d: "Performed with vidhi" },
    ],
  },
  trust: {
    items: [
      {
        t: "Verified Pandits",
        d: "Every pandit clears KYC, identity and background checks before their first listing.",
      },
      {
        t: "Transparent Dakshina",
        d: "Clear, upfront pricing for every ceremony. No hidden charges after the sankalp.",
      },
      {
        t: "Secure Booking",
        d: "Confirmed slots, booking records and reminders — tracked end to end.",
      },
      {
        t: "Traditional Expertise",
        d: "Pujas performed with complete vidhi, samagri guidance and Sanskrit accuracy.",
      },
    ],
  },
  how: {
    eyebrow: "Simple by design",
    title: "Three steps to a serene ceremony",
    sub: "Booking a puja should not feel complicated. Choose, match and rest easy.",
    steps: [
      {
        n: "01",
        t: "Choose a Service",
        d: "Browse pujas and ceremonies with clear inclusions, duration and starting dakshina.",
      },
      {
        n: "02",
        t: "Select a Trusted Pandit",
        d: "Compare verified profiles, languages and experience — pick the pandit for your tradition.",
      },
      {
        n: "03",
        t: "Book Your Ceremony",
        d: "Confirm date, muhurat and address. Your pandit arrives prepared, with full samagri guidance.",
      },
    ],
  },
  services: {
    eyebrow: "What we arrange",
    title: "Services for every sacred moment",
    sub: "Starting dakshina shown for each category — the final quote is always confirmed with your pandit before booking.",
    browse: "Browse the full catalogue",
    fromLabel: "From",
    items: [
      {
        name: "Puja & Path",
        desc: "Satyanarayan, Ganesh, Durga Saptashati and more — at home or temple.",
        from: 751,
      },
      {
        name: "Havan & Yagna",
        desc: "Vedic fire rituals with complete samagri lists and proper vidhi.",
        from: 1100,
      },
      {
        name: "Vivah Sanskar",
        desc: "Wedding ceremonies with muhurat, kanyadaan and pheras.",
        from: 5100,
      },
      {
        name: "Griha Pravesh",
        desc: "Housewarming with Vastu shanti and ganesh poojan.",
        from: 1500,
      },
      {
        name: "Mundan & Sanskar",
        desc: "Sacred sanskars for children, performed with complete care.",
        from: 1100,
      },
      {
        name: "Jyotish & Katha",
        desc: "Kundali guidance, navgraha shanti and katha services.",
        from: 900,
      },
    ],
  },
  featured: {
    eyebrow: "Most requested",
    title: "Popular ceremonies",
    sub: "The services families request most often — with complete vidhi, samagri guidance and a verified pandit.",
    dur: "Duration",
    from: "Starts at",
    details: "View Details",
    items: [
      {
        name: "Satyanarayan Puja",
        desc: "The beloved vow of gratitude — with complete katha, havan and aarti.",
        dur: "2–3 hours",
        from: 1100,
        tags: ["Samagri list included", "Havan & aarti", "Prasad guidance"],
        included: [
          "Sankalp & kalash sthapana",
          "Satyanarayan katha",
          "Havan with samagri",
          "Aarti & prasad guidance",
        ],
      },
      {
        name: "Griha Pravesh",
        desc: "Enter your new home with Vastu shanti, ganesh poojan and kalash sthapana.",
        dur: "2–4 hours",
        from: 1500,
        tags: ["Vastu shanti", "Kalash sthapana", "Muhurat selection"],
        included: [
          "Kalash sthapana & poojan",
          "Vastu shanti path",
          "Havan",
          "Navgraha sukt path",
        ],
      },
      {
        name: "Rudrabhishek",
        desc: "Sacred abhishek of Lord Shiva with Rudri path and eleven abhishek dravyas.",
        dur: "1.5–2 hours",
        from: 2100,
        tags: ["11-dravya abhishek", "Rudri path", "Bhasma & prasad"],
        included: [
          "Kalash sthapana",
          "Rudri path",
          "Abhishek with eleven dravyas",
          "Aarti & bhasma prasad",
        ],
      },
    ],
  },
  why: {
    eyebrow: "About PanditZ",
    title: "A modern platform for an ancient trust",
    p1: "PanditZ is a premium technology platform with one purpose — connecting devotees with priests they can trust. We bring the clarity of modern product design to an ancient tradition.",
    p2: "Every pandit is verified, every dakshina is transparent, and every ceremony is supported end to end — so your attention stays where it belongs: on the occasion itself.",
    link: "See how verification works",
    items: [
      { t: "Verified Pandits", d: "Identity, KYC and reference checks on every listed pandit." },
      { t: "Authentic Vedic Tradition", d: "Correct sankalp, mantras and samagri for every ceremony." },
      { t: "Transparent Dakshina", d: "Prices published upfront — decide before you book." },
      { t: "Easy Scheduling", d: "Pick date, muhurat and location with instant confirmation." },
      { t: "Secure Records", d: "Every booking logged with reminders and receipts." },
      { t: "Reliable Support", d: "A real team on call before, during and after your ceremony." },
    ],
  },
  verify: {
    eyebrow: "Trust & verification",
    title: "How every pandit earns the seal",
    sub: "Religious ceremonies are personal. Every profile on PanditZ clears a four-part verification before it goes live.",
    steps: [
      { t: "Profile Verification", d: "Training, lineage and experience reviewed by our panel." },
      { t: "Identity & KYC", d: "Government ID and address verified before listing." },
      { t: "Tradition Details", d: "Sampradaya, languages and specialisations made public." },
      { t: "Transparent Listings", d: "Inclusions, duration and dakshina published upfront." },
    ],
    badgeTitle: "Verified profile preview",
    badgeName: "Pt. Ramesh Shastri",
    badgeRole: "Vedic Acharya · Varanasi",
    badgeChips: ["Identity verified", "KYC complete", "15+ yrs tradition", "Sanskrit · Hindi"],
    badgeCaption: "Illustrative preview — shows what verification unlocks.",
  },
  pandit: {
    eyebrow: "For priests",
    title: "Are you a Pandit?",
    sub: "Join PanditZ and connect with devotees looking for trusted Vedic services — on your terms, in your tradition.",
    benefits: [
      "Build your public profile with your lineage and specialisations",
      "Manage availability across dates, cities and time slots",
      "Set your own dakshina for every service you offer",
      "Receive and confirm bookings in one place",
      "Track earnings with clear, settled records",
    ],
    cta: "Join as a Pandit",
    note: "Free to join · You control your calendar and pricing",
    imgAlt: "Flames of a Vedic havan ritual",
    chips: ["Manage availability", "Set your dakshina", "Track earnings"],
  },
  proof: {
    eyebrow: "Social proof, honestly",
    title: "A record you can trust",
    sub: "Reviews on PanditZ are published only after a completed, verified booking — never before, never edited.",
    waiting: "Awaiting the first verified ceremony",
    waitingSub: "Ratings unlock automatically once ceremonies are completed and reviewed.",
    howTitle: "How reviews work",
    how: [
      { t: "Book a ceremony", d: "Choose your date and service." },
      { t: "Complete it with your pandit", d: "The ceremony concludes and the booking closes." },
      { t: "Rate & review", d: "Verified against your booking ID." },
    ],
    note: "Every review is tied to a real booking ID.",
  },
  final: {
    title: "Make your next sacred occasion simple.",
    sub: "Find the right pandit for your ceremony and book with confidence.",
    cta1: "Find a Pandit",
    cta2: "Join as a Pandit",
    note: "Browse pandits and dakshina before you commit.",
  },
  footer: {
    tagline:
      "A premium platform connecting devotees with verified pandits for pujas, ceremonies and Vedic rituals.",
    contactT: "Reach us",
    cols: {
      devotees: "For Devotees",
      priests: "For Pandits",
      company: "Company",
      support: "Support",
      legal: "Legal",
    },
    links: {
      browseServices: "Browse services",
      popular: "Popular ceremonies",
      howItWorks: "How it works",
      book: "Book a pandit",
      join: "Join as a pandit",
      benefits: "Pandit benefits",
      pricing: "Availability & pricing",
      about: "About PanditZ",
      trust: "Trust & verification",
      help: "Help & FAQs",
      contact: "Contact us",
      bookingSupport: "Booking support",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refund: "Cancellation & Refunds",
    },
    rights: "© 2026 PanditZ. All rights reserved.",
    made: "Crafted with reverence in India",
  },
  modals: {
    common: {
      required: "This field is required",
      phone: "Enter a valid phone number",
      email: "Enter a valid email address",
      nameL: "Your name",
      phoneL: "Phone number",
      cityL: "City",
      namePh: "e.g. Ananya Sharma",
      phonePh: "e.g. 98110 24680",
      cityPh: "e.g. Varanasi",
    },
    booking: {
      title: "Request a booking",
      sub: "Share your details — a coordinator confirms your pandit, muhurat and samagri.",
      occasionL: "Occasion",
      optional: "(optional)",
      dateL: "Ceremony date",
      submit: "Send booking request",
      okT: "Request received",
      okD: "Our team will call you within a few hours to confirm your pandit and muhurat.",
      ref: "Reference",
      again: "Send another request",
      occasions: [
        "Satyanarayan Puja",
        "Griha Pravesh",
        "Rudrabhishek",
        "Vivah Sanskar",
        "Mundan",
        "Other",
      ],
    },
    join: {
      title: "Join as a Pandit",
      sub: "Tell us about yourself — our onboarding team will reach out for verification.",
      expL: "Years of experience",
      specL: "Specialisation",
      submit: "Apply to join",
      okT: "Application received",
      okD: "Our pandit onboarding team will contact you to begin verification.",
      specs: ["Puja & Path", "Havan & Yagna", "Vivah Sanskar", "Jyotish"],
      exps: ["1–5 years", "5–10 years", "10–20 years", "20+ years"],
    },
    login: {
      title: "Sign in to PanditZ",
      sub: "Your dashboard keeps bookings, pandits and records in one place.",
      emailL: "Email",
      submit: "Continue",
      note: "Preview sign-in — details stay on this device only.",
      okT: "Signed in",
      okD: "You can now open your dashboard from the header.",
    },
    services: {
      title: "Full service catalogue",
      sub: "Starting dakshina shown — the final quote is confirmed with your pandit.",
      book: "Book",
      cats: [
        {
          cat: "Puja & Path",
          items: [
            { name: "Satyanarayan Katha", from: 1100 },
            { name: "Ganesh Puja", from: 751 },
            { name: "Durga Saptashati Path", from: 1500 },
            { name: "Lakshmi Puja", from: 901 },
            { name: "Saraswati Puja", from: 901 },
          ],
        },
        {
          cat: "Havan & Yagna",
          items: [
            { name: "Griha Shanti Havan", from: 1500 },
            { name: "Mahamrityunjaya Jaap", from: 2500 },
            { name: "Navgraha Havan", from: 2100 },
            { name: "Chandi Havan", from: 2100 },
          ],
        },
        {
          cat: "Sanskar & Ceremony",
          items: [
            { name: "Vivah Sanskar", from: 5100 },
            { name: "Griha Pravesh", from: 1500 },
            { name: "Mundan", from: 1100 },
            { name: "Karnavedha", from: 1100 },
            { name: "Upanayana", from: 2100 },
          ],
        },
        {
          cat: "Jyotish & Shanti",
          items: [
            { name: "Kundali Milan", from: 900 },
            { name: "Navgraha Shanti", from: 1500 },
            { name: "Vastu Shanti", from: 1100 },
            { name: "Rudrabhishek", from: 2100 },
            { name: "Pitru Shanti", from: 1800 },
          ],
        },
      ],
    },
    puja: {
      includes: "What's included",
      dur: "Duration",
      from: "Starts at",
      book: "Book this puja",
    },
    help: {
      title: "Help & FAQs",
      items: [
        {
          q: "How are pandits verified?",
          a: "Every pandit clears identity and KYC checks, and our panel reviews their training, lineage and experience before the profile goes live.",
        },
        {
          q: "How is dakshina decided?",
          a: "Each listing shows a starting dakshina. The final amount is confirmed with your pandit before booking — based on ceremony scope, samagri and travel.",
        },
        {
          q: "Can I cancel or reschedule?",
          a: "Yes. Booking requests are free. You can reschedule or cancel before your pandit confirms travel, as per the cancellation policy.",
        },
        {
          q: "Is samagri included?",
          a: "Pandits provide a complete samagri list for your ceremony. Many also offer samagri kits at cost — this is shown on the listing.",
        },
        {
          q: "Which cities and languages?",
          a: "PanditZ serves cities across India. You can filter pandits by language — Hindi, Sanskrit and regional languages.",
        },
      ],
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      refundTitle: "Cancellation & Refund Policy",
      body: {
        privacy: [
          "PanditZ collects only the information needed to arrange your ceremony — your name, contact details, city and ceremony preferences.",
          "Verification documents shared by pandits are used solely for identity and KYC checks and are never sold or shared with third parties for marketing.",
          "You may request a copy or deletion of your data at any time by writing to our support team.",
        ],
        terms: [
          "PanditZ is a platform that connects devotees with independent, verified priests. Booking requests are free; the final dakshina is agreed between you and your pandit before confirmation.",
          "Ceremonies are performed by independent pandits. PanditZ facilitates scheduling, verification and support, and is not a party to the religious service itself.",
          "Misuse of the platform, false information or harassment of pandits or staff leads to suspension of access.",
        ],
        refund: [
          "Booking requests carry no charge. If an advance was collected for a confirmed booking, it is fully refundable until the pandit confirms travel.",
          "Cancellations within 24 hours of the ceremony may be subject to a nominal samagri and travel fee, as agreed at booking time.",
          "Rescheduling is free once per booking, subject to your pandit's availability.",
        ],
      },
    },
  },
};

export const TICKER = [
  "Satyanarayan Katha",
  "Griha Pravesh",
  "Rudrabhishek",
  "Vivah Sanskar",
  "Mundan",
  "Navgraha Shanti",
  "Vastu Shanti",
  "Mahamrityunjaya Jaap",
  "Durga Saptashati Path",
  "Ganesh Sthapana",
  "Pitru Shanti",
  "Karnavedha",
];

const hi = {
  brand: { descriptor: "वैदिक सेवाएँ · सत्यापित" },
  a11y: {
    skip: "सामग्री पर जाएँ",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    language: "भाषा चुनें",
  },
  nav: {
    home: "होम",
    how: "कैसे काम करता है",
    services: "सेवाएँ",
    priests: "पंडितों के लिए",
    about: "परिचय",
    login: "लॉगिन",
    dashboard: "डैशबोर्ड",
    book: "पंडित बुक करें",
    signOut: "साइन आउट",
  },
  app: {
    title: "नमस्ते",
    body: "यहीं से लाइव PanditZ ऐप खुलेगा — उत्पादन वातावरण से जुड़ने पर आपकी बुकिंग, पंडित, समय-सारणी और रिकॉर्ड यहाँ दिखेंगे।",
    guestTitle: "PanditZ डैशबोर्ड",
    guestBody: "होम पेज से साइन इन करके अपना डैशबोर्ड खोलें।",
  },
  hero: {
    eyebrow: "विश्वसनीय वैदिक सेवाएँ",
    t1: "हर शुभ अवसर के लिए",
    t2: "विश्वसनीय पंडितों से जुड़ें।",
    sub: "पूजा, अनुष्ठान और वैदिक कर्मकांडों के लिए सत्यापित पंडित बुक करें — पारदर्शी दक्षिणा, स्पष्ट समय-सारणी और हर चरण में सहायता के साथ।",
    cta1: "पंडित बुक करें",
    cta2: "पंडित बनें",
    checks: ["KYC-सत्यापित पंडित", "पारदर्शी दक्षिणा", "सुरक्षित बुकिंग"],
    imgAlt: "पारंपरिक भगवा वस्त्रों में PanditZ सत्यापित पंडित",
    chip1T: "सत्यापित पंडित",
    chip1D: "KYC व परंपरा जाँच पूर्ण",
    chip2T: "अगला उपलब्ध समय",
    chip2D: "आज · शाम 6:00 · आपका शहर",
    railTitle: "पंडितZ की प्रक्रिया",
    rail: [
      { t: "भक्त", d: "आप अवसर साझा करते हैं" },
      { t: "पंडितZ", d: "मिलान व समय निर्धारण" },
      { t: "सत्यापित पंडित", d: "तैयारी के साथ पहुँचते हैं" },
      { t: "अनुष्ठान", d: "पूर्ण विधि-विधान से" },
    ],
  },
  trust: {
    items: [
      {
        t: "सत्यापित पंडित",
        d: "हर पंडित पहली लिस्टिंग से पहले KYC, पहचान और पृष्ठभूमि जाँच से गुज़रता है।",
      },
      {
        t: "पारदर्शी दक्षिणा",
        d: "हर अनुष्ठान की स्पष्ट, पूर्व-निर्धारित कीमत। संकल्प के बाद कोई छिपा शुल्क नहीं।",
      },
      {
        t: "सुरक्षित बुकिंग",
        d: "पुष्टि किए गए समय, बुकिंग रिकॉर्ड और रिमाइंडर — शुरू से अंत तक।",
      },
      {
        t: "पारंपरिक विशेषज्ञता",
        d: "पूर्ण विधि, सामग्री मार्गदर्शन और संस्कृत शुद्धता के साथ पूजा।",
      },
    ],
  },
  how: {
    eyebrow: "सरल डिज़ाइन",
    title: "तीन चरणों में शांत अनुष्ठान",
    sub: "पूजा बुक करना जटिल नहीं होना चाहिए। चुनें, मिलान करें और निश्चिंत रहें।",
    steps: [
      {
        n: "01",
        t: "सेवा चुनें",
        d: "पूजा और अनुष्ठान देखें — स्पष्ट विवरण, अवधि और प्रारंभिक दक्षिणा के साथ।",
      },
      {
        n: "02",
        t: "विश्वसनीय पंडित चुनें",
        d: "सत्यापित प्रोफ़ाइल, भाषाएँ और अनुभव देखें — अपनी परंपरा के अनुसार पंडित चुनें।",
      },
      {
        n: "03",
        t: "अनुष्ठान बुक करें",
        d: "तिथि, मुहूर्त और पता निश्चित करें। पंडित पूर्ण तैयारी के साथ पहुँचते हैं।",
      },
    ],
  },
  services: {
    eyebrow: "हम क्या करवाते हैं",
    title: "हर शुभ क्षण के लिए सेवाएँ",
    sub: "प्रत्येक श्रेणी की प्रारंभिक दक्षिणा देखें — अंतिम मूल्य बुकिंग से पहले आपके पंडित से पुष्टि होता है।",
    browse: "पूरी सूची देखें",
    fromLabel: "प्रारंभिक",
    items: [
      {
        name: "पूजा व पाठ",
        desc: "सत्यनारायण, गणेश, दुर्गा सप्तशती आदि — घर या मंदिर में।",
        from: 751,
      },
      {
        name: "हवन व यज्ञ",
        desc: "पूर्ण सामग्री सूची और उचित विधि के साथ वैदिक अग्नि अनुष्ठान।",
        from: 1100,
      },
      {
        name: "विवाह संस्कार",
        desc: "मुहूर्त, कन्यादान और फेरों सहित विवाह अनुष्ठान।",
        from: 5100,
      },
      {
        name: "गृह प्रवेश",
        desc: "वास्तु शांति और गणेश पूजन सहित गृह प्रवेश।",
        from: 1500,
      },
      {
        name: "मुंडन व संस्कार",
        desc: "बच्चों के शुभ संस्कार — पूर्ण सावधानी और विधि से।",
        from: 1100,
      },
      {
        name: "ज्योतिष व कथा",
        desc: "कुंडली मार्गदर्शन, नवग्रह शांति और कथा सेवाएँ।",
        from: 900,
      },
    ],
  },
  featured: {
    eyebrow: "सर्वाधिक मांगी जाने वाली",
    title: "लोकप्रिय अनुष्ठान",
    sub: "परिवारों की सबसे प्रिय सेवाएँ — पूर्ण विधि, सामग्री मार्गदर्शन और सत्यापित पंडित के साथ।",
    dur: "अवधि",
    from: "प्रारंभिक",
    details: "विवरण देखें",
    items: [
      {
        name: "सत्यनारायण पूजा",
        desc: "कथा, हवन और आरती सहित कृतज्ञता का प्रिय व्रत।",
        dur: "2–3 घंटे",
        from: 1100,
        tags: ["सामग्री सूची सहित", "हवन व आरती", "प्रसाद मार्गदर्शन"],
        included: [
          "संकल्प व कलश स्थापना",
          "सत्यनारायण कथा",
          "सामग्री सहित हवन",
          "आरती व प्रसाद मार्गदर्शन",
        ],
      },
      {
        name: "गृह प्रवेश",
        desc: "वास्तु शांति, गणेश पूजन और कलश स्थापना के साथ नए घर में प्रवेश।",
        dur: "2–4 घंटे",
        from: 1500,
        tags: ["वास्तु शांति", "कलश स्थापना", "मुहूर्त चयन"],
        included: ["कलश स्थापना व पूजन", "वास्तु शांति पाठ", "हवन", "नवग्रह सूक्त पाठ"],
      },
      {
        name: "रुद्राभिषेक",
        desc: "रुद्री पाठ और ग्यारह द्रव्यों से भगवान शिव का पवित्र अभिषेक।",
        dur: "1.5–2 घंटे",
        from: 2100,
        tags: ["11-द्रव्य अभिषेक", "रुद्री पाठ", "भस्म व प्रसाद"],
        included: [
          "कलश स्थापना",
          "रुद्री पाठ",
          "ग्यारह द्रव्यों से अभिषेक",
          "आरती व भस्म प्रसाद",
        ],
      },
    ],
  },
  why: {
    eyebrow: "पंडितZ के बारे में",
    title: "प्राचीन विश्वास के लिए आधुनिक प्लेटफ़ॉर्म",
    p1: "पंडितZ एक प्रीमियम तकनीकी प्लेटफ़ॉर्म है — जिसका एक ही उद्देश्य है: भक्तों का विश्वसनीय पंडितों से मिलान। हम आधुनिक उत्पाद-डिज़ाइन की स्पष्टता एक प्राचीन परंपरा में लाते हैं।",
    p2: "हर पंडित सत्यापित है, हर दक्षिणा पारदर्शी है और हर अनुष्ठान में सहायता मिलती है — ताकि आपका ध्यान वहीं रहे जो सबसे महत्वपूर्ण है: आपका शुभ अवसर।",
    link: "सत्यापन प्रक्रिया देखें",
    items: [
      { t: "सत्यापित पंडित", d: "हर सूचीबद्ध पंडित की पहचान, KYC और संदर्भ जाँच।" },
      { t: "प्रामाणिक वैदिक परंपरा", d: "हर अनुष्ठान में शुद्ध संकल्प, मंत्र और सामग्री।" },
      { t: "पारदर्शी दक्षिणा", d: "मूल्य पहले से प्रकाशित — बुकिंग से पहले निर्णय लें।" },
      { t: "सरल समय-सारणी", d: "तिथि, मुहूर्त और स्थान चुनें — तुरंत पुष्टि के साथ।" },
      { t: "सुरक्षित रिकॉर्ड", d: "हर बुकिंग दर्ज — रिमाइंडर और रसीद के साथ।" },
      { t: "भरोसेमंद सहायता", d: "अनुष्ठान से पहले, दौरान और बाद में सहायता टीम।" },
    ],
  },
  verify: {
    eyebrow: "विश्वास व सत्यापन",
    title: "हर पंडित यह मुहर कैसे अर्जित करता है",
    sub: "धार्मिक अनुष्ठान व्यक्तिगत होते हैं। PanditZ पर हर प्रोफ़ाइल लाइव होने से पहले चार-चरणीय सत्यापन से गुज़रती है।",
    steps: [
      { t: "प्रोफ़ाइल सत्यापन", d: "प्रशिक्षण, परंपरा और अनुभव की समिति द्वारा समीक्षा।" },
      { t: "पहचान व KYC", d: "लिस्टिंग से पहले सरकारी ID और पते की जाँच।" },
      { t: "परंपरा विवरण", d: "संप्रदाय, भाषाएँ और विशेषज्ञता सार्वजनिक रूप से।" },
      { t: "पारदर्शी लिस्टिंग", d: "विवरण, अवधि और दक्षिणा पहले से प्रकाशित।" },
    ],
    badgeTitle: "सत्यापित प्रोफ़ाइल झलक",
    badgeName: "पं. रमेश शास्त्री",
    badgeRole: "वेदाचार्य · वाराणसी",
    badgeChips: ["पहचान सत्यापित", "KYC पूर्ण", "15+ वर्ष परंपरा", "संस्कृत · हिंदी"],
    badgeCaption: "सांकेतिक झलक — दर्शाता है कि सत्यापन क्या प्रदान करता है।",
  },
  pandit: {
    eyebrow: "पंडितों के लिए",
    title: "क्या आप पंडित हैं?",
    sub: "पंडितZ से जुड़ें और विश्वसनीय वैदिक सेवाएँ खोज रहे भक्तों तक पहुँचें — अपनी शर्तों पर, अपनी परंपरा के साथ।",
    benefits: [
      "अपनी परंपरा और विशेषज्ञता के साथ सार्वजनिक प्रोफ़ाइल बनाएँ",
      "तिथियों, शहरों और समय के अनुसार उपलब्धता प्रबंधित करें",
      "हर सेवा के लिए अपनी दक्षिणा स्वयं निर्धारित करें",
      "बुकिंग एक ही जगह प्राप्त करें और पुष्टि करें",
      "स्पष्ट, निपटाए गए रिकॉर्ड के साथ आय ट्रैक करें",
    ],
    cta: "पंडित के रूप में जुड़ें",
    note: "जुड़ना निःशुल्क · कैलेंडर व मूल्य आपके नियंत्रण में",
    imgAlt: "वैदिक हवन की अग्नि",
    chips: ["उपलब्धता प्रबंधन", "अपनी दक्षिणा निर्धारित करें", "आय ट्रैक करें"],
  },
  proof: {
    eyebrow: "ईमानदार सामाजिक प्रमाण",
    title: "ऐसा रिकॉर्ड जिस पर भरोसा किया जा सके",
    sub: "PanditZ पर समीक्षाएँ केवल पूर्ण, सत्यापित बुकिंग के बाद प्रकाशित होती हैं — न पहले, न संपादित।",
    waiting: "प्रथम सत्यापित अनुष्ठान की प्रतीक्षा में",
    waitingSub: "अनुष्ठान पूर्ण होने और समीक्षा मिलने पर रेटिंग स्वतः सक्रिय होती है।",
    howTitle: "समीक्षाएँ कैसे काम करती हैं",
    how: [
      { t: "अनुष्ठान बुक करें", d: "अपनी तिथि और सेवा चुनें।" },
      { t: "पंडित के साथ पूर्ण करें", d: "अनुष्ठान संपन्न हो और बुकिंग बंद हो।" },
      { t: "रेटिंग व समीक्षा दें", d: "आपकी बुकिंग ID से सत्यापित।" },
    ],
    note: "हर समीक्षा वास्तविक बुकिंग ID से जुड़ी है।",
  },
  final: {
    title: "अपना अगला शुभ अवसर सरल बनाइए।",
    sub: "अपने अनुष्ठान के लिए सही पंडित खोजें और विश्वास के साथ बुक करें।",
    cta1: "पंडित खोजें",
    cta2: "पंडित के रूप में जुड़ें",
    note: "बुकिंग से पहले पंडित और दक्षिणा देखें।",
  },
  footer: {
    tagline:
      "पूजा, अनुष्ठान और वैदिक कर्मकांडों के लिए भक्तों को सत्यापित पंडितों से जोड़ने वाला प्रीमियम प्लेटफ़ॉर्म।",
    contactT: "संपर्क करें",
    cols: {
      devotees: "भक्तों के लिए",
      priests: "पंडितों के लिए",
      company: "कंपनी",
      support: "सहायता",
      legal: "कानूनी",
    },
    links: {
      browseServices: "सेवाएँ देखें",
      popular: "लोकप्रिय अनुष्ठान",
      howItWorks: "कैसे काम करता है",
      book: "पंडित बुक करें",
      join: "पंडित के रूप में जुड़ें",
      benefits: "पंडित लाभ",
      pricing: "उपलब्धता व मूल्य",
      about: "पंडितZ के बारे में",
      trust: "विश्वास व सत्यापन",
      help: "सहायता व प्रश्न",
      contact: "संपर्क करें",
      bookingSupport: "बुकिंग सहायता",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें",
      refund: "रद्दीकरण व रिफंड",
    },
    rights: "© 2026 PanditZ. सर्वाधिकार सुरक्षित।",
    made: "भारत में श्रद्धा से निर्मित",
  },
  modals: {
    common: {
      required: "यह फ़ील्ड आवश्यक है",
      phone: "मान्य फ़ोन नंबर दर्ज करें",
      email: "मान्य ईमेल दर्ज करें",
      nameL: "आपका नाम",
      phoneL: "फ़ोन नंबर",
      cityL: "शहर",
      namePh: "जैसे: अनन्या शर्मा",
      phonePh: "जैसे: 98110 24680",
      cityPh: "जैसे: वाराणसी",
    },
    booking: {
      title: "बुकिंग अनुरोध",
      sub: "अपना विवरण साझा करें — समन्वयक आपके पंडित, मुहूर्त और सामग्री की पुष्टि करेगा।",
      occasionL: "अवसर",
      optional: "(वैकल्पिक)",
      dateL: "अनुष्ठान की तिथि",
      submit: "बुकिंग अनुरोध भेजें",
      okT: "अनुरोध प्राप्त हुआ",
      okD: "हमारी टीम कुछ ही घंटों में आपके पंडित और मुहूर्त की पुष्टि के लिए कॉल करेगी।",
      ref: "संदर्भ",
      again: "नया अनुरोध भेजें",
      occasions: [
        "सत्यनारायण पूजा",
        "गृह प्रवेश",
        "रुद्राभिषेक",
        "विवाह संस्कार",
        "मुंडन",
        "अन्य",
      ],
    },
    join: {
      title: "पंडित के रूप में जुड़ें",
      sub: "अपने बारे में बताइए — सत्यापन के लिए ऑनबोर्डिंग टीम संपर्क करेगी।",
      expL: "अनुभव (वर्ष)",
      specL: "विशेषज्ञता",
      submit: "आवेदन भेजें",
      okT: "आवेदन प्राप्त हुआ",
      okD: "पंडित ऑनबोर्डिंग टीम सत्यापन शुरू करने के लिए संपर्क करेगी।",
      specs: ["पूजा व पाठ", "हवन व यज्ञ", "विवाह संस्कार", "ज्योतिष"],
      exps: ["1–5 वर्ष", "5–10 वर्ष", "10–20 वर्ष", "20+ वर्ष"],
    },
    login: {
      title: "PanditZ में साइन इन",
      sub: "आपका डैशबोर्ड बुकिंग, पंडित और रिकॉर्ड एक जगह रखता है।",
      emailL: "ईमेल",
      submit: "जारी रखें",
      note: "पूर्वावलोकन साइन-इन — विवरण केवल इस डिवाइस पर रहता है।",
      okT: "साइन इन सफल",
      okD: "अब आप हेडर से डैशबोर्ड खोल सकते हैं।",
    },
    services: {
      title: "पूर्ण सेवा सूची",
      sub: "प्रारंभिक दक्षिणा दर्शाई गई है — अंतिम मूल्य पंडित से पुष्टि होगा।",
      book: "बुक करें",
      cats: [
        {
          cat: "पूजा व पाठ",
          items: [
            { name: "सत्यनारायण कथा", from: 1100 },
            { name: "गणेश पूजा", from: 751 },
            { name: "दुर्गा सप्तशती पाठ", from: 1500 },
            { name: "लक्ष्मी पूजा", from: 901 },
            { name: "सरस्वती पूजा", from: 901 },
          ],
        },
        {
          cat: "हवन व यज्ञ",
          items: [
            { name: "गृह शांति हवन", from: 1500 },
            { name: "महामृत्युंजय जाप", from: 2500 },
            { name: "नवग्रह हवन", from: 2100 },
            { name: "चंडी हवन", from: 2100 },
          ],
        },
        {
          cat: "संस्कार व अनुष्ठान",
          items: [
            { name: "विवाह संस्कार", from: 5100 },
            { name: "गृह प्रवेश", from: 1500 },
            { name: "मुंडन", from: 1100 },
            { name: "कर्णवेध", from: 1100 },
            { name: "उपनयन", from: 2100 },
          ],
        },
        {
          cat: "ज्योतिष व शांति",
          items: [
            { name: "कुंडली मिलान", from: 900 },
            { name: "नवग्रह शांति", from: 1500 },
            { name: "वास्तु शांति", from: 1100 },
            { name: "रुद्राभिषेक", from: 2100 },
            { name: "पितृ शांति", from: 1800 },
          ],
        },
      ],
    },
    puja: {
      includes: "क्या-क्या शामिल है",
      dur: "अवधि",
      from: "प्रारंभिक",
      book: "यह पूजा बुक करें",
    },
    help: {
      title: "सहायता व प्रश्न",
      items: [
        {
          q: "पंडितों का सत्यापन कैसे होता है?",
          a: "हर पंडित पहचान और KYC जाँच से गुज़रता है, और प्रोफ़ाइल लाइव होने से पहले हमारी समिति उनके प्रशिक्षण, परंपरा और अनुभव की समीक्षा करती है।",
        },
        {
          q: "दक्षिणा कैसे तय होती है?",
          a: "हर लिस्टिंग पर प्रारंभिक दक्षिणा दिखती है। अंतिम राशि बुकिंग से पहले आपके पंडित से तय होती है — अनुष्ठान के दायरे, सामग्री और यात्रा के आधार पर।",
        },
        {
          q: "क्या मैं रद्द या बदल सकता/सकती हूँ?",
          a: "हाँ। बुकिंग अनुरोध निःशुल्क हैं। पंडित की यात्रा पुष्टि से पहले आप रद्दीकरण नीति के अनुसार समय बदल या रद्द कर सकते हैं।",
        },
        {
          q: "क्या सामग्री शामिल है?",
          a: "पंडित आपके अनुष्ठान की पूर्ण सामग्री सूची देते हैं। कई पंडित लागत मूल्य पर सामग्री किट भी देते हैं — यह लिस्टिंग पर दिखता है।",
        },
        {
          q: "कौन से शहर और भाषाएँ?",
          a: "PanditZ भारत भर के शहरों में सेवा देता है। आप पंडितों को भाषा — हिंदी, संस्कृत और क्षेत्रीय भाषाओं — से चुन सकते हैं।",
        },
      ],
    },
    legal: {
      privacyTitle: "गोपनीयता नीति",
      termsTitle: "सेवा की शर्तें",
      refundTitle: "रद्दीकरण व रिफंड नीति",
      body: {
        privacy: [
          "PanditZ collects only the information needed to arrange your ceremony — your name, contact details, city and ceremony preferences.",
          "Verification documents shared by pandits are used solely for identity and KYC checks and are never sold or shared with third parties for marketing.",
          "You may request a copy or deletion of your data at any time by writing to our support team.",
        ],
        terms: [
          "PanditZ is a platform that connects devotees with independent, verified priests. Booking requests are free; the final dakshina is agreed between you and your pandit before confirmation.",
          "Ceremonies are performed by independent pandits. PanditZ facilitates scheduling, verification and support, and is not a party to the religious service itself.",
          "Misuse of the platform, false information or harassment of pandits or staff leads to suspension of access.",
        ],
        refund: [
          "Booking requests carry no charge. If an advance was collected for a confirmed booking, it is fully refundable until the pandit confirms travel.",
          "Cancellations within 24 hours of the ceremony may be subject to a nominal samagri and travel fee, as agreed at booking time.",
          "Rescheduling is free once per booking, subject to your pandit's availability.",
        ],
      },
    },
  },
} satisfies typeof en;

export type Dict = typeof en;
export type Lang = "en" | "hi";

const LANG_KEY = "panditz:lang";

const I18nCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "en", setLang: () => {}, t: en });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return saved === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* private mode */
    }
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: lang === "hi" ? hi : en }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}
