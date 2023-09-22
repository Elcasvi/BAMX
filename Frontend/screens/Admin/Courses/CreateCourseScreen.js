import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {BASE_URL} from "../../../config";
import axios from "axios";

export default function CreateCourseScreen()
{

    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const createJob=()=>
    {
        const url=BASE_URL+"/Course"
        const courseBody={
            Title:title,
            Description:description,
            Link:""
        }
        axios.post(url,courseBody)
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