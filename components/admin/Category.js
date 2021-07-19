import React, { Component } from 'react';
import axios from 'axios';
import { SafeAreaView, ScrollView, StyleSheet, Text, Button, TouchableOpacity, View, Image, TextInput } from 'react-native';

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

  componentDidMount(){
    const categoryId = this.props.navigation.getParam('categoryId')
    if(categoryId != null && categoryId != undefined && categoryId != ''){
        axios.get('http://192.168.0.112:3000/category/' +categoryId)
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
  }

  onSubmit = () => {
    const category = {
      categoryName: this.state.categoryName
    }
    if(this.state.categoryId != null && this.state.categoryId != undefined && this.state.categoryId != ''){
      axios.put('http://192.168.0.112:3000/category/' + this.state.categoryId, category)
      .then(res => {
        console.log(res.data)
        this.setState({
          categoryName: ''
        })
        this.props.navigation.pop()
      });
    } else {
      axios.post('http://192.168.0.112:3000/category/add', category)
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
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Create New Category</Text>
          <View>
            <TextInput style={styles.TextInput} placeholder="Type category name" value={this.state.categoryName} onChangeText={this.onChangeCategoryName}/>
          </View>
          <View style={styles.signUpbutton}>
              <TouchableOpacity style={[styles.signUp, {color: 'black'}]} onPress={this.onSubmit}>
                  <Text style={styles.signbtnText}>{this.state.categoryId != null && this.state.categoryId != undefined && this.state.categoryId != '' ? 'Update' : 'Add New Category'}</Text>
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