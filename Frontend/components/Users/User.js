import {useNavigation} from "@react-navigation/native";
import JobContent from "../Jobs/JobContent";
import {Pressable} from "react-native";
import UserDetails from "./UserDetails";

export  default function User({user,job})
{
    const {navigate}=useNavigation();
    return(
        <Pressable onPress={()=>{navigate("UserProfileScreen",{ user,job });}}>
            <UserDetails user={user}/>
        </Pressable>
    )
}