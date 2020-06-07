import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
    Icon,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {createRoute, updateRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {ControlButton} from '../../components/buttons/ControlButton';
import {getRoutesByTag} from '../../api/routes';
import {Alignment, Colors, Spacing} from '../../styles';

const TagScreen = props => {
    const styles = useStyleSheet(stylesheet);

    const tag = props.route.params.tag;

    const [searchResults, setSearchResults] = useState([]);

    function fetchSearchResults() {
        getRoutesByTag(tag.id).then(result => {
            setSearchResults(result.routes);
        });
    }

    useEffect(fetchSearchResults, []);

    return (
        <Layout style={styles.flexArea} level="3">
            <Layout style={styles.headerLayout} level="3">
                <Layout style={styles.headerRow} level="3">
                    <ControlButton
                        accessoryLeft={evaProps => (
                            <Icon {...evaProps} name="arrow-ios-back" />
                        )}
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    />
                    <Text category="h5" style={styles.pageTitle}>
                        {tag.name}
                    </Text>
                </Layout>
            </Layout>
            <Layout style={styles.roundedLayout} level="1">
                <ScrollView>
                    {searchResults ? (
                        <RoutesList
                            data={searchResults}
                            navigation={props.navigation}
                        />
                    ) : null}
                </ScrollView>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createRoute: route => dispatch(createRoute(route)),
        updateRoute: route => dispatch(updateRoute(route)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(TagScreen);

const stylesheet = StyleService.create({
    flexArea: Alignment.flexArea,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.row,
        ...Alignment.smallHeader,
    },
    headerRow: {
        ...Alignment.row,
        ...Alignment.center,
        ...Alignment.pb0,
    },
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.bigRounded,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    pageTitle: Colors.white,
});
