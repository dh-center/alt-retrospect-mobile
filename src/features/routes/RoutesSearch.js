import React, {useState} from 'react';
import {ScrollView, StatusBar, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Icon,
    Layout,
    Spinner,
    StyleService,
    Text,
    Button,
    useStyleSheet,
} from '@ui-kitten/components';
import RoutesList from '../../components/lists/RoutesList';
import {SearchBar} from '../../components/inputs/SearchBar';
import {str} from '../../i18n';
import {ControlButton} from '../../components/buttons/ControlButton';
import {fetchRoute, getSearchRoutes} from '../../api/routes';
import {Alignment, Colors, Spacing} from '../../styles';
import {connect, useSelector} from 'react-redux';
import {routes} from '../../selectors/routes';
import {fetchDirection} from '../../api/directions';
import {updateRoute} from '../../actions/routes';
import {createLocation, updateLocation} from '../../actions/locations';

const RoutesSearch = props => {
    const styles = useStyleSheet(stylesheet);

    let allRoutes = useSelector(state => routes(state));

    const [searchBarOpen, setSearchBarOpen] = useState(
        props.route.params.searchBarOpen,
    );
    const [searchResults, setSearchResults] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [startedSearch, setStartedSearch] = useState(false);

    const [showTimeInput, setShowTimeInput] = useState(false);
    const [time, setTime] = useState(new Date(2020, 6, 20, 1, 0, 0));

    function fetchSearchResults(query) {
        if (query !== '') {
            setIsFetching(true);
            setStartedSearch(true);
            getSearchRoutes(query)
                .then(result => {
                    const limit = time.getHours() * 60 + time.getMinutes();
                    return limitRoutesByTime(result.routes, limit);
                })
                .then(filteredRoutes => {
                    setSearchResults(filteredRoutes);
                    setIsFetching(false);
                });
        } else {
            setSearchResults([]);
        }
    }

    async function limitRoutesByTime(filteredRoutes, limit) {
        let resultRoutes = filteredRoutes;
        for (let route of filteredRoutes) {
            if (route.duration > limit) {
                let durations = [];
                const data = await fetchRoute(route.id);
                route = data.route;
                for (let i = 0; i < route.location_instances.length - 1; i++) {
                    const result = await fetchDirection(
                        route.location_instances[i],
                        route.location_instances[i + 1],
                    );
                    const durationBetweenPoints =
                        result.routes[0].legs[0].steps[0].duration;
                    durations.push(durationBetweenPoints.value);
                }
                let totalDuration = durations.reduce((a, b) => a + b, 0);
                while (totalDuration > limit) {
                    const toRemove = durations.pop();
                    totalDuration -= toRemove;
                }
                route.location_instances = route.location_instances.slice(
                    durations.length,
                );
                route.duration = totalDuration;
                props.updateRoute(route);
                if (
                    route.location_instances.length <= 1 ||
                    route.duration <= 0
                ) {
                    resultRoutes = resultRoutes.filter(item => {
                        return item.id !== route.id;
                    });
                }
            }
        }
        return resultRoutes;
    }

    function setNewTime(event, newTime) {
        if (Platform.OS === 'android') {
            setShowTimeInput(false);
        }
        const currentTime = newTime || time;
        setTime(currentTime);
    }

    function getReadableTime(timeObject) {
        const hours = timeObject.getHours();
        const minutes = timeObject.getMinutes();
        return `${hours} : ${minutes < 10 ? '0' + minutes : minutes}`;
    }

    return (
        <Layout style={styles.flexArea} level="3">
            <StatusBar
                backgroundColor={styles.statusBar}
                barStyle="light-content"
            />

            {searchBarOpen ? (
                <Layout style={styles.headerLayout} level="3">
                    <View style={styles.searchBarView}>
                        <SearchBar
                            style={styles.searchBar}
                            onChangeText={text => fetchSearchResults(text)}
                            onBlur={() => {
                                setSearchBarOpen(false);
                            }}
                            open={searchBarOpen}
                        />
                    </View>
                    <View style={styles.timeInputView}>
                        <Button
                            style={styles.timeInput}
                            accessoryLeft={evaProps => (
                                <Icon {...evaProps} name="clock-outline" />
                            )}
                            children={getReadableTime(time)}
                            onPress={() => setShowTimeInput(!showTimeInput)}
                            status="control"
                            size="small"
                        />
                    </View>
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
                <ScrollView contentContainerStyle={styles.scrollPadded}>
                    {!startedSearch ? (
                        <RoutesList
                            data={allRoutes}
                            navigation={props.navigation}
                        />
                    ) : null}
                    {isFetching ? (
                        <Layout style={styles.centerContent}>
                            <Spinner />
                        </Layout>
                    ) : (
                        <Layout>
                            {searchResults.length === 0 && startedSearch ? (
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
                        </Layout>
                    )}
                </ScrollView>
                {showTimeInput && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        mode={Platform.OS === 'ios' ? 'countdown' : 'time'}
                        display="default"
                        value={time}
                        minuteInterval={15}
                        onChange={(event, newTime) =>
                            setNewTime(event, newTime)
                        }
                    />
                )}
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        updateRoute: route => dispatch(updateRoute(route)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(RoutesSearch);

const stylesheet = StyleService.create({
    pageTitle: {
        ...Colors.white,
        width: '60%',
    },
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
    searchButton: {
        ...Spacing.pb0,
    },
    searchBar: {
        ...Alignment.fullWidth,
    },
    timeInput: {
        ...Spacing.mb7,
    },
    searchBarView: {
        width: '70%',
    },
    timeInputView: {
        ...Alignment.center,
        width: '30%',
    },
});
