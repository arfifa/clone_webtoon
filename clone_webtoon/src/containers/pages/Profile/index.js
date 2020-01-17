import React, { Component } from 'react';
import { Container, Content, Text, CardItem, ListItem, Body, List, Thumbnail, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View } from 'react-native';

import { removeAuthKey, getAuthKey } from '../../../config/auth';
import { API, basePATH } from '../../../config/api';

import { MainHeader } from '../../../components/molecules/Header';
import { theme } from '../../../assets/constants';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
    }
  }

  componentDidMount() {
    this.setDataProfile()
  }

  setDataProfile = async () => {
    try {
      const hasKey = await getAuthKey();
      API.get(`/user/profile/${hasKey.user_id}`)
        .then(res => {
          this.setState({
            profile: {
              ...res.data.user
            }
          })
        }).catch(err => {
          if (err.response) {
            const { data } = err.response
            alert(data.message)
          }
        })

    } catch (error) {
      alert(error);
    }
  };

  // updateProfile() {
  //   const { imageProfileSource, name } = this.state
  //   this.setState({
  //     name: this.props.navigation.getParam('name', name),
  //     imageProfileSource: this.props.navigation.getParam('image', imageProfileSource)
  //   })
  // }

  render() {
    const { avatarURI, name, email } = this.state.profile
    const { navigation } = this.props
    let imageURI = `${basePATH}/storage/${avatarURI}`

    // if (navigation.getParam('name', name) != name || navigation.getParam('image', imageProfileSource) != imageProfileSource) {
    //   this.updateProfile()
    // }
    return (
      <Container>
        <MainHeader
          left={false}
          title={"Profile"}
          right={<Icon name='pencil' size={30} color={theme.colors.lemonGreen} />}
          onPressRight={() =>
            navigation.navigate('EditProfile', {
              dataProfile: this.state.profile
            })
          }
        />
        <Content>
          <CardItem style={nbStyles.profileContainer}>
            <Body style={nbStyles.imageWrap}>
              <ListItem>
                <Text style={nbStyles.profileName}>{name}</Text>
              </ListItem>
              <Label>email</Label>
              <Text style={nbStyles.dataProfile}>{email}</Text>
              <View style={nbStyles.profileImageContainer}>
                <Thumbnail style={nbStyles.imagePhoto} source={{ uri: imageURI }} />
              </View>
            </Body>
          </CardItem>
          <List style={nbStyles.containerMenu}>
            <ListItem>
              <TouchableOpacity style={nbStyles.menu}
                onPress={() => navigation.navigate('MyCreation')}>
                <View><Text>My Webtoon Creation</Text></View>
                <View><Icon name="angle-right" size={32} /></View>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <TouchableOpacity style={nbStyles.menu}
                onPress={() => {
                  removeAuthKey(),
                    this.props.navigation.navigate('Login')
                }}>
                <View>
                  <Text>Logout</Text>
                </View>
              </TouchableOpacity>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

const nbStyles = {
  profileContainer: {
    backgroundColor: theme.colors.lemonGreen,
    borderBottomEndRadius: 40
  },
  imageWrap: {
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    elevation: 5,
    bottom: -60,
    left: 0
  },
  imagePhoto: {
    width: '95%',
    height: '95%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  profileName: {
    color: theme.colors.black,
    fontSize: theme.fonts.h1
  },
  dataProfile: {
    color: theme.colors.grey,
    fontSize: theme.fonts.body
  },
  containerMenu: {
    marginTop: 70
  },
  menu: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default Profile;