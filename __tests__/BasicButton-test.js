/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {light as lightTheme, mapping} from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import {BasicButton} from '../src/components/buttons/BasicButton';
import {default as appTheme} from '../src/styles/theme';

const theme = {...lightTheme, ...appTheme};

test('renders correctly', () => {
    const tree = renderer
        .create(
            <ApplicationProvider mapping={mapping} theme={theme}>
                <BasicButton />
            </ApplicationProvider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
