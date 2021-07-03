import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ImagePropTypes } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home';
import Category from './Category';
import Cart from './Cart';
import ProductList from './ProductList';
import Profile from './Profile';

const CategoryStack = createStackNavigator({
  Category: Category,
  ProductList: ProductList,
});

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Category: CategoryStack,
  Cart: Cart,
  Profile: Profile,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName == 'Home') {
        iconName = 'home';
      } else if (routeName == 'Category') {
        iconName = 'list';
      } else if (routeName == 'Cart') {
        iconName = 'basket';
      } else if (routeName == 'Profile') {
        iconName = 'person';
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: '#75c34d',
  },
}
);

export default createAppContainer(TabNavigator);