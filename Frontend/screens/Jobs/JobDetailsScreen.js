import { ScrollView, View } from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useContext, useLayoutEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import axios from "axios";
import { Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import * as React from "react";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
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
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: "500" }} category='s1'>{job.title}</Text>
            <Text style={{ fontWeight: "400" }} category='s1'>{job.description}</Text>

            {userInformation.role==="admin"?
                <Button style={{ width: "50%", marginTop: 8 }} onPress={()=>{navigate("UsersApplyingToJob",{job});}}>User</Button>:
                (
                    alreadyApplied?
                        <Text>Application in process...</Text>
                :
                <Button style={{ width: "50%", marginTop: 8 }} onPress={handelApplyBtn}>Apply</Button>
                )
            }
            </View>
        </ScrollView>
        </>
    )
}