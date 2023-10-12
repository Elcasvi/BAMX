import {useNavigation} from "@react-navigation/native";
import {Pressable} from "react-native";
import JobContent from "./JobContent";

export default function AssignedJob({job}){
    const {navigate}=useNavigation();
    return(
        <Pressable onPress={()=>{navigate("AssignedJobDetailsScreen",{ job });}}>
            <JobContent job={job}/>
        </Pressable>
    );
};