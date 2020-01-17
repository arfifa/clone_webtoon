import React, { Component } from 'react';
import { Container, Content, CardItem, Body, Thumbnail, Input, Form, Item, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { API, basePATH } from '../../../config/api';

import { MainHeader } from '../../../components/molecules/Header';
import { theme } from '../../../assets/constants';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    this.setState({
      profile: navigation.getParam('dataProfile')
    })
  }

  _handleChangeImage = async () => {
    ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, async (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageProfileSource: response.uri
        })
      }
    })
  }

  _changeProfile = () => {
    const { profile } = this.state
    API.put(`/user/editProfile/${profile.id}`, { profile })
      .then(res => {
        this.props.navigation.navigate('Profile')
      }).catch(err => {
        alert(err.response.data.message)
      })
  }

  render() {
    const { name, avatarURI, email } = this.state.profile
    const imageURI = `${basePATH}/storage/${avatarURI}`
    return (
      <Container>
        <MainHeader
          left={<Icon name='arrow-left' size={30} color={theme.colors.lightBrown} />}
          title={"Edit Profile"}
          right={<Icon name='check' size={30} color={theme.colors.lemonGreen} />}
          onPressRight={() => this._changeProfile()}
          onPressLeft={() => this.props.navigation.navigate('Profile')}
        />
        <Content showsVerticalScrollIndicator={false} style={nbStyles.container}>
          <CardItem style={nbStyles.profileContainer}>
            <Body style={nbStyles.imageWrap}>
              <View style={nbStyles.profileImageContainer}>
                <Thumbnail style={nbStyles.imagePhoto} source={{ uri: imageURI }} />
                <Icon name='camera' size={32}
                  color={theme.colors.grey}
                  style={nbStyles.iconCamera}
                  onPress={this._handleChangeImage}
                />
              </View>
              <Input
                placeholder='Type Your Name'
                value={name}
                autoFocus
                onChangeText={(text) => this.setState({
                  profile: {
                    ...this.state.profile,
                    name: text
                  }
                })}
                style={nbStyles.profileName} />
            </Body>
          </CardItem>
          <CardItem style={nbStyles.dataProfileContainer} >
            <Form>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input 
                placeholder='Type Your email'
                value={email}
                onChangeText={(text) => this.setState({
                  profile: {
                    ...this.state.profile,
                    email: text
                  }
                })}/>
              </Item>
            </Form>
          </CardItem>
        </Content>
      </Container>
    )
  }
}

const nbStyles = {
  container:{
     backgroundColor: theme.colors.cyan,
  },
  profileContainer: {
    backgroundColor: theme.colors.lightBrown,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    zIndex: 1
  },
  imageWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: theme.colors.lightSoilOrange,
    borderRadius: 100
  },
  imagePhoto: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  iconCamera: {
    position: 'absolute',
    bottom: -10,
    right: 20
  },
  profileName: {
    marginTop: 20,
    color: theme.colors.grey,
    fontSize: theme.fonts.h1
  },
  dataProfileContainer: { 
    position: 'relative', 
    top: -35, 
    paddingTop: 50, 
    paddingBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.lemonGreen
    }
};

export default EditProfile;