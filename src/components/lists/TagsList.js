import React from 'react';
import {Button, Icon, ListItem, useStyleSheet} from '@ui-kitten/components';
import {tagStyles} from '../../styles/styleProvider';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const TagsList = ({data}) => {
    const styles = useStyleSheet(tagStyles);

    const renderTagIcon = style => <Icon {...style} name="person" />;
    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={`${item.name}`}
            icon={renderTagIcon}
            accessory={renderChevron}
            style={styles.tagBody}
        />
    );

    return data.map(renderItem);
};
