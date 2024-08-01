import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BtnBack = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{position: 'absolute', bottom: 10, right: 10}}>
      <AntDesign name="arrowleft" style={{fontSize: 50, color: '#fff'}} />
    </TouchableOpacity>
  );
};

export default BtnBack;
