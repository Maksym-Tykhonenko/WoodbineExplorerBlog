import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BtnBack from '../components/BtnBack';
import {hikingThrough} from '../data/hikingThrough';

const HikingDitails = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/rediz/bg.jpg')}
        style={{flex: 1}}>
        <View style={{position: 'relative', flex: 1}}>
          <SafeAreaView style={{}}>
            <View>
              <View style={{alignItems: 'flex-end'}}>
                {/**BTN Add */}
                <TouchableOpacity
                  onPress={() => {
                    // setAddModalIsOpen(true);
                  }}
                  style={{}}>
                  <AntDesign
                    name="pluscircleo"
                    style={{fontSize: 50, color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  {hikingThrough.map(item => {
                    return (
                      <View style={{marginTop: 20}} key={item.id}>
                        <Text style={{color: '#fff', fontSize: 22}}>
                          {item.name}:
                        </Text>
                        <Text style={{color: '#fff', fontSize: 18}}>
                          {item.discription1}
                        </Text>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 18,
                          }}>
                          {item.discription2}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={{height: 100}}></View>
              </ScrollView>
            </View>
          </SafeAreaView>

          {/**BTN Back */}
          <BtnBack navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default HikingDitails;
