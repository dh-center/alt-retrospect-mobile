import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {ProfileIcon} from '../components/icons/ProfileIcon';
import {RoutesIcon} from '../components/icons/RoutesIcon';
import {MapIcon} from '../components/icons/MapIcon';

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
                <BottomNavigationTab title="Routes" icon={RoutesIcon} />
                <BottomNavigationTab title="Map" icon={MapIcon} />
                <BottomNavigationTab title="Profile" icon={ProfileIcon} />
                <BottomNavigationTab title="Sign In" icon={ProfileIcon} />
                <BottomNavigationTab title="Sign Up" icon={ProfileIcon} />
            </BottomNavigation>
        </SafeAreaView>
    );
};
