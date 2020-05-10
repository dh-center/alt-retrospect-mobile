import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import Map from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';
import {fetchLocation, fetchNearLocations} from '../../actions/locations';
import {getSearchLocations} from '../../api/locations';
import {LocationsSearchResults} from '../../components/lists/LocationsSearchResult';

export const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    const [searchResults, setSearchResults] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false);

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

    async function fetchSearchResults(query) {
        if (query !== '') {
            setIsFetching(true);
            const searchLocations = await getSearchLocations(query);
            setSearchResults(searchLocations.locations);
            setIsFetching(false);
        } else {
            setSearchResults(undefined);
        }
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
                        onChangeText={text => fetchSearchResults(text)}
                    />
                </Layout>
                {searchResults ? (
                    <LocationsSearchResults
                        data={searchResults}
                        navigation={props.navigation}
                    />
                ) : (
                    <View>{isFetching ? <Spinner /> : null}</View>
                )}
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
    };
};

const mapStateToProps = state => {
    return {
        nearFetching: state.nearLocations.isFetching,
        nearInvalid: state.nearLocations.didInvalidate,
        nearLocations: state.nearLocations.items,
        currentLocation: state.currentLocation.data,
        currentLocationFetching: state.currentLocation.isFetching,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapScreen);
