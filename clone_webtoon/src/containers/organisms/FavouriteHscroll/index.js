import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Text, View, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';

import { theme } from '../../../assets/constants';
import trunc from '../../../utils/trunc';

class FavouriteHscroll extends Component {
  render() {
    return (
      <View style={nbStyles.container}>
        <Text style={nbStyles.title}>Favourite</Text>
        <View style={nbStyles.cardContainer}>
          <FlatList
            horizontal
            data={this.props.favourite}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', {
                comicData: item,
              })}>
                <View style={nbStyles.card}>
                  <Thumbnail
                    source={{ uri: item.imageUri }}
                    style={{
                      width: 130,
                      height: 90,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5
                    }}
                  />
                  <Text style={nbStyles.cardTitle}>{trunc(item.title)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {this.props.favourite.length <= 0 ? (
            <View>
              <Text style={nbStyles.undefinedText}>You don't have a favorite list yet...</Text>
            </View>) : (null)
          }
        </View>
      </View>
    )
  }
}

const nbStyles = {
  container: {
    marginTop: 32,
  },
  title: {
    color: theme.colors.soilOrange,
    fontSize: theme.fonts.h1,
    paddingHorizontal: 16
  },
  cardContainer: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.lemonGreen,
    borderBottomColor: theme.colors.soilOrange
  },
  card: {
    marginLeft: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5
  },
  cardTitle: {
    padding: 3,
    color: theme.colors.lightBlue,
    fontSize: 14
  },
  undefinedText: {
    padding: 16,
    color: theme.colors.grey,
    fontSize: theme.fonts.h3
  }
}


export default withNavigation(FavouriteHscroll);
