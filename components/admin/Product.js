import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {HOST_URL} from '../../commonConfig'
import * as ImagePicker from 'expo-image-picker';
import {uploadImageAsync} from '../../firebase-config';

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      categoryId: '',
      productWeight: '0',
      productPrice: '0.0',
      productDescription: '',
      productIngredients: '',
      categories:[]
    }
  }

  async componentDidMount() {
    const productId = this.props.navigation.getParam('productId')
    axios.get(HOST_URL + 'category')
      .then(catRes => {
        console.log('category loaded')
        if(productId != null && productId != undefined && productId != ''){
          axios.get(HOST_URL + 'product/' +productId)
          .then( res => {
            this.setState({
              productId: res.data._id,
              productName: res.data.name,
              categoryId: res.data.category,
              productWeight: res.data.weight.toString(),
              productPrice: res.data.price.toString(),
              productDescription: res.data.details,
              productIngredients: res.data.ingredients,
              categories: catRes.data,
            })
          }).catch(() =>{
            alert("Error")
            this.props.navigation.pop()
          })
        } else {
          this.setState({categories: catRes.data})
        }
      });
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  onSubmit = async () => {
    var product = {
      productName: this.state.productName,
      categoryId: this.state.categoryId,
      productWeight: this.state.productWeight,
      productPrice: this.state.productPrice,
      productDescription: this.state.productDescription,
      productIngredients: this.state.productIngredients
    }
    if(this.pickerResult != null && this.pickerResult != undefined){
      console.log("pickerResult")
      product = {
        ...product,
        image: await this._handleImagePicked(this.pickerResult, product.productName),
      }
    }
    if(this.state.productId != null && this.state.productId != undefined && this.state.productId != ''){
      axios.put(HOST_URL + 'product/' + this.state.productId, product)
      .then(res => {
        console.log(res.data)
        this.setState({
          productName: '',
          categoryId: '',
          productWeight: '0',
          productPrice: '0.0',
          productDescription: '',
          productIngredients: '',
        })
        this.props.navigation.pop()
      });
    } else {
      axios.post(HOST_URL + 'product/add', product)
        .then(res => {
          console.log(res.data)
          this.setState({
            productName: '',
            categoryId: '',
            productWeight: '0',
            productPrice: '0.0',
            productDescription: '',
            productIngredients: '',
          })
          this.props.navigation.pop()
      });
    }
  }

  render() {
    return (
      <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.titleText}>Create New Product</Text>
          <View>
            <TextInput style={styles.TextInput} placeholder="Type product name" value={this.state.productName} onChangeText={(val) => this.updateInputVal(val, 'productName')}/>
            <Picker style={styles.TextInput} 
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

            <View style={styles.TextInput}>
              <Button
                onPress={this._pickImage}
                title="Pick an image"
              />
            </View>

            <TextInput style={styles.TextInput} placeholder="Type product weight" keyboardType='numeric' value={this.state.productWeight} onChangeText={(val) => this.updateInputVal(val, 'productWeight')}/>
            <TextInput style={styles.TextInput} placeholder="Type product price" keyboardType='numeric' value={this.state.productPrice} onChangeText={(val) => this.updateInputVal(val, 'productPrice')}/>
            <TextInput style={styles.TextInput} placeholder="Type product description" value={this.state.productDescription} onChangeText={(val) => this.updateInputVal(val, 'productDescription')}/>
            <TextInput style={styles.TextInput} placeholder="Type product Ingredients" value={this.state.productIngredients} onChangeText={(val) => this.updateInputVal(val, 'productIngredients')}/>
          </View>
          <View style={styles.signUpbutton}>
              <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={this.onSubmit}>
                  <Text style={styles.signbtnText}>{this.state.productId != null && this.state.productId != undefined && this.state.productId != '' ? 'Update' : 'Add New Product' }</Text>
              </TouchableOpacity>    
          </View>
         
        </View>
      </ScrollView>
      </SafeAreaView>
    )
  }
  
  pickerResult = null;
  _pickImage = async () => {
    this.pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  };

  _handleImagePicked = async (pickerResult, name) => {
    try {
      console.log("_handleImagePicked")
      const uploadUrl = await uploadImageAsync(pickerResult.uri, name);
      return uploadUrl;
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
      return null 
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 20,
    paddingBottom:60
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