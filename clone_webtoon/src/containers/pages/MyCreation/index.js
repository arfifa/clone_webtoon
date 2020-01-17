import React, { Component } from 'react';
import { Container, Content, Text, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

import { MainHeader } from '../../../components/molecules/Header';
import { theme } from '../../../assets/constants';

const { height } = Dimensions.get('window');

class MyCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comicData: [
        {
          id: 1,
          title: 'The Secret of Angel',
          imageUri: 'https://swebtoon-phinf.pstatic.net/20180517_245/1526523689921yBvud_JPEG/thumb_ipad.jpg',
          favouriteStatus: false,
          favoriteCount: 1292,
          episode: [
            {
              id: 1,
              episode: 'Episode 1',
              releaseDate: '22 November 2019',
              imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPp0b55qCR4IlCOXxK1bXXn2np5WHjl5eI6TDTcjfDYcq2E5N8',
              imageToon: [
                {
                  id: 1,
                  imageUri: 'data:image/jpeg;base64,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'
                },
                {
                  id: 2,
                  imageUri: 'data:image/jpeg;base64,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'
                },
                {
                  id: 3,
                  imageUri: 'https://4.bp.blogspot.com/-ZrTZzusRbMc/XMBk7027frI/AAAAAAAAGN8/xIScHT4IUt8h3SoxtBr6W8afEIUVbKtVQCLcBGAs/s1600/1.jpg'
                },
              ]
            },
            {
              id: 2,
              episode: 'Episode 2',
              releaseDate: '23 November 2019',
              imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPp0b55qCR4IlCOXxK1bXXn2np5WHjl5eI6TDTcjfDYcq2E5N8',
              imageToon: []
            },
            {
              id: 3,
              episode: 'Episode 3',
              releaseDate: '25 November 2019',
              imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdhIovpRwsc3vquV7zXGWyNCipEo2hXMFs9fymdzk54Th_ffi0',
              imageToon: []
            },
            {
              id: 4,
              episode: 'Episode 4',
              releaseDate: '28 November 2019',
              imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdhIovpRwsc3vquV7zXGWyNCipEo2hXMFs9fymdzk54Th_ffi0',
              imageToon: []
            }
          ]
        },
        {
          id: 2,
          title: 'Pasutri Gaje',
          imageUri: 'https://swebtoon-phinf.pstatic.net/20190426_97/1556275077945LqnpT_JPEG/thumb_ipad.jpg',
          favouriteStatus: false,
          favoriteCount: 1811,
          episode: []
        },
        {
          id: 3,
          title: 'Young Mom',
          imageUri: 'https://swebtoon-phinf.pstatic.net/20190826_128/1566745786647tiaSe_JPEG/thumb_ipad.jpg',
          favouriteStatus: false,
          favoriteCount: 912,
          episode: []
        },
        {
          id: 4,
          title: 'Tower of God',
          imageUri: 'https://swebtoon-phinf.pstatic.net/20190318_291/1552868599909GoVLY_JPEG/10_EC8DB8EB84A4EC9DBC_ipad.jpg',
          favouriteStatus: false,
          favoriteCount: 783,
          episode: []
        }
      ],
    }
  }

  render() {
    const { comicData } = this.state
    const { navigation } = this.props
    const index = comicData.length > 0 ? comicData.length - 1 : 0
    const dataEditWebtoon = navigation.getParam('dataEditWebtoon', undefined)
    const deleteWebtoon = navigation.getParam('deleteWebtoon', undefined)
    if (comicData[index] != navigation.getParam('dataWebtoon', undefined) && navigation.getParam('dataWebtoon', undefined) != undefined && deleteWebtoon == undefined) {
      this.state.comicData.push(
        navigation.getParam('dataWebtoon')
      )
    }

    if (dataEditWebtoon != undefined) {
      const indexEdit = comicData.findIndex(data => data.id == dataEditWebtoon.id)
      if (comicData[indexEdit] != dataEditWebtoon) {
        comicData[indexEdit] = dataEditWebtoon
      }
    }

    if (deleteWebtoon != undefined) {
      const indexDelete = comicData.findIndex(data => data.id == deleteWebtoon)
      if (indexDelete != -1) {
        comicData.splice(indexDelete, 1)
        this.setState({ comicData: comicData })
      }
    }

    return (
      <Container style={nbStyles.container}>
        <MainHeader
          left={<Icon name='arrow-left' size={30} color={theme.colors.lemonGreen} />}
          title={"My Creation"}
          right={false}
          onPressLeft={() => this.props.navigation.navigate('Profile')}
        />
        <Content>
          <View style={nbStyles.listContainer}>
            <FlatList
              scrollEnabled={false}
              data={comicData}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditWebtoon', {
                  dataEditWebtoon: item
                })}>
                  <View style={nbStyles.card}>
                    <View style={nbStyles.imageContainerList}>
                      <Thumbnail square
                        source={{ uri: item.imageUri }}
                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }}
                      />
                    </View>
                    <View style={nbStyles.listTextContainer}>
                      <Text style={nbStyles.cardTitle}>{item.title}</Text>
                      <Text style={nbStyles.cardSubTitle}>{(item.episode).length} Episode</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Content>
        <TouchableOpacity style={nbStyles.iconPlusContainer} onPress={() => this.props.navigation.navigate('CreateWebtoon')}>
          <Icon name='plus' size={32} color={theme.colors.lightSoilOrange} />
        </TouchableOpacity>
      </Container>
    )
  }
}

const nbStyles = {
  container: {
    backgroundColor: theme.colors.lightBrown
  },
  listContainer: {
    height: height,
  },
  card: {
    backgroundColor: theme.colors.cyan,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 5,
    borderColor: theme.colors.grey,
    flexDirection: 'row',
    padding: 10,
  },
  imageContainerList: {
    width: 70,
    height: 70
  },
  listTextContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  cardTitle: {
    color: theme.colors.pink,
  },
  cardSubTitle: {
    color: theme.colors.grey,
    fontSize: theme.fonts.caption,
    marginTop: 10
  },
  iconPlusContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.lemonGreen,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default MyCreation;