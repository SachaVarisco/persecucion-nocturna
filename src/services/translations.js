import { EN_US, ES_AR } from '../enums/lenguages';

const PROJECT_ID = '47';
let translations = null;
let language = ES_AR;

export async function getTranslations(lang, callback) {
    localStorage.clear();
    translations = null;
    language = lang;
    if (language === ES_AR) {
        return callback ? callback() : false;
    }
    const res = await fetch(`https://traduci-la-strapi.herokuapp.com/api/translations/${PROJECT_ID}/${language}`)
    const data = await res.json()
    const devolverDatos = () => {
        localStorage.setItem('translations', JSON.stringify(data));
        translations = data; 
        if(callback) callback()
    };
    return  devolverDatos()
}

export function getPhrase(key) {
    if (!translations) {
        const locals = localStorage.getItem('translations');
        translations = locals ? JSON.parse(locals) : null;
    }

    let phrase = key;

    if (translations && translations[key]) {
        phrase = translations[key];
    }

    return phrase;
}

function isAllowedLanguge(language) {
    const allowedLanguages = [ES_AR, EN_US];
    return allowedLanguages.includes(language);
}

export function getLanguageConfig() {
    let languageConfig;

    // Obtener desde la URL el idioma
    console.log(window.location.href)

    const path = window.location.pathname !== '/' ? window.location.pathname : null;
    const params = new URL(window.location.href).searchParams;
    const queryLang = params.get('lang');

    languageConfig = path ?? queryLang;

    if (languageConfig) {
        if (isAllowedLanguge(languageConfig)) {
            return languageConfig;
        }
    }

    const browserLanguage = window.navigator.language;
    if (isAllowedLanguge(browserLanguage)) {
        return browserLanguage;
    }

    return ES_AR;
}