import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact'
    };  

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['ricktorzynski@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render () {

        const { navigate } = this.props.navigation;

        const styles = StyleSheet.create({
            paragraph: {
              marginBottom: 10,
            }
        });

        return (
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                        title='Contact Information'>
                        <Text style={styles.paragraph}>121, Clear Water Bay Road</Text>
                        <Text style={styles.paragraph}>Clear Water Bay, Kowloon</Text>
                        <Text style={styles.paragraph}>HONG KONG</Text>
                        <Text style={styles.paragraph}>Tel: +852 1234 5678</Text>
                        <Text style={styles.paragraph}>Fax: _852 8765 4321</Text>
                        <Text style={styles.paragraph}>Email:confusion@food.net</Text>
                        <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            </View>
        );
    }

}

export default Contact;