import React, {useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
    Button,
    Layout,
    ListItem,
    Spinner,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {str} from '../../i18n';
import {routesScreenStyles, sharedStyles} from '../../styles/styleProvider';
import RoutesList from '../../components/lists/RoutesList';
import {connect, useSelector} from 'react-redux';
import {fetchUserInfo, resetUserInfo} from '../../actions/profile';
import {ProfileInfoList} from '../../components/lists/ProfileInfoList';
import {resetAuthToken} from '../../actions/auth';
import {routes} from '../../selectors/routes';
import {fetchSavedRoutes} from '../../api/profile';
import {createRoute, updateRoute} from '../../actions/routes';

const ProfileScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    const allRoutes = useSelector(state => routes(state));
    const savedRoutes = allRoutes.filter(item => item.isSaved === true);

    function getSavedRoutes() {
        fetchSavedRoutes().then(result => {
            for (const route of result.routes) {
                route.isSaved = true;
                updateOrCreateRoute(route);
            }
        });
    }

    function updateOrCreateRoute(route) {
        if (allRoutes.find(item => item.id === route.id)) {
            props.updateRoute(route);
        } else {
            props.createRoute(route);
        }
    }

    if (props.userInfoInvalid && !props.isFetching) {
        props.fetchUserInfo();
    }

    useEffect(getSavedRoutes, []);

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
                    <Button
                        appearance="ghost"
                        variant="white"
                        status="control"
                        size="large"
                        style={styles.controlButton}
                        children={str('profile.logOut')}
                        onPress={() => {
                            props.logOut();
                            props.navigation.navigate('SignIn');
                        }}
                    />
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('profile.userInfo')}
                        </Text>
                        <ProfileInfoList
                            data={[
                                {
                                    title: props.username,
                                    description: str('profile.yourUsername'),
                                },
                            ]}
                        />
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('profile.savedRoutes')}
                        </Text>
                        {savedRoutes.length !== 0 ? (
                            <RoutesList
                                data={savedRoutes}
                                navigation={props.navigation}
                            />
                        ) : (
                            <ListItem title={str('profile.noSaved')} />
                        )}
                    </ScrollView>
                </Layout>
            </Layout>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserInfo: () => dispatch(fetchUserInfo()),
        logOut: () => {
            dispatch(resetAuthToken());
            dispatch(resetUserInfo());
        },
        createRoute: route => dispatch(createRoute(route)),
        updateRoute: route => dispatch(updateRoute(route)),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.userInfo.isFetching,
        userInfoInvalid: state.userInfo.didInvalidate,
        username: state.userInfo.username,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);
