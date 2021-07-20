import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import {firebaseApp} from '../firebase-config';
import {HOST_URL} from '../commonConfig'
class ProductList extends React.Component {
  state = { products: '',}

  initCategory() {
    console.log("initProducts")

    const catId = this.props.navigation.getParam('categoryId')
    const searchText = this.props.navigation.getParam('searchText')
    let url =HOST_URL + 'product'
    if(catId != null && catId != undefined && catId != ''){
      url = url + '?categoryId=' + catId
    }
    axios.get(url)
      .then(res => {
        this.setState({products: res.data})
      });
  }

  componentDidMount(){
    this.initCategory()
  }

  addTocart(productId)
  {
    
    var self = this;
    // firebaseApp.auth().onAuthStateChanged(function (user) {
      const userId = firebaseApp.auth().currentUser.uid;
      if (userId) {
        firebaseApp.firestore().collection('cart').doc(userId).get().then(function(doc){
          let items;
          if(doc.exists)
          {
            items = doc.data().items;
            if(Object.keys(items).indexOf(productId) === -1 ){
              items[productId] = 1;
            }else{
              items[productId]++;
            }
          }else{
            // create new cart
             items = {}
             items[productId] = 1;
          } 
          firebaseApp.firestore().collection("cart").doc(userId).set({
            items: items,
            userId:userId
          }).then(() => {
              alert("Item added to cart");
              console.log("Document successfully written!");
            }).catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..
              //window.alert("Error: " + errorMessage);
            });
        })
    
      }
      else {
        alert("You have to sign in to add products");
        self.props.navigation.navigate('SignIn');
      }
    // });
  }


  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
          columnWrapperStyle={{justifyContent:'space-evenly'}}
          data={this.state.products}
          numColumns={2}
          extraData={this.state}
          renderItem={({item}) => {
            return (
            <TouchableOpacity style={styles.item} onPress={() => 
            this.props.navigation.navigate('ProductDetail', {productId: item._id})
            }>
              {/* <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imagePath,
                  }}
                />
              </View> */}
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>$ {item.price}</Text>
              <TouchableOpacity style={styles.button} onPress={() => this.addTocart(item._id)}>
                <Text  style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}}/>
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
    padding: '2%',
    // flexDirection: 'row',
  },
  item: {
    width: '46%',
    padding: 10,
    marginVertical: 8,
    borderColor: '#000',
    // backgroundColor: '#e2ffd4',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 1,  
  },
  itemText: {
    textAlign:'center',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    textAlign:'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageView: {
    display: 'flex',
    width: 120, 
    height: 120,
    padding: 10,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#FFF',
  },
  image: {
    flexGrow: 1,
    resizeMode: 'center'
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#75C34D',
    borderWidth: 1,
    backgroundColor: '#75C34D'
  },
  textBtn: {
    color: '#FFF',
    fontSize: 17,
  }
});

export default ProductList;