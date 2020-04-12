import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import {SearchBar} from '../../components/inputs/SearchBar';
import {Map} from '../../components/Map';
import {mapScreenStyles, sharedStyles} from '../../styles/styleProvider';

export const MapScreen = ({navigation}) => {
    const shared = useStyleSheet(sharedStyles);
    const styles = useStyleSheet(mapScreenStyles)
    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <SearchBar />
            </Layout>
            <Map />
        </SafeAreaView>
    );
};
