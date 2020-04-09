import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import {RoutesList} from '../../components/lists/RoutesList';
import {sharedStyles, routesScreenStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';

export const RoutesScreen = ({navigation}) => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    {str('titles.routes')}
                </Text>
            </Layout>
            <Layout style={shared.paddedLayout}>
                <Text category="h4" style={styles.sectionTitle}>
                    {str('routes.popularTags')}
                </Text>
                <TagsList />
                <Text category="h4" style={styles.sectionTitle}>
                    {str('routes.allRoutes')}
                </Text>
                <RoutesList />
            </Layout>
        </SafeAreaView>
    );
};
