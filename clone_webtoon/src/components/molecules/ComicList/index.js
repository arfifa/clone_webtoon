import React from 'react';
import { ListItem, Left, Thumbnail, Body } from 'native-base';

export const ComicList = (props) => {
  return (
    <ListItem {...props}>
      <Left>
        <Thumbnail {...props} source={{ uri: props.data.imageUri }} />
      </Left>
      <Body>
        {props.text}
        {props.data.favouriteStatus == true ? (props.wasFavorite) : (props.buttonAdd)}
      </Body>
    </ListItem>
  )
}
