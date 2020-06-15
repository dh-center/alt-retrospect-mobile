import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, ToastAndroid, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import LocationIcon from './icons/LocationIcon';
import {
    Layout,
    Spinner,
    StyleService,
    useStyleSheet,
} from '@ui-kitten/components';
import {LocationCallout} from './LocationCallout';
import Geolocation from 'react-native-geolocation-service';
import {
    receiveCurrentLocation,
    requestCurrentLocation,
} from '../actions/currentLocation';
import {connect} from 'react-redux';
import {Alignment} from '../styles';
import theme from '../styles/theme';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.012;

const Map = props => {
    const styles = useStyleSheet(stylesheet);

    const initialLocation = props.initialLocation || props.currentLocation;

    const waypoints = props.locations.map(location => {
        return {
            latitude: location.lat || location.coordinates.lat,
            longitude: location.lon || location.coordinates.lon,
        };
    });

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
                props.receiveCurrentLocation(
                    position.coords.latitude,
                    position.coords.longitude,
                );
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
                props.receiveCurrentLocation(
                    position.coords.latitude,
                    position.coords.longitude,
                );
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 50,
                interval: 5000,
                fastestInterval: 2000,
            },
        );
    }

    async function removeLocationUpdates(watchId) {
        Geolocation.clearWatch(watchId);
    }

    useEffect(() => {
        if (!props.currentLocation) {
            props.requestCurrentLocation();
            getLocation().then(console.log(props.currentLocation));
        }
        const watchId = getLocationUpdates();
        return () => removeLocationUpdates(watchId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (props.currentLocationFetching) {
        return (
            <Layout style={styles.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <View style={styles.flexArea}>
                <MapView
                    initialRegion={{
                        latitude: initialLocation.lat,
                        longitude: initialLocation.lon,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    provider={PROVIDER_GOOGLE}
                    style={styles.flexArea}>
                    <Marker
                        coordinate={{
                            latitude: props.currentLocation.lat,
                            longitude: props.currentLocation.lon,
                        }}>
                        <LocationIcon />
                    </Marker>
                    {props.routeMode && props.currentLocation ? (
                        <MapViewDirections
                            origin={{
                                latitude: props.currentLocation.lat,
                                longitude: props.currentLocation.lon,
                            }}
                            apikey={Config.GM_DIRECTIONS_API_KEY}
                            destination={waypoints[waypoints.length - 1]}
                            waypoints={waypoints}
                            mode="WALKING"
                            strokeWidth={8}
                            strokeColor={theme['color-info-400']}
                            resetOnChange={false}
                        />
                    ) : null}
                    {props.locations
                        ? props.locations.map(location => (
                              <Marker
                                  key={location.id}
                                  coordinate={{
                                      latitude:
                                          location.lat ||
                                          location.coordinates.lat,
                                      longitude:
                                          location.lon ||
                                          location.coordinates.lon,
                                  }}
                                  pinColor={theme['color-primary-400']}
                                  tracksViewChanges={false}
                                  description={location.description}>
                                  <Callout tooltip>
                                      <LocationCallout
                                          title={
                                              location.name ||
                                              (location.instances
                                                  ? location.instances[0].name
                                                  : location.address)
                                          }
                                      />
                                  </Callout>
                              </Marker>
                          ))
                        : null}
                </MapView>
            </View>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        requestCurrentLocation: () => dispatch(requestCurrentLocation()),
        receiveCurrentLocation: (latitude, longitude) =>
            dispatch(receiveCurrentLocation(latitude, longitude)),
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
)(Map);

const stylesheet = StyleService.create({
    centerContent: {
        ...Alignment.center,
        ...Alignment.flexArea,
    },
    flexArea: Alignment.flexArea,
});
