/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  Dimensions
} from 'react-native';
import { Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';

// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store'

// Screen
import StackScreens from './src/Screens/StackScreens'

// stack 
import { NavigationContainer } from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const App = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [Conn, setConn] = useState(false);

  const onRefresh = React.useCallback(() => {
    checkConnection();
    setRefreshing(true);

    wait(200).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    SplashScreen.hide();
    checkConnection();
    unsubscribe();
  });

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });


  const checkConnection = () => {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        console.log(state.isConnected)
        if (state.isConnected) {
          setConn(true);
        } else {
          setConn(false);
        }
      });
    }
  };
  if (Conn) {
    return (
      <Root>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <StackScreens />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </Root>
    );
  } else {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.noConnection}>
          <Image
            style={{ height: 250, marginBottom: 10 }}
            source={require('./src/Assets/svg/nosignal.png')}
            resizeMode="contain" />
          <Text style={styles.Text}>
            Seems like your internet is disconnected,
          </Text>
          <Text style={styles.Text}>
            Try to connect your internet, then refresh this page
          </Text>
        </View>
      </ScrollView>
    );
  }
};

export default App;


const styles = StyleSheet.create({
  noConnection: {
    flex: 1,
    height: Dimensions.get("window").height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Text: {
    fontSize: 18,
    marginBottom: 10,
  },

});
