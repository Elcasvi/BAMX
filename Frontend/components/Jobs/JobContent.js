import {Text, useColorScheme, View} from "react-native";

export default function JobContent({job}) {
    const theme=useColorScheme();
    return(
        <View>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{job.title}</Text>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{job.description}</Text>
        </View>
    );
}