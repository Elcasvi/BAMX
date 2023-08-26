import {Text, View} from "react-native";

export default function JobContent({job}) {
    return(
        <View>
            <Text>{job.name}</Text>
            <Text>{job.description}</Text>
        </View>
    );
}