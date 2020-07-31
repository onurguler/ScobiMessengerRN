import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text, Input, Button} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import AsyncStorage from '@react-native-community/async-storage';

export class SignUpScreen extends Component {
  state = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    continueButtonDisabled: true,
  };

  _onPressSignIn = () => {
    this.props.navigation.goBack();
  };

  _onPressSignUp = () => {
    const {
      firstName,
      lastName,
      username,
      email,
      password1,
      password2,
    } = this.state;
    console.warn(`${password1} ${password2}`);

    if (password1 !== password2) {
      console.warn('passwords dont match');
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password: password1,
    };

    fetch('http://192.168.1.106:8000/api/accounts/auth/register/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData}),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        if (token) {
          AsyncStorage.setItem('token', token).then(() => {
            AsyncStorage.setItem('logged_in', JSON.stringify(true)).then(() => {
              this.props.navigation.popToTop();
              this.props.navigation.replace('Home');
            });
          });
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  _handleInputChange = (inputName, inputValue) => {
    this.setState((state) => ({
      ...state,
      [inputName]: inputValue,
    }));

    let {username, email, password1, password2} = this.state;

    // fix form validation
    switch (inputName) {
      case 'username':
        username = inputValue;
        break;
      case 'email':
        email = inputValue;
        break;
      case 'password1':
        password1 = inputValue;
        break;
      case 'password2':
        password2 = inputValue;
        break;
      default:
        break;
    }

    // form validation
    if (
      username.length > 0 &&
      email.length > 0 &&
      password1.length >= 6 &&
      password2.length >= 6
    ) {
      this.setState((state) => ({
        ...state,
        continueButtonDisabled: false,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        continueButtonDisabled: true,
      }));
    }
  };

  render() {
    const {continueButtonDisabled} = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.body}>
            <Text style={styles.title} category="h3">
              Scobi Messenger
            </Text>
            <Text style={styles.subtitle} category="s1" appearance="hint">
              Sign up to continue...
            </Text>
            <Input
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) =>
                this._handleInputChange('firstName', text)
              }
            />
            <Input
              style={styles.input}
              placeholder="Last Name"
              onChangeText={(text) => this._handleInputChange('lastName', text)}
            />
            <Input
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onChangeText={(text) => this._handleInputChange('username', text)}
            />
            <Input
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              onChangeText={(text) => this._handleInputChange('email', text)}
            />
            <Input
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) =>
                this._handleInputChange('password1', text)
              }
            />
            <Input
              style={styles.input}
              placeholder="Password (Repeat)"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) =>
                this._handleInputChange('password2', text)
              }
            />
            <Button
              style={styles.button}
              disabled={continueButtonDisabled}
              onPress={this._onPressSignUp}>
              Continue
            </Button>
            <View style={styles.bodyBottom}>
              <Text>Don't have an account?</Text>
              <Button appearance="ghost" onPress={this._onPressSignIn}>
                Sign In
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  body: {
    // backgroundColor: Colors.lighter,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  bodyBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
