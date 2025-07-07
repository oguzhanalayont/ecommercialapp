import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Star, ShoppingCart, Minus, Plus } from 'lucide-react-native';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart 
              size={24} 
              color={isWishlisted ? '#2a93d5' : '#111827'} 
              fill={isWishlisted ? '#2a93d5' : 'none'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{product.category}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviews}>({product.reviews} Yorum)</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>₺{product.price}</Text>

          <View style={styles.stockContainer}>
            <View style={[styles.stockIndicator, { backgroundColor: product.inStock ? '#10B981' : '#DC2626' }]} />
            <Text style={[styles.stockText, { color: product.inStock ? '#10B981' : '#DC2626' }]}>
              {product.inStock ? 'Stokta' : 'Stok Tükendi'}
            </Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Adet</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color="#2a93d5" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color="#2a93d5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Toplam</Text>
          <Text style={styles.totalAmount}>₺{(product.price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Sepete Ekle</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  wishlistButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#0077b6',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#0077b6',
    marginBottom: 16,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    padding: 12,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginHorizontal: 24,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#0077b6',
  },
  addToCartButton: {
    backgroundColor: '#2a93d5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
});