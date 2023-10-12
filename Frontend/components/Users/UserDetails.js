import { Text } from "@ui-kitten/components";

export default function UserDetails({user})
{
    return(
       <Text>{user.name} User Details</Text>
    )
}