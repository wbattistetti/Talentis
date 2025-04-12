import { GOOGLE_CLOUD_VISION_API_KEY } from '../config';

// Google Cloud Vision API service
const API_KEY = GOOGLE_CLOUD_VISION_API_KEY;
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export interface OcrResult {
  text: string;
  error?: string;
}

export const processImageWithGoogleVision = async (imageData: string): Promise<OcrResult> => {
  try {
    // Remove the data URL prefix to get just the base64 image data
    const base64Image = imageData.split(',')[1];
    
    // Prepare the request body for Google Cloud Vision API
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
              maxResults: 1
            }
          ],
          imageContext: {
            languageHints: ['it'] // Italian language hint for better recognition
          }
        }
      ]
    };

    // Send the request to Google Cloud Vision API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Vision API error:', errorData);
      return {
        text: '',
        error: `API error: ${errorData.error?.message || 'Unknown error'}`
      };
    }

    const data = await response.json();
    
    // Extract the text from the response
    const text = data.responses[0]?.fullTextAnnotation?.text || '';
    
    return { text };
  } catch (error) {
    console.error('Error processing image with Google Vision:', error);
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 