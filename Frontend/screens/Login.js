import {Button, SafeAreaView, Text, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export default function Login()
{
    const theme=useColorScheme();
    const url = "https://bamx.azurewebsites.net/user/"+"casvi.sanchez@gmail.com/"+"admin"
    const[user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then(data =>{
                    AsyncStorageNative.setItem("KeepLoggedIn",JSON.stringify(true))
                    AsyncStorageNative.setItem('token',JSON.stringify(data.data))
                    setUser(data)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return(
        <SafeAreaView>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>Login</Text>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{user.name}</Text>
        </SafeAreaView>
    );
};