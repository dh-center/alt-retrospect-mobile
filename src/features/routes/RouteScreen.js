import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import {fetchRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {routeScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {ArrowLeftIcon} from '../../components/icons/ArrowLeftIcon';
import {StarIcon} from '../../components/icons/StarIcon';

const RouteScreen = props => {
    const styles = useStyleSheet(routeScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    props.fetchRoute(props.route.params.routeId);

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
                        uri:
                            'https://ic.pics.livejournal.com/noir_diamant/43916271/16427/16427_640.jpg',
                    }}>
                    <View style={styles.headerLayout}>
                        <View style={styles.row}>
                            <Button
                                appearance="ghost"
                                status="control"
                                icon={ArrowLeftIcon}
                                style={styles.backButton}
                                size="giant"
                                onPress={() => props.navigation.goBack()}
                            />
                            <Button
                                appearance="ghost"
                                status="control"
                                icon={StarIcon}
                                style={styles.backButton}
                                size="giant"
                            />
                        </View>
                        <Text style={styles.pageTitle} category="h3">
                            {props.currentRoute.name}
                        </Text>
                    </View>
                </ImageBackground>
                <Layout style={styles.roundedLayout} level="1">
                    <Text>{props.currentRoute.description}</Text>
                    <View style={styles.row}>
                        <Text category="h4" style={styles.sectionTitle}>
                            {str('routes.route')}
                        </Text>
                        <Text style={styles.durationText}>
                            {props.currentRoute.duration} {str('routes.min')}
                        </Text>
                    </View>
                </Layout>
            </Layout>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRoute: routeId => dispatch(fetchRoute(routeId)),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.routes.isFetching,
        currentRoute: state.routes.items.find(
            item => item.id === ownProps.route.params.routeId,
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RouteScreen);
