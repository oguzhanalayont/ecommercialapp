import '@/lib/i18n';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Background from '@/components/Background';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Background>
          <Stack
            screenOptions={{ 
              headerShown: false,
              animation: 'fade'
            }}
          >
            {/* index.tsx otomatik olarak ilk sayfa olacak */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="search" options={{ presentation: 'modal' }} />
            <Stack.Screen name="checkout" options={{ presentation: 'modal' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Background>
        <StatusBar style="auto" />
      </CartProvider>
    </AuthProvider>
  );
}