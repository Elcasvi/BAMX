import {ImageBackground, Text, View, StyleSheet, Image} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";

import {Avatar, Caption, Drawer, Paragraph, Title} from "react-native-paper";
import {Icon} from "@ui-kitten/components";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function CustomDrawerContent(props)
{
    const{logout}=useContext(AuthContext)
    const{userInformation}=useContext(AuthContext)
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:"row",marginTop:15}}>
                            {
                                userInformation.profilePictureUrl!==null?(
                                    <Image
                                        source={{ uri: userInformation.profilePictureUrl }}
                                        style={{ width: 50, height: 50, borderRadius: 100 }}
                                    />
                                ):(
                                    <Icon
                                        style={{ width: 50, height: 50}}
                                        fill="#8F9BB3" name='person'/>
                                )
                            }
                            <View style={{marginLeft:15,flexDirection:"column"}}>
                                <Title style={styles.title}>{userInformation.name}</Title>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>Rating</Paragraph>
                                    <Caption style={styles.caption}>{userInformation.rating}</Caption>
                                    <Icon
                                        style={{ width: 20, height: 20}}
                                        fill="#FFD300" name='star'/>
                            </View>
                        </View>
                    </View>
                    <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={()=>(<Icon
                        style={{ width: 20, height: 20}}
                        fill="#8F9BB3" name='log-out'/>)}
                    label="Salir"
                    onPress={()=>logout()}
                />
            </Drawer.Section>
        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});