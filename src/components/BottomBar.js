import React, {Component} from 'react';
import {Footer, FooterTab, Button, Icon} from 'native-base';

export default class BottomBar extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button>
                        <Icon name="map" />
                    </Button>
                    <Button>
                        <Icon name="person" />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
