import React from 'react';
import {Icon, Input} from '@ui-kitten/components';

export const PasswordInput = props => {
    const [value, setValue] = React.useState('');
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
            label="Password"
            value={value}
            placeholder="********"
            icon={renderIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={setValue}
        />
    );
};
