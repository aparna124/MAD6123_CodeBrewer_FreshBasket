
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { firebaseApp } from '../firebase-config';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from "axios";
import { HOST_URL } from '../commonConfig'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { firstname: '', lastname: '', email: '', contact: '', address: '' };
  }

  fetchData() {
    let self = this;
    const currentUser = firebaseApp.auth().currentUser;
    if (currentUser == null || currentUser == undefined) {
      alert("you have to login")
      const navigateAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
      });
      self.props.navigation.dispatch(navigateAction);
      return
    }
    const uid = currentUser.uid;
    axios.get(HOST_URL + "profile?userid=" + uid)
      .then(res => {

        self.setState({ firstname: res.data[0].firstname });
        self.setState({ lastname: res.data[0].lastname });
        self.setState({ email: res.data[0].email });
        self.setState({ contact: res.data[0].contact });
        self.setState({ address: res.data[0].address });
      }).catch(function (error) {
        console.log("error", error);
      })
  }


  componentDidMount() {
    console.log("Profile componentDidMount")
    this.fetchData();
  }

  signOutUser = async () => {
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

  updateUser() {

    const uid = firebaseApp.auth().currentUser.uid;
    console.log(uid);

    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      contact: this.state.contact,
      address: this.state.address,
    }

    axios.put(HOST_URL + "profile?userid=" + uid, user)
      .then(res => {
        console.log(res.data)
        this.setState({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          contact: this.state.contact,
          address: this.state.address,
        })
      }).then(() =>{
        alert("User updated succesfully");
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
    
          <Text style={styles.titleText}>
            Welcome {this.state.firstname}!
          </Text>

        </View>

        <ScrollView>


          {/* First name */}
          <Text style={[styles.text_footer, { margin: 12 }, { fontSize: 15 }]}>First Name</Text>
          <TextInput style={styles.resultText} onChangeText={firstname => this.setState({ firstname })} value={this.state.firstname} />

          {/* Last name */}
          <Text style={[styles.text_footer, { margin: 12 }, { fontSize: 15 }]}>Last Name</Text>
          <TextInput style={styles.resultText} onChangeText={lastname => this.setState({ lastname })} value={this.state.lastname} />

          {/* Email */}
          <Text style={[styles.text_footer, { margin: 12 }, { fontSize: 15 }]}>Email</Text>
          <TextInput style={styles.resultText} onChangeText={email => this.setState({ email })} value={this.state.email}/>

          {/* Contact */}
          <Text style={[styles.text_footer, { margin: 12 }, { fontSize: 15 }]}>Contact</Text>
          <TextInput style={styles.resultText} onChangeText={contact => this.setState({ contact })} value={this.state.contact ?? ""}/>

          {/* Address */}
          <Text style={[styles.text_footer, { margin: 12 }, { fontSize: 20 }]}>Address</Text>
          <TextInput style={styles.TextInputAddress} onChangeText={address => this.setState({ address })} value={this.state.address ?? ""}/>

          <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
            <Text style={styles.textBtn}>Save</Text>
          </TouchableOpacity>

          <View style={styles.profileFooter} />

          <View style={styles.profileFooterBtn}>
          <TouchableOpacity style={styles.button} onPress={() => this.signOutUser()}>
            <Text>Logout</Text>
          </TouchableOpacity>
          </View>


          <View style={styles.profileFooter} />

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