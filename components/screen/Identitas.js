import React from 'react';
import {PermissionsAndroid, Alert, FlatList, Modal} from 'react-native';

import {
  Wrapper,
  Header,
  Left,
  Right,
  Container,
  Space,
  Row,
  Column,
  H1,
  H2,
  Footer,
  FloatingLabelInput,
  Picker,
  Btn,
  IconBtn,
} from '../utils';
import sample_data from '../../sample_data';

import ProductListItem from '../reuse/ProductListItem';
import database from '@react-native-firebase/database';
import GetLocation from 'react-native-get-location';

export default class Identitas extends React.Component {
  /*
 
  "name": "T-Shirt 0xx Small Size nala box",
            "sku": "SKU001",
            "images": [
                "http://intelvue.com/demo/app-template/light/p1.png",
                "http://intelvue.com/demo/app-template/light/p2.png"
            ],
            "price": "$200",
            "id": 1,
            "rating": 3,
            "brand_name": "My Brand",
            "description": "<h3>Full Description</h3><p>Nice Dude</p>",
            "specification": "<p>I am specs</p>"
    */

  state = {
    showAddressModal: false,
    id: '',
    nama: '',
    gender: '',
    umur: '',
    status: null,
    specification: '',
    posisi: '',
    images: '',
    key: '',
    listData: [],
    isEdit: false,
    location: {latitude: 0, longitude: 0},
  };

  _keyExtractor = (item, index) => item.id;

  inputs = {};

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

  componentDidMount() {
    database()
      .ref('Member/')
      .on('value', (snapshot) => {
        //console.log('User data: ', this.snapshotToArray(snapshot.val()));
        if (snapshot.val() !== null) {
          this.setState({listData: this.snapshotToArray(snapshot.val())});
        }
        console.log(this.state.listData);
      });
  }

  focusNextField(field) {
    if (inputs[field] !== undefined) {
      inputs[field].focus();
    }
  }

  snapshotToArray = (snapshot) =>
    Object.entries(snapshot).map((e) => Object.assign(e[1], {key: e[0]}));

  render() {
    return (
      <>
        <H1>Daftar Data Member</H1>

        <FlatList
          data={this.state.listData}
          keyExtractor={(item) => item.key.toString()}
          extraData={this.state}
          renderItem={({item, index}) => (
            <ProductListItem
              item={item}
              onPress={() => {
                this.setState({
                  id: item.id,
                  nama: item.nama,
                  gender: item.gender,
                  umur: item.umur,
                  status: item.status,
                  posisi: item.posisi,
                  images: item.images,
                  key: item.key,
                });
                this.setState({showAddressModal: true});
                this.setState({isEdit: true});
              }}
            />
          )}
        />

        <Btn
          label="Add Data"
          onPress={() => {
            this.setState({showAddressModal: true});
            this.setState({isEdit: false});
            this.requestGPSPermission;
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddressModal}>
          {this._renderProduct()}
        </Modal>
      </>
    );
  }

  _renderProduct() {
    // this.requestGPSPermission();

    return (
      <Wrapper>
        <Header>
          <Left>
            <IconBtn
              icon={'x'}
              onPress={() => this.setState({showAddressModal: false})}
              style={{marginLeft: -10}}
            />
          </Left>
        </Header>

        <Container>
          <H2>Formulir Member</H2>

          <FloatingLabelInput
            label="Nama "
            onChangeText={(text) => this.setState({nama: text})}
            returnKeyType={'next'}
            value={this.state.nama}
            ref={(input) => {
              this.inputs['nama'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('gender');
            }}
          />

          <FloatingLabelInput
            label="Gender"
            onChangeText={(text) => this.setState({gender: text})}
            returnKeyType={'next'}
            value={this.state.gender}
            returnKeyType={'next'}
            ref={(input) => {
              this.inputs['gender'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('umur');
            }}
          />

          <FloatingLabelInput
            label="Umur"
            onChangeText={(text) => this.setState({umur: text})}
            returnKeyType={'next'}
            value={this.state.umur}
            returnKeyType={'next'}
            ref={(input) => {
              this.inputs['umur'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('status');
            }}
          />

          <FloatingLabelInput
            label="Status"
            onChangeText={(text) => this.setState({status: text})}
            returnKeyType={'next'}
            value={this.state.status}
            returnKeyType={'next'}
            ref={(input) => {
              this.inputs['status'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('location');
            }}
          />
          <FloatingLabelInput
            label="Location"
            onChangeText={(text) => this.setState({posisi: text})}
            returnKeyType={'next'}
            value={`${this.state.location.longitude} / ${this.state.location.latitude}`}
            returnKeyType={'next'}
            ref={(input) => {
              this.inputs['posisi'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('location');
            }}
          />

          <Space />

          {this.addOrEdit()}
        </Container>
      </Wrapper>
    );
  }

  addOrEdit() {
    if (this.state.isEdit) {
      return <Btn label={'Edit Member'} onPress={() => this.editProduct()} />;
    } else {
      return <Btn label={'Add Member'} onPress={() => this.addProduct()} />;
    }
  }
  addProduct() {
    console.log('data', this.state);
    /*
	  	id: "",
		name: "",
		rating: "",
		price: "",
		description: null,
		specification: "",
		brand_name:"",
		images: "",
		
    */
    this.requestGPSPermission;

    database()
      .ref('Member/')
      .push({
        id: this.state.id,
        nama: this.state.nama,
        gender: this.state.gender,
        umur: this.state.umur,
        status: this.state.status,
        posisi: this.state.posisi,
        images: this.state.images,
      })
      .then((data) => {
        //success callback
        console.log('data ', data);
        this.setState({
          showAddressModal: false,
          id: '',
          nama: '',
          gender: '',
          umur: '',
          status: '',
          posisi: '',
          images: '',
        });
      })
      .catch((error) => {
        //error callback
        console.log('error ', error);
        Alert.alert('Gagal Insert', error);
      });
  }

  editProduct() {
    console.log('data', this.state);
    /*
			id: "",
		  name: "",
		  rating: "",
		  price: "",
		  description: null,
		  specification: "",
		  brand_name:"",
		  images: "",
		  
		  */
    database()
      .ref('Member/' + this.state.key)
      .update({
        id: this.state.id,
        nama: this.state.nama,
        gender: this.state.gender,
        umur: this.state.umur,
        status: this.state.status,
        posisi: this.state.posisi,
        images: this.state.images,
      })
      .then((data) => {
        //success callback
        console.log('data ', data);
        this.setState({
          showAddressModal: false,
          id: '',
          nama: '',
          gender: '',
          umur: '',
          status: '',
          posisi: '',
          images: '',
        });
      })
      .catch((error) => {
        //error callback
        console.log('error ', error);
        Alert.alert('Gagal Update', error);
      });
  }
}
