/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [active, setActive] = useState(true);
  const [code, setCode] = useState('');
  const [isCopied, setCopied] = useState(false);
  const hideModal = useCallback(() => setActive(true), []);
  const copyToClipboard = useCallback(() => {
    setCopied(true);
    Clipboard.setString(code);
  }, [code]);
  const onReadedBarcode = useCallback(
    ({data}) => {
      if (active) {
        setCode(data);
        setCopied(false);
        setActive(false);
        console.warn(data);
      }
    },
    [active],
  );
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <SafeAreaView style={styles.container}>
        <Modal
          isVisible={!active}
          onBackButtonPress={hideModal}
          onBackdropPress={hideModal}
          useNativeDriver={true}>
          <View style={styles.viewModal}>
            <Text style={styles.textModal}>{code}</Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.touchModal}>
              <Text style={styles.textTouchModal}>
                {isCopied ? 'Copied' : 'Copy'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Fast Scan</Text>
        </View>
        <RNCamera
          style={styles.container}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={onReadedBarcode}>
          <BarcodeMask
            maskOpacity={0.8}
            showAnimatedLine={true}
            edgeBorderWidth={3}
            edgeColor={'gray'}
            edgeRadius={10}
            backgroundColor={'white'}
          />
        </RNCamera>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
  },
  textHeader: {fontSize: 25, fontWeight: 'bold'},
  viewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  textModal: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 20,
  },
  touchModal: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#aa00ff',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textTouchModal: {color: 'white', fontSize: 20},
});

export default App;
