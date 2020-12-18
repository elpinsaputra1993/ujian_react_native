import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Alert,
  Button,
  ImageBackground,
  Image,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from './components/screen/header';
import GetLocation from 'react-native-get-location';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      location: {latitude: 0, longitude: 0},
    };
  }

  requestGPSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permisi Maap',
          message: 'Punten butuh permisi untuk lokasi',
          buttonNeutral: 'Bingung euy',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then((location) => {
            console.log(location);
            this.setState({location: location});
          })
          .catch((error) => {
            const {code, message} = error;
            console.warn(code, message);
          });
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  componentDidMount() {}

  render() {
    const image = {
      uri:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA8PDxAQEA8QDw0PDw8PDw8PDQ8PFREWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDi0ZFRkrKy0tNzctKy03Ky0rKysrLS0tKy0rNy0tLTctKysrKysrKysrKysrLS03KysrKystK//AABEIALEBHAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAf/xAAuEAEBAAIABQMEAQMEAwAAAAAAAQIRAxIhMUFRYXGBkaHwsdHh8SIygsFCUmL/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD1uwSCiNIWWG/a+s7nhvz/AJUVA5FTV+XNllle2tf/ADbufOmuHDkm796DbvPMOeJ092WHE363366+7XH2+oKrDj4SzrN+deZ8OmS+wy4coObg8X/xss9LfK7revqrPhfM/wCmHE4Vx6zd83/2vxoHTjpVcvD4l89ZfPpfSumUA0kRoY7326A0CZkewNNiioFsuYWlYC9+RtOPuLBVY00YrBNy13Z3ic3SeO7XlEwiIjDHrtStGCJgvQ2YFYyy6Lyy8T63xGd4U8ze/UD2W76w5h9jUccz9hllNf0RzSdO99J+9F8LC73/AI0Ax63erfjt/RXFwviT/lejeQ5hAc0x1/t1vp1p6tn+qb+Ozp0OWegMsMPX1/DXEz0AhkNgZXFQFc+fC1dyd+/pfdWDYrBEntF6Hhd9gTF09HIBQ4ZoJmI5VAEaORQAaAMCMAAAAKonVV6qFKYlVW6YXd9p+QXlUyHjIuRUcnC4Uk1Pz3rXGFFQDgBgnlUABmAAFgMVMqisIRQTzHAGWMvcSGBQAVBQTKpEBkYAAAWjAFAFqeYFJtLZbA8FXJjOLL27Dnl+PX1Bp36gpNnMbsAeoJjfX8HIDiwzbRy44XXx2234eXr3VGsMoYA4IcAAQxQAABWGBEaVKCBQKGimVhgRFOUZQsVFmmU9oGABQMqLWNztA7Qm5dPSDC769fr5UWyzyy307eVJmGu35BeE9JqKwx836QsI1iAAAgAAOLEqz4m5q+PK+ef46qNsK0jk4ecl79P4dEyBpDRMlSgoACgACAACgqZUCiok8aiKAABNiyoJ2IVIGsotRtG/UU7lvt2OROM+jSQEXH1/sFWHjAToSL5SsELGLLGGAAAAAA4L6M5hy9ZvXezd39Gkt6yz6+pqMplub6SXxv8AltwpyzTLOf6p0nbd35Xw89/T6Ctsa0xrGNMaI1BSmAI0aFWC2AMqZUCEMCKgKGgYA2KViMmlqLNgzyyvTU/sd/K+VWOOgThisAAABAKAAAAoAABOxlU7BjnizrastKjPP3urO1Lms63V99akb66JmH74AYZyrjLHhWe+t6+GsgLxyaSsouUFlkNigmU+ZFMFyioOUFAhoBs+YkSdfb80Vpzb7HjiJFIDQTlRsFBEqtgYLZgAAAAAAFckXIGlqbU6K0DtETjL3rQGUoiIqVUXo5iUqoA0m4rAMN/RUq7GOWPoDUImzsAFsaFgFtXMJgrlFKVcqLinKUGtyicE1WGSI1CeY5RTRkdIEGMjkUViq2I3GXEzm5+xBrzfYrnO+/yylt7XU+NnMZvd6/cGvOmlzS9jwx+4HyliqQTFQ9osXoSICQzkAOWKkGlSKgi4mRUAwABVm1qNAWUTca0kPKAykPapiVgHitEqpUFROdkLLJnxLrqBdd+yomZful27VRF3JOKrEBclRjcjkBdsRTlVJsE7TyKoURjNHcvoNln6eAPC+nb+V8ycYvQHjVJikAWjAAAAwkUIFRUMoYoAAgKwwKJDIWogPSLmfNQO4ssujTmRxbL8fYGeWXXr6fZOeXvrXxWeWU1eWdPPueHbUnW+bOkVWmHFlXL9mXJ01/EjTDh61rf1BUvuWXE8T7tZiw4km/X48e4NMMVWM8MtrAzmRSDPFBnd7urd/vYYc2/Gvy2nDhzEHPjjevv5G9anfq2zwZS+vT+AXIuM7xcZ538dV45AvQK1FzBUp2srxNTt9zmW5sGkppkG/wB0CAAqKhlDAAAAAaKE5Q2dyEKlMqdqMpvoovZfT+BoxXNxMb51deHRhP3wrXsjDp0BtjjFXFOC0CsjOxeR8oMcOHrsqNdJ5AGMUXZMzvpfwCwWysoHzMr1+FWDVBNx/YrGjSpIBZIxquJZIymfp29dArLW/Xx7QrZuTz3VoTFRcP6pipEEABUVDAAAAAIYFKsQBFU8QAJYAHEXuQRVxYAFTAAF5MAKIAAFAAhO9MAGfEABhxf9s+P+mmICiyAAReICD//Z',
    };

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>
            {this.state.location.longitude} ;{this.state.location.latitude}
          </Text>

          <ScrollView>
            <Header nama={this.state.nama} />
            <Text>Nama</Text>
            <TextInput
              style={{borderColor: 'gray', borderWidth: 1}}
              onChangeText={this.handle}
            />
            <Image
              style={styles.logo}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            />

            <Text>Alamat</Text>
            <TextInput style={{borderColor: 'gray', borderWidth: 1}} />

            <Text>No Telepon</Text>
            <TextInput style={{borderColor: 'gray', borderWidth: 1}} />

            <Text>Keterangan</Text>
            <TextInput style={{borderColor: 'gray', borderWidth: 1}} />
            <Button title="Press me" onPress={this.requestGPSPermission} />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  handle = (e) => {
    this.setState({nama: e});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    width: 200,
    height: 100,
    padding: 20,
    margin: 10,
  },
  textinputok: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 30,
  },
  container2: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    padding: 30,
    margin: 20,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default App;
