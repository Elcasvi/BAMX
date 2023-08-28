import {useNavigation, useRoute} from "@react-navigation/native";
import {useLayoutEffect} from "react";
import {SafeAreaView} from "react-native";
import AdminJobContent from "../../../components/Admin/AdminJobContent";

export default function AdminCourseDetailsScreen()
{
    const navigation=useNavigation();
    const route=useRoute();
    const {params}=route;
    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:params.course.name
            })
        }
        ,[])
    return(
        <SafeAreaView>
            <AdminCourseContent course={params.course}/>
        </SafeAreaView>
    )
};