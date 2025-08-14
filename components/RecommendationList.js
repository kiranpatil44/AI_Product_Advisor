// components/RecommendationList.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ProductCard from './ProductCard';

export default function RecommendationList({ recommendations, query }) {
  const renderRecommendation = ({ item, index }) => (
    <ProductCard 
      recommendation={item}
      rank={index + 1}
    />
  );

  if (!recommendations || recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <BlurView intensity={60} tint="light" style={styles.emptyCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.10)', 'rgba(255, 255, 255, 0.08)']}
            style={styles.emptyGradient}
          >
            <Text style={styles.emptyEmoji}>🤔</Text>
            <Text style={styles.emptyTitle}>No recommendations found</Text>
            <Text style={styles.emptyText}>
              Try rephrasing your search or be more specific about what you're looking for.
            </Text>
          </LinearGradient>
        </BlurView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BlurView intensity={70} tint="light" style={styles.headerCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.10)']}
            style={styles.headerGradient}
          >
            <Text style={styles.title}>🎯 Recommendations for you</Text>
            <Text style={styles.subtitle}>
              Found {recommendations.length} product{recommendations.length !== 1 ? 's' : ''} matching:
              <Text style={styles.query}> "{query}"</Text>
            </Text>
          </LinearGradient>
        </BlurView>
      </View>
            
      <FlatList
        data={recommendations}
        renderItem={renderRecommendation}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
            
      <View style={styles.footer}>
        <BlurView intensity={50} tint="light" style={styles.footerCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.06)']}
            style={styles.footerGradient}
          >
            <Text style={styles.footerText}>
              💡 Tap any product card to see detailed specifications
            </Text>
          </LinearGradient>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headerCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    fontWeight: '500',
  },
  query: {
    fontStyle: 'italic',
    color: '#ffffff',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  footerCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    width: '100%',
  },
  footerGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  emptyCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
  },
  emptyGradient: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
});