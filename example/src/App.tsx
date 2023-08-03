import { StyleSheet, View, Button } from 'react-native'
import AIHelp from 'react-native-aihelp'

export default function App() {
    return (
        <View style={styles.container}>
            <Button
                title='Open'
                onPress={() => {
                    AIHelp.show({ entranceId: 'THIS IS YOUR ENTRANCE ID' })
                }}
            />
            <Button
                title='Change Launguage'
                onPress={() => {
                    AIHelp.updateSDKLanguage(AIHelp.Language.zh_CN)
                }}
            />
            <Button
                title='Update UserInfo'
                onPress={() => {
                    AIHelp.updateUserInfo({ userName: 'YOUR NAME' })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
