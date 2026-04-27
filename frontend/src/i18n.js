import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      "brand": "FarmNex Market",
      "login": "Login",
      "register": "Register",
      "sellerDashboard": "Seller Dashboard",
      "adminPanel": "Admin Panel",
      "logout": "Logout",

      // Home Hero
      "indiaNumberOne": "India's #1 Agricultural Marketplace",
      "discoverPerfect": "Discover Your Perfect",
      "landAndFarm": "Land & Farm",
      "heroSubtitle": "Connect directly with verified sellers. No middlemen. No hassle.",
      "browseListings": "Browse Listings",
      "farmnexCare": "FarmNex Care",
      
      // Home Search
      "whereLooking": "Where are you looking?",
      "searchPlaceholder": "Enter city, district or state...",
      "findProperties": "Find Properties",

      // Home Stats
      "activeProperties": "Active Properties",
      "verifiedSellers": "Verified Sellers",
      "secureTransactions": "Secure Transactions",

      // Home Features
      "whyChoose": "Why Choose FarmNex?",
      "whyChooseSubtitle": "We provide a transparent, efficient, and highly secure platform tailored specifically for agricultural real estate.",
      
      "featureVerified": "Verified Listings",
      "featureVerifiedDesc": "Every property undergoes strict verification to ensure authenticity, giving you complete peace of mind before you invest.",
      
      "featureNegotiation": "Direct Negotiation",
      "featureNegotiationDesc": "Communicate directly with property owners. Bypass middlemen and brokers to secure the absolute best deal.",
      
      "featureLocations": "Prime Locations",
      "featureLocationsDesc": "Discover highly fertile, premium agricultural land in top growing regions across India with detailed geographic insights.",

      // Home CTA
      "readyToFind": "Ready to find your dream farm?",
      "ctaSubtitle": "Join thousands of buyers and sellers already using FarmNex to revolutionize agricultural real estate.",
      "createFreeAccount": "Create Free Account"
    }
  },
  hi: {
    translation: {
      // Navbar
      "brand": "फार्मनेक्स मार्केट",
      "login": "लॉग इन",
      "register": "रजिस्टर करें",
      "sellerDashboard": "विक्रेता डैशबोर्ड",
      "adminPanel": "व्यवस्थापक पैनल",
      "logout": "लॉग आउट",

      // Home Hero
      "indiaNumberOne": "भारत का नंबर 1 कृषि बाज़ार",
      "discoverPerfect": "अपनी आदर्श खोजें",
      "landAndFarm": "कृषि भूमि और खेत",
      "heroSubtitle": "सीधे सत्यापित विक्रेताओं से जुड़ें। कोई बिचौलिया नहीं। कोई परेशानी नहीं।",
      "browseListings": "संपत्तियां देखें",
      "farmnexCare": "फार्मनेक्स केयर",
      
      // Home Search
      "whereLooking": "आप कहाँ खोज रहे हैं?",
      "searchPlaceholder": "शहर, जिला या राज्य दर्ज करें...",
      "findProperties": "संपत्तियां खोजें",

      // Home Stats
      "activeProperties": "सक्रिय संपत्तियां",
      "verifiedSellers": "सत्यापित विक्रेता",
      "secureTransactions": "सुरक्षित लेनदेन",

      // Home Features
      "whyChoose": "फार्मनेक्स ही क्यों?",
      "whyChooseSubtitle": "हम कृषि अचल संपत्ति के लिए विशेष रूप से पारदर्शी, कुशल और अत्यधिक सुरक्षित मंच प्रदान करते हैं।",
      
      "featureVerified": "सत्यापित संपत्तियां",
      "featureVerifiedDesc": "प्रामाणिकता सुनिश्चित करने के लिए हर संपत्ति का सख्त सत्यापन होता है, ताकि निवेश से पहले आपको पूरी शांति मिले।",
      
      "featureNegotiation": "सीधी बातचीत",
      "featureNegotiationDesc": "संपत्ति के मालिकों से सीधे संवाद करें। बेहतरीन सौदा पाने के लिए बिचौलियों और दलालों से बचें।",
      
      "featureLocations": "प्रमुख स्थान",
      "featureLocationsDesc": "भारत के शीर्ष कृषि क्षेत्रों में विस्तृत भौगोलिक जानकारी के साथ अत्यधिक उपजाऊ, प्रीमियम कृषि भूमि खोजें।",

      // Home CTA
      "readyToFind": "क्या आप अपना सपनों का खेत खोजने के लिए तैयार हैं?",
      "ctaSubtitle": "कृषि अचल संपत्ति में क्रांति लाने के लिए पहले से ही फार्मनेक्स का उपयोग कर रहे हजारों खरीदारों और विक्रेताओं से जुड़ें।",
      "createFreeAccount": "मुफ्त खाता बनाएं"
    }
  },
  mr: {
    translation: {
      // Navbar
      "brand": "फार्मनेक्स मार्केट",
      "login": "लॉग इन",
      "register": "नोंदणी करा",
      "sellerDashboard": "विक्रेता डॅशबोर्ड",
      "adminPanel": "अ‍ॅडमिन पॅनेल",
      "logout": "लॉग आउट",

      // Home Hero
      "indiaNumberOne": "भारतातील नंबर 1 कृषी बाजारपेठ",
      "discoverPerfect": "तुमची परिपूर्ण",
      "landAndFarm": "जमीन आणि शेती शोधा",
      "heroSubtitle": "थेट सत्यापित विक्रेत्यांशी संपर्क साधा. कोणतेही मध्यस्थ नाहीत. कोणताही त्रास नाही.",
      "browseListings": "मालमत्ता पहा",
      "farmnexCare": "फार्मनेक्स केअर",
      
      // Home Search
      "whereLooking": "तुम्ही कुठे शोधत आहात?",
      "searchPlaceholder": "शहर, जिल्हा किंवा राज्य प्रविष्ट करा...",
      "findProperties": "मालमत्ता शोधा",

      // Home Stats
      "activeProperties": "सक्रिय मालमत्ता",
      "verifiedSellers": "सत्यापित विक्रेते",
      "secureTransactions": "सुरक्षित व्यवहार",

      // Home Features
      "whyChoose": "फार्मनेक्स का निवडावे?",
      "whyChooseSubtitle": "आम्ही कृषी रिअल इस्टेटसाठी विशेषतः पारदर्शक, कार्यक्षम आणि अत्यंत सुरक्षित व्यासपीठ प्रदान करतो.",
      
      "featureVerified": "सत्यापित मालमत्ता",
      "featureVerifiedDesc": "गुंतवणूक करण्यापूर्वी तुम्हाला पूर्ण शांती मिळावी यासाठी सत्यतेची खात्री करण्यासाठी प्रत्येक मालमत्तेची कठोर पडताळणी केली जाते.",
      
      "featureNegotiation": "थेट बोलणी",
      "featureNegotiationDesc": "मालमत्ता मालकांशी थेट संवाद साधा. सर्वोत्तम व्यवहार सुरक्षित करण्यासाठी मध्यस्थ आणि दलालांना टाळा.",
      
      "featureLocations": "प्रमुख ठिकाणे",
      "featureLocationsDesc": "तपशीलवार भौगोलिक माहितीसह भारतातील सर्वोच्च कृषी क्षेत्रांमध्ये अत्यंत सुपीक, प्रीमियम शेतजमीन शोधा.",

      // Home CTA
      "readyToFind": "तुमचे स्वप्नातील शेत शोधण्यासाठी तयार आहात?",
      "ctaSubtitle": "कृषी रिअल इस्टेटमध्ये क्रांती घडवून आणण्यासाठी आधीच फार्मनेक्सचा वापर करत असलेल्या हजारो खरेदीदार आणि विक्रेत्यांमध्ये सामील व्हा.",
      "createFreeAccount": "मोफत खाते तयार करा"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
