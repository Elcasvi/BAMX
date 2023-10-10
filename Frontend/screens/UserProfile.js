import {FlatList, ScrollView, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import { Button, Text, TextInput } from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import * as React from "react";
import {BASE_URL} from "../config";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker"

export default function UserProfile({navigation}) {
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [assignedJobs,setAssignedJobs]=useState()
    const [courses,setCourses]=useState()
    const [description, setDescription] = useState(userInformation.description)
    const [image, setImage] = useState(null);

    const getAssignedJobs=()=>
    {
        const url=BASE_URL+"/User/assignedJobs/"+userInformation.id
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setAssignedJobs(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }

    const getCourses=() =>
    {
        const url=BASE_URL+"/UserCourses/Courses/"+userInformation.id
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setCourses(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            //getAssignedJobs();
            //getCourses();
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
            <Text variant="titleSmall">Name</Text>
            <TextInput style={{width: "100%" }} disabled mode="outlined">{userInformation.name}</TextInput>
            <Text style={{ marginTop: 6 }} variant="titleSmall">Gender</Text>
            <TextInput style={{width: "100%" }} disabled mode="outlined">{userInformation.gender}</TextInput>
            <Text style={{ marginTop: 6 }} variant="titleSmall">Rating</Text>
            <TextInput style={{width: "100%" }} disabled mode="outlined">{userInformation.rating}</TextInput>
            <Text style={{ marginTop: 6 }} variant="titleSmall">Description</Text>
            <TextInput multiline style={{width: "100%", height: 200 }} disabled mode="outlined">{description}</TextInput>
            <Text style={{ marginTop: 6 }} variant="titleSmall">CV</Text>
            <Button style={{width: "50%" }} mode="contained" icon="file" onPress={uploadFile}>CV</Button>
            <Text style={{ marginTop: 6 }} variant="titleSmall">Profile Picture</Text>
            <Button style={{width: "50%" }} mode="contained" icon="camera" onPress={pickImage}>Profile Picture</Button>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 10 }} />}
            </View>
            <FlatList
                data={assignedJobs}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <FlatList
                data={courses}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <Button style={{ margin: 10 }} mode="contained" onPress={()=>logout()}>Log out</Button>
            </View>
        </ScrollView>
    );
}

