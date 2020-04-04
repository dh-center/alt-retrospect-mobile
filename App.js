import React, {Component} from 'react';
import BottomBar from './src/components/BottomBar';
import {Container, Content, Header} from 'native-base';

export default class App extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content />
                <BottomBar />
            </Container>
        );
    }
}
