import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class ProductList extends React.Component {
  state = { products: '',}

  initCategory() {
    console.log("initProducts")
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    
    var products = [];
    var dataPromisies = [];
    console.log(this.props)
    
    var prodRef = db.collection("products")
    const catId = this.props.navigation.getParam('categoryId')
    const searchText = this.props.navigation.getParam('searchText')

    if(catId != null && catId != undefined && catId != ''){
      const catRef = db.collection("categories").doc(catId)
      prodRef = prodRef.where("category", "==", catRef)
    } 
    prodRef.get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        var details = doc.data().details;
        var pName = doc.data().name.toLowerCase();
        console.log('searchText',searchText)
        if( searchText != null && searchText != undefined && !(searchText.toLowerCase().includes(pName) || details.includes(searchText.toLowerCase()))) {
          return
        }
        dataPromisies.push(
          storage.ref(doc.data().image).getDownloadURL().then((url) => {
            products = [ ...products, { id: doc.id, imagePath: url, ...doc.data() }];
          }).catch(() => {
            products = [ ...products, { id: doc.id, ...doc.data() }];
          })
        );
      })
      Promise.all(dataPromisies).then(() => {
        this.setState({products: products})
      })  
    }).catch((error) => console.log('error',error));
  }

  componentDidMount(){
    this.initCategory()
  }

   addTocart(productId)
  {
    
    var self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
  
        const userId = firebaseApp.auth().currentUser.uid;
        firebaseApp.firestore().collection('cart2').doc(userId).get().then(function(doc){
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
          firebaseApp.firestore().collection("cart2").doc(userId).set({
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
    });
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
            var price = item.price[Object.keys(item.price)[0]]
            return (
            <TouchableOpacity style={styles.item} onPress={() => 
            this.props.navigation.navigate('ProductDetail', {productId: item.id})
            }>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imagePath,
                  }}
                />
              </View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>$ {price}</Text>
              {/* <Ionicons style={styles.rightIcon} name="add-outline" size={24} color="black" /> */}
              <TouchableOpacity style={styles.button}>
                <Text  style={styles.textBtn} onPress={() => this.addTocart(item.id)}>Add</Text>
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