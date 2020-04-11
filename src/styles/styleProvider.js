import {StyleService} from '@ui-kitten/components';

export const sharedStyles = StyleService.create({
    flexArea: {
        flex: 1,
    },
    paddedLayout: {
        padding: 15,
        height: '100%',
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
        marginTop: 40,
        backgroundColor: 'color-info-400',
        height: 100,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    pageTitle: {
        color: '#fff',
    },
    flexArea: {
        flex: 1,
        backgroundColor: 'color-info-400',
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
        borderBottomColor: 'color-warning-400',
        borderBottomWidth: 2,
    },
});
