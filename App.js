/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';
const temp_img = require('./src/assets/cambien-01.png');
const hum_img = require('./src/assets/cambien-02.png');
const light_img = require('./src/assets/cambien-03.png');
import database from '@react-native-firebase/database';
const App = () => {
  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);
  const [light, setLight] = useState(0);

  const [motor, setMotor] = useState(false);
  const [fertilizer, setFertilizer] = useState(false);
  const [lamp, setLamp] = useState(false);

  useEffect(() => {
    database()
      .ref('/motor')
      .on('value', snapshot => {
        setMotor(snapshot.val());
      });
  }, []);
  useEffect(() => {
    database()
      .ref('/fertilizer')
      .on('value', snapshot => {
        setFertilizer(snapshot.val());
      });
  }, []);
  useEffect(() => {
    database()
      .ref('/light_control')
      .on('value', snapshot => {
        setLamp(snapshot.val());
      });
  }, []);

  useEffect(() => {
    database()
      .ref('/temp')
      .on('value', snapshot => {
        setTemp(snapshot.val());
      });
  }, []);
  useEffect(() => {
    database()
      .ref('/hum')
      .on('value', snapshot => {
        setHum(snapshot.val());
      });
  }, []);
  useEffect(() => {
    database()
      .ref('/light')
      .on('value', snapshot => {
        setLight(snapshot.val());
      });
  }, []);
  const handleSetValue = (key, v) => {
    v = Math.round(v);
    database().ref(key).set(v);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <View style={styles.elementStatus}>
          <Text>Máy bơm</Text>
          <View
            style={[
              styles.status_led,
              {backgroundColor: motor ? '#1ED760' : '#E50914'},
            ]}
          />
        </View>
        <View style={styles.elementStatus}>
          <Text>Bón phân</Text>
          <View
            style={[
              styles.status_led,
              {backgroundColor: fertilizer ? '#1ED760' : '#E50914'},
            ]}
          />
        </View>
        <View style={styles.elementStatus}>
          <Text>Đèn vườn</Text>
          <View
            style={[
              styles.status_led,
              {backgroundColor: lamp ? '#1ED760' : '#E50914'},
            ]}
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.leftSection}>
          <Image source={temp_img} style={styles.img} />
          <Text style={styles.value}>{temp + '°C'}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.title}>Nhiệt Độ</Text>
          <Slider
            onSlidingComplete={e => {
              handleSetValue('temp', e);
            }}
            style={styles.slider}
            minimumValue={0}
            maximumValue={50}
            minimumTrackTintColor="#58a4dd"
            maximumTrackTintColor="#000000"
            thumbTintColor="#0f92f3"
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.leftSection}>
          <Image source={hum_img} style={styles.img} />
          <Text style={styles.value}>{hum + '%'}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.title}>Độ Ẩm</Text>
          <Slider
            onSlidingComplete={e => {
              handleSetValue('hum', e);
            }}
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#58a4dd"
            maximumTrackTintColor="#000000"
            thumbTintColor="#0f92f3"
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.leftSection}>
          <Image source={light_img} style={styles.img} />
          <Text style={styles.value}>{light + 'UV'}</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.title}>Độ Sáng</Text>
          <Slider
            onSlidingComplete={e => {
              handleSetValue('light', e);
            }}
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#58a4dd"
            maximumTrackTintColor="#000000"
            thumbTintColor="#0f92f3"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },

  status: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  status_led: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 1000,
  },
  section: {
    margin: 10,
    flex: 2,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'row',
  },
  slider: {},
  leftSection: {
    marginHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    color: '#000000',
    marginBottom: 20,
  },
  img: {
    width: 110,
    height: 110,
  },
  value: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
  },
});

export default App;
