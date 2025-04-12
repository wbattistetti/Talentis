// Configuration file for API keys and other settings
// In a production environment, these should be stored in environment variables

// Utilizzo della variabile d'ambiente per la chiave API di Google Cloud Vision
export const GOOGLE_CLOUD_VISION_API_KEY = import.meta.env.VITE_GOOGLE_VISION || '';

// IMPORTANT: Replace this with your actual Google Cloud Vision API key
// To get an API key:
// 1. Go to https://console.cloud.google.com/
// 2. Create a project or select an existing one
// 3. Enable the Vision API in the API Library
// 4. Create an API key in the Credentials section 