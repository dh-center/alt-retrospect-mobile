import React, {useState} from 'react';
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
import {userSignIn, userSignUp} from '../../api/auth';

export const SignUpScreen = ({navigation}) => {
    const styles = useStyleSheet(signUpScreenStyles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performSignUp(username, password) {
        let result = await userSignUp(username, password);
        if (result.username) {
            let signInResult = await userSignIn(username, password);
            if (signInResult.auth_token) {
                navigation.navigate('Profile');
            } else {
                alert('Something went wrong. Please try again');
            }
        } else {
            alert('Something went wrong. Please try again');
        }
    }

    return (
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Sign Up
                </Text>
            </Layout>
            <Layout style={styles.paddedLayout}>
                <EmailInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <PasswordInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureStateEntry={false}
                />
                <Button
                    style={styles.button}
                    appearance="filled"
                    status="info"
                    onPress={() => performSignUp(email, password)}>
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
