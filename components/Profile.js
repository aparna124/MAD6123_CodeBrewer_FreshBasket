import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {firebaseApp} from '../firebase-config';

class Profile extends Component {

 constructor(props)
 {
   super(props);
   this.state = {firstname: '', lastname: '', email: ''};
  //  this.fetchData = this.fetchData();
 }
    
  fetchData()
  {
    let self = this;
    console.log(this.state.firstname);
    console.log(firebaseApp.auth().currentUser.uid);
    const uid = firebaseApp.auth().currentUser.uid;
    const db = firebaseApp.firestore();
    db.collection("user").doc(uid).get() 
    .then(function(doc)
    {
      
        if(doc.exists)
        {
          // console.log(doc.data().firstname);
          // console.log(doc.data().lastname);
          // console.log(doc.data().email);   
          self.setState({firstname: doc.data().firstname});
          self.setState({lastname: doc.data().lastname});
          self.setState({email: doc.data().email});
          console.log(self.state.firstname);
        } 
    }).catch(function(error){
      console.log("error", error);
    })
  }
  

  componentDidMount(){
    this.fetchData();
  }

  // updateInputVal = (val, prop) => 
  // {
  //   const state = this.state;
  //   state[prop] = val;
  //   this.setState(state);
  // }

  signOutUser = async () => 
  {
    try {
        await firebaseApp.auth().signOut();
        console.log("Logout");
        this.props.navigation.navigate('SignIn')
        console.log(firebaseApp.auth().currentUser.uid);

    } catch (e) {
        console.log(e);
    }
  }

    render() {
      return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/logo.png')}/> */}
          <Text style={styles.titleText}>
            Welcome User!
          </Text>
          <Text>{}</Text>
        </View>
        
        <AntDesign name="edit" size={24} color="grey" style = {styles.inputIcon}/>
  

        <View>
    
            
            {/* First name */}
            <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>First Name</Text>
             <View>
                <Text style={[styles.text_footer, {margin: 12}, {fontSize: 18}, {color: 'red'}]}>{this.state.firstname}</Text>
            </View>
            


             {/* Last name */}
             <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Last Name</Text>
             <View>
                <Text style={[styles.text_footer, {margin: 12}, {fontSize: 18}, {color: 'red'}]}>{this.state.lastname}</Text>
            </View>

            {/* Email */}
           <Text style={[styles.text_footer, {margin: 12}, {fontSize: 20}]}>Email</Text>
            <View>
                <Text style={[styles.text_footer, {margin: 12}, {fontSize: 18}, {color: 'red'}]}>{this.state.email}</Text>
            </View>

            {/* Contact */}
            {/* <Text style={[styles.text_footer, {margin: 12}]}>Contact</Text>
            <View>
                <TextInput style={styles.TextInput}></TextInput>
            </View> */}

            {/* Address */}
            {/* <Text style={[styles.text_footer, {margin: 12}]}>Address</Text>
            <View>
                <TextInput style={styles.TextInputAddress} value={this.state.address}></TextInput>
            </View> */}
             <Button title="Logout" onPress={() => this.signOutUser()} />
        </View>
       
      </ScrollView>
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

  resultText:
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