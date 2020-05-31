import React from 'react';
import {
    Icon,
    ListItem,
    StyleService,
    useStyleSheet,
} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';
import {Alignment, Spacing} from '../../styles';

export const TagsList = props => {
    const styles = useStyleSheet(stylesheet);

    const renderTagIcon = style => (
        <Icon {...style} name="radio-button-on-outline" />
    );
    const renderChevron = style => (
        <BasicButton
            renderIcon={style => <Icon {...style} name="chevron-right" />}
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

const stylesheet = StyleService.create({
    tagBody: {
        ...Alignment.roundedMedium,
        ...Spacing.mt15,
    },
});
