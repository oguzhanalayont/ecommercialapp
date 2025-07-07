import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Star, ShoppingCart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 48) / 2;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₺{item.price}</Text>
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

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ürün Arayın"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      {/* Results */}
      <View style={styles.content}>
        {searchQuery ? (
          <>
            <Text style={styles.resultsText}>
              {filteredProducts.length} için arama sonuçları "{searchQuery}"
            </Text>
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.productsGrid}
              columnWrapperStyle={styles.productRow}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Search size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Ürün Arayın</Text>
            <Text style={styles.emptySubtitle}>
              İstediğiniz Ürünü Aramaya Başlayın
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 16,
  },
  productsGrid: {
    paddingBottom: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});