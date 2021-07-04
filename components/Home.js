import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

class Home extends React.Component {
 
  render() {
    return (
    <View>
      <Text>Home</Text>
    </View>
    );
  }
}

export default Home;