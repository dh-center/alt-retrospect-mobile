import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import Map from '../../components/Map';
import {useSelector} from 'react-redux';
import {routes} from '../../selectors/routes';
import {Alignment, Spacing} from '../../styles';

export const RouteNavigationScreen = props => {
    const styles = useStyleSheet(stylesheet);

    const routeId = props.route.params.routeId;
    const thisRoute = useSelector(state => routes(state)).find(
        item => item.id === routeId,
    );

    return (
        <SafeAreaView style={styles.flexArea}>
            <Map locations={thisRoute.location_instances} routeMode={true} />
            <Layout style={styles.routeDescription} level="1">
                <Text category="h5">{thisRoute.name}</Text>
            </Layout>
        </SafeAreaView>
    );
};

export default RouteNavigationScreen;

const stylesheet = StyleService.create({
    routeDescription: {
        ...Alignment.roundedBig,
        ...Alignment.flexArea,
        ...Alignment.mediumHeight,
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Spacing.mt40neg,
    },
    flexArea: {
        ...Alignment.flexArea,
    },
});
