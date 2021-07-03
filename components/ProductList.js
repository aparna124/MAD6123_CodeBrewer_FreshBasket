import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

class ProductList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Category Product</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
  }
});

export default ProductList;