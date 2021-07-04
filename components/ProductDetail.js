import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class ProductDetail extends React.Component {
  state = { products: null}

  initCategory() {
    console.log("initProducts")
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    
    db.collection("products").doc(this.props.navigation.getParam('productId')).get().then((doc) => {
      storage.ref(doc.data().image).getDownloadURL().then((url) => {
        this.setState({product : { id: doc.id, imagePath: url, ...doc.data() }});
      }).catch(() => {
        this.setState({product : { id: doc.id, ...doc.data() }});
      }) 
    }).catch((error) => console.log('error',error));
  }

  componentDidMount(){
    this.initCategory()
  }

  render() {
    if(this.state.product == null || undefined){
      return (<View/>)
    }
    const weight = Object.keys(this.state.product.price)[0]
    const price = this.state.product.price[weight]
    
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                source={{
                  uri: this.state.product.imagePath,
                }}
              />
            </View>
            <Text style={styles.itemText}>{this.state.product.name}</Text>
            <View style={styles.itemtitle}>
              <Text style={styles.itemPrice}>$ {price}</Text>
              <Text style={styles.itemWeight}>({weight} gram)</Text>
            </View>
            <Text style={styles.itemtitle}>Product Information</Text>
            <Text style={styles.itemDesc}>{this.state.product.details}</Text>
            <Text style={styles.itemtitle}>Ingredients</Text>
            <Text style={styles.itemDesc}>{this.state.product.ingredients}</Text>
          </ScrollView>
        </SafeAreaView>
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