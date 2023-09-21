import {Button, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {AuthContext} from "../context/AuthContext";

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)

    const[data,setData]=useState({})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        let user=AsyncStorageNative.getItem("userToken")
        console.log(user)
        const url = "https://bamx.azurewebsites.net/user/"+1
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"#FFF"}}>User profile!</Text>
            <Text style={{color:"#FFF"}}>{data.name}</Text>
            <Button title="Log out" onPress={()=>logout()}/>
        </View>
    );
}

