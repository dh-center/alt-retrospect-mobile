import React, {useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
    Icon,
    Layout,
    Spinner,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {SearchBar} from '../../components/inputs/SearchBar';
import {str} from '../../i18n';
import {ControlButton} from '../../components/buttons/ControlButton';
import {getSearchRoutes} from '../../api/routes';
import {Alignment, Colors, Spacing} from '../../styles';

const RoutesSearch = props => {
    const styles = useStyleSheet(stylesheet);

    const [searchBarOpen, setSearchBarOpen] = useState(
        props.route.params.searchBarOpen,
    );
    const [searchResults, setSearchResults] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    function fetchSearchResults(query) {
        if (query !== '') {
            setIsFetching(true);
            getSearchRoutes(query).then(result => {
                setSearchResults(result.routes);
                setIsFetching(false);
            });
        } else {
            setSearchResults([]);
        }
    }

    return (
        <Layout style={styles.flexArea} level="3">
            <StatusBar
                backgroundColor={styles.statusBar}
                barStyle="light-content"
            />

            {searchBarOpen ? (
                <Layout style={styles.headerLayout} level="3">
                    <SearchBar
                        style={styles.searchBar}
                        onChangeText={text => fetchSearchResults(text)}
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
                        accessoryLeft={evaProps => (
                            <Icon {...evaProps} name="arrow-ios-back" />
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
                        accessoryLeft={evaProps => (
                            <Icon {...evaProps} name="search" />
                        )}
                        onPress={() => {
                            setSearchBarOpen(true);
                        }}
                    />
                </Layout>
            )}
            <Layout style={styles.roundedLayout} level="1">
                {isFetching ? (
                    <Layout style={styles.centerContent}>
                        <Spinner />
                    </Layout>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollPadded}>
                        {searchResults.length === 0 ? (
                            <Layout style={styles.centerContent}>
                                <Text appearance="hint">
                                    {str('routes.noRoutes')}
                                </Text>
                            </Layout>
                        ) : (
                            <RoutesList
                                data={searchResults}
                                navigation={props.navigation}
                            />
                        )}
                    </ScrollView>
                )}
            </Layout>
        </Layout>
    );
};

export default RoutesSearch;

const stylesheet = StyleService.create({
    pageTitle: Colors.white,
    headerLayout: {
        ...Spacing.basePadding,
        ...Alignment.rowSpacedBetween,
        ...Alignment.smallHeader,
    },
    roundedLayout: {
        ...Spacing.basePadding,
        ...Spacing.mb40neg,
        ...Alignment.bigRounded,
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    scrollPadded: {
        ...Spacing.pb40,
    },
    flexArea: {
        ...Alignment.flexArea,
    },
    statusBar: {
        ...Colors.blueBg,
    },
    backButton: {
        ...Spacing.pb0,
    },
    searchBar: {
        ...Alignment.fullWidth,
    },
});
