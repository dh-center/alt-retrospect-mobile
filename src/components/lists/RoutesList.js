import React from 'react';
import {Image} from 'react-native';
import {ListItem, Button} from '@ui-kitten/components';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';
import {setRoute} from '../../actions/routes';
import {connect} from 'react-redux';

const RoutesList = props => {
    const renderRouteImage = style => (
        delete style.tintColor,
        (
            <Image
                source={{
                    uri:
                        'https://pics.livejournal.com/noir_diamant/pic/0002achx/s640x480',
                }}
                style={{width: 40, height: 40, borderRadius: 5}}
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
            icon={style => renderRouteImage(style)}
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
