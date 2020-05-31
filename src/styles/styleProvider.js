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
