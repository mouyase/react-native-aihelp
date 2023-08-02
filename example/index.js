import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import AIHelp from 'react-native-aihelp'

AIHelp.init(
    'THIS IS YOUR APP KEY',
    'THIS IS YOUR APP DOMAIN',
    'THIS IS YOUR APP ID',
    'THIS IS YOUR DEFAULT LANGUAGE(OPTIONAL)',
)

AppRegistry.registerComponent(appName, () => App)
