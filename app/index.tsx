import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('Splash screen yüklendi');
    
    const timer = setTimeout(() => {
      console.log('Tabs\'a yönlendiriliyor...');
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.splashImage}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashImage: {
    width: width,
    height: height,
  },
});