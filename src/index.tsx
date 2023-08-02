import { NativeModules, Platform } from 'react-native'

const LINKING_ERROR =
    `The package 'react-native-aihelp' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n'

const AIHelp = NativeModules.AIHelp
    ? NativeModules.AIHelp
    : new Proxy(
          {},
          {
              get() {
                  throw new Error(LINKING_ERROR)
              },
          },
      )

export enum CountryOrRegion {
    CN = AIHelp.COUNTRY_OR_REGION_CN,
    IN = AIHelp.COUNTRY_OR_REGION_IN,
}

/**
 * You can do the AIHelp initialization job by calling this method
 * @param appKey this is your app key
 * @param domain this is your app domain
 * @param appId this is your app id
 * @param language this is your default language(optional), language code click <a href="https://docs.aihelp.net/android/config/language.html#mapping">here</a>
 */
export function init(
    appKey: string,
    domain: string,
    appId: string,
    language = 'NONE',
): Promise<void> {
    return AIHelp.init(appKey, domain, appId, language)
}

/**
 *
 * @param entranceId
 * @param welcomeMessage
 */
export function show(entranceId: string, welcomeMessage = 'NONE') {
    return AIHelp.show(entranceId, welcomeMessage)
}

/**
 * AIHelp provides additional domain support for specific country or region
 * @param countryOrRegion To provide domain support for the following country or region: India, Mainland China
 */
export function additionalSupportFor(countryOrRegion: CountryOrRegion) {
    return AIHelp.additionalSupportFor(countryOrRegion)
}

export default {
    init,
    show,
    additionalSupportFor,
}
