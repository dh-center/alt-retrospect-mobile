import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, useStyleSheet, Text} from '@ui-kitten/components';
import Map from '../../components/Map';
import {navigationScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {useSelector} from 'react-redux';
import {routes} from '../../selectors/routes';

export const RouteNavigationScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(navigationScreenStyles);

    const routeId = props.route.params.routeId;
    const thisRoute = useSelector(state => routes(state)).find(
        item => item.id === routeId,
    );

    return (
        <SafeAreaView style={shared.flexArea}>
            <Map locations={thisRoute.location_instances} routeMode={true} />
            <Layout style={styles.roundedLayout} level="1">
                <Text category="h5">{thisRoute.name}</Text>
            </Layout>
        </SafeAreaView>
    );
};

export default RouteNavigationScreen;
