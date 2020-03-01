import React, { Component } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import { Card, styles } from 'react-native-elements';
=======
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
>>>>>>> 74a392032f95adf54852192cca018419f7ee4e6f


class Contact extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Contact'
    };  

    render () {

        const { navigate } = this.props.navigation;

<<<<<<< HEAD
        const styles = StyleSheet.create({
            paragraph: {
              marginBottom: 10,
            }
        });

        return (
            <View>
                <Card title='Contact Information'>
                    <Text style={styles.paragraph}>121, Clear Water Bay Road</Text>
                    <Text style={styles.paragraph}>Clear Water Bay, Kowloon</Text>
                    <Text style={styles.paragraph}>HONG KONG</Text>
                    <Text style={styles.paragraph}>Tel: +852 1234 5678</Text>
                    <Text style={styles.paragraph}>Fax: _852 8765 4321</Text>
                    <Text style={styles.paragraph}>Email:confusion@food.net</Text>
                </Card>
            </View>
=======
        return (
            <Card title='Contact Information'>
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Fax: _852 8765 4321</Text>
                <Text>Email:confusion@food.net</Text>
            </Card>
>>>>>>> 74a392032f95adf54852192cca018419f7ee4e6f
        );
    }

}

export default Contact;