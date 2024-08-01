import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {uid} from 'uid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SidebarModal from '../components/SidebrModal';
import BtnBack from '../components/BtnBack';
import {useWindowDimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [prevName, setPrevName] = useState('');
  const [name, setName] = useState('');
  const [gallaryModalIsOpen, setGallaryModalIsOpen] = useState(false);
  const [calendarModalIsOpen, setCalendarModalIsOpen] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [allDatas, setAllDatas] = useState([]);
  console.log('allDatas==>', allDatas);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [allDatas, selectPhoto, name, selectAvatar]);

  const setData = async () => {
    try {
      const data = {
        allDatas,
        selectPhoto,
        name,
        selectAvatar,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAllDatas(parsedData.allDatas);
        setSelectPhoto(parsedData.selectPhoto);
        setName(parsedData.name);
        setSelectAvatar(parsedData.selectAvatar);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const AvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const SaveName = () => {
    if (prevName !== '') {
      setName(prevName);
      setPrevName('');
    }
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

  const SaveData = () => {
    if (placeName !== '' && selectedData !== '') {
      let data = {
        name: placeName,
        calendar: selectedData,
      };
      setAllDatas([...allDatas, data]);
      console.log('allDatas==>', allDatas);
      setSelectedData('');
      setPlaceName('');
      setCalendarModalIsOpen(false);
    } else return Alert.alert('Fill all data');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                setSidebarVisible(true);
              }}
              style={{}}>
              <AntDesign name="bars" style={{fontSize: 50, color: '#fff'}} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={{alignItems: 'center'}}>
              {/**Avatar */}
              <View>
                {!selectAvatar ? (
                  <TouchableOpacity
                    onPress={() => {
                      AvatarPicer();
                    }}
                    style={{
                      width: 250,
                      height: 250,
                      borderWidth: 7,
                      borderColor: 'red',
                      borderRadius: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#fff',
                      shadowOpacity: 5,
                      shadowRadius: 10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      elevation: 10,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                    }}>
                    <Image
                      style={{width: 180, height: 180, color: '#fff'}}
                      source={require('../assets/free-icon-user-12384496.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      AvatarPicer();
                    }}
                    style={{
                      width: 250,
                      height: 250,
                      borderWidth: 7,
                      borderColor: 'red',
                      borderRadius: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#fff',
                      shadowOpacity: 5,
                      shadowRadius: 10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      elevation: 10,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                    }}>
                    <Image
                      style={{
                        width: 235,
                        height: 235,
                        color: '#fff',
                        borderRadius: 150,
                      }}
                      source={{uri: selectAvatar}}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/**Name */}
              {!name ? (
                <View
                  style={{
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    style={{
                      height: 60,
                      width: width * 0.75,
                      borderColor: '#fff',
                      color: '#fff',
                      borderWidth: 3,
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      //marginTop: 10,
                      marginBottom: 20,
                      fontSize: 20,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                    }}
                    placeholder="Name..."
                    placeholderTextColor="#999"
                    onChangeText={setPrevName}
                    value={prevName}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      SaveName();
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      borderWidth: 3,
                      borderColor: '#fff',
                      borderRadius: 15,
                      marginTop: -20,
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Entypo
                      name="check"
                      style={{fontSize: 40, color: '#fff'}}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 35,
                      fontWeight: 'bold',
                      shadowColor: '#fff',
                      shadowOpacity: 5,
                      shadowRadius: 10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      elevation: 10,
                    }}>
                    {name}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginTop: -30,
                      shadowColor: '#fff',
                      shadowOpacity: 5,
                      shadowRadius: 10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      elevation: 10,
                    }}
                    onPress={() => {
                      setName('');
                    }}>
                    <AntDesign
                      name="edit"
                      style={{
                        fontSize: 30,
                        color: '#fff',
                        marginLeft: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/** BTNs block*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginBottom: 10,
                marginTop: 10,
              }}>
              {/**BTN Camera */}
              <TouchableOpacity
                onPress={() => {
                  setGallaryModalIsOpen(true);
                }}
                style={{
                  width: width * 0.4,
                  height: 60,
                  marginLeft: 15,
                  borderWidth: 3,
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
                  marginRight: 15,
                  borderWidth: 3,
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
            <ScrollView
              horizontal={true}
              alwaysBounceHorizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                {allDatas.map(({name, calendar}) => {
                  return (
                    <View
                      key={uid()}
                      style={{
                        marginRight: 10,
                        borderWidth: 3,
                        borderColor: '#fff',
                        borderRadius: 10,
                        padding: 10,
                        width: width * 0.4,
                        height: 150,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          textAlign: 'center',
                        }}>
                        Visited {name}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          textAlign: 'center',
                        }}>
                        on the {calendar}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View style={{height: 100}}></View>
          </ScrollView>

          {/**BtnBAck */}
          <BtnBack navigation={navigation} />

          {/**Sidebar Modal */}
          <SidebarModal
            navigation={navigation}
            isOpen={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            name={route.name}
          />

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
                    <View style={{height: 200}}></View>
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
                      <TextInput
                        style={{
                          height: 60,
                          width: width * 0.9,
                          borderColor: '#fff',
                          color: '#fff',
                          borderWidth: 3,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          //marginTop: 10,
                          marginBottom: 20,
                          fontSize: 20,
                          backgroundColor: 'rgba(0,0,0,0.4)',
                        }}
                        placeholder="Place name..."
                        placeholderTextColor="#999"
                        onChangeText={setPlaceName}
                        value={placeName}
                      />
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
                          SaveData();
                        }}
                        style={{
                          width: width * 0.4,
                          height: 60,
                          borderWidth: 3,
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
                    <View style={{height: 200}}></View>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
