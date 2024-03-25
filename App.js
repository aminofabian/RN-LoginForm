import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!username || username.length < 5) {
      errors.username = 'Username is required';
    }
    if (!password || password.length < 8) { 
      errors.password = '<PASSWORD>';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'You are logged in!');
      setUserName('');
      setPassword('');
      setErrors({});
      return;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>

      <View style={styles.container}>
        <View style={styles.form}>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
          <Text style={styles.label} >Username</Text>
          <TextInput
            placeholder='Enter Your Username'
            style={styles.input}
            value={username}
            onChangeText={(text) => setUserName(text)}
          />
          {errors.username ? <Text style={styles.error}>{errors.username}</Text>: null}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Your Password'
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {errors.password? <Text style={styles.error}>{errors.password}</Text>: null}
          <Button style={styles.button} color="#f194ff" title='Login' onPress={handleSubmit} />
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontWeight: 700,
    marginBottom: 3,
    fontSize: 15,

  },
  input: {
    marginBottom: 15,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 5,
    paddingVertical: 5,
  },
  button: {
    borderColor: 'skyblue',
    borderWidth: 2,
    backgroundColor: 'black',
  },
  logo: {
    width: '30%',
    height: '10%',
    marginBottom: 20,
    alignSelf: 'center',

  },
  error: {
    color: 'crimson',
    fontSize: 11.5,
    marginBottom: 5,
    marginTop: 5,
  } 
});
