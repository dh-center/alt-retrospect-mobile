import React from 'react';
import {Button} from '@ui-kitten/components';

export const ControlButton = props => {
    return (
        <Button
            appearance="ghost"
            status="control"
            size="giant"
            style={props.style}
            icon={props.renderIcon}
            onPress={props.onPress}
        />
    );
};
