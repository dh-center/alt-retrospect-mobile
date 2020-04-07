import React from 'react';

import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';

export const LocationIcon = props => {
    const styles = useStyleSheet(markerStyles);

    return <Layout style={styles.circle} />;
};

const markerStyles = StyleService.create({
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: 'color-info-400',
        borderColor: '#fff',
        borderWidth: 2,
    },
});

export default LocationIcon;
