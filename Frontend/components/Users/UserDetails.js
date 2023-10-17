import { Icon, ListItem, Text } from "@ui-kitten/components";
import {useNavigation} from "@react-navigation/native";

const UserIcon = (props) => (
    <Icon
      {...props}
      name='person-outline'
    />
  );

export default function UserDetails({ job,user }) {
    const navigation = useNavigation()
    return(
        <ListItem
        title={() => <Text category='h4'>{user.name}</Text>}
        description={() => <Text category='p1' appearance='hint'>{user.rating} - Rating</Text>}
        accessoryLeft={UserIcon}
        onPress={() => navigation.navigate("UserProfileScreen",{job,user})}
    />
    )
}