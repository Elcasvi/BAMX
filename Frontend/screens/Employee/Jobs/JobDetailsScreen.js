import {SafeAreaView, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import JobContent from "../../../components/Employee/Jobs/JobContent";
import {useLayoutEffect} from "react";

export default function JobDetailsScreen() {
    const navigation=useNavigation();
    const route=useRoute();
    const{params}=route;

    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:params.job.name
            })
        }
        ,[])
    return(
        <SafeAreaView>
            <JobContent job={params.job}/>
        </SafeAreaView>
    )
}