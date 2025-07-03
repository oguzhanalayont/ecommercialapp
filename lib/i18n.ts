import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  tr: {
    translation: {
      welcome: 'Hoşgeldiniz',
      create_account: 'Üyelik Oluşturun',
      'Login Page': 'Hesabınıza Giriş Yapın',
      register_prompt: 'Başlamak İçin Üye Olun',
      name: 'İsim',
      email: 'Email',
      password: 'Şifre',
      login: 'Giriş',
      register: 'Üye Ol',
      'You Dont Have Account': 'Hesabınız Yok Mu? Üye Olun',
      'Have Account': 'Hesabınız Varsa Giriş Yapın',
      logout_title: 'Çıkış',
      logout_confirm: 'Çıkış Yapmak İstediğinize Emin Misiniz?',
      cancel: 'İptal',
      logout: 'Çıkış',
      my_orders: 'Siparişlerim',
      wishlist: 'İstek Listesi',
      settings: 'Ayarlar',
      support: 'Yardım & Destek',
      categories_title: "Kategoriler",
      categories_subtitle: "Ürünleri Kategorilere Göre Keşfedin",
      products: "Ürünleri",
      home_subtitle: "Aradığınız Ürün Burada!",
      featured_products: "Öne Çıkan Ürünler",
      empty_title: "Sepetiniz Boş",
      empty_subtitle: "Sepetinize ürün ekleyin",
      start_shopping: "Alışverişe Başla",
      clear_all: "Hepsini Kaldır",
      clear_title: "Alışveriş Sepeti",
      clear_confirm: "Tüm ürünleri sepetten kaldırmak istediğinize emin misiniz?",
      clear: "Temizle",
      total: "Toplam:",
      checkout: "Alışverişi Tamamlayın",
      all_products: "Tüm Ürünler",

      // Ürünler
      product_1: "Bluetooth Kulaklık",
      product_2: "Akıllı Saat",
      product_3: "T-Shirt",
      product_4: "Kavrulmuş Çekirdek Kahve",
      product_5: "Led Masa Lambası",
      product_6: "Bel Çantası",
      product_7: "Yoga Matı",
      product_8: "Seramik Saksı Seti",

      // Kategoriler
      category_1: "Elektronik",
      category_2: "Giyim",
      category_3: "Ev & Bahçe",
      category_4: "Spor & Outdoor",
      category_5: "Gıda",
      category_6: "Aksesuar",

      tab_home: "Ana Sayfa",
      tab_categories: "Kategoriler",
      tab_cart: "Sepetim",
      tab_profile: "Profil",
    },
  },
  en: {
    translation: {
      welcome: 'Welcome',
      create_account: 'Create Account',
      'Login Page': 'Login to your account',
      register_prompt: 'Sign up to get started',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      register: 'Register',
      'You Dont Have Account': "Don't have an account? Sign up",
      'Have Account': 'Already have an account? Login',
      logout_title: 'Logout',
      logout_confirm: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      logout: 'Logout',
      my_orders: 'My Orders',
      wishlist: 'Wishlist',
      settings: 'Settings',
      support: 'Support & Help',
      categories_title: "Categories",
      categories_subtitle: "Explore Products by Category",
      products: "Products",
      home_subtitle: "Discover amazing products",
      featured_products: "Featured Products",
      empty_title: "Your Cart is Empty",
      empty_subtitle: "Add products to your cart",
      start_shopping: "Start Shopping",
      clear_all: "Clear All",
      clear_title: "Shopping Cart",
      clear_confirm: "Are you sure you want to remove all items from your cart?",
      clear: "Clear",
      total: "Total:",
      checkout: "Checkout",
      all_products: "All Products",

      // Ürünler
      product_1: "Bluetooth Headphones",
      product_2: "Smart Watch",
      product_3: "T-Shirt",
      product_4: "Roasted Coffee Beans",
      product_5: "LED Desk Lamp",
      product_6: "Belt Bag",
      product_7: "Yoga Mat",
      product_8: "Ceramic Pot Set",

      // Kategoriler
      category_1: "Electronics",
      category_2: "Clothing",
      category_3: "Home & Garden",
      category_4: "Sports & Outdoors",
      category_5: "Food",
      category_6: "Accessories",

      tab_home: "Home",
      tab_categories: "Categories",
      tab_cart: "Cart",
      tab_profile: "Profile",
    },
  },
};

const getDeviceLanguage = (): string => {
  const locales = Localization.getLocales();
  const primaryLocale = locales[0];
  if (!primaryLocale?.languageCode) {
    return 'en';
  }
  const deviceLang = primaryLocale.languageCode;
  return Object.keys(resources).includes(deviceLang) ? deviceLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const changeAppLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
};
