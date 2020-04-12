import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoutesScreen from '../features/routes/RoutesScreen';
import RouteScreen from '../features/routes/RouteScreen';
import {RoutesSearch} from '../features/routes/RoutesSearch';

const Stack = createStackNavigator();

export const RoutesNavigator = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Routes">
            <Stack.Screen name="Routes" component={RoutesScreen} />
            <Stack.Screen name="Route" component={RouteScreen} />
            <Stack.Screen name="Search" component={RoutesSearch} />
        </Stack.Navigator>
    );
};
