import React, {useEffect} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
    Button,
    Layout,
    ListItem,
    Spinner,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {str} from '../../i18n';
import RoutesList from '../../components/lists/RoutesList';
import {connect, useSelector} from 'react-redux';
import {fetchUserInfo, resetUserInfo} from '../../actions/profile';
import {ProfileInfoList} from '../../components/lists/ProfileInfoList';
import {resetAuthToken} from '../../actions/auth';
import {routes} from '../../selectors/routes';
import {fetchSavedRoutes} from '../../api/profile';
import {createRoute, updateRoute} from '../../actions/routes';
import {Alignment, Colors, Spacing} from '../../styles';

const ProfileScreen = props => {
    const styles = useStyleSheet(stylesheet);

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

    useEffect(getSavedRoutes, []);
    useEffect(props.fetchUserInfo, []);

    if (props.isFetching) {
        return (
            <Layout style={styles.centerContent}>
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

const stylesheet = StyleService.create({
    pageTitle: Colors.white,
    sectionTitle: Spacing.pt15,
    statusBar: Colors.blueBg,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.rowSpacedBetween,
        ...Alignment.smallHeader,
    },
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.bigRounded,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    controlButton: {
        ...Spacing.pb0,
    },
    scrollPadded: {
        ...Spacing.pb40,
    },
    flexArea: {
        ...Alignment.flexArea,
    },
    centerContent: {
        ...Alignment.center,
    },
});
