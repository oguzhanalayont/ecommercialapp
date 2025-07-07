import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Star, Heart, ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Vibration } from 'react-native';


const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();

  const getTranslation = (key: string, fallback: string = '') => {
    const translation = t(key);
    return translation || fallback;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredProducts = products.slice(0, 4);

  const campaigns = [
    require('@/assets/campaign1.png'),
    require('@/assets/campaign2.png'),
    require('@/assets/campaign3.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % campaigns.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    Vibration.vibrate(20); // 40ms titreşim
  };

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

          {/* Flash Sale etiketi */}
  {item.flashSale && (
    <View style={styles.flashSaleBadge}>
      <Text style={styles.flashSaleText}>{t('flash_sale')}</Text>
    </View>
  )}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(item.id)}
        >
          <Heart
            size={18}
            color={wishlist.includes(item.id) ? '#2a93d5' : '#9CA3AF'}
            fill={wishlist.includes(item.id) ? '#2a93d5' : 'none'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {getTranslation(`product_${item.id}`, item.name || 'Product')}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating || '0'}</Text>
          <Text style={styles.reviews}>({item.reviews || '0'})</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₺{item.price || '0'}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item)}
          >
            <ShoppingCart size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Sabit Header */}
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <Image source={require('@/assets/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={() => router.push({ pathname: '/search' })}>
            <Search size={24} color="#111827" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingTop: 44,
    paddingBottom: 0,
  }}
      >
        {/* Kampanya Slider */}
        <View style={{ marginBottom: 8 }}>
  <FlatList
    ref={flatListRef}
    data={campaigns}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item }) => (
      <Image
        source={item}
        style={styles.campaignImage}
      />
    )}
    onMomentumScrollEnd={(event) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / width
      );
      setCurrentIndex(index);
    }}
  />
</View>

{/* Featured Products */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>
    {getTranslation('featured_products', 'Featured Products')}
  </Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View style={styles.featuredContainer}>
      {featuredProducts.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.featuredCard}
          onPress={() =>
            router.push({
              pathname: '/product/[id]',
              params: { id: product.id },
            })
          }
        >
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: product.image }}
              style={styles.featuredImage}
            />

            {/* Flash Sale etiketi */}
            {product.flashSale && (
              <View style={styles.flashSaleBadge}>
                <Text style={styles.flashSaleText}>
                  {getTranslation('flash_sale', 'Flaş İndirim')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.featuredInfo}>
            <Text style={styles.featuredName} numberOfLines={1}>
              {getTranslation(`product_${product.id}`, product.name || 'Product')}
            </Text>
            <Text style={styles.featuredPrice}>₺{product.price || '0'}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
</View>
        {/* All Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getTranslation('all_products', 'All Products')}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={[
    styles.productsGrid,
    { paddingBottom: 0, marginBottom: 0 }
  ]}
            columnWrapperStyle={styles.productRow}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },

  headerContainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  paddingHorizontal: 20,
  paddingTop: 24,
  paddingBottom: 0,
  backgroundColor: '#F9FAFB',
  elevation: 1, // Android gölgesi
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

campaignImage: {
  width: width - 20,
  height: 150,
  resizeMode: 'cover',
  borderRadius: 12,
  marginHorizontal: 10,
},



  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  flashSaleBadge: {
  position: 'absolute',
  top: 8,
  left: 8,
  backgroundColor: '#2a93d5',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 4,
  zIndex: 2,
},
flashSaleText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
},

  headerText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  filterButtonContainer: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },

  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 20,
    marginBottom: 16,
  },
  featuredContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0077b6',
  },
  productsGrid: {
    paddingHorizontal: 20,
      paddingBottom: 0,
      marginBottom: 0,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: PRODUCT_WIDTH,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'srgba(255, 255, 255, 0.69)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0077b6',
  },
  addToCartButton: {
    backgroundColor: '#2a93d5',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});