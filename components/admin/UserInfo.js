import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, FlatList, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {HOST_URL} from '../../commonConfig'

export default class UserInfo extends Component {
  
  state = { user: ''}

  initProduct() {
    console.log("initProduct")
    
    axios.get(HOST_URL + 'user/details')
      .then(res => {
        this.setState({user: res.data})
      });
  }

  componentDidMount(){
    this.initProduct()
    this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          this.initProduct();
        }
      );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <FlatList
          data={this.state.user}
          extraData={this.state}
          renderItem={({item}) => {
            return (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item.email}</Text>
                <TouchableOpacity style={styles.button}>
                    <Button title="See All" onPress={() => this.props.navigation.navigate('userOrderDetail', {itemId: item._id, userId: item.userid})}/>
                </TouchableOpacity>
            </TouchableOpacity>
          )}}/>
        </SafeAreaView></View>
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
  item: {
    flexDirection: 'row',
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
    //borderBottomWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 20,
    flex: 2,
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
    flexShrink:1,
    marginRight: 20,
  },
  rightIcon:{
    flexShrink:1,
    color: '#75c34d',
  }
});