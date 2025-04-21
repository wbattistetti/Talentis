import { Translation } from './types';

export const translations: Record<string, Translation> = {
  it: {
    welcome: {
      title: 'Benvenuto in Talentis',
      subtitle: 'Il tuo partner per il successo professionale',
      interview: {
        title: 'Ti faremo un\'intervista',
        description: 'Conosceremo meglio le tue aspirazioni e competenze.',
        tooltip: 'Un nostro esperto ti contatterà per una videochiamata per conoscere meglio le tue aspirazioni e obiettivi professionali.'
      },
      skills: {
        title: 'Mostrerai le tue competenze',
        description: 'Creeremo un curriculum professionale su misura.',
        tooltip: 'Creeremo un curriculum professionale su misura e ti aiuteremo a preparare un portfolio delle tue competenze.'
      },
      preparation: {
        title: 'Ti prepareremo al colloquio',
        description: 'Consigli personalizzati per il tuo successo.',
        tooltip: 'Riceverai consigli personalizzati e simulazioni di colloquio per presentarti al meglio alle aziende.'
      },
      companies: {
        title: 'Ti presenteremo alle aziende',
        description: 'Ti presenteremo alle aziende.',
        tooltip: 'Ti presenteremo alle aziende che corrispondono al tuo profilo e ti supporteremo durante tutto il processo di selezione.'
      },
      abroad: {
        title: 'Se devi trasferirti all\'estero:',
        documentation: {
          title: 'Documentazione e alloggio',
          description: 'Ti aiutiamo con la documentazione necessaria e la ricerca di un alloggio.',
          tooltip: 'Ti aiutiamo con i visti, i permessi di lavoro e la ricerca di un alloggio adatto alle tue esigenze.'
        },
        travel: {
          title: 'Supporto per il viaggio',
          description: 'Ti aiutiamo per il viaggio di trasferimento, se occorre.',
          tooltip: 'Se non hai risorse per il viaggio ti aiuteremo a comprarlo a prezzo scontato e a rate e lo pagherai solo dopo che avrai trovato lavoro.'
        },
        culture: {
          title: 'Cultura e lingua',
          description: 'Ti introduciamo alla cultura e alla lingua del nuovo paese.',
          tooltip: 'Ti forniremo risorse per imparare la lingua locale e comprendere la cultura del nuovo paese.'
        }
      },
      registration: {
        description: 'Se vuoi, puoi cominciare a registrarti. Non dovrai pagare nulla né fornire alcun dato di carta di credito. Ad ogni passo ti daremo spiegazioni dettagliate e ti mostreremo come le tue informazioni rimarranno riservate.',
        button: 'Inizia la registrazione',
        note: 'Puoi interrompere e riprendere quando vorrai'
      }
    },
    select: 'Seleziona la tua lingua',
    description: {
      intro: 'Talentis è il nuovo rivoluzionario portale che trasforma il modo in cui trovi lavoro nel tuo paese o nel mondo!',
      services: [
        'Creazione del tuo profilo professionale',
        'Assistenza nella ricerca del lavoro',
        'Supporto nella preparazione dei documenti',
        'Connessione con le aziende',
        'Assistenza nella negoziazione',
        'Supporto post-assunzione'
      ],
      costs: {
        title: 'Costi del servizio',
        points: [
          'Servizio base gratuito',
          'Servizio premium a partire da €9.99/mese',
          'Servizio enterprise su richiesta'
        ]
      }
    },
    buttons: {
      meetTeam: 'Incontra il nostro team',
      whatWeAsk: 'Cosa ti chiederemo',
      back: 'Indietro',
      next: 'Avanti',
      cancel: 'Annulla',
      understand: 'Ho capito',
      capture: 'Scatta',
      startRecording: 'Inizia registrazione',
      playback: 'Rivedi il video',
      incorrect: 'No, rifare',
      correct: 'Sì, corretto',
      repeat: 'Ripeti istruzione'
    },
    documents: {
      title: 'Seleziona i documenti che possiedi',
      idCard: 'CARTA D\'IDENTITÀ',
      passport: 'PASSAPORTO',
      driverLicense: 'PATENTE DI GUIDA',
      tooltip: 'Puoi selezionare più documenti da verificare'
    },
    verification: {
      title: 'Verifica della tua identità con Talentis',
      description: 'Per completare la registrazione, dobbiamo verificare la tua identità. Ti chiederemo:',
      steps: {
        documents: 'Di indicare i documenti che vuoi utilizzare (es. carta d\'identità o passaporto).',
        photos: 'Di scattare una foto del documento e un selfie (foto e video).'
      },
      why: {
        title: 'Perché serve questa verifica?',
        points: {
          identity: 'Certifica che sei la persona indicata nel documento.',
          certification: 'È una garanzia per i datori di lavoro e rende il tuo curriculum certificato, aumentando le tue opportunità.'
        }
      },
      privacy: {
        title: 'E la tua privacy?',
        points: {
          security: 'I tuoi dati sono al sicuro e non saranno mai divulgati.',
          certification: 'Il nostro sito è certificato con i più alti standard di sicurezza informatica.'
        },
        more: 'Vuoi maggiori dettagli? Consulta qui le nostre certificazioni di sicurezza.'
      },
      buttons: {
        understand: 'Ho capito, procediamo',
        back: 'Indietro',
        next: 'Avanti',
        cancel: 'Annulla'
      }
    },
    splash: {
      title: 'Benvenuto in Talentis: il nuovo rivoluzionario portale che trasforma il modo in cui trovi lavoro nel tuo paese o nel mondo!',
      description: 'Che tu stia cercando la tua prossima opportunità vicino a casa o un\'esperienza professionale in qualsiasi parte del mondo, Talentis ti aiuterà in modo sorprendente.',
      button: 'Vuoi scoprirlo?'
    },
    languageSelection: {
      or: 'o scegli un\'altra lingua'
    },
    photoCapture: {
      qualityQuestion: 'La foto è a fuoco e ben visibile?',
      yes: 'Sì',
      no: 'No',
      frontTitle: 'Foto fronte',
      backTitle: 'Foto retro'
    },
    biometric: {
      startInstructions: 'Preparati per il video di verifica biometrica',
      lookStraight: 'Guarda dritto verso la telecamera',
      turnLeft: 'Gira lentamente la testa a sinistra e poi ritorna a fissare la telecamera',
      turnRight: 'Gira lentamente la testa a destra e poi ritorna a fissare la telecamera',
      liftChin: 'Alza il mento e poi torna a fissare la telecamera',
      lowerChin: 'Abbassa il mento e poi torna a fissare la telecamera',
      blink: 'Sbatti le palpebre',
      smile: 'Fai un sorriso',
      finished: 'Perfetto, abbiamo finito!',
      verifyMovements: 'Verifica che i movimenti nel video siano corretti',
      incorrect: 'No, devo rifare il video',
      correct: 'Sì, i movimenti sono corretti'
    }
  },
  en: {
    welcome: {
      title: 'Welcome to Talentis',
      subtitle: 'Your partner for professional success',
      interview: {
        title: 'We will interview you',
        description: 'We will better understand your aspirations and skills.',
        tooltip: 'Our expert will contact you for a video call to better understand your aspirations and professional goals.'
      },
      skills: {
        title: 'Show your skills',
        description: 'We will create a tailored professional CV.',
        tooltip: 'We will create a tailored professional CV and help you prepare a portfolio of your skills.'
      },
      preparation: {
        title: 'We will prepare you for interviews',
        description: 'Personalized advice for your success.',
        tooltip: 'You will receive personalized advice and interview simulations to present yourself best to companies.'
      },
      companies: {
        title: 'We will introduce you to companies',
        description: 'We will present you to companies.',
        tooltip: 'We will present you to companies that match your profile and support you throughout the selection process.'
      },
      abroad: {
        title: 'If you need to move abroad:',
        documentation: {
          title: 'Documentation and accommodation',
          description: 'We help you with necessary documentation and finding accommodation.',
          tooltip: 'We help you with visas, work permits, and finding suitable accommodation for your needs.'
        },
        travel: {
          title: 'Travel support',
          description: 'We help you with relocation travel, if needed.',
          tooltip: 'If you don\'t have resources for travel, we will help you buy it at a discounted price and in installments, and you will only pay after you have found work.'
        },
        culture: {
          title: 'Culture and language',
          description: 'We introduce you to the culture and language of the new country.',
          tooltip: 'We will provide resources to learn the local language and understand the culture of the new country.'
        }
      },
      registration: {
        description: 'If you want, you can start registering. You won\'t have to pay anything or provide any credit card details. At each step, we will give you detailed explanations and show you how your information will remain confidential.',
        button: 'Start registration',
        note: 'You can stop and resume whenever you want'
      }
    },
    select: 'Select your language',
    description: {
      intro: 'Talentis is the new revolutionary portal that transforms the way you find work in your country or around the world!',
      services: [
        'Creation of your professional profile',
        'Job search assistance',
        'Document preparation support',
        'Connection with companies',
        'Negotiation assistance',
        'Post-hiring support'
      ],
      costs: {
        title: 'Service costs',
        points: [
          'Basic service free',
          'Premium service starting from €9.99/month',
          'Enterprise service on request'
        ]
      }
    },
    buttons: {
      meetTeam: 'Meet our team',
      whatWeAsk: 'What we\'ll ask you',
      back: 'Back',
      next: 'Next',
      cancel: 'Cancel',
      understand: 'I understand',
      capture: 'Capture',
      startRecording: 'Start recording',
      playback: 'Review video',
      incorrect: 'No, redo',
      correct: 'Yes, correct',
      repeat: 'Repeat instruction'
    },
    documents: {
      title: 'Select the documents you have',
      idCard: 'ID CARD',
      passport: 'PASSPORT',
      driverLicense: 'DRIVER\'S LICENSE',
      tooltip: 'You can select multiple documents to verify'
    },
    verification: {
      title: 'Identity Verification with Talentis',
      description: 'To complete your registration, we need to verify your identity. We will ask you to:',
      steps: {
        documents: 'Indicate which documents you want to use (e.g. ID card or passport).',
        photos: 'Take a photo of the document and a selfie (photo and video).'
      },
      why: {
        title: 'Why is this verification needed?',
        points: {
          identity: 'It certifies that you are the person indicated in the document.',
          certification: 'It\'s a guarantee for employers and makes your CV certified, increasing your opportunities.'
        }
      },
      privacy: {
        title: 'What about your privacy?',
        points: {
          security: 'Your data is secure and will never be disclosed.',
          certification: 'Our site is certified with the highest IT security standards.'
        },
        more: 'Want more details? Check our security certifications here.'
      },
      buttons: {
        understand: 'I understand, let\'s proceed',
        back: 'Back',
        next: 'Next',
        cancel: 'Cancel'
      }
    },
    splash: {
      title: 'Welcome to Talentis: the new revolutionary portal that transforms how you find work in your country or worldwide!',
      description: 'Whether you\'re looking for your next opportunity close to home or a professional experience anywhere in the world, Talentis will help you in amazing ways.',
      button: 'Want to discover how?'
    },
    languageSelection: {
      or: 'or choose another language'
    },
    photoCapture: {
      qualityQuestion: 'Is the photo clear and visible?',
      yes: 'Yes',
      no: 'No',
      frontTitle: 'Front photo',
      backTitle: 'Back photo'
    },
    biometric: {
      startInstructions: 'Get ready for the biometric verification video',
      lookStraight: 'Look straight at the camera',
      turnLeft: 'Slowly turn your head to the left and then look back at the camera',
      turnRight: 'Slowly turn your head to the right and then look back at the camera',
      liftChin: 'Lift your chin and then look back at the camera',
      lowerChin: 'Lower your chin and then look back at the camera',
      blink: 'Blink your eyes',
      smile: 'Make a smile',
      finished: 'Perfect, we are done!',
      verifyMovements: 'Verify that the movements in the video are correct',
      incorrect: 'No, I need to redo the video',
      correct: 'Yes, the movements are correct'
    }
  },
  bg: {
    welcome: {
      title: 'Добре дошли в Talentis',
      subtitle: 'Вашият партньор за професионален успех',
      interview: {
        title: 'Ще ви интервюираме',
        description: 'Ще разберем по-добре вашите стремежи и умения.',
        tooltip: 'Нашият експерт ще се свърже с вас за видео разговор, за да разбере по-добре вашите стремежи и професионални цели.'
      },
      skills: {
        title: 'Покажете уменията си',
        description: 'Ще създадем персонализирана професионална автобиография.',
        tooltip: 'Ще създадем персонализирана професионална автобиография и ще ви помогнем да подготвите портфолио на вашите умения.'
      },
      preparation: {
        title: 'Ще ви подготвим за интервюта',
        description: 'Персонализирани съвети за вашия успех.',
        tooltip: 'Ще получите персонализирани съвети и симулации на интервюта, за да се представите най-добре пред компаниите.'
      },
      companies: {
        title: 'Ще ви представим на компании',
        description: 'Ще ви представим на компании.',
        tooltip: 'Ще ви представим на компании, които отговарят на вашия профил и ще ви подкрепяме през целия процес на подбор.'
      },
      abroad: {
        title: 'Ако трябва да се преместите в чужбина:',
        documentation: {
          title: 'Документация и настаняване',
          description: 'Помагаме ви с необходимата документация и намиране на жилище.',
          tooltip: 'Помагаме ви с визи, разрешения за работа и намиране на подходящо жилище за вашите нужди.'
        },
        travel: {
          title: 'Подкрепа за пътуване',
          description: 'Помагаме ви с пътуването за преместване, ако е необходимо.',
          tooltip: 'Ако нямате ресурси за пътуване, ще ви помогнем да го купите на намалена цена и на вноски, и ще платите само след като сте намерили работа.'
        },
        culture: {
          title: 'Култура и език',
          description: 'Запознаваме ви с културата и езика на новата страна.',
          tooltip: 'Ще предоставим ресурси за изучаване на местния език и разбиране на културата на новата страна.'
        }
      },
      registration: {
        description: 'Ако искате, можете да започнете да се регистрирате. Няма да трябва да плащате нищо или да предоставяте данни за кредитна карта. На всяка стъпка ще ви даваме подробни обяснения и ще ви покажем как информацията ви ще остане поверителна.',
        button: 'Започнете регистрация',
        note: 'Можете да спрете и да продължите когато поискате'
      }
    },
    select: 'Изберете вашия език',
    description: {
      intro: 'Talentis е новият революционен портал, който трансформира начина, по който намирате работа във вашата страна или по света!',
      services: [
        'Създаване на вашия професионален профил',
        'Помощ при търсене на работа',
        'Подкрепа при подготовка на документи',
        'Връзка с компании',
        'Помощ при преговори',
        'Подкрепа след наемане'
      ],
      costs: {
        title: 'Цени на услугите',
        points: [
          'Основна услуга безплатно',
          'Премиум услуга от €9.99/месец',
          'Корпоративна услуга при запитване'
        ]
      }
    },
    buttons: {
      meetTeam: 'Запознайте се с нашия екип',
      whatWeAsk: 'Какво ще ви попитаме',
      back: 'Назад',
      next: 'Напред',
      cancel: 'Отказ',
      understand: 'Разбрах',
      capture: 'Снимай',
      startRecording: 'Започни запис',
      playback: 'Преглед на видеото',
      incorrect: 'Не, повтори',
      correct: 'Да, правилно',
      repeat: 'Повтори инструкцията'
    },
    documents: {
      title: 'Изберете документите, които имате',
      idCard: 'ЛИЧНА КАРТА',
      passport: 'ПАСПОРТ',
      driverLicense: 'ШОФЬОРСКА КНИЖКА',
      tooltip: 'Можете да изберете няколко документа за проверка'
    },
    verification: {
      title: 'Проверка на самоличността с Talentis',
      description: 'За да завършите регистрацията си, трябва да потвърдим самоличността ви. Ще ви помолим да:',
      steps: {
        documents: 'Посочете кои документи искате да използвате (напр. лична карта или паспорт).',
        photos: 'Направете снимка на документа и селфи (снимка и видео).'
      },
      why: {
        title: 'Защо е необходима тази проверка?',
        points: {
          identity: 'Удостоверява, че вие сте лицето, посочено в документа.',
          certification: 'Това е гаранция за работодателите и прави CV-то ви сертифицирано, увеличавайки възможностите ви.'
        }
      },
      privacy: {
        title: 'А вашата поверителност?',
        points: {
          security: 'Вашите данни са защитени и никога няма да бъдат разкривани.',
          certification: 'Нашият сайт е сертифициран с най-високите стандарти за IT сигурност.'
        },
        more: 'Искате повече подробности? Проверете нашите сертификати за сигурност тук.'
      },
      buttons: {
        understand: 'Разбирам, да продължим',
        back: 'Назад',
        next: 'Напред',
        cancel: 'Отказ'
      }
    },
    splash: {
      title: 'Добре дошли в Talentis: новият революционен портал, който трансформира начина, по който намирате работа във вашата страна или по света!',
      description: 'Независимо дали търсите следващата си възможност близо до дома или професионален опит където и да е по света, Talentis ще ви помогне по невероятни начини.',
      button: 'Искате ли да разберете как?'
    },
    languageSelection: {
      or: 'или изберете друг език'
    },
    photoCapture: {
      qualityQuestion: 'Фотото е ясно и добре видимо?',
      yes: 'Да',
      no: 'Не',
      frontTitle: 'Фронтално фото',
      backTitle: 'Задно фото'
    },
    biometric: {
      startInstructions: 'Подгответе се за видеото за проверка на биометрични данни',
      lookStraight: 'Гледайте директно в камерата',
      turnLeft: 'Наместете главата леко наляво и след това върнете обратно в камерата',
      turnRight: 'Наместете главата леко надясно и след това върнете обратно в камерата',
      liftChin: 'Подигнете подбодката и след това върнете обратно в камерата',
      lowerChin: 'Намалете подбодката и след това върнете обратно в камерата',
      blink: 'Затваряне на очите',
      smile: 'Смеете се',
      finished: 'Отлично, приключихме!',
      verifyMovements: 'Проверете дали движението в видеото е правилно',
      incorrect: 'Не, трябва да презапиша видеото',
      correct: 'Да, движението е правилно'
    }
  }
}; 