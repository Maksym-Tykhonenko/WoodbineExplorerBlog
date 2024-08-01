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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {touristAdvice} from '../data/touristAdvice';
import {uid} from 'uid';

const TouristAdviceScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [discription, setDiscription] = useState('');
  const [advice, setAdvice] = useState([]);
  console.log('advice==>', advice);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [advice]);

  const setData = async () => {
    try {
      const data = {
        advice,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`TouristAdviceScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`TouristAdviceScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAdvice(parsedData.advice);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const Add = () => {
    setAdvice([...advice, {id: uid(), advice: discription}]);
    setDiscription('');
    setAddModalIsOpen(false);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
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
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: width * 0.9, height: 200}}
                  source={require('../assets/touristAdvice.png')}
                />
              </View>

              <View>
                {advice.map(tourist => {
                  return (
                    <View style={{marginTop: 20}} key={uid()}>
                      <Text style={{fontSize: 20, color: '#fff'}}>
                        {' '}
                        -{tourist.advice}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View>
                {touristAdvice.map(tourist => {
                  return (
                    <View style={{marginTop: 20}} key={uid()}>
                      <Text style={{fontSize: 20, color: '#fff'}}>
                        {' '}
                        -{tourist.discription}
                      </Text>
                    </View>
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

                  <View style={{marginTop: 20, alignItems: 'center'}}>
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
                      multiline={true}
                      placeholder="Discription..."
                      placeholderTextColor="#999"
                      onChangeText={setDiscription}
                      value={discription}
                    />

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
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default TouristAdviceScreen;
