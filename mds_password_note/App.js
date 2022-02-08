import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from './pages/Home';
import AddPassword from './pages/AddPassword';

const App = () => {
  const [PageControl, setPageControl] = useState(false);

  const pageControlFC = () => {
    const control = PageControl;
    if (control) {
      setPageControl(false);
    } else {
      setPageControl(true);
    }
  };

  return (
    <SafeAreaView>
      {PageControl === false ? <Home pageControlFC={pageControlFC} /> : null}
      {PageControl === true ? (
        <AddPassword pageControlFC={pageControlFC} />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
