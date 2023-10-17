import Login from "../screens/Login";
import Register from "../screens/Register";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Icon } from '@ui-kitten/components';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const LogInIcon = (props) => (
  <Icon
      {...props}
      name='person-outline'
  />
);

const RegisterIcon = (props) => (
  <Icon
      {...props}
      name='edit-2-outline'
  />
);

const TopTabBar = ({ navigation, state }) => (
  <Layout
            style={{ paddingTop: 36 }}
            level='1'
            >
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Login' icon={LogInIcon}/>
    <Tab title='Register' icon={RegisterIcon}/>
  </TabBar>
  </Layout>
);

export const LoginTabNavigator = () => (
    <Navigator tabBar={props => <TopTabBar {...props} />}>
      <Screen name='Login' component={Login}/>
      <Screen name='Register' component={Register}/>
    </Navigator>
  );