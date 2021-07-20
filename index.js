import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
// import Category from './components/Category';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import MyAccount from './components/MyAccount'
import adminCategoryList from './components/admin/CategoryList';
import adminProductList from './components/admin/ProductList';
import adminCategory from './components/admin/Category';
import adminProduct from './components/admin/Product';

const Navigator = createStackNavigator({
  
  // MyAccount: {screen: MyAccount},
  // ProductList: { screen: ProductList },
  // ProductDetail: { screen: ProductDetail },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen, navigationOptions: {headerShown: false} },
  ProductDetail: { screen: ProductDetail },
  Checkout: {screen: Checkout},
  adminCategoryList: { screen: adminCategoryList },
  adminProductList: { screen: adminProductList },
  adminCategory: { screen: adminCategory },
  adminProduct: { screen: adminProduct },
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);


const App = createAppContainer(Navigator);

export default App;