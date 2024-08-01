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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useWindowDimensions} from 'react-native';
import SidebarModal from '../components/SidebrModal';
import BtnBack from '../components/BtnBack';
import {ecoTourism} from '../data/ecoTourism';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EcoTourismScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [discription, setDiscription] = useState('');
  const [prevName, setPrevName] = useState('');
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [newArr, setNewArr] = useState([]);
  console.log('newArr==>', newArr);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [newArr]);

  const setData = async () => {
    try {
      const data = {
        newArr,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`EcoTourismScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`EcoTourismScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewArr(parsedData.newArr);
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

  const Add = () => {
    let newItem = {
      name: prevName,
      discription: discription,
      photo: selectPhoto,
    };
    setNewArr([newItem, ...newArr]);
    setPrevName('');
    setDiscription('');
    setSelectPhoto(null);
    setAddModalIsOpen(false);
  };

  console.log('sidebarVisible==>', sidebarVisible);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          {/**BTNs block */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setSidebarVisible(true);
              }}
              style={{}}>
              <AntDesign name="bars" style={{fontSize: 50, color: '#fff'}} />
            </TouchableOpacity>

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

          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: 'center'}}>
                {newArr.map(toor => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginBottom: 20,
                        width: width * 0.9,
                        borderWidth: 3,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                      key={toor.name}
                      onPress={() => {
                        navigation.navigate('NewEcoTourismDitails', {
                          name: toor.name,
                          discription: toor.discription,
                          image: toor.photo,
                        });
                      }}>
                      <View style={{}}>
                        <Image
                          style={{
                            width: width * 0.9 - 6,
                            height: 200,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          source={{uri: toor.photo}}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            textAlign: 'center',
                          }}>
                          {toor.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {ecoTourism.map(toor => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginBottom: 20,
                        width: width * 0.9,
                        borderWidth: 3,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                      key={toor.name}
                      onPress={() => {
                        navigation.navigate('EcoTourismDitails', {
                          name: toor.name,
                          discription: toor.discription,
                          image: toor.image,
                        });
                      }}>
                      <View style={{}}>
                        <Image
                          style={{
                            width: width * 0.9 - 6,
                            height: 200,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                          }}
                          source={toor.image}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            textAlign: 'center',
                          }}>
                          {toor.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

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

                  <ScrollView>
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                      <TextInput
                        style={{
                          height: 60,
                          width: 300,
                          borderColor: '#E0DCDC',
                          color: '#fff',
                          borderWidth: 2,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          marginBottom: 20,
                          fontSize: 20,
                          backgroundColor: 'rgba(0,0,0,0.4)',
                        }}
                        multiline={true}
                        placeholder="Name..."
                        placeholderTextColor="#999"
                        onChangeText={setPrevName}
                        value={prevName}
                      />

                      <TextInput
                        style={{
                          height: 180,
                          width: 300,
                          borderColor: '#E0DCDC',
                          color: '#fff',
                          borderWidth: 2,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          marginBottom: 20,
                          fontSize: 20,
                          backgroundColor: 'rgba(0,0,0,0.4)',
                        }}
                        multiline={true}
                        placeholder="Discription..."
                        placeholderTextColor="#999"
                        onChangeText={setDiscription}
                        value={discription}
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
                            Add();
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

                    <View style={{height: 100}}></View>
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

export default EcoTourismScreen;
