import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, useStyleSheet, Text, Button, Icon} from '@ui-kitten/components';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';
import {styles} from './styles';
import {str} from '../../i18n';

export const LocationOnMap = props => {
    const stylesheet = useStyleSheet(styles);
    const shared = useStyleSheet(sharedStyles);

    const location = props.route.params.location;

    return (
        <SafeAreaView style={shared.flexArea}>
            <Map
                locations={[location]}
                routeMode={false}
                initialLocation={location}
            />
            <Layout style={stylesheet.description} level="1">
                <View style={stylesheet.topRow}>
                    <Text category="h6" style={stylesheet.title}>
                        {location.instances[0].name}
                    </Text>
                    <Button
                        status="info"
                        icon={style => (
                            <Icon {...style} name="navigation-2-outline" />
                        )}
                        children={str('map.getRoute')}
                    />
                </View>
                <ScrollView>
                    <Text>{location.instances[0].description}</Text>
                </ScrollView>
            </Layout>
        </SafeAreaView>
    );
};

export default LocationOnMap;
