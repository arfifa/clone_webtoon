import React, { Component } from 'react';
import { Container, Content, Text, Form, Item, Label, Input, Button, View, Icon } from 'native-base';
import { Dimensions, StatusBar } from 'react-native';

//importConstants
import { API } from '../../../config/api';
import { theme } from '../../../assets/constants';
import { emailValidation } from '../../../utils/emailValidation';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      isValidName: false,
      isValidEmail: false,
      isValidPassword: false,
      hidePassword: true
    }
  }

  _checkName(nameInput) {
    (nameInput.length > 5) ? this.setState({ isValidName: true }) : this.setState({ isValidName: false })
    this.setState({ name: nameInput })
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

  _handleRegister = () => {
    const { name, email, password } = this.state
    API.post('/auth/register', { name, email, password })
      .then(res => {
        if (res.data.error) {
          alert(res.data.message)
        } else {
          alert(res.data.message)
          this.props.navigation.navigate('Login');
        }
      })
      .catch(err => {
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
    const { isValidEmail, isValidName, isValidPassword } = this.state
    return (
      <Container>
        <StatusBar backgroundColor={theme.colors.cyan} barStyle='dark-content' />
        <Content showsVerticalScrollIndicator={false}>
          <View style={nbStyle.containerRegister}>
            <View style={nbStyle.titleRegister}>
              <Text style={nbStyle.textTitleRegister}>Registration Account</Text>
            </View>
            <View style={nbStyle.registerBox}>
              <Form style={{ width: '100%' }}>
                <Item floatingLabel>
                  <Label>Name</Label>
                  <Input
                    style={this.state.isValidName ? nbStyle.textInput : { color: theme.colors.orange }}
                    value={this.state.name}
                    onChangeText={this._checkName.bind(this)}
                    returnKeyType="next" />
                </Item>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    style={this.state.isValidEmail ? nbStyle.textInput : { color: theme.colors.orange }}
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={this._checkEmail.bind(this)}
                    returnKeyType="next" />
                </Item>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input
                    style={this.state.isValidPassword ? nbStyle.textInput : { color: theme.colors.orange }}
                    value={this.state.password}
                    secureTextEntry={this.state.hidePassword}
                    onChangeText={this._checkPassword.bind(this)} />
                  <Icon
                    name={this.state.hidePassword ? 'eye-off' : 'eye'}
                    style={nbStyle.iconEye}
                    onPress={this._changeIcon.bind(this)}
                    returnKeyType="done" />
                </Item>
              </Form>
              <Button iconLeft
                onPress={this._handleRegister}
                style={isValidName && isValidEmail && isValidPassword ? nbStyle.registerBtn : nbStyle.disabledRegisterBtn}
                disabled={isValidName && isValidEmail && isValidPassword ? false : true}>
                <Icon name='person-add' style={{ color: theme.colors.black }} />
                <Text style={{ color: theme.colors.black }}>Register</Text>
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
  containerRegister: {
    height: height,
    backgroundColor: theme.colors.cyan,
    justifyContent: 'center'
  },
  titleRegister: {
    marginHorizontal: 20,
    paddingBottom: 1,
    marginTop: -25
  },
  textTitleRegister: {
    fontSize: theme.fonts.h1
  },
  registerBox: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    marginHorizontal: 10,
    paddingRight: 15,
    paddingBottom: 40,
    borderWidth: 2,
    borderTopWidth: 0.5,
    borderColor: theme.colors.pink,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
  },
  registerBtn: {
    marginTop: 30,
    width: 140,
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.lemonGreen,
    borderRadius: 20,
    height: 30
  },
  disabledRegisterBtn: {
    marginTop: 30,
    width: 140,
    alignSelf: 'flex-end',
    borderRadius: 20,
    height: 30
  },
  textInput: {
    color: theme.colors.lightBlue
  }
}

export default Register;