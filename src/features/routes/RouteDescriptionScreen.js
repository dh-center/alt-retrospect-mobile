import React, {useState} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {
    Button,
    Icon,
    Layout,
    Spinner,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {fetchRoute, resetRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {routeScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {LocationsList} from '../../components/lists/LocationsList';
import {ControlButton} from '../../components/buttons/ControlButton';

const RouteDescriptionScreen = props => {
    const styles = useStyleSheet(routeScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    const [isSaved, setIsSaved] = useState(false);

    function handleSavePress() {
        if (props.isAuthorised) {
            setIsSaved(!isSaved);
        } else {
            props.navigation.navigate('Profile');
        }
    }

    function handleBackPress() {
        props.resetRoute();
        props.navigation.goBack();
    }

    if (props.didInvalidate) {
        props.fetchRoute(props.currentRoute.id);
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
                <ImageBackground
                    style={styles.background}
                    source={{
                        uri: props.currentRoute.image_url,
                    }}>
                    <View style={styles.headerLayout}>
                        <View style={styles.row}>
                            <ControlButton
                                renderIcon={style => (
                                    <Icon {...style} name="arrow-ios-back" />
                                )}
                                onPress={handleBackPress}
                            />
                            <ControlButton
                                renderIcon={style => (
                                    <Icon
                                        {...style}
                                        name={isSaved ? 'star' : 'star-outline'}
                                    />
                                )}
                                onPress={handleSavePress}
                            />
                        </View>
                        <Text style={styles.pageTitle} category="h3">
                            {props.currentRoute.name}
                        </Text>
                    </View>
                </ImageBackground>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <Text>{props.currentRoute.description}</Text>
                        <View style={styles.row}>
                            <Text category="h4" style={styles.sectionTitle}>
                                {str('routes.route')}
                            </Text>
                            <Text style={styles.durationText}>
                                {props.currentRoute.duration}{' '}
                                {str('routes.min')}
                            </Text>
                        </View>
                        <LocationsList
                            data={props.currentRoute.location_instances}
                            navigation={props.navigation}
                        />
                        <Button
                            appearance="filled"
                            status="info"
                            onPress={() =>
                                props.navigation.navigate('RouteNavigation', {
                                    routeId: props.currentRoute.id,
                                })
                            }
                            style={{marginTop: 25}}>
                            {str('routes.explore')}
                        </Button>
                    </ScrollView>
                </Layout>
            </Layout>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoute: routeId => dispatch(fetchRoute(routeId)),
        resetRoute: routeId => dispatch(resetRoute(routeId)),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.currentRoute.isFetching,
        didInvalidate: state.currentRoute.didInvalidate,
        currentRoute: state.currentRoute.data,
        isAuthorised: !!state.auth.authToken,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouteDescriptionScreen);
