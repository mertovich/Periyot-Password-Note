import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({item, getItem, deleteAlert}) => (
  <Pressable style={styles.card} onPress={() => getItem(item)}>
    <View>
      <Text style={styles.circle}>{item.title[0].toUpperCase()}</Text>
    </View>
    <View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
    <Pressable style={styles.cardDelete} onPress={() => deleteAlert(item)}>
      <Text style={styles.cardDeleteText}>Delete</Text>
    </Pressable>
  </Pressable>
);

const Home = props => {
  const [DATA, setData] = useState([]);
  const [Search, setSearch] = useState('');
  const [DetailPage, setDetailPage] = useState(false);
  const [Detail, setDetail] = useState({});
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [SecureTextControl, SetSecureTextControl] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => (
    <Card
      item={item}
      getItem={getItem}
      itemDelete={itemDelete}
      deleteAlert={deleteAlert}
    />
  );

  const getItem = item => {
    setDetail({
      title: item.title,
      email: item.email,
      password: item.password,
      question: item.question,
      answer: item.answer,
      note: item.note,
    });
    setDetailPage(true);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Data');
      if (jsonValue !== null) {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  };

  const DetailPageControl = () => {
    if (DetailPage) {
      setDetailPage(false);
    } else {
      setDetailPage(true);
    }
  };

  const itemDelete = async item => {
    let tmpData = DATA.filter(n => n.title !== item.title);
    let tmpfilteredDataSource = filteredDataSource.filter(
      n => n.title !== item.title,
    );
    setFilteredDataSource(tmpfilteredDataSource);
    try {
      let jsonValue = JSON.stringify(tmpData);
      await AsyncStorage.setItem('Data', jsonValue);
    } catch (e) {
      console.log(e);
    }
    getData();
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = DATA.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(DATA);
      setSearch(text);
    }
  };

  const deleteAlert = item =>
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => itemDelete(item)},
    ]);

  const secureTextOnclick = () => {
    if (SecureTextControl) {
      SetSecureTextControl(false);
    } else {
      SetSecureTextControl(true);
    }
  };

  if (DetailPage === false) {
    return (
      <SafeAreaView>
        <View style={styles.topBar}>
          <TextInput
            onChangeText={text => searchFilterFunction(text)}
            placeholder="Search.."
            value={Search}
            style={styles.searchInput}
          />
          <Pressable
            style={styles.topBarAddButton}
            onPress={() => props.pageControlFC()}>
            <Text style={styles.topBarAddButtonText}>Add</Text>
          </Pressable>
        </View>
        <FlatList
          data={Search !== '' ? filteredDataSource : DATA}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.topBar}>
          <Pressable
            style={styles.topBarBackButton}
            onPress={() => DetailPageControl()}>
            <Text style={styles.topBarBackButtonText}>Back</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.detailTextContainer}>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/tag.png')}
              />
              <Text style={styles.detailText}>Title:</Text>
              <Text style={styles.detailTextGet}>{Detail.title}</Text>
            </View>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/email.png')}
              />
              <Text style={styles.detailText}>E-mail:</Text>
              <Text style={styles.detailTextGet}>{Detail.email}</Text>
            </View>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/password.png')}
              />
              <Text style={styles.detailText}>Password:</Text>
              <Text style={styles.detailTextGet}>
                {SecureTextControl === true ? '******' : Detail.password}
              </Text>
              <Pressable
                style={styles.secureTextButton}
                onPress={() => secureTextOnclick()}>
                <Image
                  style={styles.cardImage}
                  source={
                    SecureTextControl === true
                      ? require('../asset/eyes.png')
                      : require('../asset/eyesSc.png')
                  }
                />
              </Pressable>
            </View>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/question.png')}
              />
              <Text style={styles.detailText}>Question:</Text>
              <Text style={styles.detailTextGet}>{Detail.question}</Text>
            </View>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/answer.png')}
              />
              <Text style={styles.detailText}>Answer:</Text>
              <Text style={styles.detailTextGet}>{Detail.answer}</Text>
            </View>
            <View style={styles.detailCardContainer}>
              <Image
                style={styles.cardImage}
                source={require('../asset/note.png')}
              />
              <Text style={styles.detailText}>Note:</Text>
              <Text style={styles.detailTextGet}>{Detail.note}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 0,
    padding: '5%',
  },
  topBarAddButton: {
    borderRadius: 15,
    width: '15%',
    marginLeft: 'auto',
    marginRight: 0,
    padding: '3%',
  },
  topBarAddButtonText: {
    textAlign: 'center',
    color: '#3454D1',
    marginTop: '15%',
  },
  topBarBackButton: {
    borderRadius: 15,
    width: '20%',
    marginLeft: 0,
    marginRight: 'auto',
    padding: '3%',
  },
  topBarBackButtonText: {
    textAlign: 'center',
    color: '#3454D1',
    marginTop: '10%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    width: '80%',
    padding: '3%',
    color: '#3454D1',
    borderColor: '#3454D1',
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#EFEFEF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  circle: {
    textAlign: 'center',
    fontSize: 32,
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  title: {
    fontSize: 18,
  },
  cardDelete: {
    backgroundColor: '#D1345B',
    borderRadius: 10,
    padding: '2%',
  },
  cardDeleteText: {
    color: '#E8E9ED',
    marginTop: '10%',
  },
  scrollViewContainer: {
    marginBottom: '50%',
  },
  detailTextContainer: {
    alignItems: 'center',
  },
  detailCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    width: '80%',
    marginTop: '3%',
  },
  detailText: {
    textAlign: 'center',
    padding: '3%',
    marginTop: '3%',
    fontSize: 24,
    color: '#55A4FF',
  },
  detailTextGet: {
    textAlign: 'center',
    padding: '3%',
    marginTop: '3%',
    fontSize: 24,
  },
  secureTextButton: {
    marginTop: '5%',
    marginLeft: '3%',
  },
  cardImage: {
    marginTop: '6%',
    height: 30,
    width: 30,
    marginLeft: '4%',
  },
});

export default Home;
