import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../App';
import { WebView as NativeWebView } from 'react-native-webview';

export default function WebView({}: NativeStackScreenProps<
  StackScreens,
  'App'
>) {
  return (
    <View style={styles.container}>
      <NativeWebView source={{ uri: 'http://10.0.0.27:3000/' }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
