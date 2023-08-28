import {Text, useColorScheme, View} from "react-native";

export default function AdminJobContent({job}) {
    const theme=useColorScheme();
    return(
        <View>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{job.name}</Text>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{job.description}</Text>
        </View>
    );
}