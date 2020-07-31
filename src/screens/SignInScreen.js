import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Text, Input, Button} from '@ui-kitten/components';

export class SignInScreen extends Component {
  _onPressSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag">
          <View style={styles.body}>
            <Text style={styles.title} category="h3">
              Scobi Messenger
            </Text>
            <Text style={styles.subtitle} category="s1" appearance="hint">
              Sign in to continue...
            </Text>
            <Input
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
            />
            <Input
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
            />
            <Button style={styles.button}>Continue</Button>
            <View style={styles.bodyBottom}>
              <Text>Don't have an account?</Text>
              <Button appearance="ghost" onPress={this._onPressSignUp}>
                Sign Up
              </Button>
            </View>
          </View>
        </ScrollView>
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

export default SignInScreen;
