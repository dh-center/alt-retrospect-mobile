import {Platform} from 'react-native';
import {StyleService} from '@ui-kitten/components';

export const sharedStyles = StyleService.create({
    flexArea: {
        flex: 1,
    },
    paddedLayout: {
        padding: 15,
        height: '100%',
    },
    centerContent: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const routeScreenStyles = StyleService.create({
    headerLayout: {
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        paddingBottom: 40,
        height: 300,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: 'color-info-transparent-600',
    },
    pageTitle: {
        color: '#fff',
        margin: 15,
    },
    flexArea: {
        flex: 1,
    },
    roundedLayout: {
        borderRadius: 40,
        padding: 15,
        marginBottom: -40,
        height: '100%',
        flex: 1,
    },
    sectionTitle: {
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    background: {
        height: 300,
        marginBottom: -30,
    },
    backButton: {
        width: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },
    durationText: {
        paddingTop: 25,
    },
    scrollPadded: {
        paddingBottom: 40,
    },
});

export const calloutStyles = StyleService.create({
    containerView: {
        backgroundColor: '#fff',
        width: 200,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentView: {width: '90%', justifyContent: 'center'},
    locationTitle: {fontSize: 16},
    buttonView: {width: '10%'},
    tooltip: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 15,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
        borderLeftColor: 'transparent',
        left: 90,
    },
});

export const searchScreenStyles = StyleService.create({
    headerLayout: {
        paddingBottom: 15,
        marginTop: '15%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flexArea: {
        flex: 1,
    },
    roundedLayout: {
        borderRadius: 40,
        padding: 15,
        marginBottom: -40,
        height: '100%',
        flex: 1,
    },
    statusBar: {
        backgroundColor: 'color-info-400',
    },
    scrollPadded: {
        paddingBottom: 40,
    },
    searchBar: {
        width: '100%',
    },
    pageTitle: {
        color: '#fff',
    },
    searchButton: {
        paddingBottom: 0,
    },
    backButton: {
        paddingBottom: 0,
    },
});
