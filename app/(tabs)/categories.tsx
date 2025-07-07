import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ShoppingCart, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { categories, products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function CategoriesScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const router = useRouter();
  const { addToCart } = useCart();

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const getTranslation = (key: string, fallback: string = '') => {
    const translation = t(key);
    return translation || fallback;
  };

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: item.color + '20' },
        selectedCategory === item.name && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.name ? null : item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon || ''}</Text>
      <Text style={[styles.categoryName, { color: item.color }]}>
        {getTranslation(`category_${item.id}`, item.name || 'Category')}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        {/* Flash Sale etiketi */}
        {item.flashSale && (
          <View style={styles.flashSaleBadge}>
            <Text style={styles.flashSaleText}>{t('flash_sale')}</Text>
          </View>
        )}

        {/* Wishlist button */}
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
            onPress={() => addToCart(item)}
          >
            <ShoppingCart size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getSectionTitle = () => {
    if (selectedCategory) {
      const category = categories.find(c => c.name === selectedCategory);
      if (category) {
        const categoryName = getTranslation(`category_${category.id}`, category.name || 'Category');
        const productsText = getTranslation('products', 'Products');
        return `${categoryName} ${productsText}`;
      }
    }
    return getTranslation('all_products', 'All Products');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{getTranslation('categories_title', 'Categories')}</Text>
          <Text style={styles.subtitle}>{getTranslation('categories_subtitle', 'Explore Products by Category')}</Text>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
            columnWrapperStyle={styles.categoryRow}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getSectionTitle()}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.productsGrid}
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
  productImageContainer: {
  position: 'relative',
},

  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  wishlistButton: {
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.69)', // yarı saydam beyaz
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
},
  categoryCard: {
    width: (width - 65) / 3,       
    aspectRatio: 1.1,              
    borderRadius: 12,              
    padding: 16,                   
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#2a93d5',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
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
  productsGrid: {
    paddingHorizontal: 20,
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
  productImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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