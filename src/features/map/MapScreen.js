import React, {useState, useEffect} from 'react';
import {
    Platform,
    PermissionsAndroid,
    SafeAreaView,
    ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import {Map} from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {connect} from 'react-redux';
import {fetchLocation, fetchNearLocations} from '../../actions/locations';

export const MapScreen = props => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles);

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 59.9337267,
        longitude: 30.3401533,
    });
    const [isLoadingLocation, setLoadingLocation] = useState(true);

    async function hasLocationPermission() {
        if (
            Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)
        ) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }
        return false;
    }

    async function getLocation() {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        await Geolocation.getCurrentPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 50,
                forceRequestLocation: true,
            },
        );
    }

    async function getLocationUpdates() {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        await Geolocation.watchPosition(
            position => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
            },
        );
    }

    async function removeLocationUpdates() {
        if (this.watchId !== null) {
            Geolocation.clearWatch(this.watchId);
            this.setState({updatesEnabled: false});
        }
    }

    useEffect(() => {
        getLocation().then(setLoadingLocation(false));
    }, [getLocation]);

    if (props.locationsInvalid && !props.isFetching) {
        props.fetchNearLocations(
            currentLocation.latitude,
            currentLocation.longitude,
            1500,
        );
    }

    if (props.isFetching || isLoadingLocation) {
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
                <Map
                    locations={props.nearLocations}
                    currentLocation={currentLocation}
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
        isFetching: state.nearLocations.isFetching,
        locationsInvalid: state.nearLocations.didInvalidate,
        nearLocations: state.nearLocations.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapScreen);
