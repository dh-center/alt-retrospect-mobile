import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/EmailInput';
import {PasswordInput} from '../../components/PasswordInput';
import {Layout, Text, Button, useStyleSheet} from '@ui-kitten/components';
import {userSignIn} from '../../api/auth';
import {authScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';

export const SignInScreen = ({navigation}) => {
    const styles = useStyleSheet(authScreenStyles);
    const shared = useStyleSheet(sharedStyles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performSignIn(username, password) {
        let result = await userSignIn(username, password);
        if (result.auth_token) {
            navigation.navigate('Profile');
        } else {
            alert(str('errorMessage'));
        }
    }

    return (
        <SafeAreaView style={shared.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    {str('auth.signin')}
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
                    secureStateEntry={true}
                />
                <Button
                    style={styles.button}
                    appearance="filled"
                    status="info"
                    onPress={() => performSignIn(email, password)}>
                    {str('auth.login')}
                </Button>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    status="info"
                    onPress={() => navigation.navigate('SignUp')}>
                    {str('auth.register')}
                </Button>
            </Layout>
        </SafeAreaView>
    );
};
