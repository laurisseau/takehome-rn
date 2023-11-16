import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login({
  navigation,
}: NativeStackScreenProps<StackScreens, 'Login'>) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigateToHome = useCallback(
    (sessionToken: string) => {
      navigation.navigate('Home', { sessionToken });
    },
    [navigation]
  );

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://10.0.0.27:50000/auth/login', {
        username,
        password,
      });

      const sessionToken = data.data.token;

      Cookies.set('SESSION_TOKEN', sessionToken, { expires: 7, secure: true });

      navigateToHome(sessionToken);
    } catch (error: any) {
      console.error('Login Failed:', error.response.data.message);
      Alert.alert('Login Failed', error.response.data.message);
    }
  };
  return (
    <View style={styles.container}>
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

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
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
