import React from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import LocationIcon from './icons/LocationIcon';
import {useStyleSheet} from '@ui-kitten/components';
import {sharedStyles} from '../styles/styleProvider';
import {LocationCallout} from './LocationCallout';

const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.012;

export const Map = props => {
    const shared = useStyleSheet(sharedStyles);
    const waypoints = props.locations.map(location => {
        return {latitude: location.lat, longitude: location.lon};
    });
    return (
        <View style={shared.flexArea}>
            <MapView
                initialRegion={{
                    latitude: props.currentLocation.latitude,
                    longitude: props.currentLocation.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                provider={PROVIDER_GOOGLE}
                style={shared.flexArea}>
                <Marker
                    coordinate={{
                        latitude: props.currentLocation.latitude,
                        longitude: props.currentLocation.longitude,
                    }}>
                    <LocationIcon />
                </Marker>
                {props.locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.lat,
                            longitude: location.lon,
                        }}
                        description={location.description}>
                        <Callout tooltip>
                            <LocationCallout
                                title={location.instances[0].name}
                            />
                        </Callout>
                    </Marker>
                ))}
                {props.displayRoute ? (
                    <MapViewDirections
                        origin={props.currentLocation}
                        apikey={Config.GM_DIRECTIONS_API_KEY}
                        destination={waypoints[waypoints.length - 1]}
                        waypoints={waypoints}
                        mode="WALKING"
                        strokeWidth={8}
                        strokeColor="#4A75D5"
                        resetOnChange={false}
                    />
                ) : null}
            </MapView>
        </View>
    );
};
