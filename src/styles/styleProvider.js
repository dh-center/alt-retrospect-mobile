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

export const authScreenStyles = StyleService.create({
    headerLayout: {
        padding: 15,
        backgroundColor: '#fff',
        height: 150,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    button: {
        marginTop: 15,
    },
});

export const routesScreenStyles = StyleService.create({
    headerLayout: {
        padding: 15,
        marginTop: '15%',
        height: '15%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    pageTitle: {
        color: '#fff',
    },
    flexArea: {
        flex: 1,
    },
    roundedLayout: {
        borderRadius: 40,
        padding: 15,
        height: '100%',
    },
    sectionTitle: {
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    searchIcon: {
        color: '#fff',
    },
    statusBar: {
        backgroundColor: 'color-info-400',
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
        height: '100%',
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
});

export const mapScreenStyles = StyleService.create({
    headerLayout: {
        padding: 10,
        backgroundColor: 'transparent',
    },
});

export const tagStyles = StyleService.create({
    tagBody: {
        borderRadius: 15,
        marginTop: 10,
    },
});
