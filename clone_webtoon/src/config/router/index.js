import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../../assets/constants';

import { Login, ForYou, Profile, Favourite, DetailWebtoon, DetailEpisode, EditProfile, MyCreation, CreateWebtoon, CreateEpisode, EditWebtoon, EditEpisode, Register, LoadingApp } from '../../containers/pages';

const AuthStack = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login'
  })

const BottomNavigationStack = createBottomTabNavigator({
  ForYou: {
    screen: ForYou,
    navigationOptions: {
      tabBarLabel: 'For You',
      tabBarIcon: ({ tintColor }) => (
        < Icon
          name="th-large"
          color={tintColor}
          size={25}
        />
      )
    }
  },
  Favourite: {
    screen: Favourite,
    navigationOptions: {
      tabBarLabel: 'Favourite',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="star"
          color={tintColor}
          size={25}
        />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user"
          color={tintColor}
          size={25}
        />
      )
    }
  },
},
  {
    tabBarOptions: {
      activeTintColor: theme.colors.cyan,
      inactiveTintColor: theme.colors.pink,
      labelStyle: {
        fontSize: theme.fonts.caption,
      },
      style: {
        backgroundColor: theme.colors.grey,
        borderTopWidth: 2,
        borderTopColor: theme.colors.lemonGreen,
        paddingVertical: 6,
        height: 60
      }
    }
  })

const AppStackNavigation = createStackNavigator(
  {
    BottomNavigationStack,
    DetailWebtoon,
    DetailEpisode,
    EditProfile,
    MyCreation,
    CreateWebtoon,
    CreateEpisode,
    EditWebtoon,
    EditEpisode
  },
  {
    headerMode: 'none'
  })

const Router = createSwitchNavigator(
  {
    LoadingApp,
    AuthStack,
    BottomNavigationStack,
    AppStackNavigation
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoadingApp'
  })


export default createAppContainer(Router);