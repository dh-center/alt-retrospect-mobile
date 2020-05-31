import React from 'react';
import {Image, ScrollView} from 'react-native';
import {
    Icon,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {connect, useSelector} from 'react-redux';
import {ControlButton} from '../../components/buttons/ControlButton';
import {updateLocation} from '../../actions/locations';
import {locations} from '../../selectors/locations';
import {Alignment, Colors, Spacing} from '../../styles';

const LocationScreen = props => {
    const styles = useStyleSheet(stylesheet);

    const locationId = props.route.params.locationId;
    const allLocations = useSelector(state => locations(state));
    const thisLocation = allLocations.find(item => item.id === locationId);

    return (
        <Layout style={styles.flexArea} level="3">
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
                {thisLocation && (
                    <Text style={styles.pageTitle} category="h2">
                        {thisLocation.name}
                    </Text>
                )}
            </Layout>
            <Layout style={styles.roundedLayout} level="1">
                <ScrollView contentContainerStyle={styles.scrollPadded}>
                    {thisLocation && [
                        <Text category="p1">{thisLocation.description}</Text>,
                        <Image
                            source={{
                                uri: thisLocation.image_url,
                            }}
                            style={styles.image}
                        />,
                    ]}
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

const stylesheet = StyleService.create({
    pageTitle: Colors.white,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.row,
        ...Alignment.smallHeader,
    },
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.roundedBig,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    scrollPadded: {
        ...Spacing.pb40,
    },
    flexArea: {
        ...Alignment.flexArea,
    },
    image: {
        ...Alignment.mediumImage,
        ...Alignment.roundedSmall,
    },
});
