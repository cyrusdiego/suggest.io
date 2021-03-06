import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { baseStyles } from './style';

type Props = {
  handleMatchButton: () => void;
  handleMenuButton: () => void;
};
export const MainHeader: FC<Props> = ({
  handleMatchButton,
  handleMenuButton,
}) => {
  return (
    <View style={styles.header_container}>
      <TouchableOpacity style={styles.button_left} onPress={handleMenuButton}>
        <SvgUri source={require('../assets/menu_black_24dp.svg')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_right} onPress={handleMatchButton}>
        <SvgUri source={require('../assets/local_activity_black_24dp.svg')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    button_left: {
      marginRight: 125,
    },
    button_right: {
      marginLeft: 125,
    },
  }),
};
