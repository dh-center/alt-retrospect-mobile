import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../features/map/MapScreen';
import RouteNavigationScreen from '../features/map/RouteNavigationScreen';
import LocationOnMap from '../features/map/LocationOnMap';

const Stack = createStackNavigator();

export const MapNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Map" headerMode="none">
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen
                name="RouteNavigation"
                component={RouteNavigationScreen}
            />
            <Stack.Screen name="Location" component={LocationOnMap} />
        </Stack.Navigator>
    );
};
