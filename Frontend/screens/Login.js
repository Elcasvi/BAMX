import {Button, SafeAreaView, Text, useColorScheme, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";

export default function Login()
{
    const theme=useColorScheme();
    const url = "https://bamx.azurewebsites.net/user/"+"casvi.sanchez@gmail.com/"+"admin"
    const[user,setUser]=useState({})
    const [loading,setLoading]=useState(false)

    function handleLoginBtn() {
        console.log("Hi console");
        fetch(url)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Network response was not ok");
                }
                return resp.json();
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
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("Fetch error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>Login</Text>
            <Text style={[{color:theme==="dark"?"#FFF":"#000"}]}>{user.name}</Text>
            <Button title="Log In" onPress={handleLoginBtn}/>
        </View>
    );
};
