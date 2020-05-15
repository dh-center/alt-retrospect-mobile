import React from 'react';
import {SafeAreaView} from 'react-native';
import {useStyleSheet} from '@ui-kitten/components';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';

export const RouteToLocation = props => {
    const shared = useStyleSheet(sharedStyles);

    const location = props.route.params.location;

    return (
        <SafeAreaView style={shared.flexArea}>
            <Map locations={[location]} routeMode={true} />
        </SafeAreaView>
    );
};

export default RouteToLocation;
