import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../features/profile/ProfileScreen';
import {SignInScreen} from '../features/auth/SignInScreen';
import {SignUpScreen} from '../features/auth/SignUpScreen';
import {store} from '../store';

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
    function isAuthenticated() {
        return !!store.getState().auth.authToken;
    }

    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated() ? 'Profile' : 'SignIn'}
            headerMode="none">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
};
