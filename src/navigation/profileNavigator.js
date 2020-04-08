import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from '../features/profile/ProfileScreen';
import {SignInScreen} from '../features/auth/SignInScreen';
import {SignUpScreen} from '../features/auth/SignUpScreen';

const Stack = createStackNavigator();

export function ProfileNavigator() {
    const userAuthenticated = false;
    return (
        <Stack.Navigator
            initialRouteName={userAuthenticated ? 'Profile' : 'SignUp'}
            headerMode="none">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}
