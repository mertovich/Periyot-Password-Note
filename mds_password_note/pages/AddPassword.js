import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPassword = props => {
  const [DATA, setData] = useState([]);
  const [Title, settitle] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Question, setQuestion] = useState('');
  const [Answer, setAnswer] = useState('');
  const [Note, setNote] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('Data');
      if (jsonValue !== null) {
        let tmpData = JSON.parse(jsonValue);
        setData(tmpData);
      }
    } catch (e) {
      // error reading value
    }
  };

  const saveData = async () => {
    if (Title === '') {
      alert('Title cannot be blank');
    } else {
      try {
        let value = {
          title: Title,
          email: Email,
          password: Password,
          question: Question,
          answer: Answer,
          note: Note,
        };
        let tmpData = DATA;
        tmpData.push(value);
        let jsonValue = JSON.stringify(tmpData);
        await AsyncStorage.setItem('Data', jsonValue);
      } catch (e) {
        console.log(e);
      }
      alert('successful');
      props.pageControlFC();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <Pressable
          style={styles.topBarAddButton}
          onPress={() => props.pageControlFC()}>
          <Text style={styles.topBarAddButtonText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={Title === '' ? styles.textInputError : styles.textInput}
          onChangeText={settitle}
          placeholder="Title"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          placeholder="E-mail"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setQuestion}
          placeholder="Secret Question"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setAnswer}
          placeholder="Answer"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setNote}
          placeholder="Note"
        />
      </View>
      <View style={styles.buttonSaveContainer}>
        <Pressable onPress={() => saveData()} style={styles.buttonSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    margin: 0,
    padding: '5%',
  },
  topBarAddButton: {
    borderRadius: 15,
    width: '18%',
    marginLeft: 0,
    marginRight: 'auto',
    padding: '3%',
  },
  topBarAddButtonText: {
    textAlign: 'center',
    color: '#3454D1',
  },
  inputContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    padding: '3%',
    borderBottomWidth: 1,
    borderColor: '#3454D1',
  },
  textInputError: {
    width: '90%',
    padding: '3%',
    borderBottomWidth: 1,
    borderColor: '#D1345B',
  },
  buttonSaveContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },
  buttonSave: {
    width: '70%',
    backgroundColor: '#34D1BF',
    padding: '3%',
    borderRadius: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#E8E9ED',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default AddPassword;
