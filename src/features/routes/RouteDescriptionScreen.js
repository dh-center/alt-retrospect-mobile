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

const RouteDescriptionScreen = props => {
    const styles = useStyleSheet(routeScreenStyles);

    const routeId = props.route.params.routeId;
    const allRoutes = useSelector(state => routes(state));
    const currentRoute = allRoutes.find(item => item.id === routeId);

    function getRoute() {
        if (currentRoute.location_instances === undefined) {
            fetchRoute(routeId).then(result => {
                props.updateRoute(result.route);
            });
        }
    }

    async function handleSavePress() {
        if (props.isAuthorised) {
            if (isSaved) {
                await removeFromSaved(currentRoute.id);
            } else {
                await addToSaved(currentRoute.id);
            }
            setIsSaved(!isSaved);
        } else {
            props.navigation.navigate('Profile');
        }
    }

    function handleBackPress() {
        props.navigation.goBack();
    }

    const [isSaved, setIsSaved] = useState(false);
    useEffect(getRoute, []);

    return (
        <Layout style={styles.flexArea} level="3">
            <ImageBackground
                style={styles.background}
                source={{
                    uri: currentRoute.image_url,
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
                        {currentRoute.name}
                    </Text>
                </View>
            </ImageBackground>
            <Layout style={styles.roundedLayout} level="1">
                <ScrollView contentContainerStyle={styles.scrollPadded}>
                    <Text>{currentRoute.description}</Text>
                    <View style={styles.row}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.route')}
                        </Text>
                        <Text style={styles.durationText}>
                            {currentRoute.duration} {str('routes.min')}
                        </Text>
                    </View>
                    {currentRoute.location_instances && (
                        <LocationsList
                            data={currentRoute.location_instances}
                            navigation={props.navigation}
                        />
                    )}

                    <Button
                        appearance="filled"
                        status="info"
                        onPress={() =>
                            props.navigation.navigate('RouteNavigation', {
                                routeId: currentRoute.id,
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
