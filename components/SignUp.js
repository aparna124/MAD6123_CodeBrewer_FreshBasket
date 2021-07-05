import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

import { StackActions, NavigationActions } from 'react-navigation'; 
import {firebaseApp} from '../firebase-config';


class SignUp extends React.Component   {

  constructor() 
  {
    super();
    this.state = { 
      email: '', 
      password: '',
      firstname: '',
      lastname: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => 
  {
    if(this.state.email === '' && this.state.password === '') 
    {
      Alert.alert('Enter details to signup!')
    }
    else
    {
      this.setState({
        isLoading: true,
      })
    }

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(firebaseApp.auth().currentUser.uid);
        const uid = firebaseApp.auth().currentUser.uid;
        const db = firebaseApp.firestore();
        db.collection('user').doc(uid).set({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          type: "user"
          }).then(() => {
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: '',
          firstname: '',
          lastname: '',
        })
        this.props.navigation.navigate('Login')
      })
      
    })
      .catch(error =>{
        console.log(error);
        //this.setState({ errorMessage: error.message })
      })      
}

  render()
  {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/logo.png')}/> */}
          <Text style={styles.titleText}>
            Create an Account Here!
          </Text>
          {/* <Text style={[{color: 'blue'}, {marginTop: 25}]} onPress={()=>{

            const navigateAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Home" })],
            });

            this.props.navigation.dispatch(navigateAction);
            
            }}>Go to Home!</Text> */}
        </View>


        
        <View style={styles.footer}>

            {/* Email */}

            <Text style={[styles.text_footer, {marginTop: 15}, {paddingTop: 5}]}>Email</Text>
            <View style={styles.action}>
                <MaterialIcons 
                name = 'mail-outline'
                size = {20}
                color = 'grey'
                style = {styles.inputIcon}
                />
                <TextInput style={styles.TextInput} placeholder="Enter your Mail" autoCapitalize='none' value={this.state.email} onChangeText={(val) => this.updateInputVal(val, 'email')}></TextInput>
            </View>

             {/* Password */}

            <Text style={[styles.text_footer, {marginTop: 40}]}>Password</Text>
            <View style={styles.action}>
                <MaterialIcons 
                name = 'lock-outline'
                size = {20}
                color = 'grey'
                style = {styles.inputIcon}
                />
                <TextInput style={styles.TextInput} placeholder="Enter your Password" secureTextEntry={true} value={this.state.password} onChangeText={(val) => this.updateInputVal(val, 'password')}></TextInput>
            </View>

             {/* First name */}

             <Text style={[styles.text_footer, {marginTop: 40}]}>First Name</Text>
             <View style={styles.action}>
                <AntDesign 
                name = 'user'
                size = {20}
                color = 'grey'
                style = {styles.inputIcon}
                />
                <TextInput style={styles.TextInput} placeholder="First Name" value={this.state.firstname} onChangeText={(val) => this.updateInputVal(val, 'firstname')}></TextInput>
            </View>

             {/* Last name */}

             <Text style={[styles.text_footer, {marginTop: 40}]}>Last Name</Text>
             <View style={styles.action}>
                <AntDesign 
                name="user"
                size = {20}
                color = 'grey'
                style = {styles.inputIcon}
                />
                <TextInput style={styles.TextInput} placeholder="Last Name" value={this.state.lastname} onChangeText={(val) => this.updateInputVal(val, 'lastname')}></TextInput>
            </View>

            <View style={styles.signUpbutton}>
                <TouchableOpacity style={[styles.signUp, {color: 'black'}]}>
                     <Text style={styles.signbtnText} onPress={() => this.registerUser()}>SignUp</Text>
                </TouchableOpacity>    
            </View>

            <View style={styles.signInbutton}>
                <TouchableOpacity style={[styles.signIn, {color: 'black'}]} onPress={()=>{navigate('SignIn')}}>
                     <Text style={styles.signUpbtnText}>SignIn</Text>
                </TouchableOpacity>    
            </View>
        </View>

      </ScrollView>
  );
  }   
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#75C34D',
    flex: 1,
  },

  header: {
   flex: 1,
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 50,
  },


  footer:
  {
    flex: 3,
    backgroundColor: '#fff',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  

  titleText:
  {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  action:
  {
      flexDirection: 'row',
      marginTop: 20,
  },

  TextInput:
  {
    paddingLeft: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    flex: 1,
    fontSize: 15,
    paddingBottom: 6,
  },

  inputIcon:
  {
    
    position: 'absolute',
  },

  signUpbutton:
  {
    alignItems: 'center',
    marginTop: 30,
  },

  signInbutton:
  {
    alignItems: 'center',
    marginTop: 15,
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

  signIn:
  {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#75C34D'
    
  },

  signbtnText:
  {
      color: '#fff',
      fontSize: 15,
  }


  
});

export default SignUp;


