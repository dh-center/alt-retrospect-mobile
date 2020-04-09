import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {ProfileIcon} from '../components/icons/ProfileIcon';
import {RoutesIcon} from '../components/icons/RoutesIcon';
import {MapIcon} from '../components/icons/MapIcon';
import {str} from '../i18n';

export const BottomTabBar = ({navigation, state}) => {
    const onSelect = index => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <SafeAreaView>
            <BottomNavigation
                appearance="noIndicator"
                selectedIndex={state.index}
                onSelect={onSelect}>
                <BottomNavigationTab
                    title={str('titles.routes')}
                    icon={RoutesIcon}
                />
                <BottomNavigationTab title={str('titles.map')} icon={MapIcon} />
                <BottomNavigationTab
                    title={str('titles.profile')}
                    icon={ProfileIcon}
                />
            </BottomNavigation>
        </SafeAreaView>
    );
};
