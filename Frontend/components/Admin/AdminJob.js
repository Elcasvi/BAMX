import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AdminJobContent from "./AdminJobContent";

export default function AdminJob({job}){
    const {navigate}=useNavigation();
    return(
        <Pressable onPress={()=>{navigate("AdminJobDetailsScreen",{ job });}}>
            <AdminJobContent job={job}/>
        </Pressable>
    );
};