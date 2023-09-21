import React, {createContext, useEffect, useState} from "react";
import {AsyncStorage} from "react-native";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import axios from "axios";
export const  AuthContext=createContext();
export const AuthProvider=({children})=>
{
    const[isLoading,setIsLoading]=useState(false)
    const[userToken,setUserToken]=useState(null)
    const login=({email,password})=>
    {
        console.log("email: "+email)
        console.log("password: "+password)
        setIsLoading(true)
        handleLogin(email,password)
        setIsLoading(false)
    }
    const handleLogin=(email,password)=>
    {
        console.log("Email: "+email)
        console.log("Password: "+password)
        const url = "https://bamx.azurewebsites.net/user/"+email+"/"+password
        console.log("Hi console");
        axios.get(url)
            .then(res => {
                //AsyncStorageNative.setItem("userToken","Carlos");
                console.log(res.data)
                AsyncStorageNative.setItem('userToken', JSON.stringify(res))
                    .then(() => {
                        // Code to execute after successfully setting the 'token' item
                        console.log("token' item set successfully");
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the set operation
                        console.error("Error setting 'token' item:", error);
                    });
                setUserToken(res);
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("Fetch error:", error);
            })
    }
    const logout=()=>
    {
        setIsLoading(true)
        setUserToken(null);
        AsyncStorageNative.removeItem("userToken");
        setIsLoading(false);
    }

    const isLogeddIn=async ()=>
    {
        try {
            setIsLoading(true)
            let userToken=await AsyncStorageNative.getItem("userToken")
            setUserToken(userToken)
            setIsLoading(false)
        }
        catch (error)
        {
            console.log("isLogged in error "+error);
        }

    }
    useEffect(() => {
        isLogeddIn();
    }, []);
    return(
        <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    );
}