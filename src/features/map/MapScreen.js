import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import {Map} from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';
import {fetchLocation, fetchNearLocations} from '../../actions/locations';

const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    if (props.locationsInvalid && !props.isFetching) {
        // TODO: replace with near location but keep in mind throttling
        props.fetchNearLocations(59.9337267, 30.3401533, 1500);
    }

    if (props.isFetching) {
        return (
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <SafeAreaView style={shared.flexArea}>
                <Layout style={styles.headerLayout}>
                    <SearchBar />
                </Layout>
                <Map locations={props.nearLocations} />
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
        isFetching: state.nearLocations.isFetching,
        locationsInvalid: state.nearLocations.didInvalidate,
        nearLocations: state.nearLocations.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapScreen);
