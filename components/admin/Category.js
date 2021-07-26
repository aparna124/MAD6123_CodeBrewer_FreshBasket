import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput, Platform } from 'react-native';
import {HOST_URL} from '../../commonConfig'
import * as ImagePicker from 'expo-image-picker';
import {uploadImageAsync} from '../../firebase-config';

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: ''
    }
  }

  onChangeCategoryName = (value)  => {
    this.setState({
      categoryName: value
    })
  }

  async componentDidMount(){
    const categoryId = this.props.navigation.getParam('categoryId')
    if(categoryId != null && categoryId != undefined && categoryId != ''){
        axios.get(HOST_URL + 'category/' +categoryId)
        .then( res => {
          this.setState({
            categoryId: res.data._id,
            categoryName: res.data.name
          })
        }).catch(() =>{
          alert("Error")
          this.props.navigation.pop()
        })
    }
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  onSubmit = async () => {
    var category = {
      categoryName: this.state.categoryName
    }

    if(this.pickerResult != null && this.pickerResult != undefined){
      console.log("pickerResult")
      category = {
        ...category,
        image: await this._handleImagePicked(this.pickerResult, category.categoryName),
      }
    }
    
    if(this.state.categoryId != null && this.state.categoryId != undefined && this.state.categoryId != ''){
      axios.put(HOST_URL + 'category/' + this.state.categoryId, category)
      .then(res => {
        console.log(res.data)
        this.setState({
          categoryName: ''
        })
        this.props.navigation.pop()
      });
    } else {
      axios.post(HOST_URL + 'category/add', category)
        .then(res => {
          console.log(res.data)
          this.setState({
            categoryName: ''
          })
          this.props.navigation.pop()
        });
    }
  }


  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Create New Category</Text>
          <View>
            <TextInput style={styles.TextInput} placeholder="Type category name" value={this.state.categoryName} onChangeText={this.onChangeCategoryName}/>
          </View>
          <View>
            <Button
              onPress={this._pickImage}
              title="Pick an image"
            />
          </View>
          <View style={styles.signUpbutton}>
              <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={this.onSubmit}>
                  <Text style={styles.signbtnText}>{this.state.categoryId != null && this.state.categoryId != undefined && this.state.categoryId != '' ? 'Update' : 'Add New Category'}</Text>
              </TouchableOpacity>
          </View>
         
      </View>
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
    // borderColor: 'grey',
    // flex: 1,
    // fontSize: 25,
    padding: 15,
  },
});