import React from "react";
import {Text,View,FlatList,TouchableOpacity,StyleSheet,StatusBar,SafeAreaView, Image} from "react-native";
import { SearchBar } from 'react-native-elements';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

class Home extends React.Component {


  constructor(props)
  {
    super(props);
    this.state = {search: ''}
  }

  updateSearch = (search) => {
    this.setState({ search });
  };


  render() {

    const { search } = this.state;

    return (
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ flex: 1 }}>
          <View style={[styles.container, { flexDirection: "column" }]}>
            <View style={{ flex: 1, backgroundColor: "#75C34D" }}></View>
            <View style={{ flex: 2, backgroundColor: "#75C34D" }}>
              <View
                style={[
                  styles.container,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <View style={{ flex: 1 }}>
                  {/* <Text>menu</Text> */}
                </View>

                <View style={{ flex: 4 }} />

                <View style={{ flex: 1 }}>
                  {/* <Text>FreshBasket</Text> */}
                  <Image
                style={{ width: 40, height: 40 }}
                source = {require('./logo.png')}

              />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: "lightgrey",
                alignItems: "center",
              }}
            >
        
              <SearchBar style={styles.seachbar} placeholder="Type Here..." onChangeText={this.updateSearch} value={search}/>
            </View>
          </View>
        </View>

        <View
          style={{ flex: 2, backgroundColor: "white", alignItems: "center" }}
        >
          <View>
              {/* <Image resizeMode={'cover'}
                style={{ width: '100%', height: 200 }}
                source = {require('./banner.png')}

              /> */}
          </View>
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: "white",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
        >
          <Text style={styles.headingFont}>Best Saver</Text>
          <View style={{ flex: 1, backgroundColor: "lightgrey" }}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingFont: {
    fontSize: 20,
  },
  seachbar: {
    width: 400,
  }
});
export default Home;