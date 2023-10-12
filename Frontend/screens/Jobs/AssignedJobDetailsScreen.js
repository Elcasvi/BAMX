import * as React from "react";
import {View} from "react-native";
import { Text } from "@ui-kitten/components"
import {AuthContext} from "../../context/AuthContext";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect} from "react";

export default function AssignedJobDetailsScreen() {
    const {userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    const {navigate}=useNavigation();

    const route=useRoute();
    const{params}=route;
    const job=params.job;
    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:job.name
            })
        }
        ,[])

    useFocusEffect(
        React.useCallback(() => {

        }, [])
    );




    return(
        <View style={{ alignItems: 'center', width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
            <Text style={{ fontWeight: "500" }} category='s1'>{job.title}</Text>
            <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>

        </View>
    )
}