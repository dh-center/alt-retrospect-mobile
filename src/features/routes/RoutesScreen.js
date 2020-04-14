import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import RoutesList from '../../components/lists/RoutesList';
import {routesScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {fetchAllRoutes} from '../../actions/routes';
import {connect} from 'react-redux';
import {fetchPopularTags} from '../../actions/tags';

const RoutesScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    if (props.routesInvalid && !props.isFetching) {
        props.fetchRoutes();
    }

    if (props.tagsInvalid) {
        props.fetchTags();
    }

    if (props.isFetching) {
        return (
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.flexArea} level="3">
                <StatusBar
                    backgroundColor={styles.statusBar.backgroundColor}
                    barStyle="light-content"
                />
                <Layout style={styles.headerLayout} level="3">
                    <Text style={styles.pageTitle} category="h2">
                        {str('titles.routes')}
                    </Text>
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.popularTags')}
                        </Text>
                        <TagsList
                            data={props.tags}
                            navigation={props.navigation}
                        />
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.allRoutes')}
                        </Text>
                        <RoutesList
                            data={props.routes}
                            navigation={props.navigation}
                        />
                    </ScrollView>
                </Layout>
            </Layout>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoutes: () => dispatch(fetchAllRoutes()),
        fetchTags: () => dispatch(fetchPopularTags()),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.routes.isFetching || state.popularTags.isFetching,
        routesInvalid: state.routes.didInvalidate,
        tagsInvalid: state.popularTags.didInvalidate,
        routes: state.routes.items,
        tags: state.popularTags.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoutesScreen);
