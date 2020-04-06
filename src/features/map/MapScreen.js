import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {SearchBar} from '../../components/SearchBar';

export const MapScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{padding: 10}}>
                <SearchBar />
            </Layout>
            <Layout
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text category="h1">MAP</Text>
            </Layout>
        </SafeAreaView>
    );
};
