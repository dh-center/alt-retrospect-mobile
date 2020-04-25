import React from 'react';
import {Divider, List, ListItem} from '@ui-kitten/components';

export const ProfileInfoList = props => {
    const renderItem = ({item, index}) => (
        <ListItem title={item.title} description={item.description} />
    );

    return (
        <List
            data={props.data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
};
