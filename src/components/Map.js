import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import LocationIcon from './icons/LocationIcon';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export const Map = () => (
    <View style={styles.container}>
        <MapView
            initialRegion={{
                latitude: 59.9337267,
                longitude: 30.3401533,
                latitudeDelta: 0.015,
                longitudeDelta: 0.012,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}>
            <Marker coordinate={{latitude: 59.9337267, longitude: 30.3401533}}>
                <LocationIcon />
            </Marker>
        </MapView>
    </View>
);
