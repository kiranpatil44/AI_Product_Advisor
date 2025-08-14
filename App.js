// App.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import SearchInput from './components/SearchInput';
import RecommendationList from './components/RecommendationList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { AIService } from './services/aiService';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous floating animation
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        }),
      ])
    );
    floatingAnimation.start();

    // Pulse animation for welcome emoji
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
  }, []);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      Alert.alert('Please enter a search query', 'Describe what kind of product you\'re looking for');
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);
    setQuery(searchQuery);

    try {
      const result = await AIService.getRecommendations(searchQuery);
      setRecommendations(result.recommendations);
      setAnalysis(result.analysis);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching for products');
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setRecommendations(null);
    setError(null);
    setAnalysis('');
    setQuery('');
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const FloatingElement = ({ children, delay = 0, style }) => (
    <Animated.View
      style={[
        {
          transform: [
            { rotate: rotateInterpolate },
            { scale: scaleAnim },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Animated Background */}
      <LinearGradient
        colors={["#000000", "#1C1C1C", "#2E2E2E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      >
        <Animated.View style={[styles.backgroundPattern, { opacity: fadeAnim }]}>
          {/* Floating geometric shapes */}
          <FloatingElement style={styles.shape1}>
            <View style={styles.circle} />
          </FloatingElement>
          <FloatingElement style={styles.shape2} delay={1000}>
            <View style={styles.triangle} />
          </FloatingElement>
          <FloatingElement style={styles.shape3} delay={2000}>
            <View style={styles.square} />
          </FloatingElement>
        </Animated.View>
      </LinearGradient>

      {/* Glass Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <BlurView intensity={100} tint="light" style={styles.glassHeader}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.08)']}
            style={styles.glassOverlay}
          >
            <Animated.Text style={[styles.title, { transform: [{ scale: scaleAnim }] }]}>
              ✨ AI Product Advisor
            </Animated.Text>
            <Text style={styles.subtitle}>
              Discover perfect products with intelligent recommendations
            </Text>
          </LinearGradient>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <SearchInput 
            onSearch={handleSearch} 
            loading={loading}
            onClear={handleClearResults}
            hasResults={!!recommendations}
          />
        </Animated.View>

        {loading && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            <LoadingSpinner />
          </Animated.View>
        )}
        
        {error && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <ErrorMessage 
              message={error} 
              onRetry={() => handleSearch(query)}
            />
          </Animated.View>
        )}

        {analysis && !loading && !error && (
          <Animated.View
            style={[
              styles.analysisContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <BlurView intensity={80} tint="light" style={styles.glassCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.10)', 'rgba(255, 255, 255, 0.08)']}
                style={styles.cardGradient}
              >
                <Text style={styles.analysisTitle}>🔍 AI Analysis</Text>
                <Text style={styles.analysisText}>{analysis}</Text>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        )}

        {recommendations && !loading && !error && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <RecommendationList 
              recommendations={recommendations}
              query={query}
            />
          </Animated.View>
        )}

        {!recommendations && !loading && !error && (
          <Animated.View
            style={[
              styles.welcomeContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <BlurView intensity={60} tint="light" style={styles.welcomeCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.10)', 'rgba(255, 255, 255, 0.08)']}
                style={styles.welcomeGradient}
              >
                <Animated.Text 
                  style={[
                    styles.welcomeEmoji,
                    { transform: [{ scale: pulseAnim }] }
                  ]}
                >
                  🚀
                </Animated.Text>
                <Text style={styles.welcomeTitle}>
                  Your Personal Shopping Assistant
                </Text>
                <Text style={styles.welcomeSubtitle}>
                  Powered by AI to find exactly what you need
                </Text>
                
                <View style={styles.featureGrid}>
                  <FeatureCard 
                    icon="🎯" 
                    title="Smart Search" 
                    description="Describe in natural language"
                  />
                  <FeatureCard 
                    icon="⚡" 
                    title="Instant Results" 
                    description="Get recommendations in seconds"
                  />
                </View>

                <View style={styles.exampleSection}>
                  <Text style={styles.exampleTitle}>Try asking for:</Text>
                  <ExampleQuery text="🎧 Best noise-canceling headphones for travel" />
                  <ExampleQuery text="💻 Gaming laptop under $1500 with great graphics" />
                  <ExampleQuery text="📱 iPhone alternative with excellent camera" />
                  <ExampleQuery text="🏃 Running shoes for marathon training" />
                </View>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </TouchableOpacity>
);

const ExampleQuery = ({ text }) => (
  <TouchableOpacity style={styles.exampleQuery} activeOpacity={0.7}>
    <Text style={styles.exampleQueryText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  shape1: {
    position: 'absolute',
    top: 100,
    right: 50,
  },
  shape2: {
    position: 'absolute',
    top: 300,
    left: 30,
  },
  shape3: {
    position: 'absolute',
    bottom: 200,
    right: 80,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 25,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  square: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 5,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  glassHeader: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  glassOverlay: {
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  analysisContainer: {
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  glassCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  analysisText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    fontWeight: '500',
  },
  welcomeContainer: {
    marginVertical: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  welcomeCard: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  welcomeGradient: {
    padding: 30,
    alignItems: 'center',
  },
  welcomeEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  exampleSection: {
    width: '100%',
    alignItems: 'center',
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  exampleQuery: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  exampleQueryText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
});