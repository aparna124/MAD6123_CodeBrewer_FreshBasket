import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';


class Category extends React.Component {
  state = { categories: ''}

  initCategory() {
    console.log("initCategory")
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    
    var categories = [];
    var dataPromisies = [];
    db.collection("categories").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        dataPromisies.push(
          storage.ref(doc.data().image).getDownloadURL().then((url) => {
            categories = [ ...categories, { id: doc.id, imagePath: url, ...doc.data() }];
          }).catch(() => {
            categories = [ ...categories, { id: doc.id, ...doc.data() }];
          })
        );
      });
      Promise.allSettled(dataPromisies).then(() => {
        this.setState({categories: categories})
      })  
    });
  }

  componentDidMount(){
    this.initCategory()
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
          data={this.state.categories}
          extraData={this.state}
          renderItem={({item}) => (
              <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('ProductList')}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.imagePath,
                    }}
                  />
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.productCount}>{item.count}</Text>
                <AntDesign style={styles.rightIcon} name="caretright" size={24} color="black" />
              </TouchableOpacity>
          )}/>
        </SafeAreaView>
      </View>
    );
  }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    
  },
  item: {
    padding: 12,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderBottomWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    marginTop: 3,
    flexGrow: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageView: {
    display: 'flex',
    width: 80, 
    height: 80,
    padding: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
  },
  productCount: {
    flexShrink:1,
    marginRight: 20,
  },
  rightIcon:{
    flexShrink:1,
    color: '#75c34d',
  }

});

export default Category;