import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import {EmailInput} from '../../components/inputs/EmailInput';
import {PasswordInput} from '../../components/inputs/PasswordInput';
import {
    Button,
    Layout,
    StyleService,
    Text,
    useStyleSheet,
} from '@ui-kitten/components';
import {userSignIn, userSignUp} from '../../api/auth';
import {str} from '../../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {Alignment, Colors, Spacing} from '../../styles';

export const SignUpScreen = ({navigation}) => {
    const styles = useStyleSheet(stylesheet);
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
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    {str('auth.signup')}
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

const stylesheet = StyleService.create({
    flexArea: {
        ...Alignment.flexArea,
        ...Alignment.fullHeight,
    },
    paddedLayout: {
        ...Spacing.basePadding,
        ...Alignment.fullHeight,
    },
    headerLayout: {
        ...Spacing.basePadding,
        ...Colors.whiteBg,
        ...Alignment.smallHeader,
        ...Alignment.column,
    },
    button: {
        ...Spacing.mt15,
    },
});
