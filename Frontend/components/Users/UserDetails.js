import React from 'react';
import { View, Text, Image,StyleSheet  } from 'react-native';
import { Card } from 'react-native-paper';
import {Icon} from "@ui-kitten/components";

export default function UserDetails({ user }) {
    const PersonIcon = (props) => (
        <Icon
            style={{ width: 32, height: 32, margin: 10, padding: 10 }}
            fill="#8F9BB3"
            name='person'
        />
    );
    const StarIcon = (props) => (
        <Icon
            style={{ width: 20, height: 20, margin: 5 }}
            fill="#FFD300"
            name='star'
        />
    );

    return (
        <Card style={{ margin: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Card.Content style={{ flex: 1 }}>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
                    </View>
                    <View style={{ marginBottom: 8,flexDirection: 'row', alignItems:'center' }}>
                        <Text style={{ fontSize: 16 }}>Rating: {user.rating}</Text>
                        <StarIcon/>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16 }}>Gender: {user.description}</Text>
                    </View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={{ fontSize: 16 }}>Gender: {user.gender}</Text>
                    </View>
                </Card.Content>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    {
                        user.profilePictureUrl!==null?(<Image
                            source={{ uri: user.profilePictureUrl }}
                            style={{
                                width: 60, height: 60, borderRadius: 100, margin: 15
                            }}
                        />):(<PersonIcon/>)
                    }
                </View>
            </View>
        </Card>
    );
}