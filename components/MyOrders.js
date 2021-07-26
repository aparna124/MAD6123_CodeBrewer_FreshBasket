import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, SafeAreaView, Image } from 'react-native';
import { firebaseApp } from '../firebase-config';
var _ = require('lodash')
import { HOST_URL } from '../commonConfig'
import axios from 'axios';

class MyOrders extends React.Component {

  state = { orders: [], }

  initMyOrder() {
    const db = firebaseApp.firestore();
    const storage = firebaseApp.storage();

    const currentUser = firebaseApp.auth().currentUser;
    if (currentUser == null || currentUser == undefined) {
      return;
    }

    var orders = []
    axios.get(HOST_URL + 'order/' + currentUser.uid)
      .then(res => {
        res.data.forEach(orderData => {
          orderData.products.forEach((product) => {
            orders.push({
              orderId: orderData.orderId,
              orderStatus: orderData.status,
              ...product
            });
          });
        });
        this.setState({ orders: orders })
      }).catch((error) => console.log('error', error));
  }

  componentDidMount() {
    this.initMyOrder()
  }

  render() {
    const storage = firebaseApp.storage();
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#FFF', padding: '2%', }}>
        <FlatList
          data={this.state.orders}
          numColumns={1}
          extraData={this.state}
          renderItem={({ item }) => {
            const quantity = item.quantity == undefined ? 1 : item.quantity
            var trackFlag = false
            var trackRef
            return (
              <View style={{ flex: 1, backgroundColor: '#FFF', padding: 15, }} >
                <View style={{ borderColor: '#75C34D', borderWidth: 2, padding: 15, }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10, }}>Order ID: {item.orderId}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image
                      style={{ width: 100, height: 100, marginBottom: 10, }}
                      source={{
                        uri: item.image,
                      }}
                      resizeMode='center'
                    />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold', marginBottom: 10, }}>{item.productname}</Text>
                      <Text style={{ marginBottom: 10, }}>Quantity: {quantity}</Text>
                      <Text style={{ marginBottom: 10, }}>$ {item.productprice * quantity}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => {
                    trackFlag = !trackFlag
                    trackRef.setNativeProps({ style: trackFlag ? styles.trackContainer : styles.hiddenTrackContainer })

                    console.log('trackFlag', trackFlag)
                  }}>
                    <Text style={{ backgroundColor: '#75C34D', color: '#FFF', fontWeight: 'bold', padding: 10, }}>Track package</Text>
                  </TouchableOpacity>
                  <View ref={ele => trackRef = ele} style={styles.hiddenTrackContainer}>
                    <Text style={item.orderStatus == "Ordered" ? styles.orderd : styles.disabled}>Ordered</Text>
                    <Text style={item.orderStatus == "Confirmed" ? styles.orderd : styles.disabled}>Confirmed</Text>
                    <Text style={item.orderStatus == "Canceled" ? styles.cancelled : styles.disabled}>Cancelled</Text>
                    <Text style={item.orderStatus == "Shipped" ? styles.shipped : styles.disabled}>Shipped</Text>
                    <Text style={item.orderStatus == "Delivered" ? styles.delivered : styles.disabled}>Delivered</Text>
                  </View>
                </View>
              </View>
            )
          }} />
      </SafeAreaView>
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
  orderd: {
    fontWeight: 'bold', color: '#17a2b8',
  },
  cancelled: {
    fontWeight: 'bold', color: '#e74a3b',
  },
  shipped: {
    fontWeight: 'bold', color: '#ffc107',
  },
  delivered: {
    fontWeight: 'bold', color: '#28a745',
  },
  disabled: {
    fontWeight: 'bold', color: '#888888',
  },
  trackContainer: {
    display: 'flex',
    marginTop: 10, backgroundColor: '#F7F4F4', padding: 10, borderWidth: 2,
  },
  hiddenTrackContainer: {
    display: 'none'
  }
});

export default MyOrders;