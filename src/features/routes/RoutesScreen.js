import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import {RoutesList} from '../../components/lists/RoutesList';
import {SearchIcon} from '../../components/icons/SearchIcon';

export const RoutesScreen = ({navigation}) => {
    const styles = useStyleSheet(routesScreenStyles);

    return (
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Routes
                </Text>
            </Layout>
            <Layout style={styles.paddedLayout}>
                <Text category="h4" style={styles.sectionTitle}>
                    Popular tags
                </Text>
                <TagsList />
                <Text category="h4" style={styles.sectionTitle}>
                    All routes
                </Text>
                <RoutesList />
            </Layout>
        </SafeAreaView>
    );
};

const routesScreenStyles = StyleService.create({
    flexArea: {
        flex: 1,
    },
    headerLayout: {
        padding: 15,
        backgroundColor: 'color-info-400',
        height: 100,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    pageTitle: {
        color: '#fff',
    },
    sectionTitle: {
        paddingTop: 15,
        backgroundColor: '#FFF',
    },
    paddedLayout: {
        padding: 15,
    },
    searchIcon: {
        color: '#fff',
    },
});
