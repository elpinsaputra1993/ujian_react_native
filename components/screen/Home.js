import React, {Component} from 'react';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Btn} from '../utils';

export default class Home extends Component {
  state = {
    email: auth().currentUser.email,
  };

  componentWillUnmount() {}

  logout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        console.log(this.props);
        this.props.navigation.goBack();
      });
  }

  render() {
    return (
      <>
        <Text>Hello {this.state.email} </Text>
        <Btn label="Logout" onPress={() => this.logout()} />
      </>
    );
  }
}
