import React, { Component } from 'react';
import { Container, Content, Text, CardItem, Item, Body, Thumbnail, Input, Button, ListItem, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { MainHeader } from '../../../components/molecules/Header';
import { theme } from '../../../assets/constants';

const { height } = Dimensions.get('window');

class EditWebtoon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: "",
      imageUri: null,
      episode: [],
      favouriteStatus: false,
      favoriteCount: 0,
      _isValid: false,
      _isEdit: true
    }
  }

  _handleEditCoverImage = async () => {
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
          imageUri: response.uri
        })
      }
    })
  }

  _EditWebtoon() {
    const { imageUri, title } = this.state
    if (imageUri != null && title != "") {
      this.setState({
        _isValid: true
      })
      alert("webtoon successfully Edited!")
    } else {
      alert("All data cannot be empty")
    }
  }

  render() {
    const { imageUri, episode, title, _isValid, _isEdit } = this.state
    const { navigation } = this.props
    const dataEditEpisode = navigation.getParam('dataEditEpisode', undefined)
    const deleteEpisode = navigation.getParam('deleteEpisode', undefined)
    const index = episode.length > 0 ? episode.length - 1 : 0
    if (episode[index] != navigation.getParam('dataEpisode', undefined) && navigation.getParam('dataEpisode', undefined) != undefined) {
      this.state.episode.push(
        navigation.getParam('dataEpisode')
      )
    }
    if (_isEdit == true) {
      this.setState(navigation.getParam('dataEditWebtoon'))
      this.setState({
        _isEdit: false
      })
    }

    if (dataEditEpisode != undefined) {
      const indexEdit = episode.findIndex(data => data.id == dataEditEpisode.id)
      if (episode[indexEdit] != dataEditEpisode) {
        episode[indexEdit] = dataEditEpisode
      }
    }

    if (deleteEpisode != undefined) {
      const indexDelete = episode.findIndex(data => data.id == deleteEpisode)
      if (indexDelete != -1) {
        episode.splice(indexDelete, 1)
        this.setState({ episode: episode })
      }
    }

    return (
      <Container style={nbStyles.container}>
        <MainHeader
          left={<Icon name='arrow-left' size={30} color={theme.colors.lightBrown} />}
          title={"Edit Webtoon"}
          right={<Icon name='check' size={30} color={theme.colors.lemonGreen} />}
          onPressLeft={() => this.props.navigation.navigate('MyCreation', _isValid ? {
            dataEditWebtoon: this.state
          } : {
              dataEditWebtoon: undefined
            })}
          onPressRight={() => this._EditWebtoon()}
        />
        <Content>
          <CardItem style={nbStyles.cardItem}>
            <Body style={nbStyles.cardBody}>
              <Item>
                <Input
                  placeholder="Type title webtoon ..."
                  value={title}
                  autoFocus
                  onChangeText={(text) => this.setState({ title: text })} />
              </Item>
              <View style={nbStyles.coverImageContainer}>
                <Text>Cover Webtoon</Text>
                <TouchableOpacity style={nbStyles.coverImage} onPress={() => this._handleEditCoverImage()}>
                  {
                    imageUri == null ? (
                      <Icon name="camera" size={70} color={theme.colors.grey}></Icon>
                    ) : (
                        <Thumbnail square source={{ uri: imageUri }} style={nbStyles.thumbnail} />
                      )
                  }
                </TouchableOpacity>
              </View>
              <Text style={nbStyles.episodeTitle}>Episode</Text>
              <View style={nbStyles.listEpisodeContainer}>
                {
                  episode.length > 0 ? (
                    <FlatList
                      scrollEnabled={false}
                      data={episode}
                      keyExtractor={item => item}
                      renderItem={({ item }) => (
                        <ListItem onPress={() => this.props.navigation.navigate('EditEpisode', {
                          dataEditEpisode: item
                        })}>
                          <Left>
                            <View style={nbStyles.imageContainerList}>
                              <Thumbnail square source={{ uri: item.imageUri }} style={nbStyles.thumbnail} />
                            </View>
                          </Left>
                          <Body style={{ flex: 2 }}>
                            <Text>{item.episode}</Text>
                          </Body>
                        </ListItem>
                      )}
                    />
                  ) : (null)
                }
              </View>
              <Button full style={nbStyles.addButton} onPress={() => this.props.navigation.navigate('CreateEpisode', {
                editWebtoon: true
              })}>
                <Text>ADD EPISODE</Text>
              </Button>
              <Button full style={nbStyles.delButton} onPress={() => this.props.navigation.navigate('MyCreation', {
                deleteWebtoon: this.state.id
              })}>
                <Text>DElETE</Text>
              </Button>
            </Body>
          </CardItem>
        </Content>
      </Container>
    )
  }
}

const nbStyles = {
  container: {
    backgroundColor: theme.colors.cyan
  },
  cardItem: {
    borderWidth: 1,
    margin: 5,
    borderColor: theme.colors.lemonGreen,
  },
  cardBody: {
    backgroundColor: theme.colors.white,
    padding: 5
  },
  coverImageContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10
  },
  coverImage: {
    width: '70%',
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
    marginTop: 10
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain'
  },
  episodeTitle: {
    color: theme.colors.soilOrange,
    marginTop: 10,
    fontSize: theme.fonts.h1,
  },
  listEpisodeContainer: {
    width: '80%',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 30
  },
  imageContainerList: {
    width: 60,
    height: 60
  },
  addButton: {
    backgroundColor: theme.colors.lightBlue
  },
  delButton: {
    backgroundColor: theme.colors.grey,
    marginTop: 5
  }
};

export default EditWebtoon;