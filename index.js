import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from './SignIn';
import SignUp from './SignUp';

const Navigator = createStackNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
},

{
    // Specifing Initial Screen
    initalRoute: 'SignIn'
}

);

const App = createAppContainer(Navigator);

export default App;