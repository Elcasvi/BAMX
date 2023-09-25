import {FlatList, Text, View} from "react-native";
import {BASE_URL} from "../../config";

import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

export default function AppliedJobs()
{
    const [jobOffers,setJobOffers]=useState({})
    const {userInformation} = useContext(AuthContext)
    useEffect(() => {
        const url=BASE_URL+"/User/jobOffers/"+userInformation.id
        axios.get(url)
            .then(res => {
                setJobOffers(res.data)
            })
            .catch((error) => {
                alert("Error: "+error)
            })

    }, []);

    return(
        <View>
            <Text>AppliedJobs Screen</Text>
            <FlatList data={jobOffers}
                      renderItem={({item})=><Text>{item.title}</Text>}
            />
        </View>
    )
}