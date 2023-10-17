import {FlatList, ScrollView, View} from "react-native";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {BASE_URL} from "../../config";
import axios from "axios";
import UserDetails from "../../components/Users/UserDetails";
import { Divider, Icon, Layout, List, TopNavigation, TopNavigationAction, Text } from "@ui-kitten/components";

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

export default function UsersEnrolledToCourse()
{
    const route=useRoute();
    const{params}=route;
    const course=params.course;
    const navigation = useNavigation()
    const[users,setUsers]=useState({});
    useFocusEffect(
        useCallback(() => {
            getUsers()
        }, [])
    );
    const getUsers=()=>
    {
        const url=BASE_URL+"/Course/users/"+course.id
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
                <Text category='h1'>{course.title}</Text>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
                <Text style={{ marginTop: 20, marginBottom: 6, fontWeight: 700 }} category="h6">Usuarios</Text>
            </View>


            <List
                style={{ width: "100%" }}
                data={users}
                ItemSeparatorComponent={Divider}
                renderItem={({item}) => <UserDetails user={item}/>}
                keyExtractor={item => item.id}
                ListEmptyComponent={<View style={{ height: 200, width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}><Text appearance='hint' category='s1'>No Users enrolled</Text></View>}
                />

        </View>
    </View>
    </>
    );
}