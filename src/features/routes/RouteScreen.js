import React from 'react';
import {Image} from 'react-native';
import {Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import {fetchRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {sharedStyles} from '../../styles/styleProvider';

const RouteScreen = props => {
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
            <Layout level="1">
                <Text>{props.currentRoute.name}</Text>
                <Text>{props.currentRoute.description}</Text>
                <Image
                    style={{height: 100}}
                    source={{
                        uri:
                            'https://ic.pics.livejournal.com/noir_diamant/43916271/16427/16427_640.jpg',
                    }}
                />
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
