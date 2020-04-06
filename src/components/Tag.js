import React from 'react';
import {ListItem, StyleService, useStyleSheet} from '@ui-kitten/components';

export const Tag = props => {
    const styles = useStyleSheet(tagStyles);

    return <ListItem {...props} style={styles.tagBody} />;
};

const tagStyles = StyleService.create({
    tagBody: {
        backgroundColor: 'color-basic',
        borderRadius: 15,
        marginTop: 10,
    },
});
