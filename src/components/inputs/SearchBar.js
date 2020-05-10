import React from 'react';
import {Icon, Input} from '@ui-kitten/components';
import {str} from '../../i18n';

export const SearchBar = props => (
    <Input
        placeholder={str('map.search')}
        icon={style => <Icon {...style} name="search" />}
        {...props}
    />
);
