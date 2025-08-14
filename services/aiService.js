// services/aiService.js
import { PRODUCT_CATALOG } from '../data/productCatalog';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export class AIService {
  static generatePrompt(userQuery) {
    const catalogString = JSON.stringify(PRODUCT_CATALOG, null, 2);
    
    return `You are an AI Product Advisor. A user has described their needs, and you need to recommend the best products from the available catalog.

USER QUERY: "${userQuery}"

AVAILABLE PRODUCTS:
${catalogString}

INSTRUCTIONS:
1. Analyze the user's query and identify their key requirements (price range, features, category, use case, etc.)
2. Match these requirements against the product catalog
3. Recommend the TOP 3 most suitable products
4. For each recommendation, provide a clear explanation of WHY it matches their needs
5. Consider factors like price-to-value ratio, feature alignment, and user context

RESPONSE FORMAT:
Return your response as a valid JSON object with this structure:
{
  "analysis": "Brief analysis of the user's needs",
  "recommendations": [
    {
      "productId": number,
      "matchScore": number (0-100),
      "reason": "Detailed explanation of why this product fits their needs",
      "highlights": ["key feature 1", "key feature 2", "key feature 3"]
    }
  ]
}

Important: Respond ONLY with the JSON object, no additional text before or after.`;
  }

  static async getRecommendations(userQuery) {
    console.log('🚀 Starting AI request for:', userQuery);
    console.log('🔑 API Key status:', GEMINI_API_KEY ? 'Present' : 'MISSING!');
    
    try {
      const prompt = this.generatePrompt(userQuery);
      
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });


      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response format from AI service');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      
      let parsedResponse;
      try {
        const cleanResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
        parsedResponse = JSON.parse(cleanResponse);
      } catch (parseError) {
        console.error('❌ Failed to parse AI response:', aiResponse);
        console.error('Parse error:', parseError);
        throw new Error('AI returned invalid JSON format');
      }

      if (!parsedResponse.recommendations || !Array.isArray(parsedResponse.recommendations)) {
        console.error('❌ AI response missing recommendations array');
        throw new Error('AI response missing recommendations array');
      }

      const enrichedRecommendations = parsedResponse.recommendations.map(rec => {
        const product = PRODUCT_CATALOG.find(p => p.id === rec.productId);
        if (!product) {
          console.warn(`⚠️ Product with ID ${rec.productId} not found in catalog`);
          return null;
        }
        
        return {
          ...rec,
          product: product
        };
      }).filter(Boolean); 

      console.log('🎯 Final recommendations:', enrichedRecommendations.length);

      return {
        analysis: parsedResponse.analysis,
        recommendations: enrichedRecommendations
      };

    } catch (error) {
      console.error('💥 AI Service Error:', error);
      
      if (error.message.includes('API request failed') || error.message.includes('fetch')) {
        return this.getFallbackRecommendations(userQuery);
      }
      
      throw error;
    }
  }

  static getFallbackRecommendations(userQuery) {
    
    const query = userQuery.toLowerCase();
    let filteredProducts = [...PRODUCT_CATALOG];
    
    // Simple keyword matching
    if (query.includes('laptop') || query.includes('computer')) {
      filteredProducts = filteredProducts.filter(p => p.category === 'Laptop');
    } else if (query.includes('phone') || query.includes('smartphone')) {
      filteredProducts = filteredProducts.filter(p => p.category === 'Smartphone');
    } else if (query.includes('tablet') || query.includes('ipad')) {
      filteredProducts = filteredProducts.filter(p => p.category === 'Tablet');
    } else if (query.includes('headphone') || query.includes('audio')) {
      filteredProducts = filteredProducts.filter(p => p.category === 'Headphones');
    }
    
    const topProducts = filteredProducts
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    
    return {
      analysis: "AI service is temporarily unavailable. Showing highly-rated products based on keyword matching.",
      recommendations: topProducts.map((product, index) => ({
        productId: product.id,
        matchScore: 85 - (index * 5), // Decreasing scores
        reason: `This is a highly-rated ${product.category.toLowerCase()} with excellent features that may match your needs.`,
        highlights: product.features.slice(0, 3),
        product: product
      }))
    };
  }
}