import React from 'react';
import {Button, Icon, ListItem, useStyleSheet} from '@ui-kitten/components';
import {tagStyles} from '../../styles/styleProvider';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const TagsList = props => {
    const styles = useStyleSheet(tagStyles);

    const renderTagIcon = style => <Icon {...style} name="radio-button-on-outline" />;
    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
            onPress={() => props.navigation.navigate('Search')}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={`${item.name}`}
            icon={renderTagIcon}
            accessory={renderChevron}
            style={styles.tagBody}
            onPress={() => props.navigation.navigate('Search')}
        />
    );

    return props.data.map(renderItem);
};
