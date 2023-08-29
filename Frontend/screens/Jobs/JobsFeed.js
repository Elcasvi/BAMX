import * as React from 'react';
import {FlatList, Image, Pressable, SafeAreaView, Text} from "react-native";
import {JobsDummy} from "../../data/JobsDummy";
import Job from "../../components/Jobs/Job";
import {useNavigation} from "@react-navigation/native";
import {useLayoutEffect} from "react";
export default function JobsFeedScreen() {
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
            <Text>Jobs Feed!</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Job job={item}/>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

    );
}


