import { Image, useColorScheme, View} from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import logo from "../lib/images/bamx.png"

export default function Login()
{
    const {login}= useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const [user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const goToRegister=()=>
    {
        navigation.navigate("Register")
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <Image
                style={{ width: 100, height: 100 }}
                source={logo}
            />
            <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"email"} onChangeText={setEmail} value={email}/>
            <TextInput secureTextEntry={true} style={{width: "100%" }} mode="outlined" placeholder={"password"} onChangeText={setPassword} value={password}/>
            <Button style={{width: "50%", margin: 10 }} mode="contained" onPress={()=>login({email,password})}>Login</Button>
            <Button style={{width: "50%" }} mode="outlined" onPress={goToRegister}>Register</Button>
        </View>
    );
};
