import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export class HomeScreen extends Component {
  constructor() {
    super();
    // if user not logged in navigate to sign in screen
    AsyncStorage.getItem('logged_in').then((value) => {
      if (!value) {
        this.props.navigation.navigate('SignIn');
      }
    });
  }

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Home Screen</Text>
            <Text style={styles.sectionDescription}>
              Edit <Text style={styles.highlight}>App.js</Text> to change this
              screen and then come back to see your edits.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
