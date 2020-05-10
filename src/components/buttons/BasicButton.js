import React from 'react';
import {Button, useStyleSheet} from '@ui-kitten/components';
import {styles} from './styles';

export const BasicButton = props => {
    const style = useStyleSheet(styles);
    return (
        <Button
            appearance="ghost"
            status="basic"
            style={style.basic}
            icon={props.renderIcon}
            onPress={props.onPress}
        />
    );
};
