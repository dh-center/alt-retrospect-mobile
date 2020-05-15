import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';

export const RouteNavigationScreen = props => {
    const shared = useStyleSheet(sharedStyles);

    if (props.isFetching) {
        return (
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <SafeAreaView style={shared.flexArea}>
                <Map
                    locations={props.currentRoute.location_instances}
                    routeMode={true}
                />
            </SafeAreaView>
        );
    }
};

const mapStateToProps = state => {
    return {
        isFetching: state.currentRoute.isFetching,
        currentRoute: state.currentRoute.data,
    };
};

export default connect(mapStateToProps)(RouteNavigationScreen);
