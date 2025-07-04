import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

type Props = {
  children: ReactNode;
};

export default function Background({ children }: Props) {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
});
