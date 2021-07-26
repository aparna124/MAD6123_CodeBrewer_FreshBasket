import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, TextInput, ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from "axios";
import { HOST_URL } from '../commonConfig'

import {firebaseApp} from '../firebase-config';
import color from 'color';

class Checkout extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {address: '', products: [], total: 0}
  }

  

  componentDidMount()
  {
    this.fetchAddress()
    this.fetchData()
  }

  fetchAddress()
  {
    let self = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) 
      {
        const uid = firebaseApp.auth().currentUser.uid;
        const db = firebaseApp.firestore();
        db.collection("user").doc(uid).get() 
        .then(function(doc)
        {
      
            if(doc.exists)
            {
              self.setState({address: doc.data().address});
            } 
      }).catch(function(error){
      console.log("error", error);
    })
      }
      else
      {

      }
    });
  }

  fetchData()
  {
    this.state.products = this.props.navigation.state.params.products;
    var totalPrice = 0;
    this.state.products.forEach(function (element) {
      totalPrice = totalPrice + element.quantity*element.price;
      //console.log(totalPrice);
    });
    this.setState({total: totalPrice});
    
  }



  dataToOrder()
  {
    var self = this;
    var count = 0;
    var orders = [];
    
    const db = firebaseApp.firestore();
    var userId;
    firebaseApp.auth().onAuthStateChanged(function (user) {
    if (user) {
      userId = firebaseApp.auth().currentUser.uid;
      //console.log(userId);
      let itemIdList;
      let items;
      axios
      .get(HOST_URL + "cart/get-by-user-id?userId=" + userId).then(function(doc){
        items = doc.data.items;
        itemIdList = Object.keys(items);
        count = itemIdList.length;
        //console.log(itemIdList);
        if(itemIdList.length > 0){

          axios.get(HOST_URL + "product").then((res) => {
            //console.log(res.data);
            res.data.forEach(element => {
              //console.log(element._id);
              if(itemIdList.indexOf(element._id) !== -1)
              {
                var obj = {
                            category: element.category,
                            //image: element.image,
                            productname: element.name,
                            productprice: element.price,
                            quantity: items[element._id],
                                }
                        //console.log(obj);
                        orders.push(obj);
              }
            });
            self.addToOrder(orders, userId);
          });





          // db.collection("products").get().then((snapshot) => {
          //   snapshot.docs.forEach(doc => {
          //     if( itemIdList.indexOf(doc.id) !== -1)
          //     {
              
          //       console.log(items[doc.id]);
          //       var obj = {
          //                 category: doc.data().category,
          //                 image: doc.data().image,
          //                 productname: doc.data().name,
          //                 productprice: doc.data().price,
          //                 quantity: items[doc.id],
          //               }
          //       orders.push(obj);
          //       console.log(orders);
          //       //displayCart(doc, items[doc.id])
          //     }
          //   });
          //  self.addToOrder(orders, userId);
          // })



        }
        else{
          // empty cart
        }
      });
    }
  });
  }


  addToOrder(orders, userid) 
  {
    var self = this;
    axios.post(HOST_URL + "order/add", {
      orderId: Date.now().toString(),
      userId: userid,
      status: "Ordered",
      products: orders,
      totalPrice: this.state.total
    })
      .then(() => {
        alert("Your order has been succesfully placed");
        self.deleteCart(userid);
        self.props.navigation.navigate('Home');
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
       alert("Error: " + errorMessage);
      });
  }

  


deleteCart(userId) 
{

  var self = this;
  axios.get(HOST_URL + "cart/get-by-user-id?userId=" + userId)
  .then(function (doc) {
    let cartId = doc.data._id;
    console.log(cartId);
  axios.get(HOST_URL + "cart/clearCart?cartId=" + cartId)
  .then(function (doc){
    console.log("cart deleted");
  }).catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //  alert("Error: " + errorMessage);
  console.log("Delete cart catch");
  });
  })
}



// deleteCart(userid) 
// {
//   var self = this;
//   var deleData = firebaseApp.firestore().collection('cart').where('userId', '==', userid);
//   deleData.get().then(function (querySnapshot) {
//     querySnapshot.forEach(function (doc) {
//       doc.ref.delete();
//     });
//     self.props.navigation.navigate('Home');
//   });
  
