import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, ListItem, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import Map from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect, useSelector} from 'react-redux';
import {
    createLocation,
    fetchLocation,
    updateLocation,
} from '../../actions/locations';
import {fetchNearLocations, getSearchLocations} from '../../api/locations';
import {locations} from '../../selectors/locations';
import {store} from '../../store';

export const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    const [searchResults, setSearchResults] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false);

    const existingLocations = useSelector(state => locations(state));
    const nearLocations = existingLocations.filter(
        location => location.isNear === true,
    );

    function getNearLocations() {
        if (
            nearLocations.length === 0 &&
            Object.keys(props.currentLocation).length !== 0
        ) {
            fetchNearLocations(
                props.currentLocation.lat,
                props.currentLocation.lon,
                1500,
            ).then(result => {
                for (const location of result.locations) {
                    location.isNear = true;
                    updateOrCreate(location);
                }
            });
        }
    }

    function updateOrCreate(location) {
        if (location.id in existingLocations.map(l => l.id)) {
            store.dispatch(updateLocation(location));
        } else {
            store.dispatch(createLocation(location));
        }
    }

    function fetchSearchResults(query) {
        if (query !== '') {
            setIsFetching(true);
            getSearchLocations(query).then(result => {
                setSearchResults(result.locations);
                setIsFetching(false);
            });
        } else {
            setSearchResults(undefined);
        }
    }

    useEffect(getNearLocations);

    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <SearchBar
                    onChangeText={text => fetchSearchResults(text)}
                    onBlur={() => setSearchResults(undefined)}
                />
            </Layout>
            {searchResults &&
                searchResults.map(item => (
                    <ListItem
                        key={item.id}
                        title={item.address}
                        onPress={() =>
                            props.navigation.navigate('Location', {
                                location: item,
                            })
                        }
                    />
                ))}
            {isFetching && <Spinner />}
            <Map locations={nearLocations} routeMode={false} />
        </SafeAreaView>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLocation: () => dispatch(fetchLocation()),
    };
};

const mapStateToProps = state => {
    return {
        currentLocation: state.currentLocation.data,
        currentLocationFetching: state.currentLocation.isFetching,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapScreen);
