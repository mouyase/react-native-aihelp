import { NativeModules, Platform } from 'react-native'

const LINKING_ERROR =
    `The package 'react-native-aihelp' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n'

const NativeAIHelp = NativeModules.AIHelp
    ? NativeModules.AIHelp
    : new Proxy(
          {},
          {
              get() {
                  throw new Error(LINKING_ERROR)
              },
          },
      )

enum CountryOrRegion {
    CN = NativeAIHelp.COUNTRY_OR_REGION_CN,
    IN = NativeAIHelp.COUNTRY_OR_REGION_IN,
}

enum Language {
    en = 'en',
    ru = 'ru',
    ja = 'ja',
    zh_TW = 'zh-TW',
    zh_CN = 'zh-CN',
    ar = 'ar',
    de = 'de',
    fr = 'fr',
    ko = 'ko',
    pt = 'pt',
    th = 'th',
    tr = 'tr',
    id = 'id',
    es = 'es',
    vi = 'vi',
    it = 'it',
    pl = 'pl',
    nl = 'nl',
    fa = 'fa',
    ro = 'ro',
    tl = 'tl',
    ms = 'ms',
    cs = 'cs',
    el = 'el',
    hu = 'hu',
    sv = 'sv',
    hi = 'hi',
    te = 'te',
    bn = 'bn',
    ta = 'ta',
    nb = 'nb',
    my = 'my',
    sq = 'sq',
    bs = 'bs',
    hr = 'hr',
    da = 'da',
    fi = 'fi',
    he = 'he',
    km = 'km',
    sr_SP = 'sr-SP',
    sr_CS = 'sr-CS',
    uk = 'uk',
}

interface iPropUserInfo {
    userId?: string
    userName?: string
    serverId?: string
    userTags?: string
    customData?: Object
}

interface iPropInit {
    appKey: string
    domain: string
    appId: string
    language?: Language //language code click <a href="https://docs.aihelp.net/android/config/language.html#mapping">here</a>
}

interface iPropShow {
    entranceId: string
    welcomeMessage?: string
}

const AIHelp = (() => {
    let isInitSuccess = false
    return {
        CountryOrRegion: CountryOrRegion,
        Language: Language,
        /**
         * You can do the AIHelp initialization job by calling this method
         * @param prop
         */
        init: function (prop: iPropInit) {
            let language = prop.language ? prop.language : 'SYSTEM'
            NativeAIHelp.init(prop.appKey, prop.domain, prop.appId, language)
                .then(() => {
                    isInitSuccess = true
                })
                .catch((err: Error) => {
                    console.error(err.message)
                    isInitSuccess = false
                })
        },
        /**
         * You can set up a customer service entrance in AIHelp dashboard, and use the provided entrance ID to access AIHelp' customer service module
         * @param prop
         */
        show: function (prop: iPropShow) {
            if (isInitSuccess) {
                let welcomeMessage = prop.welcomeMessage
                    ? prop.welcomeMessage
                    : 'NONE'
                NativeAIHelp.show(prop.entranceId, welcomeMessage)
            }
        },
        /**
         * AIHelp provides additional domain support for specific country or region
         * @param countryOrRegion To provide domain support for the following country or region: India, Mainland China
         */
        additionalSupportFor: function (countryOrRegion: CountryOrRegion) {
            if (isInitSuccess) {
                NativeAIHelp.additionalSupportFor(countryOrRegion)
            }
        },
        /**
         * Call this method to actively update the language for the SDK.
         * @param language
         */
        updateSDKLanguage: function (language: Language) {
            if (isInitSuccess) {
                NativeAIHelp.updateSDKLanguage(language)
            }
        },
        /**
         * You can call this method to update user information when users log in, and you can transfer more information through field customdata & usertags.
         * @param prop
         */
        updateUserInfo: function (prop: iPropUserInfo) {
            if (isInitSuccess) {
                let userId = prop.userId ? prop.userId : 'NONE'
                let userName = prop.userName ? prop.userName : 'NONE'
                let serverId = prop.serverId ? prop.serverId : 'NONE'
                let userTags = prop.userTags ? prop.userTags : 'NONE'
                let customData = prop.customData
                    ? JSON.stringify(prop.customData)
                    : 'NONE'
                NativeAIHelp.updateUserInfo(
                    userId,
                    userName,
                    serverId,
                    userTags,
                    customData,
                )
            }
        },
        /**
         * Call this method to inform AIHelp when user logs out to ensure the accuracy for tourist-user's information.
         */
        resetUserInfo: function () {
            if (isInitSuccess) {
                NativeAIHelp.resetUserInfo()
            }
        },
    }
})()

export default AIHelp
