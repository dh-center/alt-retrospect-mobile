import React from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/EmailInput';
import {PasswordInput} from '../../components/PasswordInput';
import {
    Layout,
    StyleService,
    Text,
    Button,
    useStyleSheet,
} from '@ui-kitten/components';

export const SignInScreen = ({navigation}) => {
    const styles = useStyleSheet(signInScreenStyles);

    return (
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Sign In
                </Text>
            </Layout>
            <Layout style={styles.paddedLayout}>
                <EmailInput />
                <PasswordInput secureStateEntry={true} />
                <Button style={styles.button} appearance="filled" status="info">
                    Log In
                </Button>
                <Button style={styles.button} appearance="ghost" status="info">
                    Register
                </Button>
            </Layout>
        </SafeAreaView>
    );
};

const signInScreenStyles = StyleService.create({
    flexArea: {
        flex: 1,
        flexDirection: 'column',
    },
    headerLayout: {
        padding: 15,
        backgroundColor: '#fff',
        height: 150,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    paddedLayout: {
        padding: 15,
        height: '100%',
    },
    button: {
        marginTop: 15,
    },
});
