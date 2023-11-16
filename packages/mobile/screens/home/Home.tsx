import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { Alert, Pressable, Text, View, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Home({
  navigation,
  route,
}: NativeStackScreenProps<StackScreens, 'Home'>) {
  const routeSessionToken = route?.params?.sessionToken;

  const [userAuth, setUserAuth] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    const sessionToken = Cookies.get('SESSION_TOKEN') || routeSessionToken;

    if (sessionToken !== undefined) {
      setToken(sessionToken);
    }

    const getUser = async () => {
      try {
        const { data } = await axios.get('http://10.0.0.27:50000/auth/', {
          headers: {
            Cookies: token,
          },
        });

        if (data.data && data.data.user && data.data.user.displayName) {
          setUserAuth(data.success);
          setSessionId(data.data.session.id);
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    getUser();
  }, [setUserAuth, token, setSessionId, routeSessionToken]);

  const Logout = async () => {
    try {
      const { data } = await axios.post('http://10.0.0.27:50000/auth/logout', {
        sessionId,
      });
      if (data) {
        Cookies.remove('SESSION_TOKEN');
        setUserAuth(false);
        setToken('');
        setSessionId('');
        handleLoginPress();
      }
    } catch (error: any) {
      console.error('Login Failed:', error.message);
      Alert.alert('Login Failed', 'Please try again.');
    }
  };

  const handleWebviewPress = useCallback(
    () => navigation.navigate('App'),
    [navigation?.navigate]
  );

  const handleLoginPress = useCallback(
    () => navigation.navigate('Login'),
    [navigation?.navigate]
  );

  const handleRegisterPress = useCallback(
    () => navigation.navigate('Register'),
    [navigation?.navigate]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Hello, this is the take home assignment{' '}
      </Text>

      {userAuth ? (
        <View>
          <Pressable style={styles.button} onPress={handleWebviewPress}>
            <Text style={styles.buttonText}> Webview </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={Logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Pressable style={styles.button} onPress={handleWebviewPress}>
            <Text style={styles.buttonText}> Webview </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleRegisterPress}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 64,
    fontWeight: '300',
    textAlign: 'left',
    lineHeight: 75,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});
