import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useWindowDimensions} from 'react-native';
import BtnBack from '../components/BtnBack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uid} from 'uid';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewTravelDitails = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const place = route.params.trevel;
  console.log('place length==>', route.params);
  const [visibleDiscription, setVisibleDiscription] = useState(true);
  const [gallaryModalIsOpen, setGallaryModalIsOpen] = useState(false);
  const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState([]);
  //console.log('selectPhoto==>', selectPhoto.length);
  const [selectedData, setSelectedData] = useState('');
  const [allDatas, setAllDatas] = useState([]);
  //
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectPhoto, allDatas]);

  const setData = async () => {
    try {
      const data = {
        selectPhoto,
        allDatas,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`NewTravelDitails${place.name}`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(
        `NewTravelDitails${place.name}`,
      );
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSelectPhoto(parsedData.selectPhoto);
        setAllDatas(parsedData.allDatas);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const saveData = () => {
    setAllDatas([...allDatas, selectedData]);
    console.log('allDatas==>', allDatas);
    setSelectedData('');
    setCalendarModalIsOpen(false);
  };

  const ImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectPhoto([response.assets[0].uri, ...selectPhoto]);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <View style={{position: 'relative', flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{}}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    marginBottom: 20,
                    color: '#fff',
                    fontSize: 35,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {place.name}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: place.photo}}
                  style={{
                    marginBottom: 20,
                    width: width * 0.95,
                    height: 200,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}>
                {/**BTN Camera */}
                <TouchableOpacity
                  onPress={() => {
                    setGallaryModalIsOpen(true);
                  }}
                  style={{
                    width: width * 0.4,
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    shadowColor: '#000',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',

                    flexDirection: 'row',
                  }}>
                  <Text style={{color: '#fff', fontSize: 18, marginRight: 10}}>
                    Camera
                  </Text>
                  <AntDesign
                    name="camerao"
                    style={{fontSize: 30, color: '#fff'}}
                  />
                </TouchableOpacity>

                {/**BTN Calendar */}
                <TouchableOpacity
                  onPress={() => {
                    setCalendarModalIsOpen(true);
                  }}
                  style={{
                    width: width * 0.4,
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#fff',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    shadowColor: '#000',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: '#fff', fontSize: 18, marginRight: 10}}>
                    Calendar
                  </Text>
                  <AntDesign
                    name="calendar"
                    style={{fontSize: 30, color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Button
                  onPress={() => {
                    setVisibleDiscription(!visibleDiscription);
                  }}
                  title={
                    visibleDiscription ? 'Roll up text...' : 'Roll down text...'
                  }
                />
              </View>

              <View style={{alignItems: 'center'}}>
                {visibleDiscription && (
                  <Text style={{marginBottom: 20, color: '#fff', fontSize: 20}}>
                    {place.discription}
                  </Text>
                )}
              </View>

              {allDatas.length >= 1 && (
                <View>
                  <Text
                    style={{
                      marginBottom: 20,
                      color: '#fff',
                      fontSize: 20,
                      //textAlign: 'center',
                    }}>
                    {'  '}-When i am visited {place.name}:
                  </Text>
                  {allDatas.map(data => {
                    return (
                      <Text
                        key={uid()}
                        style={{
                          marginBottom: 5,
                          color: '#fff',
                          fontSize: 20,
                        }}>
                        {data}
                      </Text>
                    );
                  })}
                  <Text></Text>
                </View>
              )}
            </SafeAreaView>

            <View style={{height: 100}}></View>
          </ScrollView>

          {/**Madal Gallary */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={gallaryModalIsOpen}>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 20,
                borderTopStartRadius: 20,
                borderTopWidth: 3,
                backgroundColor: '#000',
              }}>
              <ImageBackground
                source={require('../assets/bcg1.jpeg')}
                style={{flex: 1}}>
                <View style={{marginTop: 50, marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/**Open Gall */}
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        ImagePicer();
                      }}>
                      <AntDesign
                        name="pluscircleo"
                        style={{fontSize: 50, color: '#fff'}}
                      />
                    </TouchableOpacity>

                    {/**Close Gall */}
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        setGallaryModalIsOpen(false);
                      }}>
                      <AntDesign
                        name="closecircleo"
                        style={{fontSize: 50, color: '#fff'}}
                      />
                    </TouchableOpacity>
                  </View>

                  <ScrollView>
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}>
                      {selectPhoto.map(photo => {
                        return (
                          <Image
                            key={uid()}
                            source={{uri: photo}}
                            style={{
                              width: width * 0.4,
                              height: width * 0.4,
                              margin: 10,
                              borderRadius: 10,
                            }}
                          />
                        );
                      })}
                    </View>
                    <View style={{height: 100}}></View>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          {/**Madal Calendar */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={calendarModalIsOpen}>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 20,
                borderTopStartRadius: 20,
                borderTopWidth: 3,
                backgroundColor: '#000',
              }}>
              <ImageBackground
                source={require('../assets/bcg1.jpeg')}
                style={{flex: 1}}>
                <View style={{marginTop: 50, marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/**Open Gall */}
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        //ImagePicer();
                      }}></TouchableOpacity>

                    {/**Close Gall */}
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        setCalendarModalIsOpen(false);
                      }}>
                      <AntDesign
                        name="closecircleo"
                        style={{fontSize: 50, color: '#fff'}}
                      />
                    </TouchableOpacity>
                  </View>

                  <ScrollView>
                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}>
                      <Calendar
                        style={{
                          width: width * 0.9,
                          height: width,
                          borderRadius: 15,
                        }}
                        onDayPress={day => {
                          setSelectedData(day.dateString);
                        }}
                        markedDates={{
                          [selectedData]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedDotColor: 'orange',
                          },
                        }}
                      />
                    </View>
                    <View style={{alignItems: 'center', marginTop: 20}}>
                      <TouchableOpacity
                        onPress={() => {
                          saveData();
                        }}
                        style={{
                          width: width * 0.4,
                          height: 60,
                          borderWidth: 1,
                          borderColor: '#fff',
                          backgroundColor: 'rgba(0,0,0,0.4)',
                          shadowColor: '#000',
                          borderRadius: 15,
                          alignItems: 'center',
                          justifyContent: 'center',

                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 28,
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{height: 100}}></View>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          {/**BTN Back */}
          <BtnBack navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default NewTravelDitails;
