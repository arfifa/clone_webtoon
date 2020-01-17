import React, { Component } from 'react';
import { Container, Content, Thumbnail, View, } from 'native-base';
import { Dimensions, FlatList, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../../assets/constants';
import { MainHeader } from '../../../components/molecules/Header';

const { width, height } = Dimensions.get('window');


class DetailEpisode extends Component {
  render() {
    const { navigation } = this.props
    const { imageToon } = navigation.getParam('episodeData')
    return (
      <Container>
        <MainHeader
          title={navigation.getParam('episodeData').episode}
          left={<Icon name='arrow-left' size={30} color={theme.colors.lightBrown} />
          }
          right={<Icon name='share-alt' size={30} color={theme.colors.lemonGreen} />}
          onPressLeft={() => navigation.navigate('DetailWebtoon')}
          onPressRight={() => Share.share({
            message: 'link!',
          })}
        />
        <Content>
          <View style={nbStyles.listContainer}>
            <FlatList
              scrollEnabled={false}
              data={imageToon}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={nbStyles.card}>
                  <Thumbnail square
                    source={{ uri: item.imageUri }}
                    style={{ width: undefined, height: undefined, resizeMode: 'cover', flex: 1 }}
                  />
                </View>
              )}
            />
          </View>
        </Content>
      </Container >
    )
  }
}

const nbStyles = {
  listContainer: {
    marginBottom: 16,
  },
  card: {
    width: width,
    height: height * 0.45
  },
}

export default DetailEpisode;