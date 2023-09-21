import {Button, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {AuthContext} from "../context/AuthContext";

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"#FFF"}}>User profile!</Text>
            <Text style={{color:"#FFF"}}>{userInformation.name}</Text>
            <Button title="Log out" onPress={()=>logout()}/>
        </View>
    );
}

