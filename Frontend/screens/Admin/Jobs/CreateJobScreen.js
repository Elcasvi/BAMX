import {View} from "react-native";
import {BASE_URL} from "../../../config";
import axios from "axios";
import {useState} from "react";
import { Button, Text, Input, Icon } from "@ui-kitten/components"
import {useNavigation} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PlusIcon = (props) => (
    <Icon
        {...props}
        name='plus-outline'
    />
);

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
        <KeyboardAwareScrollView>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 40, paddingVertical: 20 }}>
                <Text category='h4'>Create Job</Text>
                <Input size="large" status="primary" label="Title" style={{width: "100%", margin: 10 }} placeholder={"Title"} onChangeText={setTitle} value={title}/>
                <Input size="large" status="primary" textStyle={{minHeight: 175}} multiline={true} label="Description" style={{width: "100%" }} placeholder={"Description"} onChangeText={setDescription} value={description}/>
                <Button accessoryLeft={PlusIcon} style={{margin: 10 }} onPress={createJob}>Create Job</Button>
            </View>
        </KeyboardAwareScrollView>
    );
}