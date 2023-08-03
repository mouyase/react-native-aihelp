import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import AIHelp from '../src'

AIHelp.init({
    appKey: 'THIS IS YOUR APP KEY',
    domain: 'THIS IS YOUR APP DOMAIN',
    appId: 'THIS IS YOUR APP ID',
})

AppRegistry.registerComponent(appName, () => App)
