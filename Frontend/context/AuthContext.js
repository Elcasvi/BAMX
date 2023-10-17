import React, {createContext, useEffect, useState} from "react";
import {BASE_URL} from "../config";
import AsyncStorageNative from "@react-native-async-storage/async-storage/src/AsyncStorage.native";
import axios, {post} from "axios";
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
                alert("Email or password not correct")
            })
    }


    const register=({userBody})=>
    {
        setIsLoading(true)
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

                if(userBody.FormDataCV!==null || userBody.FormDataImg!==null)
                {
                    console.log("Inside of adding blob storage")
                    addBlobStorage(userBody,userInfo)
                }
                else{
                    saveUserInfoInAsyncStorage(userInfo)
                }
            })
            .catch((error) => {
                // Handle fetch errors
                console.error("Fetch error:", error);
                //alert("Email or password not correct")
            })

    }

    const addBlobStorage=async (userBody,userInfo)=>
    {
        console.log("userBody:")
        console.log(userBody)
        const urlBlob = BASE_URL + "/BlobStorage/" + userInfo.id;
        if(userBody.FormDataCV!==null && userBody.FormDataImg!==null)
        {
            console.log("Inside of FormDataCV!==null && FormDataImg!==null")
            axios.post(urlBlob, userBody.FormDataCV, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    const blobInfo={
                        CVUrl:res.data.url,
                        NameOfCV:res.data.fileName,
                        ProfilePictureUrl:null,
                        NameOfProfilePicture:null
                    }

                    //-------------------------------------------------------------------------------------
                    axios.post(urlBlob, userBody.FormDataImg, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(response=>{
                            blobInfo.ProfilePictureUrl=response.data.url
                            blobInfo.NameOfProfilePicture=response.data.fileName
                            updateUser(userInfo,blobInfo,"Both")
                        })

                })
                .catch((er)=>{
                    alert(er);
                })
                //-------------------------------------------------------------------------------------



                .catch((error) => {
                    alert(error);
                })
        }

        if(userBody.FormDataCV!==null && userBody.FormDataImg===null)
        {
            console.log("Inside of FormDataCV!==null && FormDataImg===null")
            axios.post(urlBlob, userBody.FormDataCV, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    const blobInfo=res.data
                    updateUser(userInfo,blobInfo,"FormDataCV")
                })
                .catch((error) => {
                    alert(error);
                })
        }

        if(userBody.FormDataCV===null && userBody.FormDataImg!==null)
        {
            console.log("Inside of FormDataCV===null && FormDataImg!==null")
            axios.post(urlBlob, userBody.FormDataImg, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(res => {
                    const blobInfo=res.data
                    updateUser(userInfo,blobInfo,"FormDataImg")
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }


    const updateUser=(userInfo,blobInfo,identifier)=>
    {
        console.log("Inside of Update user")

        const urlUpdateUser=BASE_URL+"/update/userId/"+userInfo.id
        if(identifier==="FormDataCV")
        {
            console.log("Case FormDataCV")
            const userUpdatedBodyDto=
                {
                    Id: userInfo.id,
                    Name: userInfo.name,
                    Email: userInfo.email,
                    Password: userInfo.password,
                    Role: userInfo.role,
                    Gender: userInfo.gender,
                    Rating: userInfo.rating,
                    Description: userInfo.description,
                    CvUrl: blobInfo.url,
                    NameOfCV: blobInfo.fileName,
                    ProfilePictureUrl: null,
                    NameOfProfilePicture: null,
                    AssignedJobs: null,
                    UserCourses: null,
                    UserJobOffers: null
                }
            axios.put(urlUpdateUser,userUpdatedBodyDto)
                .then(res => {
                    let updatedUserInfo=res.data
                    saveUserInfoInAsyncStorage(updatedUserInfo)

                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                })
        }
        else if(identifier==="FormDataImg")
        {
            console.log("Case FormDataImg")
            const userUpdatedBodyDto=
                {
                    Id: userInfo.id,
                    Name: userInfo.name,
                    Email: userInfo.email,
                    Password: userInfo.password,
                    Role: userInfo.role,
                    Gender: userInfo.gender,
                    Rating: userInfo.rating,
                    Description: userInfo.description,
                    CvUrl: null,
                    NameOfCV: null,
                    ProfilePictureUrl: blobInfo.url,
                    NameOfProfilePicture: blobInfo.fileName,
                    AssignedJobs: null,
                    UserCourses: null,
                    UserJobOffers: null
                }
            axios.put(urlUpdateUser,userUpdatedBodyDto)
                .then(res => {
                    let updatedUserInfo=res.data
                    saveUserInfoInAsyncStorage(updatedUserInfo)

                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                })
        }
        else if(identifier==="Both")
        {
            console.log("case Both")
            const userUpdatedBodyDto=
                {
                    Id: userInfo.id,
                    Name: userInfo.name,
                    Email: userInfo.email,
                    Password: userInfo.password,
                    Role: userInfo.role,
                    Gender: userInfo.gender,
                    Rating: userInfo.rating,
                    Description: userInfo.description,
                    CvUrl: blobInfo.CVUrl,
                    NameOfCV: blobInfo.NameOfCV,
                    ProfilePictureUrl: blobInfo.ProfilePictureUrl,
                    NameOfProfilePicture: blobInfo.NameOfProfilePicture,
                    AssignedJobs: null,
                    UserCourses: null,
                    UserJobOffers: null
                }
            axios.put(urlUpdateUser,userUpdatedBodyDto)
                .then(res => {
                    let updatedUserInfo=res.data
                    saveUserInfoInAsyncStorage(updatedUserInfo)

                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                })
        }



    }
    const saveUserInfoInAsyncStorage=(updatedUserInfo)=>
    {
        console.log("Inside of asyncStorage")
        AsyncStorageNative.setItem('userInformation', JSON.stringify(updatedUserInfo))
            .then(() => {
                // Code to execute after successfully setting the 'token' item
                console.log("user information set successfully");
                setUserInformation(updatedUserInfo)
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