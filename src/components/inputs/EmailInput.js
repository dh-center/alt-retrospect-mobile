import React from 'react';
import {Input} from '@ui-kitten/components';
import {str} from '../../i18n';

export const EmailInput = props => {
    return (
        <Input
            {...props}
            label={str('auth.email')}
            placeholder="john.doe@example.com"
        />
    );
};
