import {Text, View} from "react-native";

export default function JobsFeed() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Jobs Feed!</Text>
            <button onKeyPress={()=>nav}></button>
        </View>
    );
}

