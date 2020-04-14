import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from '../features/map/MapScreen';
import {BottomTabBar} from './bottomTabBar';
import {ProfileNavigator} from './profileNavigator';
import {RoutesNavigator} from './routesNavigator';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <BottomTab.Screen name="Routes" component={RoutesNavigator} />
        <BottomTab.Screen name="Map" component={MapScreen} />
        <BottomTab.Screen name="Profile" component={ProfileNavigator} />
    </BottomTab.Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);
