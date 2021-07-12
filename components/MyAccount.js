import * as React from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { SafeAreaView, ScrollView, useWindowDimensions, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config'; 
import Profile from './Profile';
import MyOrders from './MyOrders';

const ProfileRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#FFF'}}>
  	<Text>Profile</Text>
  </View>
);

 
export default function MyAccount() {



  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
  { key: 'Profile', title: 'Profile' },
  { key: 'MyOrders', title: 'My Orders' },
  ]);
 
  const renderScene = SceneMap({
    Profile: Profile,
    MyOrders: MyOrders,
  });
 
  const renderTabBar = props => (
  	<TabBar
     	 {...props}
      	activeColor={'#75C34D'}
      	inactiveColor={'black'}
          style={{backgroundColor:'#FFF', fontWeight: 'bold' }}
  	/>
  );

 
  return (
  	<TabView
      	navigationState={{ index, routes }}
      	renderScene={renderScene}
      	renderTabBar={renderTabBar}
      	onIndexChange={setIndex}
      	initialLayout={{ width: layout.width }}
  	/>
  );
}
