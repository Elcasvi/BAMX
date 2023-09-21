import {Button, SafeAreaView, Text, TextInput, useColorScheme, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";


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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>Login</Text>
            <TextInput placeholder={"email"} onChangeText={setEmail} value={email}/>
            <TextInput placeholder={"password"} onChangeText={setPassword} value={password}/>
            <TextInput placeholder={"name"} onChangeText={setName} value={name}/>
            <Button title="Get Started!" onPress={handleRegisterBtn}/>
        </View>
    );
};