import {Button, FlatList, ScrollView, View} from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import Job from "../../components/Jobs/Job";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config";
import { Divider, Icon, Layout, List, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components"
import UserDetails from "../../components/Users/UserDetails";
import UserListItem from "../../components/Users/UserListItem";

const BackIcon = (props) => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );

const UsersIcon = (props) => (
    <Icon
        style={{ width: 32, height: 32, margin: 10, padding: 10 }}
        fill="#8F9BB3"
        name='people-outline'
    />
  );

export default function UsersApplyingToJob()
{
    const route=useRoute();
    const{params}=route;
    const job=params.job;
    const[users,setUsers]=useState({});
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            getUsers()
        }, [])
    );
    const getUsers=()=>
    {
        const url=BASE_URL+"/JobOffer/users/"+job.id
        axios.get(url)
            .then(res => {
                setUsers(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
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
        <View style={{ backgroundColor: "#F7F9FC" }}>
        <View style={{ width: "100%", paddingVertical: 18 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 30 }}>
                <UsersIcon/>
                <Text category='h1'>{job.title}</Text>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
                <Text style={{ marginTop: 20, marginBottom: 6, fontWeight: 700 }} category="h6">Usuarios</Text>
            </View>
        </View>
    </View>
            <List
                style={{ width: "100%" }}
                data={users}
                ItemSeparatorComponent={Divider}
                renderItem={({item}) => <UserListItem job={job} user={item}/>}
                keyExtractor={item => item.id}
                ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No Users applied</Text></View>}
            />
    </>
    )
}