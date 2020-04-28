import React from 'react';
import {Input} from '@ui-kitten/components';
import {SearchIcon} from '../icons/SearchIcon';
import {str} from '../../i18n';

export const SearchBar = props => (
    <Input
        placeholder={str('map.search')}
        icon={SearchIcon}
        style={props.style}
        onChangeText={props.onChangeText}
    />
);
