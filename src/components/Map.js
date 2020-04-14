import React from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import LocationIcon from './icons/LocationIcon';
import {useStyleSheet} from '@ui-kitten/components';
import {sharedStyles} from '../styles/styleProvider';

export const Map = props => {
    const shared = useStyleSheet(sharedStyles);
    return (
        <View style={shared.flexArea}>
            <MapView
                initialRegion={{
                    latitude: 59.9337267,
                    longitude: 30.3401533,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.012,
                }}
                provider={PROVIDER_GOOGLE}
                style={shared.flexArea}>
                <Marker
                    coordinate={{latitude: 59.9337267, longitude: 30.3401533}}>
                    <LocationIcon />
                </Marker>
                {props.locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.lat,
                            longitude: location.lon,
                        }}
                        title={location.address}
                        description={location.description}
                    />
                ))}
            </MapView>
        </View>
    );
};
