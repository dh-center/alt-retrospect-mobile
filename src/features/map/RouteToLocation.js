import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, useStyleSheet, Text, Button, Icon} from '@ui-kitten/components';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';
import {styles} from './styles';
import {str} from '../../i18n';

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
