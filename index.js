import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import Category from './components/Category';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile'

const Navigator = createStackNavigator({
  // ProductList: { screen: ProductList },
  // ProductDetail: { screen: ProductDetail },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false} },
  ProductList: { screen: ProductList },
  ProductDetail: { screen: ProductDetail },
  Profile: {screen: Profile},
},

{
    // Specifing Initial Screen
    initalRoute: 'Profile'
}

);


const App = createAppContainer(Navigator);

export default App;