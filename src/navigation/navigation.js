import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../features/profile/ProfileScreen';
import {MapScreen} from '../features/map/MapScreen';
import {BottomTabBar} from './bottomTabBar';
import {RoutesScreen} from '../features/routes/RoutesScreen';
import {SignInScreen} from '../features/auth/SignInScreen';
import {SignUpScreen} from '../features/auth/SignUpScreen';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <BottomTab.Screen name="Routes" component={RoutesScreen} />
        <BottomTab.Screen name="Map" component={MapScreen} />
        <BottomTab.Screen name="Profile" component={ProfileScreen} />
        <BottomTab.Screen name="SignIn" component={SignInScreen} />
        <BottomTab.Screen name="SignUp" component={SignUpScreen} />
    </BottomTab.Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);
