import React from 'react';
import {
    Icon,
    List,
    StyleService,
    useStyleSheet,
} from '@ui-kitten/components';
import {Tag} from '../Tag';

const data = new Array(3).fill({
    title: 'Title for Tag',
});

export const TagsList = () => {
    const styles = useStyleSheet(tagsListStyles);
    const renderTagIcon = style => <Icon {...style} name="person" />;

    const renderItem = ({item, index}) => (
        <Tag title={`${item.title} ${index + 1}`} icon={renderTagIcon} />
    );

    return <List data={data} renderItem={renderItem} style={styles.tagsList} />;
};

const tagsListStyles = StyleService.create({
    tagsList: {
        backgroundColor: '#fff',
    },
});
