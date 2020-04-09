import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../features/profile/ProfileScreen';
import {SignInScreen} from '../features/auth/SignInScreen';
import {SignUpScreen} from '../features/auth/SignUpScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {str} from '../i18n';

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
    function isAuthenticated() {
        AsyncStorage.getItem('authToken')
            .then(value => {
                return value !== null;
            })
            .catch(e => {
                alert(str('errorMessage'));
            });
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated() ? 'Profile' : 'SignUp'}
            headerMode="none">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
};
