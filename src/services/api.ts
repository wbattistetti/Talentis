export const uploadFile = async (file: File, documentType: string): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await fetch('/.netlify/functions/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    console.log('Upload successful:', data);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 