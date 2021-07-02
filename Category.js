  import React from 'react';
  import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
  import { createAppContainer } from 'react-navigation';
  import { createBottomTabNavigator } from 'react-navigation-tabs';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { createStackNavigator } from 'react-navigation-stack';
  import { MaterialIcons } from '@expo/vector-icons';
  

  import {firebaseApp} from './firebase-config';
  
  
  class Category extends React.Component {
    state = { categories: [],  title: '' }

    initCategory() {
      console.log("initCategory")
      const db = firebaseApp.firestore();
      const storage = firebaseApp.storage();
      
      var categories = [];
      var dataPromisies = [];
      dataPromisies.push(db.collection("categories").get().then((snapshot) => {
        snapshot.forEach((doc) => {
          dataPromisies.push(
          storage.ref(doc.data().image).getDownloadURL().then((url) => {
            categories.push({ id: doc.id, imagePath: url, ...doc.data() });
          }).catch(() => {
            categories.push({ id: doc.id, ...doc.data() });
          }));
        });  
      }));
      Promise.all(dataPromisies).then(() => {
        console.log("initCategory : done", categories)
        this.setState({categories: categories})
      })
    }

    componentDidMount(){
      this.initCategory()
    }

    render() {
      console.log("render : categories", this.state.categories)
      return (
        <View style={{ flex: 1, justifyContent: 'flex-start',}}>
          <Text>Categories</Text>
          <SafeAreaView>
            <FlatList
            data={this.state.categories}
            renderItem={({item}) => (
              <View style={styles.item}>
                <TouchableOpacity style={styles.info} onPress={() => this.props.navigation.navigate('ProductList')}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <MaterialIcons name='right' size={20} color='#FFF' />
                </TouchableOpacity>
              </View>
            )}/>
            </SafeAreaView>
          </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        item: {
          padding: 12,
          marginTop: 15,
          borderColor: '#000',
          backgroundColor: '#2ECC71',
          borderWidth: 1,
          borderRadius: 5,
          flexDirection: 'row',
        },
        itemText: {
          marginLeft: 10,
          marginTop: 3,
          flexGrow: 1,
        }
      });
      
      export default Category;