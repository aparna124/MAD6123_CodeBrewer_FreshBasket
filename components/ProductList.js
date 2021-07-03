import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class ProductList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Category Product</Text>
        <TouchableOpacity style={styles.item}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{
                uri: 'file:///E:/Lambton/Term3/javaScript/FreshBasketMAD6135/images/Tomato.png',
              }}
            />
          </View>
          <Text style={styles.itemText}>Tomato</Text>
          <Text style={styles.itemPrice}>$ 2.55</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
  }
});

export default ProductList;