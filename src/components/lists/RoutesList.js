import React from 'react';
import {Image} from 'react-native';
import {Icon, ListItem} from '@ui-kitten/components';
import {setRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {BasicButton} from '../buttons/BasicButton';

const RoutesList = props => {
    const renderRouteImage = (style, uri) => (
        delete style.tintColor,
        (
            <Image
                source={{
                    uri: uri,
                }}
                style={{width: 50, height: 50, borderRadius: 5}}
            />
        )
    );
    const renderChevron = style => (
        <BasicButton
            renderIcon={style => <Icon {...style} name="chevron-right" />}
            onPress={() => props.navigation.navigate('Search')}
        />
    );

    const renderItem = item => (
        <ListItem
            key={item.id}
            title={item.name}
            icon={style => renderRouteImage(style, item.image_url)}
            accessory={renderChevron}
            onPress={() => {
                props.setRoute(item.id);
                props.navigation.navigate('Route');
            }}
        />
    );
    return props.data.map(renderItem);
};

const mapDispatchToProps = dispatch => {
    return {
        setRoute: routeId => dispatch(setRoute(routeId)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(RoutesList);
