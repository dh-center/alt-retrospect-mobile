import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {SearchBar} from '../../components/SearchBar';
import {Map} from '../../components/Map';

export const MapScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={{padding: 10, backgroundColor: 'transparent'}}>
                <SearchBar />
            </Layout>
            <Map />
        </SafeAreaView>
    );
};
