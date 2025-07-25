import '@/lib/i18n';
import { Tabs } from 'expo-router';
import { Home, List, ShoppingCart, User } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { itemCount } = useCart();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 75,
          paddingBottom: 0,
          paddingTop: 3,
        },
        tabBarActiveTintColor: '#0077b6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_home'),
          tabBarLabel: t('tab_home'),
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: t('tab_categories'),
          tabBarLabel: t('tab_categories'),
          tabBarIcon: ({ size, color }) => (
            <List size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('tab_cart'),
          tabBarLabel: t('tab_cart'),
          tabBarIcon: ({ size, color }) => (
            <View style={styles.cartIconContainer}>
              <ShoppingCart size={size} color={color} />
              {itemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab_profile'),
          tabBarLabel: t('tab_profile'),
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});
