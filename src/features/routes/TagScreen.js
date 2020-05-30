import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {
    Icon,
    Layout,
    Spinner,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {sharedStyles, tagScreenStyles} from '../../styles/styleProvider';
import {createRoute, updateRoute} from '../../actions/routes';
import {connect} from 'react-redux';
import {ControlButton} from '../../components/buttons/ControlButton';
import {getRoutesByTag} from '../../api/routes';

const TagScreen = props => {
    const styles = useStyleSheet(tagScreenStyles);
    const shared = useStyleSheet(sharedStyles);

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
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
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
                    <Text category="h5" style={styles.pageTitle}>
                        {tag.name}
                    </Text>
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
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
