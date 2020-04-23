import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import {str} from '../../i18n';
import {routesScreenStyles, sharedStyles} from '../../styles/styleProvider';
import RoutesList from '../../components/lists/RoutesList';
import {fetchAllRoutes} from '../../actions/routes';
import {connect} from 'react-redux';
import {fetchSavedRoutes} from '../../actions/profile';

const ProfileScreen = props => {
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
                        {str('titles.profile')}
                    </Text>
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('profile.savedRoutes')}
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
        fetchRoutes: () => dispatch(fetchSavedRoutes()),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.savedRoutes.isFetching,
        routesInvalid: state.savedRoutes.didInvalidate,
        routes: state.savedRoutes.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);
