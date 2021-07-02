import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

class Category extends React.Component {
    state = { data: [
        { key: "1", title: "Vegetable" },
        { key: "2", title: "Fruits" },
        { key: "3", title: "Snacks" },
    ],  title: '' }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start',}}>
        <Text>Categories</Text>
        <SafeAreaView>
            <FlatList
            data={this.state.data}
            renderItem={({item}) => (
                <View style={styles.item}>
                    <TouchableOpacity style={styles.info} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <MaterialIcons name='right' size={20} color='#FFF' />
                    </TouchableOpacity>
                </View>
            )}
            />
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