
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';
import { StackActions, NavigationActions } from 'react-navigation'

class Profile extends Component {

 constructor(props)
 {
   super(props);
   this.state = {firstname: '', lastname: '', email: '', contact: '', address: ''};
  //  this.fetchData = this.fetchData();
 }
    
  fetchData()
  {
    let self = this;
    const currentUser = firebaseApp.auth().currentUser;
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
    const db = firebaseApp.firestore();
    db.collection("user").doc(currentUser.uid).get() 
    .then(function(doc)
    {
      
        if(doc.exists)
        {
          self.setState({firstname: doc.data().firstname});
          self.setState({lastname: doc.data().lastname});
          self.setState({email: doc.data().email});
          self.setState({contact: doc.data().contact});
          self.setState({address: doc.data().address});
          console.log(self.state.firstname);
        } 
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

    const currentUser = firebaseApp.auth().currentUser;
    if( currentUser == null || currentUser == undefined){
      alert("you have to login")
      const navigateAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });
      this.props.navigation.dispatch(navigateAction);
      return
    }
    const db = firebaseApp.firestore();
    const updateDBRef = db.collection('users').doc(currentUser.uid);
    db.collection("user").doc(firebaseApp.auth().currentUser.uid).set({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      address: this.state.address,
    }).then(() => {
      console.log('User updated successfully!')}).catch(error =>{
      console.log(error);
    }) 
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
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Last Name</Text>
             <View> 
                <TextInput style={styles.resultText} onChangeText={firstname => this.setState({firstname})}>{this.state.firstname}</TextInput>
            </View> 
            


             {/* Last name */}
             <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Last Name</Text>
             <View>
                <TextInput style={styles.resultText} onChangeText={lastname => this.setState({lastname})}>{this.state.lastname}</TextInput>
            </View>

            {/* Email */}
           <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Email</Text>
            <View>
                <TextInput style={styles.resultText} onChangeText={email => this.setState({email})}>{this.state.email}</TextInput>
            </View>

            {/* Contact */}
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Contact</Text>
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