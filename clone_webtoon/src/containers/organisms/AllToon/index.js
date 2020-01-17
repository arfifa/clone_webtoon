import React, { Component } from 'react';
import { Text, Button, Icon, List, View } from 'native-base';

import { theme } from '../../../assets/constants';
import { ComicList } from '../../../components/molecules/ComicList';

class AllToon extends Component {

  _addFavourite(comicData) {
    this.props.addFavourite(comicData)
  }

  _deleteFavourite(comicId) {
    this.props.deleteFavourite(comicId)
  }

  render() {
    return (
      <View style={nbStyle.container}>
        <Text style={nbStyle.title}>All</Text>
        <View style={nbStyle.listContainer}>
          <List>
            {this.props.comicData.map((data) => {
              return (
                <ComicList key={data.id} data={data} thumbnail square large
                  text={
                    <Text style={nbStyle.listTitle}> {data.title}</Text>
                  }
                  buttonAdd={
                    <Button iconLeft
                      style={nbStyle.listButton}
                      onPress={() => this._addFavourite(data)}>
                      <Icon name="add"
                        style={nbStyle.buttonIconAdd} />
                      <Text style={nbStyle.buttonText}>Favourite</Text>
                    </Button>
                  }
                  wasFavorite={
                    <View>
                      <Text style={nbStyle.wasFavoriteText}>has become your favorite ..</Text>
                      <Icon name="trash"
                        style={nbStyle.iconTrash}
                        onPress={() => this._deleteFavourite(data.id)} />
                    </View>
                  }
                />
              )
            }
            )}
          </List>
        </View>
      </View>
    )
  }
}

const nbStyle = {
  container: {
    paddingTop: 32
  },
  title: {
    color: theme.colors.soilOrange,
    fontSize: theme.fonts.h1,
    paddingHorizontal: 16,
  },
  listContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.lemonGreen,
    borderBottomColor: theme.colors.soilOrange,
    marginBottom: 16,
    backgroundColor: theme.colors.white,
    paddingBottom: 16
  },
  listTitle: {
    color: theme.colors.lightBlue
  },
  listButton: {
    backgroundColor: theme.colors.lemonGreen,
    width: '60%',
    height: 25,
    marginTop: 10
  },
  buttonIconAdd: {
    color: theme.colors.soilOrange,
    backgroundColor: theme.colors.lightBrown,
  },
  buttonText: {
    backgroundColor: theme.colors.lightBrown,
    color: theme.colors.soilOrange
  },
  wasFavoriteText: {
    fontSize: theme.fonts.body,
    paddingTop: 5,
    paddingLeft: 15,
    color: theme.colors.black
  },
  iconTrash: {
    color: theme.colors.soilOrange,
    position: 'absolute',
    right: 12,
    top: 12
  }
}

export default AllToon;