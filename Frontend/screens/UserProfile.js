import {Button, Text, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export default function UserProfile({navigation}) {

    const url = "https://bamx.azurewebsites.net/user/1"
    const[data,setData]=useState({})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const handleOnLogOutBtn=()=>
    {
        console.log("log out")
        AsyncStorageNative.setItem("KeepLoggedIn","")
        AsyncStorageNative.setItem("token","")
        navigation.navigate("Login")
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:"#FFF"}}>User profile!</Text>
            <Text style={{color:"#FFF"}}>{data.name}</Text>
            <Button title="Log out" onPress={handleOnLogOutBtn}/>
        </View>
    );
}

