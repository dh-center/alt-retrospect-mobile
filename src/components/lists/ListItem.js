import React from 'react';
import {Button, Layout} from '@ui-kitten/components';
import {Image, Text} from 'react-native';
import {ArrowRightIcon} from '../icons/ArrowRightIcon';

export const ListItem = props => {
    const renderChevron = style => (
        <Button
            appearance="ghost"
            status="basic"
            style={style}
            icon={ArrowRightIcon}
            onPress={() => props.navigation.navigate('Route')}
        />
    );

    const renderImage = uri => (
        <Image
            style={{width: 30, height: 30}}
            source={{
                uri:
                    'https://ic.pics.livejournal.com/noir_diamant/43916271/16427/16427_640.jpg',
            }}
        />
    );

    return (
        <Layout style={{flexDirection: 'row', flex: 1, padding: 10, margin: 10}}>
            {renderImage()}
            <Layout>
                <Text>{props.title}</Text>
            </Layout>
            {props.chevron ? renderChevron() : null}
        </Layout>
    );
};
