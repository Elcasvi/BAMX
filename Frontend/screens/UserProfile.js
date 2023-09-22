import {View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {AuthContext} from "../context/AuthContext";
import { Button, Text } from "react-native-paper";

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
            <Text variant="displayMedium">Profile</Text>
            <Text variant="headlineSmall">{userInformation.name}</Text>
            <Button style={{ margin: 10 }} mode="contained" onPress={()=>logout()}>Log out</Button>
        </View>
    );
}

