import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SidebarModal = ({isOpen, onClose, navigation, name}) => {
  //console.log('name==>', name);

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View
        style={{
          flex: 1,
          marginRight: '30%',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: '#000',
        }}>
        <ImageBackground style={{flex: 1}}>
          <View style={{marginTop: 50, marginLeft: 10}}>
            <View style={{alignItems: 'flex-end'}}>
              {/**CLOCE MODAL */}
              <TouchableOpacity style={{marginRight: 10}} onPress={onClose}>
                <AntDesign
                  name="arrowleft"
                  style={{fontSize: 50, color: '#fff'}}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20}}>
              {/**ProfileScreen */}
              <TouchableOpacity
                style={{
                  width: 160,
                  marginBottom: 40,
                  borderColor: '#f70000',
                  borderBottomWidth: name === 'ProfileScreen' && 3,
                }}
                onPress={() => {
                  onClose();
                  navigation.navigate('ProfileScreen');
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>

              {/**TravelsScreen */}
              <TouchableOpacity
                style={{
                  width: 160,
                  marginBottom: 40,
                  borderColor: '#f70000',
                  borderBottomWidth: name === 'TravelsScreen' && 3,
                }}
                onPress={() => {
                  onClose();
                  navigation.navigate('TravelsScreen');
                  //setSidebarVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Travels
                </Text>
              </TouchableOpacity>

              {/**NatureAdventuresScreen */}
              <TouchableOpacity
                style={{
                  width: 160,
                  marginBottom: 40,
                  borderColor: '#f70000',
                  borderBottomWidth: name === 'NatureAdventuresScreen' && 3,
                }}
                onPress={() => {
                  onClose();
                  navigation.navigate('NatureAdventuresScreen');
                  //setSidebarVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Nature Adventures
                </Text>
              </TouchableOpacity>

              {/**TouristAdviceScreen */}
              <TouchableOpacity
                style={{
                  width: 160,
                  marginBottom: 40,
                  borderColor: '#f70000',
                  borderBottomWidth: name === 'TouristAdviceScreen' && 3,
                }}
                onPress={() => {
                  onClose();
                  navigation.navigate('TouristAdviceScreen');
                  //setSidebarVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Tourist Advice
                </Text>
              </TouchableOpacity>

              {/**EcoTourismScreen */}
              <TouchableOpacity
                style={{
                  width: 160,
                  marginBottom: 40,
                  borderColor: '#f70000',
                  borderBottomWidth: name === 'EcoTourismScreen' && 3,
                }}
                onPress={() => {
                  onClose();
                  navigation.navigate('EcoTourismScreen');
                  //setSidebarVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}>
                  Eco Tourism
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default SidebarModal;
