import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/EmailInput';
import {PasswordInput} from '../../components/PasswordInput';
import {
    Layout,
    Text,
    Button,
    useStyleSheet,
} from '@ui-kitten/components';
import {userSignIn, userSignUp} from '../../api/auth';
import {authScreenStyles, sharedStyles} from '../../styles/styleProvider';

export const SignUpScreen = ({navigation}) => {
    const styles = useStyleSheet(authScreenStyles);
    const shared = useStyleSheet(sharedStyles);
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
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Sign Up
                </Text>
            </Layout>
            <Layout style={shared.paddedLayout}>
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
