import React from 'react';
import {
    Icon,
    ListItem,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';
import {Alignment, Spacing} from '../../styles';
import Svg, {Circle} from 'react-native-svg';
import theme from '../../styles/theme';

export const TagsList = props => {
    const styles = useStyleSheet(stylesheet);

    const renderTagIcon = style => (
        <Svg height="30" width="30">
            <Circle cx="15" cy="15" r="15" fill={theme['color-info-400']} />
            <Circle cx="15" cy="15" r="7" fill="white" />
        </Svg>
    );
    const renderChevron = style => (
        <BasicButton
            accessoryLeft={evaProps => (
                <Icon {...evaProps} name="chevron-right" />
            )}
            onPress={() => props.navigation.navigate('Search')}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={<Text>{item.name}</Text>}
            accessoryLeft={renderTagIcon}
            accessoryRight={renderChevron}
            style={styles.tagBody}
            onPress={() =>
                props.navigation.navigate('RoutesByTag', {tag: item})
            }
        />
    );

    return props.data.map(renderItem);
};

const stylesheet = StyleService.create({
    tagBody: {
        ...Alignment.mediumRounded,
        ...Spacing.mt15,
    },
});
