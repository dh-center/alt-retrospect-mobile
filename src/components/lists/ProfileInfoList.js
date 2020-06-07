import React from 'react';
import {Divider, List, ListItem, Text} from '@ui-kitten/components';

export const ProfileInfoList = props => {
    const renderItem = ({item, index}) => (
        <ListItem
            title={<Text>{item.title}</Text>}
            description={item.description}
        />
    );

    return (
        <List
            data={props.data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
};
