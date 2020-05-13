import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, ListItem, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import Map from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect, useSelector} from 'react-redux';
import {fetchLocation} from '../../actions/locations';
import {getNearLocations, getSearchLocations} from '../../api/locations';
import {locations} from '../../selectors/locations';

export const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    const [searchResults, setSearchResults] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false);

    const nearLocations = useSelector(state => locations(state)).filter(
        location => location.isNear === true,
    );

    if (
        nearLocations.length === 0 &&
        Object.keys(props.currentLocation).length !== 0
    ) {
        getNearLocations(
            props.currentLocation.lat,
            props.currentLocation.lon,
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

    if (!nearLocations) {
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
    }
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
