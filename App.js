import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, ToastAndroid, View } from 'react-native';
import { Container, Content, Form, Item, Label, Button, Input, Text, NativeBaseProvider, FormControl, Box } from 'native-base';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [data, setData] = useState('');
  const [seconds, setSeconds] = useState('');

  async function scheduleLocalNotification() {
    if (title.trim() === '' || body.trim() === '' || seconds.trim() === '') {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    Alert.alert('Creating noti',`Title: ${title}, Body: ${body}, seconds: ${seconds}`);

    await Notifications.requestPermissionsAsync();

    // Notifications.addNotificationReceivedListener((notification) => {
    //   Alert.alert("Got noti", notification.request.content.data.key);
    // });
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data ? { key: data } : undefined,
        sound: Platform.OS === "android" ? null : "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: parseInt(seconds),
      },
    });

    setTitle('');
    setBody('');
    setData('');
    setSeconds('');
    Keyboard.dismiss();
    ToastAndroid.show('Notification scheduled!', ToastAndroid.SHORT);
  }

  return (
    <NativeBaseProvider>
      <Container safeArea padding={5}>

        <FormControl>
          <FormControl.Label>Title:</FormControl.Label>
          <Input value={title} onChangeText={setTitle} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Body:</FormControl.Label>
          <Input value={body} onChangeText={setBody} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Data (optional):</FormControl.Label>
          <Input value={data} onChangeText={setData} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Trigger in seconds</FormControl.Label>
          <Input
            value={seconds}
            onChangeText={setSeconds}
            keyboardType="numeric"
          />
        </FormControl>

        <Button onPress={scheduleLocalNotification} mt={10} width={'full'}>
          Set Notification
        </Button>

      </Container>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
