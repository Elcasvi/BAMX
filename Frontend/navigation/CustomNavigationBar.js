import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackIcon = (props) => (
  <Icon
    {...props}
    name='arrow-back'
  />
);

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

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <TopNavigation
        alignment='center'
        title={title}
        accessoryRight={renderProfileAction}
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