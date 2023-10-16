import * as React from "react";
import {View} from "react-native";
import {Button, Text} from "@ui-kitten/components"
import {AuthContext} from "../../context/AuthContext";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect} from "react";
import {Card} from "react-native-paper";

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
        <View style={{ width: "100%", paddingVertical: 8, paddingHorizontal: 40 }}>
            <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
                <Card.Title titleStyle={{ fontWeight: "500" }} titleVariant="headlineMedium" title={job.title} />
                <Card.Content>
                    <Text variant="bodyMedium">{job.enterprise}</Text>
                </Card.Content>
            </Card>
            <Card style={{ marginHorizontal: 8, marginVertical: 2 }} mode="outlined">
                <Text style={{ fontWeight: 'bold', fontSize: 16 ,margin:10}}>Descripción</Text>
                <Card.Content>
                    <Text variant="bodyMedium">{job.description}</Text>
                </Card.Content>
            </Card>
        </View>
    )
}