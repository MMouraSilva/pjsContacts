import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Switch, StyleSheet, Text, View, ScrollView, Dimensions, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const { route } = this.props;
        const switchValue = route.params.switchValue;

        if(switchValue == false) {
            await navigation.setOptions({
                headerStyle: {
                    backgroundColor: '#F5F5F5'   
                },
                headerTintColor: '#000'
            })
        } else {
            await navigation.setOptions({
                headerStyle: {
                    backgroundColor: '#000'   
                },
                headerTintColor: '#fff'
            })
        }
    }

    render () {
        const { route } = this.props;
        const contact = route.params.contact;
        const phoneNumbers = contact.phoneNumbers;
        const switchValue = route.params.switchValue;


        if(switchValue == false) {
            statusBarColor = 'dark';
            numberView = styles.numberLight;
            numberText = styles.numberTextLight;
            contactNameView = styles.contactNameViewLight;
            contactName = styles.contactNameLight;
            title = styles.titleLight;
            container = styles.containerLight;
        }
        else {
            statusBarColor = 'light';
            numberView = styles.numberDark;
            numberText = styles.numberTextDark;
            contactNameView = styles.contactNameViewDark;
            contactName = styles.contactNameDark;
            title = styles.titleDark;
            container = styles.containerDark;
        }

        return (
            <View style={container}>
                <StatusBar style={statusBarColor}/>
                <View style={styles.content}>
                    <View style={contactNameView}>
                        <Text style={contactName}>{contact.name}</Text>
                    </View>
                    <Text style={title}> Números: </Text>
                    <ScrollView 
                        style={styles.placesContainer}
                        vertical
                    >
                        <View style={styles.place}>
                            {
                                phoneNumbers.map(number =>
                                    <View style={numberView} key={number.id}>
                                        <Text
                                            style={numberText}
                                        >
                                            {number.number}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5F5F5"
    },
    
    containerDark: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000"
    },

    content: {
        flex: 7,
        justifyContent: "center",
        alignItems: 'center',
    },

    contactNameViewLight: {
        backgroundColor: "#4169E1",
        borderColor: "#363636",
        borderWidth: 1,
        width: width - 60,
        height: "10%",
        marginTop: "10%",
        alignItems: 'center',
        justifyContent: 'center'
    },

    contactNameViewDark: {
        backgroundColor: "#363636",
        borderColor: "#1C1C1C",
        borderWidth: 1,
        width: width - 60,
        height: "10%",
        marginTop: "10%",
        alignItems: 'center',
        justifyContent: 'center'
    },

    contactNameLight: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },

    contactNameDark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    },

    numberTextLight: {
        fontSize: 16,
        color: "#000"
    },

    numberTextDark: {
        fontSize: 16,
        color: "#fff"
    },

    numberLight: {
        borderWidth: 0.5,
        borderColor: "#363636",
        width: width * 0.5,
        height: 50,
        marginBottom: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    },

    numberDark: {
        borderWidth: 0.5,
        borderColor: "#363636",
        width: width * 0.5,
        height: 50,
        marginBottom: "5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C1C1C'
    },

    place: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width - 80,
        marginHorizontal: 40,
        marginTop: "10%"
    },

    placesContainer: {
        width: '100%',
        height: '80%',
    },

    titleLight: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "10%",
        marginLeft: "-50%",
        color: "#000"
    },

    titleDark: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: "10%",
        marginLeft: "-50%",
        color: "#fff"
    }

});