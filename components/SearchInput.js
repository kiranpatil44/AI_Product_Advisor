// components/SearchInput.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function SearchInput({ onSearch, loading, onClear, hasResults }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() && !loading) {
      Keyboard.dismiss();
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClear();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <BlurView intensity={80} tint="light" style={styles.glassInput}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.10)']}
            style={styles.inputGradient}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Describe what you're looking for..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              multiline={false}
              editable={!loading}
            />
          </LinearGradient>
        </BlurView>
      </View>
            
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.searchButton,
            (!inputValue.trim() || loading) && styles.searchButtonDisabled
          ]}
          onPress={handleSearch}
          disabled={!inputValue.trim() || loading}
          activeOpacity={0.8}
        >
          <BlurView intensity={60} tint="light" style={styles.buttonBlur}>
            <LinearGradient
              colors={
                (!inputValue.trim() || loading) 
                  ? ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.05)']
                  : ['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.20)']
              }
              style={styles.buttonGradient}
            >
              <Text style={[
                styles.searchButtonText,
                (!inputValue.trim() || loading) && styles.searchButtonTextDisabled
              ]}>
                {loading ? '⏳ Searching...' : '🔍 Find Products'}
              </Text>
            </LinearGradient>
          </BlurView>
        </TouchableOpacity>
                
        {hasResults && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.8}
          >
            <BlurView intensity={60} tint="light" style={styles.buttonBlur}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.15)']}
                style={styles.buttonGradient}
              >
                <Text style={styles.clearButtonText}>✕ Clear Results</Text>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  glassInput: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputGradient: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  textInput: {
    fontSize: 16,
    color: '#ffffff',
    minHeight: 24,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  searchButtonDisabled: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonBlur: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
    textShadowColor: 'transparent',
  },
  clearButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});