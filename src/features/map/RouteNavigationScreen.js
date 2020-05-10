import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';
import {fetchLocation, fetchNearLocations} from '../../actions/locations';

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

const mapDispatchToProps = dispatch => {
    return {
        fetchNearLocations: (lat, lon, radius) =>
            dispatch(fetchNearLocations(lat, lon, radius)),
        fetchLocation: () => dispatch(fetchLocation()),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.currentRoute.isFetching,
        routeInvalid: state.currentRoute.didInvalidate,
        currentRoute: state.currentRoute.data,
        currentLocation: state.currentLocation.data,
        currentLocationFetching: state.currentLocation.isFetching,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouteNavigationScreen);
