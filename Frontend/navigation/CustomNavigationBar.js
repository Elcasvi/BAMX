import { getHeaderTitle } from '@react-navigation/elements';
import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

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

export default function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  const renderProfileAction = () => (
    <TopNavigationAction
      icon={PersonIcon}
      onPress={() => console.log("() => { navigation.navigate('UserProfile') }")}
    />
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );

  return (
    <Layout
      style={styles.container}
      level='1'
    >
      <TopNavigation
        alignment='center'
        title={title}
        accessoryLeft={renderBackAction}
        accessoryRight={renderProfileAction}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});