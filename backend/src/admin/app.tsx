import type { StrapiApp } from '@strapi/strapi/admin';

export default {
    config: {
        locales: [
            // 'ar',
            // 'fr',
            // 'cs',
            // 'de',
            // 'dk',
            // 'es',
            // 'he',
            // 'id',
            // 'it',
            // 'ja',
            // 'ko',
            // 'ms',
            // 'nl',
            // 'no',
            // 'pl',
            // 'pt-BR',
            // 'pt',
            // 'ru',
            // 'sk',
            // 'sv',
            // 'th',
            'tr', // Added Turkish
            // 'uk',
            // 'vi',
            // 'zh-Hans',
            // 'zh',
        ],
        translations: {
            en: {
                "app.components.HomePage.welcome.title": "Hello NovaForma",
                "app.components.HomePage.welcomeBlock.content.again": "Welcome to your NovaForma administration panel",
                "app.components.LeftMenu.navbrand.title": "NovaForma",
                "app.components.LeftMenu.navbrand.workplace": "Workplace",
                "Auth.form.welcome.title": "Welcome to NovaForma",
                "Auth.form.welcome.subtitle": "Log in to your NovaForma account",
                "global.content-manager": "Content Manager",
            },
            tr: {
                "app.components.HomePage.welcome.title": "Merhaba NovaForma",
                "app.components.HomePage.welcomeBlock.content.again": "NovaForma yönetim paneline hoş geldiniz",
                "app.components.LeftMenu.navbrand.title": "NovaForma",
                "app.components.LeftMenu.navbrand.workplace": "Çalışma Alanı",
                "Auth.form.welcome.title": "NovaForma'ya Hoş Geldiniz",
                "Auth.form.welcome.subtitle": "NovaForma hesabınıza giriş yapın",
            }
        },
        // theme: {
        //   light: {
        //     colors: {
        //       primary100: '#f0f9ff',
        //       primary200: '#e0f2fe',
        //       primary500: '#0ea5e9',
        //       primary600: '#0284c7',
        //       primary700: '#0369a1',
        //       buttonPrimary100: '#f0f9ff',
        //       buttonPrimary200: '#e0f2fe',
        //       buttonPrimary500: '#0ea5e9',
        //       buttonPrimary600: '#0284c7',
        //     },
        //   },
        // },
    },
    bootstrap(app: StrapiApp) {
        console.log(app);
    },
};
