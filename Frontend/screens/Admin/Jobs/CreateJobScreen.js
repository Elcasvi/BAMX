import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {useState} from "react";

export default function CreateJobScreen()
{
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const createJob=()=>
    {
        const url=BASE_URL+"/JobOffer"
        const jobOfferBody={
            Title:title,
            Description:description,
            Created:"2019-04-28",
            Enterprise:"Virtualtek",
            JobOfferPicture:""
        }
        axios.post(url,jobOfferBody)
            .then(res => {
                console.log(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Create Job</Text>
            <TextInput placeholder={"Title"} onChangeText={setTitle} value={title}/>
            <TextInput placeholder={"Description"} onChangeText={setDescription} value={description}/>
            <Button title="Create!" onPress={createJob}/>
        </View>
    );
}