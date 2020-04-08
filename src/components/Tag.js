import React from 'react';
import {ListItem, useStyleSheet} from '@ui-kitten/components';
import {tagStyles} from '../styles/styleProvider';

export const Tag = props => {
    const styles = useStyleSheet(tagStyles);

    return <ListItem {...props} style={styles.tagBody} />;
};
