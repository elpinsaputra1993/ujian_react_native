
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Header extends Component {

render(){
return(<View>

<Text style={styles.bigBlue}>{this.props.nama}</Text>
</View>)
}



}

const styles = StyleSheet.create({
 
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });

export default Header
