import { createClient } from '@supabase/supabase-js';

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Parse the multipart form data
    const formData = new FormData();
    const boundary = event.headers['content-type'].split('boundary=')[1];
    const parts = event.body.split(boundary);
    
    let file = null;
    let documentType = null;

    for (const part of parts) {
      if (part.includes('Content-Disposition: form-data; name="file"')) {
        const fileData = part.split('\r\n\r\n')[1];
        file = Buffer.from(fileData, 'base64');
      } else if (part.includes('Content-Disposition: form-data; name="documentType"')) {
        documentType = part.split('\r\n\r\n')[1].trim();
      }
    }

    if (!file || !documentType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing file or document type' }),
      };
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`${documentType}/${Date.now()}.jpg`, file, {
        contentType: 'image/jpeg',
      });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        path: data.path 
      }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' }),
    };
  }
}; 