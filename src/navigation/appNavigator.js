import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MapScreen} from '../features/map/MapScreen';
import {BottomTabBar} from './bottomTabBar';
import {RoutesScreen} from '../features/routes/RoutesScreen';
import {ProfileNavigator} from './profileNavigator';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
    <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <BottomTab.Screen name="Routes" component={RoutesScreen} />
        <BottomTab.Screen name="Map" component={MapScreen} />
        <BottomTab.Screen name="Profile" component={ProfileNavigator} />
    </BottomTab.Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);
