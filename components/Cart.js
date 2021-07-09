import React from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, TextInput} from 'react-native';
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
  this.fetchCartData()
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
        console.log(itemIdList);
        if(itemIdList.length > 0){
          db.collection("products").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              if( itemIdList.indexOf(doc.id) !== -1)
              {
                console.log(doc.data());
                dataPromisies.push(
                storage.ref(doc.data().image).getDownloadURL().then((url) => {
                products = [ ...products, { id: doc.id, imagePath: url, ...doc.data() }];
              }).catch(() => {
                products = [ ...products, { id: doc.id, ...doc.data() }];
              })
              );
            }
            });
           
            Promise.all(dataPromisies).then(() => {
              self.setState({products: products})
            })  
          }).catch((error) => console.log('error',error));
        }
        else{
          // empty cart
        }
      });
    }
  });

}



// displayCart(doc,qty) 
// {

//   var result = doc.data();
//   console.log(result)
//   var price = result.price[Object.keys(result.price)[0]]
// }


    render() {
      return (
        <View style={styles.container}>
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
                  <TextInput style={styles.input} placeholder= "Qty" onChangeText={todo => this.setState({todo})}/>
                </View>
                <View style={styles.delbutton}>
                  {/* <AntDesign name="delete" size={24} color="#F07D4A" /> */}
                  <Button color="#F07D4A" title="Remove" onPress={() => this.signOutUser()} />
                </View>
                
                {/* <Ionicons style={styles.rightIcon} name="add-outline" size={24} color="black" /> */}
                {/* <TouchableOpacity style={styles.button}>
                <Text  style={styles.textBtn} onPress={() => this.deleteItem(item.id)}>Remove</Text>
                </TouchableOpacity> */}
                
              </View>
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
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#F07D4A',
    borderWidth: 1,
    backgroundColor: '#F07D4A',
  },
  textBtn: {
    color: '#FFF',
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 50,
    borderColor: 'grey',
    padding: 8,
    margin: 10,
    borderRadius: 2,
    width: 100,
  },

  delbutton:
  {
    paddingTop: '15%',
  }
  
});

export default Cart;