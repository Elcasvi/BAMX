import {ScrollView, View, Image} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import { Button, Text, Input, Icon, TopNavigation, TopNavigationAction, Divider, Layout } from '@ui-kitten/components';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import * as React from "react";
import * as DocumentPicker from "expo-document-picker";

const BackIcon = (props) => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

const CvIcon = (props) => (
  <Icon
    {...props}
    name='book-open-outline'
  />
);

const LogOutIcon = (props) => (
  <Icon
      {...props}
      name='log-out-outline'
  />
);

export default function UserProfile({}) {
    const navigation = useNavigation()
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    const [cv, setCv] = useState(null)

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

    return (
      <>
      <Layout
        style={{ paddingTop: 30 }}
        level='1'
      >
        <TopNavigation
          accessoryLeft={() => <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />}
          title='Atrás'
        />
        <Divider />
      </Layout>
        <ScrollView style={{ backgroundColor: "#F7F9FC" }}>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 30 }}>
              <View style={{ width: "100%" }}>
                <View style={{ flex: 1, alignItems: "center" }} >
                  <Image source={{ uri: userInformation.profilePictureUrl }} style={{ width: 100, height: 100, marginTop: 20, borderRadius: 100, borderWidth: 2, borderColor: "gray" }} />
                  <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                  <Text category="h5">{userInformation.rating}</Text>
                  <Icon
                    style={{ width: 24, height: 24, }}
                    fill='orange'
                    name='star'
                  />
                </View>
                </View>
                <Input size="large" status="primary" label="Name" style={{width: "100%", marginVertical: 4 }} disabled value={userInformation.name}/>
                <Input size="large" status="primary" label="E-Mail" style={{width: "100%", marginVertical: 4 }} disabled value={userInformation.email}/>
                <Input size="large" status="primary" label="Gender" style={{width: "100%", marginVertical: 4 }} disabled value={userInformation.gender}/>
                <Input size="large" status="primary" label="Description" textStyle={{minHeight: 175}} disabled multiline={true} style={{width: "100%", marginVertical: 4}} value={userInformation.description}/>
                <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
                  <Button accessoryLeft={CvIcon} style={{width: "50%" }} onPress={uploadFile}>CV</Button>
                  <View style={{ width: 160, height: 160, marginTop: 10, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderColor: "#575756" }}>
                      {cv === null ?
                      <Icon
                          style={{ width: 42, height: 42 }}
                          fill='#575756'
                          name= 'cloud-upload-outline'
                      />
                      :
                      <Icon
                          style={{ width: 42, height: 42 }}
                          fill='#00a039'
                          name= 'checkmark-circle-outline'
                      />
                      }
                  </View>
                </View>
                
            </View>
            <Button size="large" accessoryLeft={LogOutIcon} style={{ margin: 20, width: "100%" }} mode="contained" onPress={()=>logout()}>Log out</Button>
            </View>
        </ScrollView>
        </>
    );
}

