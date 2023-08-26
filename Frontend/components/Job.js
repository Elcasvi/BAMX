import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import JobContent from "./JobContent";

export default function Job({job}){
    const {navigate}=useNavigation();
    return(
        <Pressable onPress={()=>{navigate("JobDetailsScreen",{ job });}}>
            <JobContent job={job}/>
        </Pressable>
    );
};