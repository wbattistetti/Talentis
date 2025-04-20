export const uploadFile = async (file: File, documentType: string): Promise<void> => {
  // Per ora salviamo solo localmente, senza upload al server
  console.log('File would be uploaded:', { file, documentType });
  return Promise.resolve();
}; 