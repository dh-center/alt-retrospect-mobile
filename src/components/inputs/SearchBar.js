import React from 'react';
import {Input} from '@ui-kitten/components';
import {str} from '../../i18n';
import {SearchIcon} from '../icons/SearchIcon';

export const SearchBar = props => (
    <Input placeholder={str('map.search')} icon={SearchIcon} {...props} />
);
