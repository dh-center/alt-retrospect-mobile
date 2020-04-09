import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {str} from '../../i18n';

export const ProfileScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>{str('titles.profile')}</Text>
            </Layout>
        </SafeAreaView>
    );
};
