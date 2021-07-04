import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';

class Profile extends React.Component {

    
  constructor(props) 
  {
    super(props);
    this.state = {email: '', firstname: '', lastname: '', contact: '', address: ''}
  }

  fetchData()
  {
    console.log(firebaseApp.auth().currentUser.uid);
    firebaseApp.firestore.collection("user").doc(firebaseApp.auth().currentUser.uid).get() 
    .then(function(doc){
  
     
        //this.setState({output: doc.data().firstname});
        console.log(doc.data())
    
    }).catch(function(error){
      console.log("error", error);
    })

  }
  

  componentDidMount(){
    this.fetchData()
  }

  updateInputVal = (val, prop) => 
  {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

    render() {
      return (
        <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/logo.png')}/> */}
          <Text style={styles.titleText}>
            Welcome User!
          </Text>
          <Text>{}</Text>
        </View>
        
        <AntDesign name="edit" size={24} color="grey" style = {styles.inputIcon}/>
  

        <View style={styles.footer}>
    
             {/* First name */}
             <Text style={[styles.text_footer, {margin: 12}]}>First Name</Text>
             <View>
                <TextInput style={styles.TextInput} value={this.state.firstname} onChangeText={(val) => this.updateInputVal(val, 'firstname')}>{this.state.output}</TextInput>
            </View>

             {/* Last name */}
             <Text style={[styles.text_footer, {margin: 12}]}>Last Name</Text>
             <View>
                <TextInput style={styles.TextInput} value={this.state.lastname} onChangeText={(val) => this.updateInputVal(val, 'lastname')}></TextInput>
            </View>

            {/* Email */}
            <Text style={[styles.text_footer, {margin: 12}]}>Email</Text>
            <View>
                <TextInput style={styles.TextInput} value={this.state.email} onChangeText={(val) => this.updateInputVal(val, 'email')}></TextInput>
            </View>

            {/* Contact */}
            <Text style={[styles.text_footer, {margin: 12}]}>Contact</Text>
            <View>
                <TextInput style={styles.TextInput} value={this.state.contact} onChangeText={(val) => this.updateInputVal(val, 'contact')}></TextInput>
            </View>

            {/* Address */}
            <Text style={[styles.text_footer, {margin: 12}]}>Address</Text>
            <View>
                <TextInput style={styles.TextInputAddress} value={this.state.address} onChangeText={(val) => this.updateInputVal(val, 'address')}></TextInput>
            </View>

            

        </View>

      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 50,
  },


//   footer:
//   {
//     flex: 3,
//     backgroundColor: '#fff',
//     borderTopRightRadius: 50,
//     borderTopLeftRadius: 50,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },

  

  titleText:
  {
    color: '#75C34D',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 80,
  },

  action:
  {
      flexDirection: 'row',
      marginTop: 20,
  },

  TextInput:
  {
    height: 50,
    margin: 12,
    borderWidth: 0.25,
    borderRadius: 5,
  }, 

  TextInputAddress:
  {
    height: 80,
    margin: 12,
    borderWidth: 0.25,
    borderRadius: 5,  
  },
  inputIcon:
  {
    paddingLeft: 350,
  }
});

export default Profile;