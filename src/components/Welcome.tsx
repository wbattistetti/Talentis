import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Building2, 
  Lightbulb, 
  Globe, 
  Home, 
  Users, 
  Languages, 
  Scale, 
  CreditCard,
  CalendarClock,
  Info
} from 'lucide-react';
import { ViewType } from './Navigation';

interface WelcomeProps {
  onViewChange: (view: ViewType) => void;
  translations: any;
}

const Welcome: React.FC<WelcomeProps> = ({ onViewChange, translations }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const iconStyle = "w-8 h-8 text-blue-600 mb-2";
  const sectionStyle = "flex items-start space-x-4 mb-6";
  const textStyle = "text-gray-700";
  const infoIconStyle = "w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-8"
            {...fadeInUp}
          >
            Ti guidiamo passo passo nella ricerca del lavoro.
          </motion.h1>
        </motion.div>

        <div className="space-y-12">
          {/* Processo principale */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div className={sectionStyle} variants={fadeInUp}>
              <FileText className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Fornirai i tuoi dati</h3>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Raccoglieremo le tue informazioni personali, esperienze lavorative e competenze per creare un profilo completo.
                    </div>
                  </div>
                </div>
                <p className={textStyle}>Inizieremo raccogliendo le tue informazioni di base.</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <MessageSquare className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Ti faremo un'intervista</h3>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Un nostro esperto ti contatterà per una videochiamata per conoscere meglio le tue aspirazioni e obiettivi professionali.
                    </div>
                  </div>
                </div>
                <p className={textStyle}>Conosceremo meglio le tue aspirazioni e competenze.</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <Briefcase className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Mostrerai le tue competenze</h3>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Creeremo un curriculum professionale su misura e ti aiuteremo a preparare un portfolio delle tue competenze.
                    </div>
                  </div>
                </div>
                <p className={textStyle}>Creeremo un curriculum professionale su misura.</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <Building2 className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Ti metteremo in contatto con le aziende</h3>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Ti presenteremo alle aziende che corrispondono al tuo profilo e ti supporteremo durante tutto il processo di selezione.
                    </div>
                  </div>
                </div>
                <p className={textStyle}>Collegamento diretto con le aziende interessate.</p>
              </div>
            </motion.div>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <Lightbulb className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Ti prepareremo al colloquio</h3>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Riceverai consigli personalizzati e simulazioni di colloquio per presentarti al meglio alle aziende.
                    </div>
                  </div>
                </div>
                <p className={textStyle}>Consigli personalizzati per il tuo successo.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Sezione trasferimento all'estero */}
          <motion.div
            className="bg-blue-50 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-blue-600" />
              Se devi trasferirti all'estero:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Home className={iconStyle} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Documentazione e alloggio</h3>
                    <div className="group relative">
                      <Info className={infoIconStyle} />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ti aiutiamo con i visti, i permessi di lavoro e la ricerca di un alloggio adatto alle tue esigenze.
                      </div>
                    </div>
                  </div>
                  <p className={textStyle}>Ti aiutiamo con la documentazione necessaria e la ricerca di un alloggio.</p>
                </div>
              </motion.div>

              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Users className={iconStyle} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Connazionali</h3>
                    <div className="group relative">
                      <Info className={infoIconStyle} />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ti metteremo in contatto con una rete di connazionali che possono aiutarti con consigli pratici e supporto.
                      </div>
                    </div>
                  </div>
                  <p className={textStyle}>Ti mettiamo in contatto con connazionali che hanno vissuto esperienze simili.</p>
                </div>
              </motion.div>

              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Languages className={iconStyle} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Cultura e lingua</h3>
                    <div className="group relative">
                      <Info className={infoIconStyle} />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ti forniremo risorse per imparare la lingua locale e comprendere la cultura del nuovo paese.
                      </div>
                    </div>
                  </div>
                  <p className={textStyle}>Ti introduciamo alla cultura e alla lingua del nuovo paese.</p>
                </div>
              </motion.div>

              <motion.div className={sectionStyle} variants={fadeInUp}>
                <Scale className={iconStyle} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">Supporto legale</h3>
                    <div className="group relative">
                      <Info className={infoIconStyle} />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Ti assisteremo con consulenza legale per contratti di lavoro, diritti dei lavoratori e questioni burocratiche.
                      </div>
                    </div>
                  </div>
                  <p className={textStyle}>Offriamo supporto legale e assistenza per l'inserimento.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Sezione costi */}
          <motion.div 
            className="bg-gray-50 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
              Quanto costa?
            </h2>

            <motion.div className={sectionStyle} variants={fadeInUp}>
              <CalendarClock className={iconStyle} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={textStyle}>
                    Non paghi nulla in anticipo. La maggior parte delle spese sarà coperta dal datore di lavoro. 
                    Solo se verrai assunto, pagherai l'equivalente di un mese di stipendio in 12 rate mensili senza interessi.
                  </p>
                  <div className="group relative">
                    <Info className={infoIconStyle} />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Il pagamento inizierà solo dopo che avrai iniziato a lavorare. Le rate sono flessibili e possono essere adattate alle tue esigenze.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to action */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-700 mb-6">
              Se vuoi, puoi cominciare a registarti. Non dovrai pagare nulla né alcun dato di carta di credito. 
              Ad ogni passo ti daremo spiegazioni dettagliate e ti mostreremo come le tue informazioni rimarranno riservate.
            </p>
            <motion.button
              onClick={() => onViewChange('document')}
              className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations?.startRegistration || 'Inizia la registrazione'}
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Puoi interrompere e riprendere quando vorrai
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 