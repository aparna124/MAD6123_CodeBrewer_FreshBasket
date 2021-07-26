import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { HOST_URL } from '../../commonConfig'

export default class userOrderDetail extends Component {

  state = { orders: [], userInfo: ''}

  initOrder() {

    // axios
    // .get(HOST_URL + "/get-by-user-id?userId=" + userId)
    // .then(function (doc) {


    
    axios.get(HOST_URL + 'order')
      .then(res => {
        this.setState({ orders: res.data })
      });
  }

  initUser()
  {
    const itemId = this.props.navigation.getParam('itemId')
    axios.get(HOST_URL + 'user/' + itemId)
      .then(res => {
        this.setState({userInfo: res.data})
        console.log(this.state.userInfo);
      })
      .catch((error) => console.log('error',error));
    
  }

  componentDidMount() {
    this.initOrder()
    this.initUser()
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.initOrder();
        this.initUser();
      }
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  orderStatusUpdate = (orderId, status) => {
    axios.post(HOST_URL + 'order/update', { orderId, status })
      .then(res => {
        this.initOrder()
      });
  }
  render() {
    return (
      <View style={styles.container}>
       
        <SafeAreaView>
        <View style={styles.addressField}>
          <Text>Name: {this.state.userInfo.firstname}</Text>
          <Text>Email Id: {this.state.userInfo.email}</Text>
          <Text>Contact: {this.state.userInfo.contact}</Text>
          <Text>Address: {this.state.userInfo.address}</Text>
        </View>
          <FlatList
            data={this.state.orders}
            extraData={this.state}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.item}>
                  <View style={styles.itemBtnContainer}>
                    {
                      item.status == "Ordered" &&
                      <TouchableOpacity onPress={() => { this.orderStatusUpdate(item._id, "Confirmed") }}>
                        <Text style={[styles.itemBtn, { backgroundColor: '#1cc88a' }]}>Confirm</Text>
                      </TouchableOpacity>
                    }
                    {
                      item.status == "Confirmed" &&
                      <TouchableOpacity onPress={() => { this.orderStatusUpdate(item._id, "Shipped") }}>
                        <Text style={[styles.itemBtn, { backgroundColor: '#f6c23e' }]}>Ship</Text>
                      </TouchableOpacity>
                    }
                    {item.status == "Shipped" &&
                      <TouchableOpacity onPress={() => { this.orderStatusUpdate(item._id, "Delivered") }}>
                        <Text style={[styles.itemBtn, { backgroundColor: '#36b9cc' }]}>Deliver</Text>
                      </TouchableOpacity>
                    }
                    {(item.status != "Canceled" && item.status != "Delivered") &&
                      (<TouchableOpacity onPress={() => { this.orderStatusUpdate(item._id, "Canceled") }}>
                        <Text style={[styles.itemBtn, { backgroundColor: '#e74a3b' }]}>Cancel</Text>
                      </TouchableOpacity>)
                    }
                  </View>
                  <Text style={styles.itemText}>Order Number: {item.orderId}</Text>
                  <Text style={styles.itemPrice}>Order status: {item.status}</Text>
                  <Text style={styles.itemPrice}>Total Product: {item.products.size}</Text>
                  <Text style={styles.itemPrice}>Total Price: $ {item.totalPrice}</Text>
                  <Text style={styles.itemPrice}>User Name: {item.user[0].firstname} {item.user[0].lastname}</Text>
                </TouchableOpacity>
              )
            }} />
        </SafeAreaView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
  },
  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  signUpbutton:
  {
    alignItems: 'center',
    marginTop: 30,
  },
  signUp:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#75C34D'
  },
  signbtnText:
  {
    color: '#fff',
    fontSize: 15,
  },
  TextInput:
  {
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1,
    fontSize: 15,
    padding: 15,
  },
  itemBtnContainer: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  itemBtn: {
    margin: 10,
    padding: 10,
    color: '#FFF',
  },
  item: {
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
  button: {
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    marginLeft: 10,
    flex: 2,
    marginTop: 4,
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
    flexShrink: 1,
    marginRight: 20,
  },
  rightIcon: {
    flexShrink: 1,
    color: '#75c34d',
  },


addressField:
{
  //alignItems: 'center',
  borderWidth: 0.25,
  paddingLeft: 25,
  borderColor: 'black',
  padding: 8,
  margin: 0,
  borderRadius: 5,
  width: '100%',
  //alignItems: 'center',
  //justifyContent: 'center',
  height: 120,
},

});