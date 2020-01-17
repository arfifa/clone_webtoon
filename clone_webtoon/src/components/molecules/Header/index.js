import React from 'react';
import { Header, Item, Input, Button, Text, Left, Body, Right, Title } from 'native-base';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../../assets/constants';

export const HeaderSearch = (props) => {

  const search = (text) => {
    props.comicSearch(text)
  }

  return (
    <Header searchBar rounded style={nbStyle.header}>
      <StatusBar backgroundColor={theme.colors.grey} barStyle="Light-content" />
      <Item>
        <Icon name="search" size={20} color={theme.colors.grey} style={nbStyle.Icon} />
        <Input placeholder="Type here ..."
          onChangeText={(text) => search(text)}
        />
        <Icon name="book" size={20} color={theme.colors.soilOrange} style={nbStyle.Icon} />
        <Button transparent style={nbStyle.headerButton}>
          <Text style={nbStyle.textButton}>Search</Text>
        </Button>
      </Item>
    </Header>
  )
}

export const MainHeader = (props) => {
  return (
    <Header style={nbStyle.header}>
      <StatusBar backgroundColor={theme.colors.grey} barStyle="Light-content" />
      {props.left ? (
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={props.onPressLeft}>{props.left}</Button>
        </Left>) : null}
      <Body style={{ flex: 3 }}>
        <Title style={nbStyle.title}>{props.title}</Title>
      </Body>
      {props.right ? (
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={props.onPressRight}>{props.right}</Button>
        </Right>) : null}
    </Header>
  )
}

const nbStyle = {
  header: { backgroundColor: theme.colors.soilOrange },
  headerButton: {
    borderLeftWidth: 2.5,
    borderColor: theme.colors.lemonGreen,
    borderTopStartRadius: 30,
    height: '90%'
  },
  textButton: {
    color: theme.colors.lightBlue
  },
  Icon: {
    paddingHorizontal: 7
  },
  title: {
    color: theme.colors.cyan,
    fontSize: theme.fonts.h2,
    marginLeft: 5
  }
}