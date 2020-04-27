import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoutesScreen from '../features/routes/RoutesScreen';
import RouteScreen from '../features/routes/RouteDescriptionScreen';
import RoutesSearch from '../features/routes/RoutesSearch';
import {LocationScreen} from '../features/routes/LocationScreen';

const Stack = createStackNavigator();

export const RoutesNavigator = props => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Routes">
            <Stack.Screen name="Routes" component={RoutesScreen} />
            <Stack.Screen name="Route" component={RouteScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Search" component={RoutesSearch} />
        </Stack.Navigator>
    );
};
