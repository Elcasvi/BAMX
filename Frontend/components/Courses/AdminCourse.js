import {useNavigation} from "@react-navigation/native";
import {Pressable} from "react-native";
import AdminCourseContent from "./AdminCourseContent";
export default function AdminCourse({course})
{
    const navigation=useNavigation();
    return(
        <Pressable onPress={()=>navigation.navigate("CourseDetailsScreen",{course})}>
            <AdminCourseContent course={course}/>
        </Pressable>
    );
}