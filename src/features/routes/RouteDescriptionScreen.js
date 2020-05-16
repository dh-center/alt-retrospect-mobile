import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {Button, Icon, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {updateRoute} from '../../actions/routes';
import {connect, useSelector} from 'react-redux';
import {routeScreenStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {LocationsList} from '../../components/lists/LocationsList';
import {ControlButton} from '../../components/buttons/ControlButton';
import {addToSaved, fetchRoute, removeFromSaved} from '../../api/routes';
import {routes} from '../../selectors/routes';
import {locations} from '../../selectors/locations';
import {createLocation, updateLocation} from '../../actions/locations';

const RouteDescriptionScreen = props => {
    const styles = useStyleSheet(routeScreenStyles);

    const routeId = props.route.params.routeId;
    const allRoutes = useSelector(state => routes(state));
    const thisRoute = allRoutes.find(item => item.id === routeId);

    const allLocations = useSelector(state => locations(state));

    function getRouteDetails() {
        if (thisRoute.location_instances === undefined) {
            fetchRoute(routeId).then(result => {
                props.updateRoute(result.route);
                createOrUpdateLocations();
            });
        } else {
            createOrUpdateLocations();
        }
    }

    function createOrUpdateLocations() {
        if (thisRoute.location_instances !== undefined) {
            for (const location of thisRoute.location_instances) {
                if (location.id in allLocations.map(l => l.id)) {
                    props.updateLocation(location);
                } else {
                    props.createLocation(location);
                }
            }
        }
    }

    async function handleSavePress() {
        if (props.isAuthorised) {
            if (thisRoute.isSaved) {
                await removeFromSaved(thisRoute.id);
                thisRoute.isSaved = false;
                updateRoute(thisRoute);
            } else {
                await addToSaved(thisRoute.id);
                thisRoute.isSaved = true;
                updateRoute(thisRoute);
            }
        } else {
            props.navigation.navigate('Profile');
        }
    }

    function handleBackPress() {
        props.navigation.goBack();
    }

    useEffect(getRouteDetails, []);

    return (
        <Layout style={styles.flexArea} level="3">
            <ImageBackground
                style={styles.background}
                source={{
                    uri: thisRoute.image_url,
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
                                    name={
                                        thisRoute.isSaved
                                            ? 'star'
                                            : 'star-outline'
                                    }
                                />
                            )}
                            onPress={handleSavePress}
                        />
                    </View>
                    <Text style={styles.pageTitle} category="h3">
                        {thisRoute.name}
                    </Text>
                </View>
            </ImageBackground>
            <Layout style={styles.roundedLayout} level="1">
                <ScrollView contentContainerStyle={styles.scrollPadded}>
                    <Text>{thisRoute.description}</Text>
                    <View style={styles.row}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.route')}
                        </Text>
                        <Text style={styles.durationText}>
                            {thisRoute.duration} {str('routes.min')}
                        </Text>
                    </View>
                    {thisRoute.location_instances && (
                        <LocationsList
                            data={thisRoute.location_instances}
                            navigation={props.navigation}
                        />
                    )}

                    <Button
                        appearance="filled"
                        status="info"
                        onPress={() =>
                            props.navigation.navigate('RouteNavigation', {
                                routeId: thisRoute.id,
                            })
                        }
                        style={{marginTop: 25}}>
                        {str('routes.explore')}
                    </Button>
                </ScrollView>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        updateRoute: route => dispatch(updateRoute(route)),
        createLocation: location => dispatch(createLocation(location)),
        updateLocation: location => dispatch(updateLocation(location)),
    };
};

const mapStateToProps = state => {
    return {
        isAuthorised: !!state.auth.authToken,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouteDescriptionScreen);
