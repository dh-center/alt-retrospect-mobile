import React from 'react';
import {Icon, ListItem, useStyleSheet} from '@ui-kitten/components';
import {tagStyles} from '../../styles/styleProvider';

export const TagsList = ({data}) => {
    const styles = useStyleSheet(tagStyles);

    const renderTagIcon = style => <Icon {...style} name="person" />;

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={`${item.name}`}
            icon={renderTagIcon}
            style={styles.tagBody}
        />
    );

    return data.map(renderItem);
};
