import React from 'react';
import {StatusBar} from 'react-native';
import {Layout, Spinner, Text, useStyleSheet} from '@ui-kitten/components';
import {TagsList} from '../../components/lists/TagsList';
import {RoutesList} from '../../components/lists/RoutesList';
import {routesScreenStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import {store} from '../../store';
import {fetchAllRoutes} from '../../actions/routes';
import {connect} from 'react-redux';

const RoutesScreen = props => {
    const styles = useStyleSheet(routesScreenStyles);

    if (props.didInvalidate) {
        store.dispatch(fetchAllRoutes()).then(console.log(store.getState()));
    }

    if (props.isFetching) {
        return <Spinner />;
    } else {
        return (
            <Layout style={styles.flexArea} level="3">
                <StatusBar backgroundColor={styles.statusBar.backgroundColor} />
                <Layout style={styles.headerLayout} level="3">
                    <Text style={styles.pageTitle} category="h2">
                        {str('titles.routes')}
                    </Text>
                </Layout>
                <Layout style={styles.roundedLayout} level="1">
                    <Text category="h4" style={styles.sectionTitle}>
                        {str('routes.popularTags')}
                    </Text>
                    <TagsList />
                    <Text category="h4" style={styles.sectionTitle}>
                        {str('routes.allRoutes')}
                    </Text>
                    <RoutesList />
                </Layout>
            </Layout>
        );
    }
};

function mapStateToProps(state, ownProps?) {
    return {
        isFetching: state.routes.isFetching,
        didInvalidate: state.routes.didInvalidate,
        routes: state.routes.items,
    };
}

export default connect(mapStateToProps)(RoutesScreen);
