import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { Thumbnail } from 'native-base';

import { getAuthKey } from '../../../config/auth';

import background from '../../../assets/image/logo/imageBackground.jpg';
import imageLogo from '../../../assets/image/logo/logo.png';


class LoadingApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _interval: 0
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true)
    StatusBar.setBackgroundColor('transparent')
    StatusBar.setTranslucent(true)
    this._interval = setInterval(() => {
      this.checkAuthorized()
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    StatusBar.setTranslucent(false)
  }

  checkAuthorized = async () => {
    try {
      const hasKey = await getAuthKey();
      this.props.navigation.navigate(hasKey ? 'ForYou' : 'Login');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={nbStyle.container}>
        <ImageBackground
          source={background}
          style={nbStyle.background}
          imageStyle={nbStyle.bgImage}>
          <Thumbnail square source={imageLogo} style={nbStyle.logo} />
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const nbStyle = {
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bgImage: {
    resizeMode: 'cover',
    opacity: 0.4
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 70
  }
}

export default LoadingApp;