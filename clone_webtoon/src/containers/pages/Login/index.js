import React, { Component } from 'react';
import { Container, Content, Text, Form, Item, Label, Input, Button, Icon, H1, View, Thumbnail } from 'native-base';
import { Dimensions, StatusBar } from 'react-native';

//importConstants
import { API } from '../../../config/api';
import { theme } from '../../../assets/constants';

// utils
import { emailValidation } from '../../../utils/emailValidation';

// config
import { storeAuthKey } from '../../../config/auth';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isValidEmail: false,
      isValidPassword: false,
      hidePassword: true,
    }
  }

  _checkEmail(emailInput) {

    const isTrue = emailValidation(emailInput)

    isTrue ? this.setState({ isValidEmail: true }) : this.setState({ isValidEmail: false })
    this.setState({ email: emailInput });

  }

  _checkPassword(passwordInput) {

    passwordInput.length < 6 ? this.setState({ isValidPassword: false }) : this.setState({ isValidPassword: true })
    this.setState({ password: passwordInput });

  }

  _changeIcon() {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  _handleLogin = () => {
    const { email, password } = this.state
    API.post('/auth/login', { email, password })
      .then(res => {
        storeAuthKey({
          user_id: res.data.user_id,
          token: res.data.token
        })
        this.props.navigation.navigate('ForYou')
      }).catch(err => {
        if (err.response) {
          const { data, status } = err.response
          if (status > 399) {
            alert(data.message)
          } else {
            alert(err.message)
          }
        }
      })
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor={theme.colors.lightBrown} barStyle='dark-content' />
        <Content showsVerticalScrollIndicator={false}>
          <View style={nbStyle.containerLogin}>
            <View style={nbStyle.loginBox}>
              <View style={nbStyle.headerTitle}>
                <Thumbnail square large
                  source={require('../../../assets/image/logo/logo.png')}
                  style={nbStyle.imageLogo} />
                <View style={nbStyle.titleLogin}>
                  <H1>LOG IN</H1>
                  <Text>Login with account TooNMaya</Text>
                  <Button iconRight
                    onPress={() => this.props.navigation.navigate('Register')}
                    style={nbStyle.createBtn}>
                    <Text>Create Account</Text>
                    <Icon name='arrow-forward' />
                  </Button>
                </View>
              </View>
              <Form style={nbStyle.loginForm}>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input
                    style={this.state.isValidEmail ? nbStyle.textInput : { color: theme.colors.orange }}
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={this._checkEmail.bind(this)}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input
                    style={this.state.isValidPassword ? nbStyle.textInput : { color: theme.colors.orange }}
                    value={this.state.password}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={this._checkPassword.bind(this)}
                  />
                </Item>
                <Icon
                  name={this.state.hidePassword ? 'eye-off' : 'eye'}
                  style={nbStyle.iconEye}
                  onPress={this._changeIcon.bind(this)} />
              </Form>
              <Button
                style={this.state.isValidEmail && this.state.isValidPassword ? nbStyle.loginBtn : nbStyle.loginBtnDisabled}
                disabled={this.state.isValidEmail && this.state.isValidPassword ? false : true}
                onPress={this._handleLogin}>
                <Text>Login</Text>
              </Button>

            </View>
          </View>
        </Content>
      </Container >
    )
  }
}

let { height } = Dimensions.get('window');
const nbStyle = {
  containerLogin: {
    height: height,
    backgroundColor: theme.colors.lightBrown,
    justifyContent: 'center'
  },
  loginBox: {
    alignItems: 'center',
    backgroundColor: theme.colors.lemonGreen,
    marginHorizontal: 5,
    padding: 15,
    borderWidth: 2,
    borderColor: theme.colors.brown,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 50,
    borderTopStartRadius: 50,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  imageLogo: {
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
  },
  titleLogin: {
    marginLeft: 10,
  },
  loginForm: {
    marginTop: 80,
    padding: 20,
  },
  textInput: {
    color: theme.colors.lightBlue
  },
  iconEye: {
    position: 'absolute',
    right: 30,
    top: 115,
  },
  loginBtnDisabled: {
    backgroundColor: theme.colors.grey,
    paddingHorizontal: 20
  },
  loginBtn: {
    backgroundColor: theme.colors.lightBlue,
    paddingHorizontal: 15
  },
  createBtn: {
    marginTop: 20,
    width: 180,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.lightSoilOrange,
    borderRadius: 20,
    height: 30
  }
}



