// components/ErrorMessage.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <View style={styles.errorContent}>
        <Text style={styles.errorEmoji}>😔</Text>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        
        {onRetry && (
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 Tips:</Text>
          <Text style={styles.tipText}>• Check your internet connection</Text>
          <Text style={styles.tipText}>• Try rephrasing your search</Text>
          <Text style={styles.tipText}>• Make sure your query is clear and specific</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorContent: {
    backgroundColor: '#1C1C1C', // dark card
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333', // subtle border
    maxWidth: '100%',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF', // white text
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#B3B3B3', // light gray
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#FFFFFF', // white button
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  retryButtonText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: '600',
  },
  tipContainer: {
    backgroundColor: '#000000', 
    borderRadius: 12,
    padding: 16,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#333333',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 4,
    lineHeight: 18,
  },
})