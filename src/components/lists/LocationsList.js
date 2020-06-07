import React from 'react';
import {Text} from 'react-native';
import {Icon, ListItem} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';
import Svg from 'react-native-svg';
import {Circle} from 'react-native-svg';
import theme from '../../styles/theme';

export const LocationsList = props => {
    const renderLocationIcon = style => (
        <Svg height="30" width="30">
            <Circle cx="15" cy="15" r="15" fill={theme['color-primary-400']} />
            <Circle cx="15" cy="15" r="6" fill="white" />
        </Svg>
    );

    const renderChevron = style => (
        <BasicButton
            accessoryLeft={evaProps => (
                <Icon {...evaProps} name="chevron-right" />
            )}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={<Text numberOfLines={1}>{item.name}</Text>}
            accessoryLeft={renderLocationIcon}
            accessoryRight={renderChevron}
            onPress={() =>
                props.navigation.navigate('Location', {locationId: item.id})
            }
        />
    );
    return props.data.map(renderItem);
};
