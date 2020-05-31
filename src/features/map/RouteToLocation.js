import React from 'react';
import {SafeAreaView} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import Map from '../../components/Map';
import {Alignment} from '../../styles';

export const RouteToLocation = props => {
    const styles = useStyleSheet(stylesheet);

    const location = props.route.params.location;

    return (
        <SafeAreaView style={styles.flexArea}>
            <Map locations={[location]} routeMode={true} />
        </SafeAreaView>
    );
};

export default RouteToLocation;

const stylesheet = StyleService.create({
    flexArea: Alignment.flexArea,
});
