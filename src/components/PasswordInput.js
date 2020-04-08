import React from 'react';
import {Icon, Input} from '@ui-kitten/components';

export const PasswordInput = props => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(
        props.secureStateEntry,
    );

    const onIconPress = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = style => (
        <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
    );

    return (
        <Input
            {...props}
            label="Password"
            placeholder="********"
            icon={renderIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
        />
    );
};
