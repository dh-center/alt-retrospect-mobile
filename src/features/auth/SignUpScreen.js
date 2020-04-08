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

export const SignUpScreen = ({navigation}) => {
    const styles = useStyleSheet(signUpScreenStyles);

    return (
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Sign Up
                </Text>
            </Layout>
            <Layout style={styles.paddedLayout}>
                <EmailInput />
                <PasswordInput secureStateEntry={false} />
                <Button style={styles.button} appearance="filled" status="info">
                    Register
                </Button>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    status="info"
                    onPress={() => navigation.navigate('SignIn')}>
                    Back to Login
                </Button>
            </Layout>
        </SafeAreaView>
    );
};

const signUpScreenStyles = StyleService.create({
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
