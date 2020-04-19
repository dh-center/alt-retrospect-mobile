import React from 'react';
import {Text, View} from 'react-native';
import {Button, useStyleSheet} from '@ui-kitten/components';
import {ArrowRightIcon} from './icons/ArrowRightIcon';
import {calloutStyles} from '../styles/styleProvider';

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
                        icon={ArrowRightIcon}
                    />
                </View>
            </View>
            <View style={styles.tooltip} />
        </View>
    );
};