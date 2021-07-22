
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from "axios";

class Profile extends Component {

 constructor(props)
 {
   super(props);
   this.state = {firstname: '', lastname: '', email: '', contact: '', address: '', user: null};
  //  this.fetchData = this.fetchData();
 }
    
  fetchData()
  {
    let self = this;
    const currentUser = firebaseApp.auth().currentUser;
    const uid = currentUser.uid;
    if( currentUser == null || currentUser == undefined){
      alert("you have to login")
      const navigateAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });
      self.props.navigation.dispatch(navigateAction);
      return
    }
    
    //db.collection("user").doc(currentUser.uid).get() 
    
     axios.get("http://localhost:3000/profile?userid=" +uid)
    .then(res =>
    {
      
          self.setState({firstname: res.data[0].firstname});
          self.setState({lastname: res.data[0].lastname});
          self.setState({email: res.data[0].email});
          self.setState({contact: res.data[0].contact});
          self.setState({address: res.data[0].address});
    }).catch(function(error){
      console.log("error", error);
    })
  }
  

  componentDidMount(){
    // console.log('parent',this.props.navigation)
    this.fetchData();
  }

  signOutUser = async () => 
  {
    var self = this;
    try {
        await firebaseApp.auth().signOut();

        const navigateAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });
        self.props.navigation.dispatch(navigateAction);

    } catch (e) {
        console.log(e);
    }
}

  updateUser()
  { 

    const uid = firebaseApp.auth().currentUser.uid;
    console.log(uid);
    // if( currentUser == null || currentUser == undefined){
    //   alert("you have to login")
    //   const navigateAction = StackActions.reset({
    //     index: 0,
    //     key: null,
    //     actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    //   });
    //   this.props.navigation.dispatch(navigateAction);
    //   return
    // }
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      address: this.state.address,
    }

      axios.put("http://localhost:3000/profile?userid=" +uid, user)
      .then(res => {
        console.log(res.data)
        this.setState({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          contact: this.state.contact,
          address: this.state.address,
        })
      });
  }

    render() {
      return (
        <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/logo.png')}/> */}
          <Text style={styles.titleText}>
            Welcome {this.state.firstname}!
          </Text>

        </View>
        
        {/* <AntDesign name="edit" size={24} color="grey" style = {styles.inputIcon}/> */}
        {/* <FontAwesome name="save" size={28} color="#75C34D" style = {styles.inputIcon} /> */}
         
       
        <ScrollView>
    
            
            {/* First name */}
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 15}]}>First Name</Text>
             <View> 
                <TextInput style={styles.resultText} onChangeText={firstname => this.setState({firstname})}>{this.state.firstname}</TextInput>
            </View> 
            


             {/* Last name */}
             <Text style={[styles.text_footer, {margin: 12}, {fontSize: 15}]}>Last Name</Text>
             <View>
                <TextInput style={styles.resultText} onChangeText={lastname => this.setState({lastname})}>{this.state.lastname}</TextInput>
            </View>

            {/* Email */}
           <Text style={[styles.text_footer, {margin: 12}, {fontSize: 15}]}>Email</Text>
            <View>
                <TextInput style={styles.resultText} onChangeText={email => this.setState({email})}>{this.state.email}</TextInput>
            </View>

            {/* Contact */}
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 15}]}>Contact</Text>
            <View>
                <TextInput style={styles.resultText} onChangeText={contact => this.setState({contact})}>{this.state.contact}</TextInput>
            </View>

            {/* Address */}
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Address</Text>
            <View>
                <TextInput style={styles.TextInputAddress} onChangeText={address => this.setState({address})}>{this.state.address}</TextInput>
            </View>
            {/* <Button title="Save" style = {styles.inputIcon} onPress={() => this.updateUser()}/> */}

            <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
                <Text  style={styles.textBtn}>Save</Text>
            </TouchableOpacity>

            {/* <View style={styles.profileFooter}/>

            <Text style={styles.profileFooterText}>Order Status</Text>

            <View style={styles.profileFooter}/>

            <Text style={styles.profileFooterText}>Wallet</Text> */}

            <View style={styles.profileFooter}/>

            <View style={styles.profileFooterBtn}>
              <Button title="Logout" onPress={() => this.signOutUser()} />
            </View>
          

            <View style={styles.profileFooter}/>

        </ScrollView>
       
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
  },

  header: {
   justifyContent: 'flex-end',
   paddingHorizontal: 20,
   paddingBottom: 50,
  },  

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

  resultText:
  {
    height: 50,
    margin: 12,
    borderWidth: 0.25,
    borderRadius: 5,
    padding: 10,
  }, 

  TextInputAddress:
  {
    height: 80,
    margin: 12,
    borderWidth: 0.25,
    borderRadius: 5,
    padding: 10,  
  },
  inputIcon:
  {
    paddingBottom: 20,
  },
  profileFooter:
  {
    borderBottomColor: 'grey', 
    borderBottomWidth: 0.2, 
    paddingBottom: '5%'
  },
  profileFooterText:
  {
    paddingTop: '5%', 
    paddingLeft: '5%',
    color: 'red',
    fontSize: 20,
  },
  profileFooterBtn:
  {
    paddingTop: '5%',
    paddingRight: '75%',
    color: 'red',
    fontSize: 20,
  },
  
  button: {
    margin: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#75C34D',
    borderWidth: 1,
    backgroundColor: '#75C34D',
  },
  textBtn: {
    color: '#FFF',
    fontSize: 17,
  },

});

export default Profile;