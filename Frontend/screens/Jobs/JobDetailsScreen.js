import { ScrollView, View } from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";
import { Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import * as React from "react";

const ApplyIcon = (props) => (
    <Icon
      {...props}
      name='paper-plane-outline'
    />
  );

const UsersIcon = (props) => (
    <Icon
      {...props}
      name='people-outline'
    />
  );

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

const OfferIcon = (props) => (
    <Icon
        style={{ width: 32, height: 32, margin: 10, padding: 10 }}
        fill="#8F9BB3"
        name='briefcase-outline'
    />
);

const ApplicationIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='clock-outline'
    />
);

export default function JobDetailsScreen() {
    const {userInformation}=useContext(AuthContext)
    const navigation=useNavigation();
    const {navigate}=useNavigation();

    const route=useRoute();
    const{params}=route;
    const job=params.job;
    const[alreadyApplied,setAlreadyApplied]=useState(true);
    useLayoutEffect(()=>
        {
            navigation.setOptions({
                headerTitle:job.name
            })
        }
        ,[])

    useFocusEffect(
        React.useCallback(() => {
            isUserApplying();
        }, [])
    );

    const handelApplyBtn=()=>
    {
        const url=BASE_URL+"/UserJobOffer/update/"+job.id+"/"+userInformation.id
        axios.post(url)
            .then(res => {
                navigation.goBack();
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const isUserApplying=()=>
    {
        const url=BASE_URL+"/UserJobOffer/"+job.id
        axios.get(url)
            .then(res => {
                userExistsInList(res.data)?setAlreadyApplied(true):setAlreadyApplied(false);
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    function userExistsInList(users) {
        for(let i=0;i<users.length; i++)
        {
            if(userInformation.id===users[i].id)
            {
                return true;
            }
        }
        return false;
    }

    return(
        <>
            <Layout
                style={{ paddingTop: 30 }}
                level='1'
                >
                <TopNavigation
                accessoryLeft={() => <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />}
                title='Atrás'
                />
                <Divider />
            </Layout>
            <ScrollView style={{ backgroundColor: "#F7F9FC" }}>
            <View style={{ width: "100%", paddingVertical: 18, paddingHorizontal: 30 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    {alreadyApplied ?
                        <ApplicationIcon/> : <OfferIcon/>
                    }
                    <Text category='h1'>{job.title}</Text>
                </View>
                <Text style={{ marginTop: 20, marginBottom: 6, fontWeight: 700 }} category="h6">Description</Text>
                <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>
                {userInformation.role === "admin"?
                    <Button accessoryLeft={<UsersIcon/>} size="large" style={{ width: "100%", marginTop: 20 }} onPress={()=>{navigate("UsersApplyingToJob",{job});}}>Usuarios</Button>:
                    (
                        !alreadyApplied &&
                    <Button accessoryLeft={<ApplyIcon/>} size="large" style={{ width: "100%", marginTop: 20 }} onPress={handelApplyBtn}>Apply</Button>
                    )
                }
            </View>
        </ScrollView>
        </>
    )
}