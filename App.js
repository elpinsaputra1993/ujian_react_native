import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './components/screen/Register';
import Test from './components/screen/Test';
import Login from './components/screen/Login';
import Home from './components/screen/Home';

const Stack = createStackNavigator();

export default class App extends Component {
  createLogin = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home2" component={Home} />
          <Stack.Screen
            name="Home"
            component={Home}
            navigation={this.props.navigation}
          />
          <Stack.Screen
            name="Test"
            component={Test}
            navigation={this.props.navigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  createHome = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  state = {
    status: false,
  };

  render() {
    if (this.state.status === false) {
      return this.createLogin();
    } else {
      return this.createHome();
    }
  }
}
