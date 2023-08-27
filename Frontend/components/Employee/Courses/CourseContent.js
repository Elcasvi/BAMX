import {SafeAreaView, Text, useColorScheme, View} from "react-native";

export default function CourseContent({course})
{
    const theme=useColorScheme();
    return(
        <View>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{course.name}</Text>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{course.description}</Text>
        </View>
    );
}