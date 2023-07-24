import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Container, Content, Form, Item, Label, Button, Input, Text, NativeBaseProvider, FormControl, Box } from 'native-base';
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

    ToastAndroid.show(`Title: ${title}, Body: ${body}, seconds: ${seconds}`, ToastAndroid.SHORT);

  }

  return (
    <NativeBaseProvider>
      <Container safeArea padding={5}>
        <>
          <>
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
          </>

          <Button onPress={scheduleLocalNotification} mt={10} width={'full'}>
            Set Notification
          </Button>
        </>
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
