import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import {RoutesList} from '../../components/lists/RoutesList';
import {sharedStyles, routesScreenStyles} from '../../styles/styleProvider';

export const RoutesScreen = ({navigation}) => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Routes
                </Text>
            </Layout>
            <Layout style={shared.paddedLayout}>
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
