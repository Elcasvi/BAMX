import React, {createContext, useEffect, useState} from "react";
import {BASE_URL} from "../config";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import axios, {post} from "axios";
export const  AuthContext=createContext();
export const AuthProvider=({children})=>
{
    const[isLoading,setIsLoading]=useState(false)
    const[userInformation,setUserInformation]=useState(null);
    const[userBodyInfo,setUserBodyInfo]=useState(null);
    const[blobInformationCV,setBlobInformationCV]=useState(null);
    const[blobInformationImg,setBlobInformationImg]=useState(null);
    const[updatedUserInformation,setUpdatedUserInformation]=useState(null);
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
                console.log(userInfo)
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
        setUserBodyInfo(userBody)
        registerUser(userBody)
        setIsLoading(false)
    }
    const registerUser=(userBody) => {
        console.log("Inside of registerUser")
        const urlUser = BASE_URL + "/user"
        const userBodyDto =
            {
                Name: userBody.Name,
                Email: userBody.Email,
                Password: userBody.Password,
                Role: userBody.Role,
                Gender: userBody.Gender,
                Rating: userBody.Rating,
                Description: userBody.Description
            }

        axios.post(urlUser, userBodyDto)
            .then(res => {
                let userInfo = res.data
                setUserInformation(userInfo)
                console.log("After useState")
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("Fetch error:", error);
                //alert("Email or password not correct")
            })

    }

    useEffect(()=>{
        if(userInformation!==null)
        {
            addBlobStorage(userBodyInfo);
        }
    },[userInformation])

    useEffect(()=>{
        if(userInformation!==null)
        {
            updateUser(userBodyInfo);
            console.log("Outside of updateUser")

            saveUserInfoInAsyncStorage();
        }
    },[blobInformationImg])

    useEffect(()=>{
        if(updatedUserInformation!==null)
        {
            saveUserInfoInAsyncStorage();
        }
    },[updatedUserInformation])





    const addBlobStorage=async(userBody)=>
    {
        const urlBlobCV = BASE_URL+"/BlobStorage/"+userInformation.id
        axios.post(urlBlobCV,userBody.FormDataCV, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                setBlobInformationCV(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })

        const urlBlobImg = BASE_URL+"/BlobStorage/"+userInformation.id
        axios.post(urlBlobImg,userBody.FormDataImg, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                setBlobInformationImg(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })

    }
    const updateUser=(userBody)=>
    {
        console.log("Inside of updateUser")
        const urlUpdateUser=BASE_URL+"/update/userId/"+userInformation.id
        const userUpdatedBodyDto=
            {
                Id:userInformation.id,
                Name: userBody.Name,
                Email: userBody.Email,
                Password: userInformation.password,
                Role:userBody.Role,
                Gender: userBody.Gender,
                Rating: userBody.Rating,
                Description:userBody.Description,
                CVUrl:blobInformationCV.url,
                NameOfCV:blobInformationCV.fileName,
                ProfilePictureUrl:blobInformationImg.url,
                NameOfProfilePicture:blobInformationImg.fileName
            }
        axios.put(urlUpdateUser,userUpdatedBodyDto)
            .then(res => {
                let userInfo=res.data
                setUpdatedUserInformation(userInfo)

            })
            .catch((error) => {
                console.error("Fetch error:", error);
            })
    }
    const saveUserInfoInAsyncStorage=()=>
    {
        AsyncStorageNative.setItem('userInformation', JSON.stringify(userInformation))
            .then(() => {
                // Code to execute after successfully setting the 'token' item
                console.log("user' information set successfully");
            })
            .catch((error) => {
                // Handle any errors that occur during the set operation
                console.error("Error setting 'token' item:", error);
            });
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