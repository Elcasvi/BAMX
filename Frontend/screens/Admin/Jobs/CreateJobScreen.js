import {View} from "react-native";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {useState} from "react";
import { Button, Text, TextInput } from "react-native-paper";
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
                navigation.navigate("JobsFeed")

            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    return(
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 20 }}>
            <Text style={{ fontWeight: "500" }} variant="displayMedium">Create Job</Text>
            <TextInput style={{width: "100%", margin: 10 }} mode="outlined" placeholder={"Title"} onChangeText={setTitle} value={title}/>
            <TextInput style={{width: "100%" }} mode="outlined" placeholder={"Description"} onChangeText={setDescription} value={description}/>
            <Button icon="plus" style={{width: "50%", margin: 10 }} mode="contained" onPress={createJob}>Create Job</Button>
        </View>
    );
}