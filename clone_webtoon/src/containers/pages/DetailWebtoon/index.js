import React, { Component } from 'react';
import { Container, Content, Text, Thumbnail, View } from 'native-base';
import { Dimensions, FlatList, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../../assets/constants';
import { MainHeader } from '../../../components/molecules/Header';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 220;

class DetailWebtoon extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <MainHeader
          title={navigation.getParam('comicData').title}
          left={<Icon name='arrow-left' size={30} color={theme.colors.lightBrown} />
          }
          right={<Icon name='share-alt' size={30} color={theme.colors.lemonGreen} />}
          onPressLeft={() => navigation.navigate(navigation.getParam('screen') == 'favourite' ? 'Favourite' : 'ForYou')}
          onPressRight={() => Share.share({
            message: 'link!',
          })}
        />
        <Content>
          <View style={nbStyles.banner}>
            <Thumbnail square
              source={{ uri: navigation.getParam('comicData').imageUri }}
              style={{ width: undefined, height: undefined, flex: 1, resizeMode: 'cover' }}
            />
          </View>
          <View style={nbStyles.listContainer}>
            <FlatList
              scrollEnabled={false}
              data={navigation.getParam('comicData').episode}
              keyExtractor={item => item.episode.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('DetailEpisode', {
                    episodeData: item
                  })}>
                  <View style={nbStyles.card}>
                    <View style={nbStyles.imageContainerList}>
                      <Thumbnail square
                        source={{ uri: item.imageUri }}
                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }}
                      />
                    </View>
                    <View style={nbStyles.listTextContainer}>
                      <Text style={nbStyles.cardTitle}>{item.episode}</Text>
                      <Text style={nbStyles.cardSubTitle}>{item.releaseDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Content>
      </Container >
    )
  }
}

const nbStyles = {
  headerTitle: {
    color: theme.colors.cyan
  },
  banner: {
    height: BannerHeight,
    width: BannerWidth
  },
  listContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.lightBrown,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5
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
    color: theme.colors.lightBlue,
  },
  cardSubTitle: {
    color: theme.colors.grey,
    fontSize: theme.fonts.caption,
    marginTop: 10
  },
}

export default DetailWebtoon;