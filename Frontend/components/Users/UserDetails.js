import { Icon, ListItem, Text } from "@ui-kitten/components";

const UserIcon = (props) => (
    <Icon
      {...props}
      name='person-outline'
    />
  );

export default function UserDetails({ user }) {
    return(
        <ListItem
        title={() => <Text category='h4'>{user.name}</Text>}
        description={() => <Text category='p1' appearance='hint'>{user.rating} - Rating</Text>}
        accessoryLeft={UserIcon}
        onPress={() => console.log("Press user")}
    />
    )
}