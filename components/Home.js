import React from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Image, TextInput, ScrollView } from "react-native";
import { SearchBar } from 'react-native-elements';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import { firebaseApp } from '../firebase-config';

class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = { search: '', products: [] }
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  searchProduct = (searchText) => {
    this.props.navigation.navigate('ProductList', { searchText: this.state.search })
  }

  componentDidMount() {
    this.topSellerDisplay()
  }


  topSellerDisplay() {

    var self = this;
    var topsellers = [];
    //console.log("Top seller");
    firebaseApp.firestore().collection("order").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var len = Object.keys(doc.data().products).length;
        //console.log(len);
        for (var i = 0; i < len; i++) {
          //console.log(doc.data().products[i].quantity);
          var orderQty = doc.data().products[i].quantity;
          if (orderQty >= 2) {
            //displayTopSellerItems();
            var pName = doc.data().products[i].productname;
            if (topsellers.includes(pName)) {
              //console.log("Item already displayed");
            }
            else {
              topsellers.push(pName);
              //console.log(pName);

            }
          }
        }
        self.displayTopSellerItems(topsellers)
      });
    });
  }

  displayTopSellerItems(topsellers) {
    var self = this;
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();
    var products = [];
    var dataPromisies = [];

    topsellers.forEach(pName => {

      firebaseApp.firestore().collection("products").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          if (doc.data().name == pName) {
            dataPromisies.push(
              storage.ref(doc.data().image).getDownloadURL().then((url) => {
                products = [...products, { id: doc.id, imagePath: url, ...doc.data() }];
              }).catch(() => {
                products = [...products, { id: doc.id, ...doc.data() }];
              })
            );
          }

        });
        Promise.all(dataPromisies).then(() => {
          self.setState({ products: products })
          //console.log(this.state.products.length)
        })
      }).catch((error) => console.log('error', error));

    });

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
              //console.log("Document successfully written!");
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

    const { search } = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
        <View style={{ fbackgroundColor: "#75C34D", backgroundColor:"#75C34D", height:100 }}>
          <Image
              style={{ width: 40, height: 40, position: "absolute", left:10, top:50 }}
              source={require('./logo.png')}

            />
        </View>
        <SearchBar 
          inputStyle={{backgroundColor: 'white', padding: 5,}}
          containerStyle={{backgroundColor: '#75C34D', borderWidth: 0,}}
          placeholderTextColor={'#75C34D'}
          lightTheme
          placeholder="Search by category or products ..."
          onChangeText={this.updateSearch}
          value={search}
          onSubmitEditing={(text) => this.searchProduct(text)} />
        <View style={styles.prucdtList}>
          <ScrollView
          contentContainerStyle={{display: 'flex', alignItems:'stretch'}}>
            <Image
              style={{
                flexGrow:1,
                height:400,
                width:'100%',
                resizeMode: 'contain'
              }}
              source={require('./offer.png')}
            />
            <Text style={styles.headingFont}>Top Seller</Text>
            <View style={{ marginBottom: 160,}}>
              { this.state.products.map((item, index) => (
            
                <TouchableOpacity style={styles.item} onPress={() =>
                  this.props.navigation.navigate('ProductDetail', { productId: item.id })
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
                  <Text style={styles.itemPrice}>$ {item.price[Object.keys(item.price)[0]]}</Text>
                  {/* <Ionicons style={styles.rightIcon} name="add-outline" size={24} color="black" /> */}
                  <TouchableOpacity style={styles.button} onPress={() => this.addTocart(item.id)}>
                    <Text style={styles.textBtn}>Add</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>
        </View> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerStyle:
  {
    flex: 1,
  },
  headingFont: {
    fontSize: 20,
    color: '#75C34D',
    fontWeight: 'bold',
    marginBottom: '1%',
  },
  seachbar: {
    flexGrow: 5,

  },
  item: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    // borderColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowRadius: 6,
    // shadowOpacity: 1,  
  },
  itemText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    textAlign: 'center',
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
  },
  prucdtList:
  {
    padding: 15,
  }


});
export default Home;