import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SidebarModal from '../components/SidebrModal';
import {travel} from '../data/travel';
import {uid} from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TravelsScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [initialTravels, setInitialTravels] = useState(travel);
  const [selectPhoto, setSelectPhoto] = useState(null);
  //console.log('selectPhoto==>', selectPhoto);
  const [trevel, setTrevel] = useState('');
  const [description, setDescription] = useState('');
  const [newTravels, setNewTravels] = useState([]);
  console.log('newTravels==>', newTravels);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectPhoto, newTravels]);

  const setData = async () => {
    try {
      const data = {
        selectPhoto,
        newTravels,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`TravelsScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`TravelsScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSelectPhoto(parsedData.selectPhoto);
        setNewTravels(parsedData.newTravels);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const addNewTravel = () => {
    let newItem = {
      id: uid(),
      name: trevel,
      discription: description,
      photo: selectPhoto,
    };
    setNewTravels([...newTravels, newItem]);

    setTrevel('');
    setDescription('');
    setSelectPhoto(null);

    setAddModalIsOpen(false);
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

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <ScrollView>
              {newTravels.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('NewTravelDitails', {trevel: item});
                    }}
                    style={{
                      width: width * 0.8,
                      height: 80,
                      borderWidth: 3,
                      borderColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginBottom: 20,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      shadowColor: '#000',
                    }}
                    key={item.id}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {travel.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TravelDitails', {trevel: item});
                    }}
                    style={{
                      width: width * 0.8,
                      height: 80,
                      borderWidth: 3,
                      borderColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginBottom: 20,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      shadowColor: '#000',
                    }}
                    key={item.id}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{height: 100}}></View>
            </ScrollView>
          </View>

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
                        height: 60,
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
                      placeholder="Location..."
                      placeholderTextColor="#999"
                      onChangeText={setTrevel}
                      value={trevel}
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
                        //marginTop: 10,
                        marginBottom: 20,
                        fontSize: 20,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                      }}
                      placeholder="Discription..."
                      placeholderTextColor="#999"
                      multiline={true}
                      onChangeText={setDescription}
                      value={description}
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
                          addNewTravel();
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

export default TravelsScreen;
