import React, { useState } from 'react';
import { DocumentSelection } from './IDCheck/DocumentSelection';
import { BiometricVerification } from './BiometricVerification/BiometricVerification';
import { BiometricIntroDialog } from './BiometricVerification/components/BiometricIntroDialog';

interface VerificationFlowProps {
  onComplete: (data: any) => void;
  onCancel: () => void;
  translations: any;
}

export const VerificationFlow: React.FC<VerificationFlowProps> = ({
  onComplete,
  onCancel,
  translations
}) => {
  const [showBiometricIntro, setShowBiometricIntro] = useState(false);
  const [showBiometricVerification, setShowBiometricVerification] = useState(false);
  const [documentsData, setDocumentsData] = useState<any>(null);

  const handleDocumentsComplete = (data: any) => {
    setDocumentsData(data);
    setShowBiometricIntro(true);
  };

  const handleBiometricComplete = (biometricData: any) => {
    onComplete({
      documents: documentsData,
      biometric: biometricData
    });
  };

  if (showBiometricVerification) {
    return (
      <BiometricVerification
        onComplete={handleBiometricComplete}
        onCancel={() => setShowBiometricVerification(false)}
      />
    );
  }

  return (
    <>
      <DocumentSelection
        onCancel={onCancel}
        translations={translations}
        onComplete={handleDocumentsComplete}
      />

      <BiometricIntroDialog
        open={showBiometricIntro}
        onClose={() => setShowBiometricIntro(false)}
        onProceed={() => {
          setShowBiometricIntro(false);
          setShowBiometricVerification(true);
        }}
      />
    </>
  );
}; 