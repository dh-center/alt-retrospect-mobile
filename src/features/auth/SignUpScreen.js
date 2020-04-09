import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/EmailInput';
import {PasswordInput} from '../../components/PasswordInput';
import {Layout, Text, Button, useStyleSheet} from '@ui-kitten/components';
import {userSignIn, userSignUp} from '../../api/auth';
import {authScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import AsyncStorage from '@react-native-community/async-storage';

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
                await storeToken(signInResult.auth_token);
                navigation.navigate('Profile');
            } else {
                alert(str('errorMessage'));
            }
        } else {
            alert(str('errorMessage'));
        }
    }

    async function storeToken(token) {
        try {
            await AsyncStorage.setItem('authToken', token);
        } catch (e) {
            alert(str('errorMessage'));
        }
    }

    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    {str('auth.signup')}
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
                    {str('auth.register')}
                </Button>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    status="info"
                    onPress={() => navigation.navigate('SignIn')}>
                    {str('auth.login')}
                </Button>
            </Layout>
        </SafeAreaView>
    );
};
