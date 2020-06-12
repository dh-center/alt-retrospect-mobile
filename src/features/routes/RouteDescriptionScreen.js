import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {
    Button,
    Icon,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {updateRoute} from '../../actions/routes';
import {connect, useSelector} from 'react-redux';
import {str} from '../../i18n';
import {LocationsList} from '../../components/lists/LocationsList';
import {ControlButton} from '../../components/buttons/ControlButton';
import {
    addToSaved,
    fetchRoute,
    increaseRouteViewsCounter,
    removeFromSaved,
} from '../../api/routes';
import {routes} from '../../selectors/routes';
import {locations} from '../../selectors/locations';
import {createLocation, updateLocation} from '../../actions/locations';
import {Alignment, Colors, Spacing} from '../../styles';

// defines weight of actions that increase route views counter
const increaseViewsWeights = {
    view: 1,
    save: 3,
};

const RouteDescriptionScreen = props => {
    const styles = useStyleSheet(stylesheet);

    const routeId = props.route.params.routeId;
    const thisRoute = useSelector(state => routes(state)).find(
        item => item.id === routeId,
    );

    const [isSaved, setIsSaved] = useState(thisRoute.isSaved);

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
            } else {
                await addToSaved(thisRoute.id);
                await increaseRouteViewsCounter(
                    thisRoute.id,
                    increaseViewsWeights.save,
                );
            }
            thisRoute.isSaved = !thisRoute.isSaved;
            updateRoute(thisRoute);
            setIsSaved(thisRoute.isSaved);
        } else {
            props.navigation.navigate('Profile');
        }
    }

    function handleBackPress() {
        props.navigation.goBack();
    }

    useEffect(getRouteDetails, []);
    useEffect(
        () => {
            const increaseCount = async () => {
                const result = await increaseRouteViewsCounter(
                    thisRoute.id,
                    increaseViewsWeights.view,
                );
            };
            increaseCount();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

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
                            accessoryLeft={evaProps => (
                                <Icon {...evaProps} name="arrow-ios-back" />
                            )}
                            onPress={handleBackPress}
                        />
                        <ControlButton
                            accessoryLeft={evaProps => (
                                <Icon
                                    {...evaProps}
                                    name={isSaved ? 'star' : 'star-outline'}
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
                        <Text>
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
                        accessoryLeft={evaProps => (
                            <Icon {...evaProps} name="navigation-2-outline" />
                        )}
                        onPress={() =>
                            props.navigation.navigate('RouteNavigation', {
                                routeId: thisRoute.id,
                            })
                        }
                        style={styles.button}
                        children={str('routes.explore')}
                    />
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

const stylesheet = StyleService.create({
    pageTitle: Colors.white,
    sectionTitle: Spacing.pt15,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.columnSpacedBetween,
        ...Alignment.bigHeader,
        ...Colors.semiTransparentBg,
        ...Spacing.pb40,
        ...Spacing.pt40platform,
    },
    row: Alignment.rowSpacedBetween,
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.bigRounded,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    scrollPadded: {
        ...Spacing.pb40,
    },
    flexArea: {
        ...Alignment.flexArea,
    },
    button: {
        ...Spacing.mt15,
    },
    background: {
        ...Alignment.bigHeader,
        ...Spacing.mb40neg,
    },
});