// }

  render() {

    return (
    <View style={styles.container}>
       <View style={styles.addressText}>
          <EvilIcons name="location" size={30} color="#75C34D" />
         <Text style={styles.address}>Shipping Address</Text>
       </View>
       <View style={styles.addressField}>
          <TextInput style={styles.input} placeholder= "Address" onChangeText={address => this.setState({address})}>{this.state.address}</TextInput>
      </View>
      <View style={styles.itemList}>
        <View style={styles.cartTitle}>
          <Text style={styles.countText}>{this.state.products.length}</Text>
          <Text style={styles.titleText}>Number of Items in Cart</Text>
        </View>
          {/* <Text>___________________________________________________________</Text>

          <View style={styles.checkoutFooter}/> */}

          {/* <View style={styles.checkoutText}>
            <Text>Item1:</Text>
            <Text>Price</Text>
          </View> */}
        <View style={styles.content}>
         
         {
           this.state.products.map((item,key) => (
           <TouchableOpacity>
               <View style={styles.cartItems}>
                   <Text style={styles.itemName}>{item.name}({item.quantity})</Text>
                   <Text style={styles.itemPrice}>${item.quantity * item.price}</Text>
               </View>

           </TouchableOpacity>
           ))
         }
      
       </View>

       {/* <View style={styles.priceText}>

        <Text style={styles.countText}>Total: ${this.state.total}</Text>
       </View> */}
        <View style={styles.priceText}>
               <View style={styles.totalText}>
                    <Text style={styles.totText}>Total: </Text>
                    <Text style={styles.totText}>${this.state.total}</Text>
               </View>
       </View>
               
          <Image
                style={{ marginTop: '5%', height: 150, width: 150,
                resizeMode: 'contain'}}
                source = {require('./checkout.png')}
              />
          <TouchableOpacity style={styles.button} onPress={() => this.dataToOrder()}>
              <Text  style={styles.textBtn}>Make a Payment</Text>
          </TouchableOpacity>
  
      </View>
     </View>
    );
      }

  }


const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 10,
  paddingTop: 20,
},

input: {
  borderWidth: 0.25,
  paddingLeft: 25,
  borderColor: 'grey',
  padding: 8,
  margin: 10,
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
},

addressText:
{
  flexDirection: 'row',
  alignItems: 'center',
  // fontSize: 100,
},

address:
{
  fontSize: 20,
  color: '#75C34D'
},

addressField:
{
  alignItems: 'center',
},

itemList: {
  width: '100%',
  padding: 10,
  marginVertical: 8,
  borderColor: '#F4EDED',
  backgroundColor: '#fff',
  borderWidth: 3,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  shadowColor: '#F4EDED',
  shadowRadius: 0.2,
},

items: {
  padding: 20,
  marginTop: 3,
  backgroundColor: '#FFB6C1',
},

cartTitle:
{
  alignItems: 'center',
  alignContent: 'center',
  borderBottomColor: 'black', 
  borderBottomWidth: 0.2, 
  width: '100%',
  paddingBottom: '5%',
},

checkoutFooter:
{
    borderBottomColor: 'black', 
    borderBottomWidth: 5, 
},

titleText:
{
  fontSize: 18,
},

countText:
{
  fontSize: 25,
  fontWeight: 'bold',
},

checkoutText:
{
  flexDirection: 'row',
  display: 'flex',
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

cartItems:
{
  flexDirection: 'row',
  justifyContent: 'space-between'
},

itemName:
{
  color: 'blue',
  fontSize: 20,
  padding: 10,
},

itemPrice:
{
  color: 'blue',
  fontSize: 20,
  padding: 10,

},

content:
{
  paddingLeft: '2%',
  borderBottomColor: 'black', 
  borderBottomWidth: 0.2, 
  width: '100%',
},

priceText:
{   

    paddingTop: '10%',
    paddingLeft: '5%',
    width: '100%',
},

totalText:
{
  flexDirection: 'row',
  justifyContent: 'space-between'
},

totText:
{
  fontSize: 22,
  fontWeight: 'bold',
}






});

export default Checkout;