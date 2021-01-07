import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Switch, StyleSheet, Text, View, ScrollView, Dimensions, TextInput, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default class App extends Component {
  function(props) {
    const navigation = useNavigation();
    return <MyBackButton {...props} navigation={navigation} />
  }
  
  state = {
    contacts: [],
    campos: [
      {
        pesquisa: null,
      }
    ],
    contactsFilter: [],
    switchValue: false,
  }
  
  toggleSwitch = value => {
    this.setState({ switchValue: value });
  }

  componentDidMount(){
    this._showContacts();
  }

  _showContacts = async (inputValue) => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS)

    if(permission.status !== 'granted'){
      return;
    }

    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS
      ],
    })

    if(contacts.total > 0) {
      this.setState({
        contacts: contacts.data
      })
      
      this.setState({ pesquisa: inputValue });
      input = this.state.pesquisa;

      let filtrado = this.state.contacts.filter(this._acharCorrespondencia);
      this.setState({contactsFilter: filtrado});
    }
  }

  _acharCorrespondencia(contato) {

    let termo = input;
    var regex = new RegExp(termo, 'gi');

    if(regex.test(contato.name))
      return true;

    if(contato.phoneNumbers)
      return contato.phoneNumbers.filter(n => regex.test (n.number)).length > 0;

    return false;
  }

  render () {
    const { navigation } = this.props;
    if(this.state.switchValue === false) {
      containerColor = styles.containerLight;
      titleColor = styles.titleLight;
      switchColor = styles.switchTextLight;
      inputColor = styles.inputLight;
      placeColor = styles.placeLight;
      buttonColor = styles.buttonLight;
      textColor = styles.textLight;
      pressableColor = '#fff';
      onPressedColor = '#d2e6ff';
      statusBarColor = 'dark';
    }
    else {
      containerColor = styles.containerDark;
      titleColor = styles.titleDark;
      switchColor = styles.switchTextDark;
      inputColor = styles.inputDark;
      placeColor = styles.placeDark;
      buttonColor = styles.buttonDark;
      textColor = styles.textDark;
      pressableColor = '#1C1C1C';
      onPressedColor = '#363636';
      statusBarColor = 'light';
    }
    return (
      <View style={containerColor}>
        <Text style={titleColor}> Contatos </Text>
        <Text style={switchColor}>{this.state.switchValue ? 'Modo Escuro' : 'Modo Claro'}</Text>
        <Switch
          style={styles.switch}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
        />
        <View style={styles.border} />
        <View style={inputColor}>
          <TextInput 
            style={styles.textInput} 
            placeholder='Pesquisar'
            onChangeText={(inputValue) => this._showContacts(inputValue)}
          />
        </View>

        <StatusBar style={statusBarColor}/>

        <ScrollView 
          style={styles.placesContainer}
          vertical
        >
            <View  style={placeColor}>
            {
              this.state.contactsFilter.map(contact => 
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                    ? onPressedColor
                    : pressableColor
                  },
                  buttonColor
                ]}
                key={contact.id}
                onPress={() => navigation.navigate('ContactInfos', { contact: contact, switchValue: this.state.switchValue })}
              >
                {({ pressed }) => (
                  <Text style={textColor}>
                    {pressed ? contact.name : contact.name}
                  </Text>
                )}
              </Pressable>
                )
            }
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerLight: {
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerDark: {
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placesContainer: {
    width: '100%',
    height: '80%',
    top: 70
  },
  placeLight: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    width: width - 80,
    marginHorizontal: 40,
  },
  placeDark: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
    width: width - 80,
    marginHorizontal: 40,
  },
  textLight: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  textDark: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonLight: {
    borderColor: '#363636',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    width: width - 80,
  },
  buttonDark: {
    borderColor: '#363636',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    width: width - 80,
  },
  inputLight: {
    width: width,
    height: 80,
    backgroundColor: '#4169E1',
    position: 'relative',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },
  inputDark: {
    width: width,
    height: 80,
    backgroundColor: '#363636',
    position: 'relative',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 20,
    height: 40,
  },
  titleLight: {
    color: '#000000',
    top: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleDark: {
    color: '#fff',
    top: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },
  border: {
    borderBottomColor: '#363636',
    borderBottomWidth: 0.5,
    top: 65,
  },
  switch: {
    position: 'relative',
    top: 10,
    right: 50,
  },
  switchTextDark: {
    color: '#fff',
    position: 'relative',
    left: width - 120,
  },
  switchTextLight: {
    color: '#000000',
    position: 'relative',
    left: width - 120,
  }
});