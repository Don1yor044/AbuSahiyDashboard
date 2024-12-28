import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // React-i18next integratsiyasi
  .init({
    fallbackLng: "en", // Agar til topilmasa, ingliz tiliga qaytish
    debug: true, // I18next debug rejimini yoqish
    interpolation: {
      escapeValue: false, // React-da HTML o'zgartirishlari zarur emas
    },
    react: {
      useSuspense: false, // Suspense o'rnatilishi shart emas
    },
  });

export default i18n;
