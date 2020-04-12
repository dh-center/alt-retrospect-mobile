import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/inputs/EmailInput';
import {PasswordInput} from '../../components/inputs/PasswordInput';
import {Layout, Text, Button, useStyleSheet} from '@ui-kitten/components';
import {userSignIn} from '../../api/auth';
import {authScreenStyles, sharedStyles} from '../../styles/styleProvider';
import {str} from '../../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchAuthToken} from '../../actions/auth';
import {store} from '../../store';

export const SignInScreen = ({navigation}) => {
    const styles = useStyleSheet(authScreenStyles);
    const shared = useStyleSheet(sharedStyles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performSignIn(username, password) {
        await store.dispatch(fetchAuthToken(username, password));
        console.log(store.getState())
        let authToken = store.getState().auth.authToken;

        if (authToken) {
            await storeToken(authToken);
            navigation.navigate('Profile');
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
