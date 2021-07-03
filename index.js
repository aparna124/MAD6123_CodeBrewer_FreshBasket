import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import ProductList from './components/ProductList';
import Category from './components/Category';

const Navigator = createStackNavigator({
  // ProductList: { screen: ProductList},
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false} },
  ProductList: { screen: ProductList },
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);


const App = createAppContainer(Navigator);

export default App;