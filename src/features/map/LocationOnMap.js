import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
    Layout,
    useStyleSheet,
    Text,
    Button,
    Icon,
    StyleService,
} from '@ui-kitten/components';
import Map from '../../components/Map';
import {str} from '../../i18n';
import {Alignment, Spacing} from '../../styles';

export const LocationOnMap = props => {
    const styles = useStyleSheet(stylesheet);

    const location = props.route.params.location;

    return (
        <SafeAreaView style={styles.flexArea}>
            <Map
                locations={[location]}
                routeMode={false}
                initialLocation={location}
            />
            <Layout style={styles.description} level="1">
                <View style={styles.topRow}>
                    <Text category="h6" style={styles.title}>
                        {location.instances[0].name}
                    </Text>
                    <Button
                        status="info"
                        icon={style => (
                            <Icon {...style} name="navigation-2-outline" />
                        )}
                        children={str('map.getRoute')}
                        onPress={() =>
                            props.navigation.navigate('RouteToLocation', {
                                location: location,
                            })
                        }
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

const stylesheet = StyleService.create({
    flexArea: Alignment.flexArea,
    description: {
        ...Alignment.bigRounded,
        ...Alignment.halfHeight,
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Spacing.mt40neg,
    },
    topRow: {
        ...Alignment.rowSpacedBetween,
        ...Alignment.fullWidth,
        ...Alignment.itemsCenter,
        ...Spacing.pb15,
    },
    title: {
        maxWidth: '70%',
    },
});
