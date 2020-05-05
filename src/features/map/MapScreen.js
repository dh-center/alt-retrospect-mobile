import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import Map from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';
import {
    fetchLocation,
    fetchNearLocations,
    fetchSearchLocations,
} from '../../actions/locations';

export const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    if (
        props.nearInvalid &&
        !props.nearFetching &&
        !props.currentLocationFetching
    ) {
        props.fetchNearLocations(
            props.currentLocation.latitude,
            props.currentLocation.longitude,
            1500,
        );
    }

    if (props.nearFetching) {
        return (
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <SafeAreaView style={shared.flexArea}>
                <Layout style={styles.headerLayout}>
                    <SearchBar
                        onChangeText={text => props.fetchSearchLocations(text)}
                        onBlur={props.searchLocations}
                    />
                </Layout>
                {props.searchLocations
                    ? props.searchLocations.map(location => {
                          return <Text>{location.address}</Text>;
                      })
                    : null}
                <Map locations={props.nearLocations} routeMode={false} />
            </SafeAreaView>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNearLocations: (lat, lon, radius) =>
            dispatch(fetchNearLocations(lat, lon, radius)),
        fetchLocation: () => dispatch(fetchLocation()),
        fetchSearchLocations: query => dispatch(fetchSearchLocations(query)),
    };
};

const mapStateToProps = state => {
    return {
        nearFetching: state.nearLocations.isFetching,
        nearInvalid: state.nearLocations.didInvalidate,
        nearLocations: state.nearLocations.items,
        searchFetching: state.locationsSearch.isFetching,
        searchInvalid: state.locationsSearch.didInvalidate,
        searchLocations: state.locationsSearch.items,
        currentLocation: state.currentLocation.data,
        currentLocationFetching: state.currentLocation.isFetching,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapScreen);
