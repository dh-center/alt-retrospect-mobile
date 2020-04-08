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
import {userSignIn} from '../../api/auth';

export const SignInScreen = ({navigation}) => {
    const styles = useStyleSheet(signInScreenStyles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function performSignIn(username, password) {
        let result = await userSignIn(username, password);
        if (result.auth_token) {
            navigation.navigate('Profile');
        } else {
            alert('Something went wrong. Please try again');
        }
    }

    return (
        <SafeAreaView style={styles.flexArea}>
            <Layout style={styles.headerLayout}>
                <Text style={styles.pageTitle} category="h2">
                    Sign In
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
                    Log In
                </Button>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    status="info"
                    onPress={() => navigation.navigate('SignUp')}>
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
