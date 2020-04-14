import React from 'react';
import {Image} from 'react-native';
import {ListItem, Button} from '@ui-kitten/components';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';
import {setRoute} from '../../actions/routes';
import {connect} from 'react-redux';

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
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
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
