import { Image, SafeAreaView, useColorScheme, View} from "react-native";
import { Text, TextInput, Button } from 'react-native-paper';
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";
import logo from "../lib/images/bamx.png"

export default function Register()
{
    const{register}=useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const[user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    function handleRegisterBtn() {
        const userBody={
            Name:name,
            email: email,
            password: password,
            Role:"employee",
            Gender:"Male",
            Rating:0
        };
        register({userBody})
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <Image
                style={{ width: 100, height: 100 }}
                source={logo}
            />
            <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"email"} onChangeText={setEmail} value={email}/>
            <TextInput secureTextEntry={true} style={{width: "100%" }} mode="outlined" placeholder={"password"} onChangeText={setPassword} value={password}/>
            <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"name"} onChangeText={setName} value={name}/>
            <Button style={{width: "50%" }} mode="contained" onPress={handleRegisterBtn}>Register</Button>
        </View>
    );
};