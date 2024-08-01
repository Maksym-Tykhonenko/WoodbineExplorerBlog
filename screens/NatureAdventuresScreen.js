import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import SidebarModal from '../components/SidebrModal';
import BtnBack from '../components/BtnBack';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {uid} from 'uid';

const NatureAdventuresScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [trevelName, setTrevelName] = useState('');
  const [newTravelExpiriance, setNewTravelExpiriance] = useState([]);
  console.log('newTravelExpiriance==>', newTravelExpiriance);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [newTravelExpiriance]);

  const setData = async () => {
    try {
      const data = {
        newTravelExpiriance,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`NatureAdventuresScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`NatureAdventuresScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewTravelExpiriance(parsedData.newTravelExpiriance);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
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
        setSelectPhoto(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const addNewTravelExpiriance = () => {
    let travekExp = {
      id: uid(),
      name: trevelName,
      photo: selectPhoto,
    };
    setNewTravelExpiriance([travekExp, ...newTravelExpiriance]);

    setTrevelName('');
    setSelectPhoto(null);
    setAddModalIsOpen(false);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            {/**BTN Sidebar */}
            <TouchableOpacity
              onPress={() => {
                setSidebarVisible(true);
              }}
              style={{}}>
              <AntDesign name="bars" style={{fontSize: 50, color: '#fff'}} />
            </TouchableOpacity>

            {/**BTN Add */}
            <TouchableOpacity
              onPress={() => {
                setAddModalIsOpen(true);
              }}
              style={{}}>
              <AntDesign
                name="pluscircleo"
                style={{fontSize: 50, color: '#fff'}}
              />
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {newTravelExpiriance.map(travel => {
                return (
                  <TouchableOpacity
                    key={travel.id}
                    onPress={() => {
                      navigation.navigate('NewTravelExpirianceScreen', {
                        item: travel,
                      });
                    }}
                    style={{
                      width: width * 0.8,
                      height: 250,
                      borderWidth: 3,
                      borderColor: '#fff',
                      alignItems: 'center',
                      //justifyContent: 'center',
                      borderRadius: 10,
                      marginBottom: 20,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      shadowColor: '#000',
                    }}>
                    <Image
                      style={{
                        height: 210,
                        width: width * 0.8 - 6,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderWidth: 3,
                        borderColor: '#fff',
                      }}
                      source={{uri: travel.photo}}
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      {travel.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NatureAdventuresDitalsScreen');
                }}
                style={{
                  width: width * 0.8,
                  height: 250,
                  borderWidth: 3,
                  borderColor: '#fff',
                  alignItems: 'center',
                  //justifyContent: 'center',
                  borderRadius: 10,
                  marginBottom: 20,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  shadowColor: '#000',
                }}>
                <Image
                  style={{
                    height: 210,
                    width: width * 0.8 - 6,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 3,
                    borderColor: '#fff',
                  }}
                  source={require('../assets/extremalCamp1.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'center',
                  }}>
                  Extreme Camping
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CyclingDitails');
                }}
                style={{
                  width: width * 0.8,
                  height: 250,
                  borderWidth: 3,
                  borderColor: '#fff',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginBottom: 20,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  shadowColor: '#000',
                }}>
                <Image
                  style={{
                    height: 210,
                    width: width * 0.8 - 6,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 3,
                    borderColor: '#fff',
                  }}
                  source={require('../assets/cycling.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'center',
                  }}>
                  Cycling Travel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HikingDitails');
                }}
                style={{
                  width: width * 0.8,
                  height: 250,
                  borderWidth: 3,
                  borderColor: '#fff',
                  alignItems: 'center',
                  //justifyContent: 'center',
                  borderRadius: 10,
                  marginBottom: 20,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  shadowColor: '#000',
                }}>
                <Image
                  style={{
                    height: 210,
                    width: width * 0.8 - 6,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 3,
                    borderColor: '#fff',
                  }}
                  source={require('../assets/hiking.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'center',
                  }}>
                  Hiking Through Time
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ArroundDitails');
                }}
                style={{
                  width: width * 0.8,
                  height: 280,
                  borderWidth: 3,
                  borderColor: '#fff',
                  alignItems: 'center',
                  //justifyContent: 'center',
                  borderRadius: 10,
                  marginBottom: 20,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  shadowColor: '#000',
                }}>
                <Image
                  style={{
                    height: 210,
                    width: width * 0.8 - 6,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderWidth: 3,
                    borderColor: '#fff',
                  }}
                  source={require('../assets/arround.png')}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    textAlign: 'center',
                  }}>
                  Around the world on two wheels
                </Text>
              </TouchableOpacity>

              <View style={{height: 100}}></View>
            </ScrollView>
          </View>

          {/**BtnBAck */}
          <BtnBack navigation={navigation} />

          {/**Sidebar Modal */}
          <SidebarModal
            navigation={navigation}
            isOpen={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            name={route.name}
          />

          {/**Add Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={addModalIsOpen}>
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
                  <View style={{alignItems: 'flex-end'}}>
                    {/**CLOCE MODAL */}
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        setAddModalIsOpen(false);
                      }}>
                      <AntDesign
                        name="closecircleo"
                        style={{fontSize: 50, color: '#fff'}}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{marginTop: 20, alignItems: 'center'}}>
                    <TextInput
                      style={{
                        height: 90,
                        width: 300,
                        borderColor: '#E0DCDC',
                        color: '#fff',
                        borderWidth: 2,
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        //marginTop: 10,
                        marginBottom: 20,
                        fontSize: 20,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                      }}
                      multiline={true}
                      placeholder="..."
                      placeholderTextColor="#999"
                      onChangeText={setTrevelName}
                      value={trevelName}
                    />

                    {/**Photo */}
                    {!selectPhoto ? (
                      <TouchableOpacity
                        onPress={() => {
                          ImagePicer();
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
                            fontSize: 18,
                            marginRight: 10,
                          }}>
                          Add photo
                        </Text>
                        <AntDesign
                          name="camerao"
                          style={{fontSize: 30, color: '#fff'}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          ImagePicer();
                        }}
                        style={{
                          width: 300,
                          height: 180,
                        }}>
                        <Image
                          style={{width: 300, height: 180, borderRadius: 15}}
                          source={{uri: selectPhoto}}
                        />
                      </TouchableOpacity>
                    )}

                    {/**BTN SAVE */}
                    <View style={{alignItems: 'center', marginTop: 20}}>
                      <TouchableOpacity
                        onPress={() => {
                          addNewTravelExpiriance();
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
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default NatureAdventuresScreen;
