import React from 'react';
import {Image, ScrollView, StatusBar} from 'react-native';
import {Icon, Layout, Text, useStyleSheet} from '@ui-kitten/components';
import {routesScreenStyles} from '../../styles/styleProvider';
import {connect, useSelector} from 'react-redux';
import {ControlButton} from '../../components/buttons/ControlButton';
import {updateLocation} from '../../actions/locations';
import {locations} from '../../selectors/locations';

const LocationScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);

    const locationId = props.route.params.locationId;
    const allLocations = useSelector(state => locations(state));
    const thisLocation = allLocations.find(item => item.id === locationId);

    return (
        <Layout style={styles.flexArea} level="3">
            <StatusBar
                backgroundColor={styles.statusBar.backgroundColor}
                barStyle="light-content"
            />
            <Layout style={styles.headerLayout} level="3">
                <ControlButton
                    style={styles.backButton}
                    renderIcon={style => (
                        <Icon {...style} name="arrow-ios-back" />
                    )}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                />
                <Text style={styles.pageTitle} category="h2">
                    {thisLocation.name}
                </Text>
            </Layout>
            <Layout style={styles.roundedLayout} level="1">
                <ScrollView contentContainerStyle={styles.scrollPadded}>
                    <Text category="p1">{thisLocation.description}</Text>
                    <Image
                        source={{
                            uri: thisLocation.image_url,
                        }}
                        style={{width: '100%', height: '100%', borderRadius: 5}}
                    />
                </ScrollView>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: location => dispatch(updateLocation(location)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(LocationScreen);
