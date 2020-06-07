import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
    Icon,
    Layout,
    Spinner,
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
    const [isFetching, setIsFetching] = useState(false);

    function fetchSearchResults() {
        setIsFetching(true);
        getRoutesByTag(tag.id).then(result => {
            setSearchResults(result.routes);
            setIsFetching(false);
        });
    }

    useEffect(fetchSearchResults, []);
    if (isFetching) {
        return (
            <Layout style={styles.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.flexArea} level="3">
                <Layout style={styles.headerLayout} level="3">
                    <ControlButton
                        style={styles.backButton}
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
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView>
                        <RoutesList
                            data={searchResults}
                            navigation={props.navigation}
                        />
                    </ScrollView>
                </Layout>
            </Layout>
        );
    }
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
    centerContent: Alignment.center,
    flexArea: Alignment.flexArea,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.row,
        ...Alignment.smallHeader,
    },
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.bigRounded,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    pageTitle: Colors.white,
    backButton: Spacing.pb0,
});
