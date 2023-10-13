import {ScrollView, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import { Button, Text, Input } from '@ui-kitten/components';
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker"

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [description, setDescription] = useState(userInformation.description)
    const [image, setImage] = useState(null);


    useFocusEffect(
        React.useCallback(() => {
            console.log(userInformation.cvUrl)
            console.log(userInformation.profilePictureUrl)
        }, [])
    );

    const uploadFile = () => {
        const pickDocument = async () => {
          let result = await DocumentPicker.getDocumentAsync({});
          console.log(result.uri);
          console.log(result);
        };
        pickDocument()
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
            <View style={{ width: "100%" }}>
            <Text category='s1'>Name</Text>
            <Input style={{width: "100%" }} disabled>{userInformation.name}</Input>
            <Text style={{ marginTop: 6 }} category='s1'>Gender</Text>
            <Input style={{width: "100%" }} disabled>{userInformation.gender}</Input>
            <Text style={{ marginTop: 6 }} category='s1'>Rating</Text>
            <Input style={{width: "100%" }} disabled>{userInformation.rating}</Input>
            <Text style={{ marginTop: 6 }} category='s1'>Description</Text>
            <Input multiline style={{width: "100%", height: 200 }} disabled>{description}</Input>
            <Text style={{ marginTop: 6 }} category='s1'>CV</Text>
            <Button style={{width: "50%" }} mode="contained" icon="file" onPress={uploadFile}>CV</Button>
            <Text style={{ marginTop: 6 }} category='s1'>Profile Picture</Text>
            <Button style={{width: "50%" }} mode="contained" icon="camera" onPress={pickImage}>Profile Picture</Button>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
            </View>
            <Button style={{ margin: 10 }} mode="contained" onPress={()=>logout()}>Log out</Button>
            </View>
        </ScrollView>
    );
}

