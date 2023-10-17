import * as React from 'react';
import { Icon, ListItem} from "@ui-kitten/components";
import { Card, Title, Paragraph } from 'react-native-paper';

import {useNavigation} from "@react-navigation/native";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Image, Text, View} from "react-native";

const UserIcon = (props) => (
    <Icon
      {...props}
      name='person-outline'
    />
  );


export default function UserDetails({ job,user }) {
    const navigation = useNavigation()
    return (
        <Card onPress={() => navigation.navigate("UserProfileScreen", { job, user })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Card.Title
                        title={user.name}
                        titleStyle={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            // Add more title styling properties as needed
                        }}
                    />
                    <Card.Content>
                        <Paragraph>{user.rating} - Rating</Paragraph>
                    </Card.Content>
                </View>
                <Image
                    source={{ uri: user.profilePictureUrl }}
                    style={{ width: 60, height: 60, borderRadius: 100, borderWidth: 2, borderColor: "gray" }}
                />
            </View>
            <Card.Actions>
                {UserIcon}
            </Card.Actions>
        </Card>
    );
}