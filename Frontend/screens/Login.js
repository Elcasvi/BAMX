import {Button, SafeAreaView, Text, TextInput, useColorScheme, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../context/AuthContext";

export default function Login()
{
    const {login}= useContext(AuthContext);
    const navigation=useNavigation();
    const theme=useColorScheme();
    const[user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const goToRegister=()=>
    {
        navigation.navigate("Register")
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>Login</Text>
            <TextInput placeholder={"email"} onChangeText={setEmail} value={email}/>
            <TextInput placeholder={"password"} onChangeText={setPassword} value={password}/>
            <Button title="Log In" onPress={()=>login({email,password})}/>
            <Button title="Register" onPress={goToRegister}/>
        </View>
    );
};
