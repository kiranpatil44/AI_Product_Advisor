// components/ProductCard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function ProductCard({ recommendation, rank }) {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const { product, matchScore, reason, highlights } = recommendation;

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    setExpanded(!expanded);
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const getScoreColor = (score) => {
    if (score >= 90) return ['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.25)'];
    if (score >= 80) return ['rgba(255, 255, 255, 0.30)', 'rgba(255, 255, 255, 0.20)'];
    if (score >= 70) return ['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)'];
    return ['rgba(255, 255, 255, 0.20)', 'rgba(255, 255, 255, 0.10)'];
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const getRankDisplay = (rank) => {
    const badges = ['🥇', '🥈', '🥉'];
    return badges[rank - 1] || `#${rank}`;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleExpanded}
      activeOpacity={0.95}
    >
      <BlurView intensity={80} tint="light" style={styles.glassCard}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.12)']}
          style={styles.cardGradient}
        >
          <View style={styles.header}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{getRankDisplay(rank)}</Text>
            </View>
            
            <View style={styles.titleSection}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.categoryContainer}>
                <BlurView intensity={60} tint="light" style={styles.categoryBlur}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.20)', 'rgba(255, 255, 255, 0.15)']}
                    style={styles.categoryGradient}
                  >
                    <Text style={styles.category}>{product.category}</Text>
                  </LinearGradient>
                </BlurView>
              </View>
            </View>
            
            <View style={styles.scoreSection}>
              <View style={styles.scoreBadgeContainer}>
                <BlurView intensity={70} tint="light" style={styles.scoreBlur}>
                  <LinearGradient
                    colors={getScoreColor(matchScore)}
                    style={styles.scoreBadge}
                  >
                    <Text style={styles.scoreText}>{matchScore}%</Text>
                  </LinearGradient>
                </BlurView>
              </View>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
            </View>
          </View>

          <View style={styles.reasonContainer}>
            <BlurView intensity={50} tint="light" style={styles.reasonBlur}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.08)']}
                style={styles.reasonGradient}
              >
                <Text style={styles.reasonTitle}>💭 Why this matches:</Text>
                <Text style={styles.reasonText}>{reason}</Text>
              </LinearGradient>
            </BlurView>
          </View>

          <View style={styles.highlightsContainer}>
            <Text style={styles.highlightsTitle}>✨ Key highlights:</Text>
            <View style={styles.highlightsList}>
              {highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightItem}>
                  <Text style={styles.highlightBullet}>•</Text>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </View>

          <Animated.View 
            style={[
              styles.expandedContent,
              {
                maxHeight: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 400],
                }),
                opacity: animation,
              }
            ]}
          >
            <View style={styles.detailsContainer}>
              <BlurView intensity={40} tint="light" style={styles.detailsBlur}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.06)']}
                  style={styles.detailsGradient}
                >
                  <Text style={styles.detailsTitle}>📋 Specifications:</Text>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <View key={key} style={styles.specRow}>
                      <Text style={styles.specKey}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                      <Text style={styles.specValue}>{value}</Text>
                    </View>
                  ))}
                  
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {product.rating}</Text>
                    <Text style={styles.reviews}>({product.reviews.toLocaleString()} reviews)</Text>
                  </View>
                  
                  <Text style={styles.description}>{product.description}</Text>
                </LinearGradient>
              </BlurView>
            </View>
          </Animated.View>

          <View style={styles.expandIndicator}>
            <Text style={styles.expandText}>
              {expanded ? '🔽 Tap to collapse' : '🔼 Tap for details'}
            </Text>
          </View>
        </LinearGradient>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  cardGradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rankBadge: {
    marginRight: 12,
    marginTop: 4,
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleSection: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryBlur: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryGradient: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  category: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  scoreSection: {
    alignItems: 'flex-end',
  },
  scoreBadgeContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 6,
  },
  scoreBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  reasonContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  reasonBlur: {
    borderRadius: 12,
    overflow: 'hidden',
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(255, 255, 255, 0.4)',
  },
  reasonGradient: {
    padding: 14,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  reasonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    fontWeight: '500',
  },
  highlightsContainer: {
    marginBottom: 16,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  highlightsList: {
    gap: 6,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  highlightBullet: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  highlightText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    flex: 1,
    lineHeight: 20,
    fontWeight: '500',
  },
  expandedContent: {
    overflow: 'hidden',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsBlur: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  detailsGradient: {
    padding: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  specKey: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'right',
    flex: 1,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  reviews: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  expandIndicator: {
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  expandText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
});