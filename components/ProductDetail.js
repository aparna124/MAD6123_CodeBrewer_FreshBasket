import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class ProductDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg',
            }}
          />
        </View>
        <Text style={styles.itemText}>Brocoli</Text>
        <View style={styles.itemtitle}>
          <Text style={styles.itemPrice}>$ 2.5</Text>
          <Text style={styles.itemWeight}>(500 gram)</Text>
        </View>
        <Text style={styles.itemtitle}>Product Information</Text>
        <Text style={styles.itemDesc}>Broccoli is an edible green plant in the cabbage family whose large flowering head, stalk and small associated leaves are eaten as a vegetable.</Text>
        <Text style={styles.itemtitle}>Ingredients</Text>
        <Text style={styles.itemDesc}>Organic</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    padding: 15,
  },
  imageView: {
    display: 'flex',
    width: 300, 
    height: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
    alignSelf:'center',
    marginBottom: 15,
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
  },
  itemText: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemtitle: {
    marginBottom: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDesc: {
    marginBottom: 15,
    fontSize: 16,
  }
});

export default ProductDetail;