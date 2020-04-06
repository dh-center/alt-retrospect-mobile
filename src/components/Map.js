import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

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
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
    </View>
);
