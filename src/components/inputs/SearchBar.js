import React from 'react';
import {Input} from '@ui-kitten/components';
import {SearchIcon} from '../icons/SearchIcon';
import {str} from '../../i18n';

export const SearchBar = () => (
    <Input placeholder={str('map.search')} icon={SearchIcon} />
);
