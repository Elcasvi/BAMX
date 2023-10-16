import {useNavigation} from "@react-navigation/native";
import { Icon, ListItem, Text } from "@ui-kitten/components";

const OfferIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='briefcase-outline'
    />
);

const ApplicationIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='clock-outline'
    />
);

const AssignedIcon = (props) => (
    <Icon
      style={{ width: 32, height: 32, margin: 10, padding: 10 }}
      fill="#8F9BB3"
      name='checkmark-circle-outline'
    />
);


export function JobOffer({job}){
    const navigation=useNavigation();
    return(
            <ListItem
            title={() => <Text category='h4'>{job.title}</Text>}
            description={() => <Text category='p1' appearance='hint'>{job.description}</Text>}
            accessoryLeft={OfferIcon}
            onPress={()=>{navigation.navigate("JobDetailsScreen",{ job });}}
        />
    );
};

export function JobApplication({job}){
    const {navigate}=useNavigation();
    return(
            <ListItem
            title={() => <Text category='h4'>{job.title}</Text>}
            description={() => <Text category='p1' appearance='hint'>{job.description}</Text>}
            accessoryLeft={ApplicationIcon}
            onPress={()=>{navigate("JobDetailsScreen",{ job });}}
        />
    );
};

export function JobAssigned({job}){
    const {navigate}=useNavigation();
    return(
            <ListItem
            title={() => <Text category='h4'>{job.title}</Text>}
            description={() => <Text category='p1' appearance='hint'>{job.description}</Text>}
            accessoryLeft={AssignedIcon}
            onPress={()=>{navigate("AssignedJobDetailsScreen",{ job });}}
        />
    );
};