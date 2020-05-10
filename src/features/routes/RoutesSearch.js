import React, {useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {Icon, Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {searchScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {fetchSearchRoutes} from '../../actions/routes';
import {connect} from 'react-redux';
import {SearchBar} from '../../components/inputs/SearchBar';
import {str} from '../../i18n';
import {ControlButton} from '../../components/buttons/ControlButton';

const RoutesSearch = props => {
    const styles = useStyleSheet(searchScreenStyles);
    const shared = useStyleSheet(sharedStyles);

    const [searchBarOpen, setSearchBarOpen] = useState(
        props.route.params.searchBarOpen,
    );

    return (
        <Layout style={styles.flexArea} level="3">
            <StatusBar
                backgroundColor={styles.statusBar.backgroundColor}
                barStyle="light-content"
            />

            {searchBarOpen ? (
                <Layout style={styles.headerLayout} level="3">
                    <SearchBar
                        style={styles.searchBar}
                        onChangeText={text =>
                            text !== '' ? props.fetchRoutes(text) : () => null
                        }
                        onBlur={() => {
                            setSearchBarOpen(false);
                        }}
                        open={searchBarOpen}
                    />
                </Layout>
            ) : (
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
                        {str('routes.searchRoutes')}
                    </Text>
                    <ControlButton
                        style={styles.searchButton}
                        renderIcon={style => <Icon {...style} name="search" />}
                        onPress={() => {
                            setSearchBarOpen(true);
                        }}
                    />
                </Layout>
            )}
            <Layout style={styles.roundedLayout} level="1">
                {props.isFetching ? (
                    <Layout style={shared.centerContent}>
                        <Spinner />
                    </Layout>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        {props.routes.length === 0 ? (
                            <Layout style={shared.centerContent}>
                                <Text appearance="hint">
                                    {str('routes.noRoutes')}
                                </Text>
                            </Layout>
                        ) : (
                            <RoutesList
                                data={props.routes}
                                navigation={props.navigation}
                            />
                        )}
                    </ScrollView>
                )}
            </Layout>
        </Layout>
    );
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
