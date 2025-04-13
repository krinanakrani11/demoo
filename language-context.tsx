//contexts/language-context.tsx

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "gu" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  translations: Record<string, Record<string, string>>
  t: (key: string) => string
}

// Default translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    shopkeeperLogin: "Shopkeeper Login",
    adminLogin: "Admin Login",
    contact: "Contact",
    about: "About",

    // Common actions
    call: "Call",
    whatsapp: "WhatsApp",
    details: "Details",

    // Language names
    english: "English",
    gujarati: "Gujarati",
    hindi: "Hindi",
    selectLanguage: "Select Language",

    // Shop related
    shops: "Shops",
    categories: "Categories",
    findShops: "Find Shops",
    search: "Search",
    noShopsFound: "No shops found matching your criteria.",

    // Other common terms
    back: "Back",
    backToHome: "Back to Home",

    // Shopkeeper dashboard
    welcome: "Welcome",
    myShops: "My Shops",
    addNewShop: "Add New Shop",
    pendingApprovals: "Pending Approvals",
    approvedShops: "Approved Shops",
    rejectedShops: "Rejected Shops",
    shopName: "Shop Name",
    address: "Address",
    contact: "Contact",
    category: "Category",
    district: "District",
    images: "Images",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    submitting: "Submitting...",
  },
  gu: {
    // Navigation
    home: "હોમ",
    shopkeeperLogin: "દુકાનદાર લોગિન",
    adminLogin: "એડમિન લોગિન",
    contact: "સંપર્ક",
    about: "વિશે",

    // Common actions
    call: "કૉલ",
    whatsapp: "વોટ્સએપ",
    details: "વિગતો",

    // Language names
    english: "અંગ્રેજી",
    gujarati: "ગુજરાતી",
    hindi: "હિન્દી",
    selectLanguage: "ભાષા પસંદ કરો",

    // Shop related
    shops: "દુકાનો",
    categories: "શ્રેણીઓ",
    findShops: "દુકાનો શોધો",
    search: "શોધ",
    noShopsFound: "તમારા માપદંડ સાથે મેળ ખાતી કોઈ દુકાનો મળી નથી.",

    // Other common terms
    back: "પાછા",
    backToHome: "હોમ પર પાછા જાઓ",

    // Shopkeeper dashboard
    welcome: "સ્વાગત છે",
    myShops: "મારી દુકાનો",
    addNewShop: "નવી દુકાન ઉમેરો",
    pendingApprovals: "મંજૂરી બાકી",
    approvedShops: "મંજૂર દુકાનો",
    rejectedShops: "નકારેલી દુકાનો",
    shopName: "દુકાનનું નામ",
    address: "સરનામું",
    contact: "સંપર્ક",
    category: "શ્રેણી",
    district: "જિલ્લો",
    images: "છબીઓ",
    edit: "સંપાદિત કરો",
    delete: "કાઢી નાખો",
    save: "સાચવો",
    cancel: "રદ કરો",
    submit: "સબમિટ કરો",
    submitting: "સબમિટ કરી રહ્યા છીએ...",
  },
  hi: {
    // Navigation
    home: "होम",
    shopkeeperLogin: "दुकानदार लॉगिन",
    adminLogin: "एडमिन लॉगिन",
    contact: "संपर्क",
    about: "परिचय",

    // Common actions
    call: "कॉल",
    whatsapp: "व्हाट्सएप",
    details: "विवरण",

    // Language names
    english: "अंग्रेज़ी",
    gujarati: "गुजराती",
    hindi: "हिंदी",
    selectLanguage: "भाषा चुनें",

    // Shop related
    shops: "दुकानें",
    categories: "श्रेणियाँ",
    findShops: "दुकानें खोजें",
    search: "खोज",
    noShopsFound: "आपके मापदंडों से मेल खाती कोई दुकान नहीं मिली।",

    // Other common terms
    back: "वापस",
    backToHome: "होम पर वापस जाएं",

    // Shopkeeper dashboard
    welcome: "स्वागत है",
    myShops: "मेरी दुकानें",
    addNewShop: "नई दुकान जोड़ें",
    pendingApprovals: "अनुमोदन लंबित",
    approvedShops: "स्वीकृत दुकानें",
    rejectedShops: "अस्वीकृत दुकानें",
    shopName: "दुकान का नाम",
    address: "पता",
    contact: "संपर्क",
    category: "श्रेणी",
    district: "जिला",
    images: "छवियां",
    edit: "संपादित करें",
    delete: "हटाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    submitting: "जमा कर रहे हैं...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "gu", "hi"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  const value = {
    language,
    setLanguage,
    translations,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}