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
import {fetchAllRoutes} from '../../actions/routes';
import {connect, useSelector} from 'react-redux';
import {createTag, updateTag} from '../../actions/tags';
import {ControlButton} from '../../components/buttons/ControlButton';
import {tags} from '../../selectors/tags';
import {getTags} from '../../api/tags';

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
                    updateOrCreate(tag);
                }
            });
        }
    }

    function updateOrCreate(tag) {
        if (tag.id in popularTags.map(l => l.id)) {
            props.updateTag(tag);
        } else {
            props.createTag(tag);
        }
    }

    if (props.routesInvalid && !props.isFetching) {
        props.fetchRoutes();
    }

    useEffect(getPopularTags);

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
        createTag: tag => dispatch(createTag(tag)),
        updateTag: tag => dispatch(updateTag(tag)),
        fetchRoutes: () => dispatch(fetchAllRoutes()),
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
