import {View} from "react-native";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {useState} from "react";
import { Button, Text, Input } from "@ui-kitten/components"
import {useNavigation} from "@react-navigation/native";

export default function CreateJobScreen()
{
    const navigation=useNavigation()
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
                navigation.goBack();

            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 20 }}>
            <Text style={{ fontWeight: "500" }} category='s1'>Create Job</Text>
            <Input style={{width: "100%", margin: 10 }} placeholder={"Title"} onChangeText={setTitle} value={title}/>
            <Input style={{width: "100%" }} placeholder={"Description"} onChangeText={setDescription} value={description}/>
            <Button style={{width: "50%", margin: 10 }} onPress={createJob}>Create Job</Button>
        </View>
    );
}