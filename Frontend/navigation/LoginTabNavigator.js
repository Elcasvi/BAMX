import Login from "../screens/Login";
import Register from "../screens/Register";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab } from '@ui-kitten/components';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Login'/>
    <Tab title='Register'/>
  </TabBar>
);

export const LoginTabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Login' component={Login}/>
      <Screen name='Register' component={Register}/>
    </Navigator>
  );