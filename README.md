AI Product Advisor - React Native Application
Overview
The AI Product Advisor is a React Native application that allows users to describe their product needs in natural language and receive intelligent, AI-powered recommendations from a curated product catalog. The application leverages Google's Gemini AI model to understand user queries and match them with the most suitable products.
Features

Natural Language Search: Users can describe their needs in plain English
AI-Powered Matching: Utilizes Google Gemini AI for intelligent product recommendations
Detailed Product Information: Comprehensive product cards with specifications and ratings
Interactive UI: Expandable product cards with smooth animations
Error Handling: Robust error handling with fallback recommendations
Responsive Design: Works seamlessly on different screen sizes

Architecture
High-Level Component Structure
App.js (Main Container)
├── SearchInput.js (User Input Interface)
├── LoadingSpinner.js (Loading State)
├── ErrorMessage.js (Error Handling)
├── RecommendationList.js (Results Container)
│   └── ProductCard.js (Individual Product Display)
└── Services
    ├── aiService.js (AI Integration)
    └── Data
        └── productCatalog.js (Product Database)
Data Flow

User Input: User enters natural language query via SearchInput component
AI Processing: Query is sent to AIService which constructs a detailed prompt
API Call: Prompt is sent to Google Gemini API with product catalog context
Response Processing: AI response is parsed and validated
Recommendation Display: Results are rendered through RecommendationList and ProductCard components
Error Handling: Any failures are caught and appropriate fallbacks are provided

Key Design Decisions
1. AI Integration Strategy

Prompt Engineering: Carefully crafted prompts that include the full product catalog and specific instructions for the AI
Structured Output: Requests AI to return JSON with specific format for consistent parsing
Fallback System: Local keyword-based matching when AI service is unavailable
Context Preservation: Sends entire product catalog with each request for accurate matching

2. State Management

React Hooks: Uses useState and useEffect for simple, effective state management
Centralized State: Main app component manages all critical application state
Error Boundaries: Comprehensive error handling at component and service levels

3. UI/UX Design Principles

Progressive Disclosure: Product cards expand to show detailed information
Visual Hierarchy: Clear ranking system with badges and score indicators
Feedback Systems: Loading states, error messages, and success indicators
Accessibility: Proper contrast ratios and semantic markup

4. Component Architecture

Separation of Concerns: Each component has a single, well-defined responsibility
Reusability: Components designed to be reusable and configurable
Props Interface: Clear, documented prop interfaces for all components
Performance: Efficient rendering with proper key props and minimal re-renders

File Structure Explanation
/components/
Contains all reusable UI components:

SearchInput.js: Handles user input with validation and submission
ProductCard.js: Displays individual product recommendations with expandable details
RecommendationList.js: Manages and displays the list of recommendations
LoadingSpinner.js: Animated loading indicator during AI processing
ErrorMessage.js: User-friendly error display with retry functionality

/services/
Business logic and external integrations:

aiService.js: Handles all AI API integration, prompt construction, and response processing

/data/
Static data and configuration:

productCatalog.js: Sample product database with comprehensive product information

Root Files

App.js: Main application component orchestrating all functionality
package.json: Dependencies and project configuration
README.md: This documentation file

Technical Implementation Details
AI Service Integration
javascript// Prompt structure includes:
- User query
- Complete product catalog
- Specific matching instructions
- Structured output format requirements
- Scoring and explanation requirements
Error Handling Strategy

Network Errors: Graceful degradation to local search
AI Response Errors: Validation and fallback parsing
User Input Errors: Validation and helpful feedback
Rate Limiting: Proper API rate limit handling

Performance Optimizations

Efficient Rendering: Uses FlatList for large datasets
Animation Optimization: Native driver for smooth animations
Memory Management: Proper cleanup of animations and listeners
Bundle Size: Minimal dependencies for optimal load times

Setup Instructions
Prerequisites

Expo CLI installed
Google Gemini API key

Installation Steps

Open snack.expo.dev
Import the project files
Update GEMINI_API_KEY in services/aiService.js
Run the application

Environment Configuration
javascript// In services/aiService.js
const GEMINI_API_KEY = 'your_actual_api_key_here';
API Integration Details
Google Gemini API

Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
Authentication: API key-based
Request Format: Structured JSON with content parts
Response Handling: Robust parsing with error fallbacks

Prompt Engineering
The application uses carefully crafted prompts that:

Provide complete context about available products
Request structured JSON responses
Include specific scoring and explanation requirements
Handle edge cases and unclear queries

Testing Strategy
Manual Testing Scenarios

Happy Path: Clear, specific product queries
Edge Cases: Vague or ambiguous queries
Error Conditions: Network failures, API errors
UI Interactions: Card expansion, loading states
Performance: Large result sets, rapid queries

Validation Points

AI response format validation
Product catalog integrity
Error message appropriateness
Loading state transitions
Animation performance

Future Enhancement Opportunities
Short Term

Product image integration
User preference learning
Search history
Favorite products

Long Term

Multiple AI model support
Real-time product data
User reviews integration
Advanced filtering options

Development Notes
Code Quality Standards

Consistent naming conventions
Comprehensive error handling
Detailed component documentation
Performance-conscious implementations

Styling Approach

Consistent color palette
Scalable typography system
Responsive design principles
Accessibility considerations



https://github.com/user-attachments/assets/ce80a772-e503-40b0-a443-983191abc452




