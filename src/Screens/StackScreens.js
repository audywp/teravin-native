/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableHighlight } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Movie from './Movie';
import MovieDetail from './MovieDetail'

const Stack = createStackNavigator();

const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List Movie"
        component={Movie}
        options={{
          headerShown: false
        }}

      />
      <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default StackScreens;

