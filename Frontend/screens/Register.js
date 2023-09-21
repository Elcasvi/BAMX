import {Button, SafeAreaView, Text, TextInput, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import {useNavigation} from "@react-navigation/native";


export default function Register()
{
    const navigation=useNavigation();
    const theme=useColorScheme();
    const[user,setUser]=useState({})
    const [loading,setLoading]=useState(false)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    function handleRegisterBtn() {
        const requestBody={
            Name:name,
            email: email,
            password: password,
            Role:"employee",
            Gender:"Male",
            Rating:0
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify JSON as the content type
                // You can include additional headers here if needed
            },
            body: JSON.stringify(requestBody), // Convert the JavaScript object to JSON
        };


        const url = "https://bamx.azurewebsites.net/user/"
        console.log("Hi console");
        fetch(url,requestOptions)
            .then(response=>{
                if(!response.ok) {
                    alert("Email or password not correct")
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                AsyncStorageNative.setItem("KeepLoggedIn", JSON.stringify(true))
                    .then(() => {
                        // Code to execute after successfully setting the item
                        console.log("KeepLoggedIn item set successfully");
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the set operation
                        console.error("Error setting KeepLoggedIn item:", error);
                    });

                AsyncStorageNative.setItem('token', JSON.stringify(data))
                    .then(() => {
                        // Code to execute after successfully setting the 'token' item
                        console.log("'token' item set successfully");
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the set operation
                        console.error("Error setting 'token' item:", error);
                    });

                setUser(data);
                navigation.navigate("Drawer")
            })
            .catch((error) => {
                // Handle fetch errors

                console.error("Fetch error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>Register</Text>
            <TextInput placeholder={"name"} onChangeText={setName} value={name}/>
            <TextInput placeholder={"email"} onChangeText={setEmail} value={email}/>
            <TextInput placeholder={"password"} onChangeText={setPassword} value={password}/>
            <Button title="Register" onPress={handleRegisterBtn}/>
        </View>
    );
};