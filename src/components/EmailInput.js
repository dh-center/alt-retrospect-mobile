import React from 'react';
import {Input} from '@ui-kitten/components';

export const EmailInput = props => {
    return (
        <Input {...props} label="Email" placeholder="john.doe@example.com" />
    );
};
