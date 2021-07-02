import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './SignIn';
import SignUp from './SignUp';
import HomeScreen from './HomeScreen';

const Navigator = createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  Home: { screen: HomeScreen },
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);


const App = createAppContainer(Navigator);

export default App;