import React, { Component } from 'react';
import { Container, Content, Text, CardItem, Item, Body, Thumbnail, Input, Button, ListItem, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { MainHeader } from '../../../components/molecules/Header';
import { theme } from '../../../assets/constants';

const { height } = Dimensions.get('window');

class CreateEpisode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      episode: '',
      releaseDate: '',
      imageUri: null,
      imageToon: [],
      _isValid: false
    }
  }

  _handleAddCoverImage = async () => {
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

  _handleAddImageEpisode = async () => {
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
        let id = new Date().getTime()
        this.state.imageToon.push({
          'id': id,
          'imageUri': response.uri
        })
        this.setState({
          imageToon: this.state.imageToon
        })
      }
    })
  }

  _handleDeleteImageEpisode = (id) => {
    const { imageToon } = this.state
    const filterData = imageToon.filter(function (data) { return data.id != id })
    this.setState({ imageToon: filterData })
  }

  _addEpisode() {
    const { episode, releaseDate, imageUri, imageToon } = this.state
    if (imageUri != null && releaseDate != "" && episode.length > 0 && imageToon.length > 0) {
      this.setState({
        id: new Date().getTime(),
        _isValid: true
      })
      alert("Episode successfully created!")
    } else {
      alert("All data cannot be empty")
    }
  }

  render() {
    const { episode, releaseDate, imageUri, imageToon, _isValid } =
      this.state
    const { navigation } = this.props
    return (
      <Container style={nbStyles.container}>
        <MainHeader
          left={<Icon name='arrow-left' size={30} color={theme.colors.lightBrown} />}
          title={"Create Episode"}
          right={<Icon name='check' size={30} color={theme.colors.lemonGreen} />}
          onPressLeft={() => navigation.navigate(navigation.getParam('editWebtoon', undefined) != undefined ? 'EditWebtoon' : 'CreateWebtoon', _isValid ? {
            dataEpisode: this.state
          } : {
              dataEpisode: undefined
            })}
          onPressRight={() => this._addEpisode()}
        />
        <Content>
          <CardItem style={nbStyles.cardItem}>
            <Body style={nbStyles.cardBody}>
              <Item>
                <Input
                  placeholder="Type title episode ..."
                  value={episode}
                  autoFocus
                  onChangeText={(text) => this.setState({ episode: text })} />
              </Item>
              <Item>
                <Input
                  placeholder="Release date"
                  value={releaseDate}
                  onChangeText={(text) => this.setState({ releaseDate: text })} />
              </Item>
              <View style={nbStyles.coverImageContainer}>
                <Text>Cover Episode</Text>
                <TouchableOpacity style={nbStyles.coverImage} onPress={() => this._handleAddCoverImage()}>
                  {
                    imageUri == null ? (
                      <Icon name="camera" size={70} color={theme.colors.grey}></Icon>
                    ) : (
                        <Thumbnail square source={{ uri: imageUri }} style={nbStyles.thumbnail} />
                      )
                  }
                </TouchableOpacity>
              </View>
              <Text style={nbStyles.addImageTitle}>Add Image Episode</Text>
              <View style={nbStyles.listEpisodeContainer}>
                <FlatList
                  scrollEnabled={false}
                  data={imageToon}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <ListItem style={{ alignItems: 'flex-end' }}>
                      <Left>
                        <View style={nbStyles.imageContainerList}>
                          <Thumbnail square source={{ uri: item.imageUri }} style={nbStyles.thumbnail} />
                        </View>
                      </Left>
                      <Body>
                        <Button style={nbStyles.delButton} onPress={() => this._handleDeleteImageEpisode(item.id)}>
                          <Text>Delete</Text>
                        </Button>
                      </Body>
                    </ListItem>
                  )}
                />
              </View>
              <Button full style={nbStyles.addButton} onPress={() => this._handleAddImageEpisode()}>
                <Text>ADD Image</Text>
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
    backgroundColor: theme.colors.lightBrown
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
    paddingVertical: 20
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
  addImageTitle: {
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
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: theme.colors.grey
  },
  addButton: {
    backgroundColor: theme.colors.lightBlue
  },
  delButton: {
    justifyContent: 'center',
    backgroundColor: theme.colors.grey
  }
};

export default CreateEpisode;