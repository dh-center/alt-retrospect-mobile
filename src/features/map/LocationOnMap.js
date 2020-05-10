import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Layout, useStyleSheet, Text, Button, Icon} from '@ui-kitten/components';
import Map from '../../components/Map';
import {sharedStyles} from '../../styles/styleProvider';

export const LocationOnMap = props => {
    const shared = useStyleSheet(sharedStyles);

    const location = props.route.params.location;

    return (
        <SafeAreaView style={shared.flexArea}>
            <Map
                locations={[location]}
                routeMode={false}
                initialLocation={location}
            />
            <Layout
                style={{
                    borderRadius: 40,
                    padding: 15,
                    marginBottom: -40,
                    height: '50%',
                    marginTop: -40,
                }}
                level="1">
                <Text category="h6">{location.instances[0].name}</Text>
                <Button
                    status="info"
                    icon={style => (
                        <Icon {...style} name="navigation-2-outline" />
                    )}
                    children="Get route"
                />
                <ScrollView>
                    <Text>{location.instances[0].description}</Text>
                </ScrollView>
            </Layout>
        </SafeAreaView>
    );
};

export default LocationOnMap;
