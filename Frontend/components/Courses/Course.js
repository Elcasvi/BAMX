import {useNavigation} from "@react-navigation/native";
import {Pressable} from "react-native";
import CourseContent from "./CourseContent";
export default function Course({course})
{
    const navigation=useNavigation();
    return(
        <Pressable onPress={()=>navigation.navigate("CourseDetailsScreen",{course})}>
            <CourseContent course={course}/>
        </Pressable>
    );
}