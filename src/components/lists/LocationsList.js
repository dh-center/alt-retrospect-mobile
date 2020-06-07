import React from 'react';
import {View} from 'react-native';
import {
    Icon,
    ListItem,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {BasicButton} from '../buttons/BasicButton';
import Svg from 'react-native-svg';
import {Circle, Line, LinearGradient, Stop, Defs} from 'react-native-svg';
import {Alignment} from '../../styles';

const colors = [
    '#e40035',
    '#e40035',
    '#e40035',
    '#dc003b',
    '#cf0042',
    '#c2004a',
    '#c2004a',
    '#aa165b',
    '#9f1e65',
    '#9f1e65',
    '#892c76',
    '#7e3381',
    '#7e3381',
    '#6a4195',
    '#5f48a0',
    '#5f48a0',
    '#554faa',
    '#445abd',
    '#445abd',
];

export const LocationsList = props => {
    const styles = useStyleSheet(stylesheet);

    const gradientCoords = {x1: '0%', y1: '0%', x2: '0%', y2: '100%'};
    const gradientOffsets = ['0%', '100%'];

    const gradientsForIcon = i => (
        <Defs>
            <LinearGradient id={'grad_line_top' + i} {...gradientCoords}>
                <Stop offset={gradientOffsets[0]} stopColor={colors[i * 3]} />
                <Stop
                    offset={gradientOffsets[1]}
                    stopColor={colors[i * 3 + 1]}
                />
            </LinearGradient>
            <LinearGradient id={'grad_circle' + i} {...gradientCoords}>
                <Stop
                    offset={gradientOffsets[0]}
                    stopColor={colors[i * 3 + 1]}
                />
                <Stop
                    offset={gradientOffsets[1]}
                    stopColor={colors[i * 3 + 2]}
                />
            </LinearGradient>
            <LinearGradient id={'grad_line_bottom' + i} {...gradientCoords}>
                <Stop
                    offset={gradientOffsets[0]}
                    stopColor={colors[i * 3 + 3]}
                />
                <Stop
                    offset={gradientOffsets[1]}
                    stopColor={colors[(i + 1) * 3]}
                />
            </LinearGradient>
        </Defs>
    );

    const renderLocationIcon = (style, boxHeight, boxWidth, i) => (
        <View style={style}>
            <Svg height={boxHeight} width={boxWidth}>
                {gradientsForIcon(i)}
                {/* check is it is the first element */}
                {i !== 0 ? (
                    <Line
                        x1={boxWidth / 2}
                        y1="0"
                        x2={boxWidth / 2}
                        y2={boxHeight / 2 - 6}
                        stroke={`url(#grad_line_top${i})`}
                        strokeWidth="5"
                    />
                ) : null}
                <Circle
                    cx={boxWidth / 2}
                    cy={boxHeight / 2}
                    r="15"
                    fill={`url(#grad_circle${i})`}
                />
                <Circle
                    cx={boxWidth / 2}
                    cy={boxHeight / 2}
                    r="6"
                    fill="white"
                />
                {/* check is it is the last element */}
                {i !== props.data.length - 1 ? (
                    <Line
                        x1={boxWidth / 2}
                        y1={boxHeight / 2 + 14}
                        x2={boxWidth / 2}
                        y2={boxHeight}
                        stroke={`url(#grad_line_bottom${i})`}
                        strokeWidth="5"
                    />
                ) : null}
            </Svg>
        </View>
    );

    const renderText = (style, text) => (
        <Text numberOfLines={2} style={style}>
            {text}
        </Text>
    );

    const renderChevron = style => (
        <BasicButton
            style={style}
            accessoryLeft={evaProps => (
                <Icon {...evaProps} name="chevron-right" />
            )}
        />
    );

    const renderItem = (item, i) => (
        <ListItem
            key={item.id}
            children={
                <View style={styles.listItemView}>
                    {renderLocationIcon(styles.listItemIcon, '70', '30', i)}
                    {renderText(styles.listItemText, item.name)}
                    {renderChevron(styles.listItemChevron)}
                </View>
            }
            onPress={() =>
                props.navigation.navigate('Location', {locationId: item.id})
            }
            style={styles.listItem}
        />
    );
    return props.data.map((item, i) => renderItem(item, i));
};

const stylesheet = StyleService.create({
    listItem: {
        paddingVertical: 0,
    },
    listItemView: {
        ...Alignment.row,
        ...Alignment.center,
        height: 70,
    },
    listItemText: {
        width: '75%',
    },
    listItemIcon: {
        width: '15%',
    },
    listItemChevron: {
        width: '10%',
    },
});
