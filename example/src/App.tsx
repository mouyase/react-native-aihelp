import { StyleSheet, View, Button } from 'react-native'
import AIHelp from 'react-native-aihelp'

export default function App() {
    return (
        <View style={styles.container}>
            <Button
                title='Open'
                onPress={() => {
                    AIHelp.show('THIS IS YOUR ENTRANCE ID')
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
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
