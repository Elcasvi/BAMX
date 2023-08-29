import * as React from 'react';
import {Button, FlatList, Image, Pressable, SafeAreaView, Text} from "react-native";
import {JobsDummy} from "../../data/JobsDummy";
import Job from "../../components/Jobs/Job";
import {useNavigation} from "@react-navigation/native";
import {useLayoutEffect} from "react";
import {UserDummy} from "../../data/UserDummy";
export default function JobsFeedScreen() {
    const USER=UserDummy
    const DATA=JobsDummy
    const navigation=useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <Pressable onPress={()=> navigation.openDrawer()}>
                    <Image
                        source={require("../../assets/profile.jpeg")}
                        style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }}
                    />
                </Pressable>
            ),
        });
    },[]);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {USER.role==="admin"?
            <Button
                title="New Job"
                onPress={()=>navigation.navigate("CreateJobScreen")}
            />:<></>
            }
            <FlatList
                data={DATA}
                renderItem={({item}) => <Job job={item}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}


