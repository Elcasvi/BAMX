import {useNavigation, useRoute} from "@react-navigation/native";
import {useLayoutEffect} from "react";
import {SafeAreaView} from "react-native";
import CourseContent from "../../components/Courses/CourseContent";

export default function CourseDetailsScreen() {
    const navigation=useNavigation();
    const route=useRoute();
    const{params}=route;

    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:params.course.name
            })
        }
        ,[])

    return(
        <SafeAreaView>
            <CourseContent course={params.course}/>
        </SafeAreaView>
    )
}