import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../lib/images/bamx.png"

const PersonIcon = (props) => (
  <Icon
    {...props}
    name='person-outline'
  />
);

export default function CustomNavigationBar({ title }) {
  const navigation = useNavigation()

  const renderProfileAction = () => (
    <TopNavigationAction
      icon={PersonIcon}
      onPress={() => { navigation.navigate('UserProfile') }}
    />
  );

  const Logo = () => (
    <Image
        style={{ width: 36, height: 36 }}
        source={logo}
    />
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <TopNavigation
        alignment='center'
        title={title}
        accessoryRight={renderProfileAction}
        accessoryLeft={Logo}
      />
      <Divider />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});