import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, TextInput, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class Cart extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {products: ''}
  }

componentDidMount()
{
  this.props.navigation.addListener('willFocus', () => {
    this.fetchCartData()

  });
 
}


fetchCartData() 
{

  var self = this;
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();
  var userId;
  var products = [];
  var dataPromisies = [];
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      userId = firebaseApp.auth().currentUser.uid;
      console.log(userId);
      let itemIdList;
      let items;
      let count;
      
      db.collection("cart2").doc(userId).get().then(function(doc){
        items = doc.data().items;
        itemIdList = Object.keys(items);
        count = itemIdList.length; 
        //console.log(items[doc.productId]);
        if(itemIdList.length > 0){
          db.collection("products").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              if( itemIdList.indexOf(doc.id) !== -1)
              {
                //console.log(items[doc.id])
                //this.state.quantity = items[doc.id];
                //self.setState({quantity: items[doc.id]});
                //console.log(self.state.quantity);
                dataPromisies.push(
                storage.ref(doc.data().image).getDownloadURL().then((url) => {
                products = [ ...products, { id: doc.id, imagePath: url, quantity: items[doc.id], ...doc.data() }];
              }).catch(() => {
                products = [ ...products, { id: doc.id, quantity: items[doc.id], ...doc.data() }];
              })
              );
            }
            });
           
            Promise.all(dataPromisies).then(() => {
              self.setState({products: products})
              console.log(items[doc.id])
              
            })  
          }).catch((error) => console.log('error',error));
        }
        else if(itemIdList.length == 0){
          // empty cart
          alert("Your cart is empty");
        }
      });
    }
    else
    {
      alert("you have to login")
      self.props.navigation.navigate('SignIn');
    }
  });

}


deleteItem(productId) {
  var self = this;
  firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {

    const userId = firebaseApp.auth().currentUser.uid;
    firebaseApp.firestore().collection('cart2').doc(userId).get().then(function(doc){
      let items;
      if(doc.exists)
      {
        items = doc.data().items;
        delete(items[productId]);
        //cartSave(items, userId);
        firebaseApp.firestore().collection("cart2").doc(userId).set({
          items: items,
          userId:userId
        }).then(() => {
            alert("Document deleted succesfully!");
            self.fetchCartData();
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            //alert("Error: " + errorMessage);
          });
      } 
    })
    }
  })
}

IncrementItem = (productId) => {
  console.log("Incrementing");
  //this.setState({quantity: this.state.quantity + 1}) ;;
  const userId = firebaseApp.auth().currentUser.uid;
  let products = this.state.products;
  let product = products.find(p => p.id == productId)
   product.quantity = product.quantity + 1;
   this.setState({products});
   this.cartSave(this.getItemsFromProducts(products), userId)
   

}
DecreaseItem = (productId) => {
  // this.setState({quantity: this.state.quantity - 1}) ;
  const userId = firebaseApp.auth().currentUser.uid;
  let products = this.state.products;
  let product = products.find(p => p.id == productId)
   product.quantity = product.quantity - 1;
   this.setState({products});
   this.cartSave(this.getItemsFromProducts(products), userId)
}

getItemsFromProducts(products)
{
 let items = {};
 products.forEach(p => {
   items[p.id] = p.quantity;
 })
 return items;
}

cartSave(items, userId)
{
  firebaseApp.firestore().collection("cart2").doc(userId).set({
    items: items,
    userId:userId
  }).then(() => {
      alert("Document deleted succesfully!");
      fetchCartData();
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      alert("Error: " + errorMessage);
    });
}

render() {
      return (
        <View style={styles.container}>
           <ScrollView>
        <SafeAreaView>
          <FlatList
          data={this.state.products}
          extraData={this.state}
          renderItem={({item}) => {
            var price = item.price[Object.keys(item.price)[0]]
            return (
            <TouchableOpacity style={styles.item}>
              <View style={styles.content}>
                <View style={styles.imageView}>
                  <Image
                    style={styles.image}
                    source={{
                    uri: item.imagePath,
                  }}
                  />
                </View>
                <View style={styles.contentText}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemPrice}>$ {price}</Text>
                  <View style={styles.btns}>
     
                    <Button title = "+" onPress={() => this.IncrementItem(item.id)}/>
                    <TextInput style={styles.input} placeholder= "Qty">{item.quantity}</TextInput>
                    <Button title = "-" onPress={() => this.DecreaseItem(item.id)}/>
                  </View>
                </View>
                <View style={styles.delbutton}>
                  {/* <AntDesign name="delete" size={24} color="#F07D4A" /> */}
                  <Button color="#F07D4A" title="Remove" onPress={() => this.deleteItem(item.id)}/>
                </View>
                
                {/* <Ionicons style={styles.rightIcon} name="add-outline" size={24} color="black" /> */}
                {/* <TouchableOpacity style={styles.button}>
                <Text  style={styles.textBtn} onPress={() => this.deleteItem(item.id)}>Remove</Text>
                </TouchableOpacity> */}
                
              </View>
            </TouchableOpacity>
          )}}/>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate('Checkout', {products: this.state.products})}}>
            <Text  style={styles.textBtn}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
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
    //flexDirection: 'column',
  },

  content:
  {
    flexDirection: 'row',
  },

  contentText:
  {
    flexDirection: 'column',
  },

  item: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    paddingRight: '20%',
    borderColor: '#F4EDED',
    //backgroundColor: '#F4EDED',
    borderWidth: 3,
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#F4EDED',
    shadowRadius: 0.2,
    shadowOpacity: 0.5,  
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
    //borderWidth: 2,
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
    backgroundColor: '#75C34D',
  },
  textBtn: {
    color: '#FFF',
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 25,
    borderColor: 'grey',
    padding: 8,
    margin: 10,
    borderRadius: 2,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  delbutton:
  {
    paddingTop: '15%',
  },

  btns:
  {
    flexDirection: 'row',
  }
  
});

export default Cart;