import {Text, View} from "react-native";
import axios from "axios";
import {BASE_URL} from "../../config";
export default function ()
{
    const url=BASE_URL+"/"
    axios.get()
    return(
        <View>
            <Text>AssignedJobs Screen</Text>
        </View>
    )
}