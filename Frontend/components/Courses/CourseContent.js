import {SafeAreaView, Text, useColorScheme, View} from "react-native";

export default function CourseContent({course})
{

    return(
        <View>
            <Text>{course.title}</Text>
            <Text>{course.description}</Text>
        </View>
    );
}