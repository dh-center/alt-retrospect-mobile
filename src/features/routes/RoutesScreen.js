import React, {useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
    Icon,
    Layout,
    Spinner,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import RoutesList from '../../components/lists/RoutesList';
import {routesScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {createRoute, updateRoute} from '../../actions/routes';
import {connect, useSelector} from 'react-redux';
import {createTag, updateTag} from '../../actions/tags';
import {ControlButton} from '../../components/buttons/ControlButton';
import {tags} from '../../selectors/tags';
import {routes} from '../../selectors/routes';
import {getTags} from '../../api/tags';
import {fetchRoutes} from '../../api/routes';

const RoutesScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    const existingTags = useSelector(state => tags(state));
    const popularTags = existingTags.filter(tag => tag.isPopular === true);

    function getPopularTags() {
        if (popularTags.length === 0) {
            getTags().then(result => {
                for (const tag of result.tags) {
                    tag.isPopular = true;
                    updateOrCreateTag(tag);
                }
            });
        }
    }

    function updateOrCreateTag(tag) {
        if (tag.id in popularTags.map(l => l.id)) {
            props.updateTag(tag);
        } else {
            props.createTag(tag);
        }
    }

    const allRoutes = useSelector(state => routes(state));

    function getRoutes() {
        if (allRoutes.length === 0) {
            fetchRoutes().then(result => {
                for (const route of result.routes) {
                    route.isPopular = true;
                    updateOrCreateRoute(route);
                }
            });
        }
    }

    function updateOrCreateRoute(route) {
        if (route.id in popularTags.map(l => l.id)) {
            props.updateRoute(route);
        } else {
            props.createRoute(route);
        }
    }

    useEffect(getPopularTags, []);
    useEffect(getRoutes, []);

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
                    <ControlButton
                        style={styles.controlButton}
                        renderIcon={style => <Icon {...style} name="search" />}
                        onPress={() => {
                            props.navigation.navigate('Search', {
                                searchBarOpen: true,
                            });
                        }}
                    />
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.popularTags')}
                        </Text>
                        <TagsList
                            data={popularTags}
                            navigation={props.navigation}
                        />
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.allRoutes')}
                        </Text>
                        <RoutesList
                            data={allRoutes}
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
        createTag: tag => dispatch(createTag(tag)),
        updateTag: tag => dispatch(updateTag(tag)),
        createRoute: route => dispatch(createRoute(route)),
        updateRoute: route => dispatch(updateRoute(route)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(RoutesScreen);
