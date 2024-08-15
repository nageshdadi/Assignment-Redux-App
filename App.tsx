

import React from 'react';
import { Provider } from 'react-redux';
import {
  View,
} from 'react-native';
import Shopping from './components/Shopping';
import { store } from './components/redux/store';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
    <View>
     <Shopping />
    </View>
    </Provider>
  );
}

export default App;
