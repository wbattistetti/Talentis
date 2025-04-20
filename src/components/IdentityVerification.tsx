import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera, Info, Shield } from 'lucide-react';

interface IdentityVerificationProps {
  onClose: () => void;
  translations?: any;
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({ onClose, translations = {} }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex items-start mb-6">
          {/* Icona clipart documenti */}
          <div className="w-16 h-16 mr-4 flex-shrink-0">
            <img 
              src="/icons/documents-icon.png" 
              alt="Documenti" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold">
            Verifica della tua identità
          </h2>
        </div>

        <p className="text-gray-700 mb-4">
          Per completare la registrazione, dobbiamo verificare la tua identità. Ti chiederemo:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <FileText className="w-6 h-6 text-green-600 mr-3 mt-1" />
            <div>
              <p className="text-gray-700">
                di indicare i documenti che vuoi utilizzare (es. carta d'identità o passaporto).
              </p>
              <div className="group relative mt-1">
                <Info className="w-4 h-4 text-gray-400 cursor-help inline" />
                <div className="absolute left-0 bottom-full mb-2 w-72 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Se hai la patente ti consigliamo di mostrarla perché è utile indicare che hai la patente nel curriculum, ovviamente se hai anche il passaporto questo ti permette di viaggiare dove vuoi (per eventuali visti potrai ricorrere al nostro supporto legale)
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Camera className="w-6 h-6 text-green-600 mr-3 mt-1" />
            <p className="text-gray-700">
              di scattare una foto del documento e un selfie (foto e video).
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Perché te lo chiediamo?</h3>
          <p className="text-gray-700 mb-2">
            I dati dei documenti sono fondamentali per il datore di lavoro
          </p>
          <div className="space-y-2">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-2 mt-1" />
              <p className="text-gray-700">
                Certifica che sei la persona indicata nel documento.
              </p>
            </div>
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-2 mt-1" />
              <div>
                <p className="text-gray-700">
                  Il selfie ci servirà per certificare le prove pratiche che ti chiederemo di fare
                </p>
                <div className="group relative mt-1">
                  <Info className="w-4 h-4 text-gray-400 cursor-help inline" />
                  <div className="absolute left-0 bottom-full mb-2 w-72 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Poter certificare che le prove pratiche sono state effettuate completamente da te è una garanzia per il tuo potenziale datore di lavoro! Certifica il tuo curriculum e aumenta le tue possibilità di trovare lavoro!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">E la tua privacy?</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-purple-600 mr-2 mt-1" />
              <div>
                <p className="text-gray-700">
                  I tuoi dati sono al sicuro e non saranno mai divulgati.
                </p>
                <button className="text-blue-600 hover:underline text-sm">
                  clicca "qui" per leggere le regole di privacy GDPR
                </button>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-orange-600 mr-2 mt-1" />
              <div>
                <p className="text-gray-700">
                  Il nostro sito è certificato con i più alti standard di sicurezza informatica.
                </p>
                <button className="text-blue-600 hover:underline text-sm">
                  clicca qui per vedere in dettaglio i nostri standard di sicurezza
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Vuoi maggiori dettagli? Consulta qui le nostre certificazioni di sicurezza.
        </p>

        <div className="flex justify-center">
          <motion.button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations.understood || 'Ho capito'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification; 