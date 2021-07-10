import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, TextInput} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import {firebaseApp} from '../firebase-config';

class Checkout extends React.Component {

  constructor(props)
  {
    super(props)
    this.state = {address: ''}
  }

  componentDidMount()
  {
    this.fetchAddress()
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
      <View style={styles.item}>
          <Text style={styles.countText}>0</Text>
          <Text style={styles.titleText}>Number of Items in Cart</Text>

          <View style={styles.checkoutFooter}/>

          <View style={styles.checkoutText}>
            <Text>Item1:</Text>
            <Text>Price</Text>
          </View>
          <Image
                style={{ marginTop: '20%', height: 150, width: 150,
                resizeMode: 'contain'}}
                source = {require('./checkout.png')}
              />
          <TouchableOpacity style={styles.button}>
              <Text  style={styles.textBtn} onPress={() => this.deleteItem(item.id)}>Make a Payment</Text>
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

item: {
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



});

export default Checkout;