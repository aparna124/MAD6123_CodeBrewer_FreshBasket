import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

class Profile extends React.Component {


    render() {
      return (
        <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={require('./assets/logo.png')}/> */}
          <Text style={styles.titleText}>
            Welcome User!
          </Text>
        </View>
        <View>
        <AntDesign name="edit" size={24} color="black" style = {styles.inputIcon}/>
        </View>

        <View style={styles.footer}>
    
             {/* First name */}
             <Text style={[styles.text_footer, {margin: 12}]}>First Name</Text>
             <View>
                <TextInput style={styles.TextInput}></TextInput>
            </View>

             {/* Last name */}
             <Text style={[styles.text_footer, {margin: 12}]}>Last Name</Text>
             <View>
                <TextInput style={styles.TextInput}></TextInput>
            </View>

            {/* Email */}
            <Text style={[styles.text_footer, {margin: 12}]}>Email</Text>
            <View>
                <TextInput style={styles.TextInput}></TextInput>
            </View>

            {/* Contact */}
            <Text style={[styles.text_footer, {margin: 12}]}>Contact</Text>
            <View>
                <TextInput style={styles.TextInput}></TextInput>
            </View>

            {/* Address */}
            <Text style={[styles.text_footer, {margin: 12}]}>Address</Text>
            <View>
                <TextInput style={styles.TextInputAddress}></TextInput>
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
      paddingRight: 100,
  }
});

export default Profile;