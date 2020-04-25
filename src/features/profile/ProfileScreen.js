import React from 'react';
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
import {connect} from 'react-redux';
import {
    fetchSavedRoutes,
    fetchUserInfo,
    resetSavedRoutes,
    resetUserInfo,
} from '../../actions/profile';
import {ProfileInfoList} from '../../components/lists/ProfileInfoList';
import {resetAuthToken} from '../../actions/auth';

const ProfileScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    if (props.routesInvalid && !props.isFetching) {
        props.fetchRoutes();
    }

    if (props.userInfoInvalid && !props.isFetching) {
        props.fetchUserInfo();
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
                        {props.routes.length !== 0 ? (
                            <RoutesList
                                data={props.routes}
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
        fetchRoutes: () => dispatch(fetchSavedRoutes()),
        fetchUserInfo: () => dispatch(fetchUserInfo()),
        logOut: () => {
            dispatch(resetAuthToken());
            dispatch(resetSavedRoutes());
            dispatch(resetUserInfo());
        },
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.savedRoutes.isFetching || state.userInfo.isFetching,
        routesInvalid: state.savedRoutes.didInvalidate,
        routes: state.savedRoutes.items,
        userInfoInvalid: state.userInfo.didInvalidate,
        username: state.userInfo.username,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileScreen);
