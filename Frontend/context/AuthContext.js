import React, {createContext, useEffect, useState} from "react";
import {BASE_URL} from "../config";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import axios from "axios";
export const  AuthContext=createContext();
export const AuthProvider=({children})=>
{
    const[isLoading,setIsLoading]=useState(false)
    const[userInformation,setUserInformation]=useState(null);
    const login=({email,password})=>
    {
        setIsLoading(true)
        handleLogin(email,password)
        setIsLoading(false)
    }
    const handleLogin=(email,password)=>
    {
        console.log("Email: "+email)
        console.log("Password: "+password)
        const url = BASE_URL+"/user/"+email+"/"+password
        console.log("Hi console");
        axios.get(url)
            .then(res => {
                let userInfo=res.data
                setUserInformation(userInfo)
                AsyncStorageNative.setItem('userInformation', JSON.stringify(userInfo))
                    .then(() => {
                        // Code to execute after successfully setting the 'token' item
                        console.log("user' information set successfully");
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the set operation
                        console.error("Error setting 'token' item:", error);
                    });
            })
            .catch((error) => {
                // Handle fetch errors
                //console.error("Fetch error:", error);
                alert("Email or password not correct")
            })
    }
    const register=({userBody})=>
    {
        setIsLoading(true)
        handleRegister(userBody)
        setIsLoading(false)
    }
    const handleRegister=(userBody)=>
    {
        const url = BASE_URL+"/user"
        axios.post(url,userBody)
            .then(res => {
                let userInfo=res.data
                setUserInformation(userInfo)
                AsyncStorageNative.setItem('userInformation', JSON.stringify(userInfo))
                    .then(() => {
                        // Code to execute after successfully setting the 'token' item
                        console.log("user' information set successfully");
                    })
                    .catch((error) => {
                        // Handle any errors that occur during the set operation
                        console.error("Error setting 'token' item:", error);
                    });
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("Fetch error:", error);
                //alert("Email or password not correct")
            })
    }

    const logout=()=>
    {
        setIsLoading(true)
        setUserInformation(null);
        AsyncStorageNative.removeItem("userInformation");
        setIsLoading(false);
    }

    const isLogeddIn=async ()=>
    {
        try {
            setIsLoading(true)
            let userInformation=await AsyncStorageNative.getItem("userInformation")
            userInformation=JSON.parse(userInformation)
            if(userInformation)
            {
                setUserInformation(userInformation)
            }
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
        <AuthContext.Provider value={{login,register,logout,isLoading,userInformation}}>
            {children}
        </AuthContext.Provider>
    );
}