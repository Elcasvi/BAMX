import { Button, Text, Input, Icon } from "@ui-kitten/components"
import {useState} from "react";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {View} from "react-native";

export default function CreateCourseScreen()
{
    const PlusIcon = (props) => (
        <Icon
            {...props}
            name='plus-outline'
        />
    )

    const[title,setTitle]=useState("")
    const[author,setAuthor]=useState("")
    const[description,setDescription]=useState("")
    const createJob=()=>
    {
        const url=BASE_URL+"/Course"
        const courseBody={
            Title:title,
            Author:author,
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
        <KeyboardAwareScrollView>
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 20 }}>
            <Text category='h4'>Create Course</Text>
            <Input size="large" status="primary" label="Titulo" style={{width: "100%", margin: 10 }} placeholder={"Titulo"} onChangeText={setTitle} value={title}/>
            <Input size="large" status="primary" label="Autor" style={{width: "100%", margin: 10 }} placeholder={"Autor"} onChangeText={setAuthor} value={author}/>
            <Input size="large" status="primary" textStyle={{minHeight: 175}} multiline={true} label="Descripción" style={{width: "100%" }} placeholder={"Descripción"} onChangeText={setDescription} value={description}/>
            <Button accessoryLeft={PlusIcon} style={{margin: 10 }} onPress={createJob}>Crear Curso</Button>
        </View>
    </KeyboardAwareScrollView>
    );
}