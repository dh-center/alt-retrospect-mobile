import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {searchScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {fetchAllRoutes} from '../../actions/routes';
import {connect} from 'react-redux';
import {SearchBar} from '../../components/inputs/SearchBar';

const RoutesSearch = props => {
    const styles = useStyleSheet(searchScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    if (props.routesInvalid && !props.isFetching) {
        props.fetchRoutes();
    }

    if (props.tagsInvalid) {
        props.fetchTags();
    }

    if (props.isFetching) {
        return (
            <Layout style={shared.centerContent}>
                <Spinner />
            </Layout>
        );
    } else {
        return (
            <Layout style={styles.flexArea} level="3">
                <StatusBar
                    backgroundColor={styles.statusBar.backgroundColor}
                    barStyle="light-content"
                />
                <Layout style={styles.headerLayout} level="3">
                    <SearchBar style={styles.searchBar} />
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        <RoutesList
                            data={props.routes}
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
        fetchRoutes: () => dispatch(fetchAllRoutes()),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.routes.isFetching || state.popularTags.isFetching,
        routesInvalid: state.routes.didInvalidate,
        routes: state.routes.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoutesSearch);
