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
import {str} from '../../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {fetchAuthToken} from '../../actions/auth';
import {store} from '../../store';
import {Alignment, Colors, Spacing} from '../../styles';

export const SignInScreen = ({navigation}) => {
    const styles = useStyleSheet(stylesheet);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performSignIn(username, password) {
        await store.dispatch(fetchAuthToken(username, password));
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
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    {str('auth.signin')}
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
        ...Colors.whiteBackground,
        ...Alignment.smallHeader,
        ...Alignment.column,
    },
    button: {
        ...Spacing.mt15,
    },
});
