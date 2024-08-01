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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {uid} from 'uid';

const NewTravelExpirianceScreen = ({navigation, route}) => {
  console.log('route==>', route.params.item.name);
  const {height, width} = useWindowDimensions();
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
      await AsyncStorage.setItem(`NewTravelExpirianceScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`NewTravelExpirianceScreen`);
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
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
          <View
            style={{
              alignItems: 'flex-end',
              marginHorizontal: 10,
            }}>
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
          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 35, fontWeight: 'bold'}}>
              {route.params.item.name}
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {advice.map(item => {
                return (
                  <View
                    key={item.id}
                    style={{
                      width: width * 0.9,
                      //height: 60,
                      padding: 5,

                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        marginRight: 10,
                      }}>
                      {' '}
                      -{item.advice}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{height: 100}}></View>
          </ScrollView>

          {/**BtnBAck */}
          <BtnBack navigation={navigation} />

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

export default NewTravelExpirianceScreen;
