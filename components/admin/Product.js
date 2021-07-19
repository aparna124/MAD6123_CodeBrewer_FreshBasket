import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      categoryId: '',
      productWeight: '',
      productPrice: 0.0,
      productDescription: '',
      productIngredients: '',
      categories:[]
    }
  }

  componentDidMount() {
    axios.get('http://192.168.0.112:3000/category')
      .then(res => {
        this.setState({categories: res.data})
        console.log('category loaded')
      });
  }
  
  

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  onSubmit = () => {
    const product = {
      productName: this.state.productName,
      categoryId: this.state.categoryId,
      productWeight: this.state.productWeight,
      productPrice: this.state.productPrice,
      productDescription: this.state.productDescription,
      productIngredients: this.state.productIngredients
    }

    console.log(product);

    axios.post('http://192.168.0.112:3000/product/add', product)
      .then(res => {
        console.log(res.data)
        this.setState({
          productName: ''
        })
    });
    
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Create New Product</Text>
          <View>
            <TextInput style={styles.TextInput} placeholder="Type product name" value={this.state.productName} onChangeText={(val) => this.updateInputVal(val, 'productName')}/>
            <Picker  style={styles.TextInput} 
              selectedValue={this.state.categoryId}
              onValueChange={(itemValue, itemIndex) =>
                this.updateInputVal(itemValue, 'categoryId')
              }>
                {
                  this.state.categories.map((val) => {
                    return (<Picker.Item key={val._id} label={val.name} value={val._id} />)
                  })
                }
            </Picker>

            <TextInput style={styles.TextInput} placeholder="Type product weight" value={this.state.productWeight} onChangeText={(val) => this.updateInputVal(val, 'productWeight')}/>
            <TextInput style={styles.TextInput} placeholder="Type product price" value={this.state.productPrice} onChangeText={(val) => this.updateInputVal(val, 'productPrice')}/>
            <TextInput style={styles.TextInput} placeholder="Type product description" value={this.state.productDescription} onChangeText={(val) => this.updateInputVal(val, 'productDescription')}/>
            <TextInput style={styles.TextInput} placeholder="Type product Ingredients" value={this.state.productIngredients} onChangeText={(val) => this.updateInputVal(val, 'productIngredients')}/>
          </View>
          <View style={styles.signUpbutton}>
              <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={this.onSubmit}>
                  <Text style={styles.signbtnText}>Add New Product</Text>
              </TouchableOpacity>    
          </View>
         
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
    marginTop: 10,
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
    // borderColor: 'grey',
    // flex: 1,
    // fontSize: 15,
    padding: 15,
    marginBottom: 15,
  },
});