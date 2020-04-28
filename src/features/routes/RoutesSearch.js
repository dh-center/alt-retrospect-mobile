import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Layout, Spinner, useStyleSheet} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {searchScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {fetchSearchRoutes} from '../../actions/routes';
import {connect} from 'react-redux';
import {SearchBar} from '../../components/inputs/SearchBar';

const RoutesSearch = props => {
    const styles = useStyleSheet(searchScreenStyles);
    const shared = useStyleSheet(sharedStyles);

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
                    <SearchBar
                        style={styles.searchBar}
                        onChangeText={text => props.fetchRoutes(text)}
                    />
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
        fetchRoutes: query => dispatch(fetchSearchRoutes(query)),
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.routesSearch.isFetching,
        routesInvalid: state.routesSearch.didInvalidate,
        routes: state.routesSearch.items,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoutesSearch);
