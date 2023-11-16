import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { useCallback } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import axios from 'axios';

export default function Register({
  navigation,
}: NativeStackScreenProps<StackScreens, 'Register'>) {
  const [displayName, setDisplayName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://10.0.0.27:50000/auth/register',
        {
          displayName,
          username,
          password,
        }
      );

      if (response.data) {
        navigateToLogin();
      }
    } catch (error: any) {
      console.error('Registration Failed:', error.response.data.message);
      Alert.alert('Registration Failed', error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        style={styles.input}
        value={displayName}
        placeholder="Display Name"
        onChangeText={(text) => setDisplayName(text)}
      />

      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
