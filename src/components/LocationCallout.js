import React from 'react';
import {Text, View} from 'react-native';
import {Button, Icon, StyleService, useStyleSheet} from '@ui-kitten/components';
import {Alignment, Spacing, Colors} from '../styles';

export const LocationCallout = props => {
    const styles = useStyleSheet(calloutStyles);

    return (
        <View>
            <View style={styles.containerView}>
                <View style={styles.contentView}>
                    <Text style={styles.locationTitle}>{props.title}</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        appearance="ghost"
                        status="basic"
                        icon={style => (
                            <Icon {...style} name="arrow-ios-forward" />
                        )}
                    />
                </View>
            </View>
            <View style={styles.tooltip} />
        </View>
    );
};

// These styles are very component-specific,
// so they reuse only a few common component styles
const calloutStyles = StyleService.create({
    containerView: {
        ...Spacing.basePadding,
        ...Alignment.row,
        ...Alignment.roundedMedium,
        ...Colors.whiteBackground,
        width: 200,
    },
    contentView: {
        width: '90%',
        justifyContent: 'center',
    },
    locationTitle: {
        fontSize: 16,
    },
    buttonView: {
        width: '10%',
    },
    tooltip: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 15,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderTopColor: '#fff',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        left: 90,
    },
});
