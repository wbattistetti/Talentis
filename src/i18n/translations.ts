export const translations = {
  it: {
    // ... existing code ...
    documents: {
      selectTitle: 'Verifica della identità',
      selectDescription: 'Per completare la registrazione, ti chiederemo di:',
      idCard: 'CARTA D\'IDENTITÀ',
      passport: 'PASSAPORTO',
      driverLicense: 'PATENTE DI GUIDA',
      descriptions: {
        idCard: 'Documento di identità nazionale',
        passport: 'Documento per viaggi internazionali',
        driverLicense: 'Documento di guida e identità'
      },
      tooltip: 'Puoi selezionare più documenti da verificare',
      altText: {
        documents: 'Documenti',
        selfie: 'Selfie'
      },
      steps: {
        documents: 'Indica quali documenti vuoi usare (es. carta d\'identità o passaporto).',
        photos: 'Scatta una foto del documento e un selfie (foto e video).'
      },
      whyVerify: {
        title: 'Perché serve questa verifica?',
        certify: 'Certifica che sei la persona indicata nei documenti.',
        certifiedCV: 'Rende il tuo curriculum certificato, aumentando le tue opportunità.'
      },
      privacy: {
        title: 'E la tua privacy?',
        dataSecurity: 'I tuoi dati sono al sicuro e saranno forniti solo ai datori di lavoro.',
        securityStandards: 'Il nostro sito è certificato con i più alti standard di sicurezza informatica.'
      },
      tooltips: {
        documents: 'Se hai la patente ti consigliamo di mostrarla perché è utile indicare che hai la patente nel curriculum, ovviamente se hai anche il passaporto questo ti permette di viaggiare dove vuoi (per eventuali visti potrai ricorrere al nostro supporto legale)',
        certifiedCV: 'Poter certificare che le prove pratiche sono state effettuate completamente da te è una garanzia per il tuo potenziale datore di lavoro! Certifica il tuo curriculum e aumenta le tue possibilità di trovare lavoro!',
        gdpr: 'I tuoi dati sono protetti secondo le normative GDPR e vengono utilizzati solo per le finalità specificate'
      },
      buttons: {
        understand: 'Ho capito, procediamo',
        back: 'Indietro',
        next: 'Avanti',
        cancel: 'Annulla'
      }
    },
    documentPopup: {
      title: 'Verifica del documento',
      description: 'Per favore, segui attentamente le istruzioni per la verifica del tuo documento',
      steps: {
        prepare: 'Prepara il tuo documento',
        position: 'Posiziona il documento',
        capture: 'Scatta la foto'
      },
      instructions: {
        prepare: 'Assicurati che il documento sia pulito e ben illuminato',
        position: 'Centra il documento all\'interno del riquadro',
        capture: 'Mantieni fermo il documento e scatta la foto'
      },
      buttons: {
        retake: 'Scatta di nuovo',
        confirm: 'Conferma foto',
        next: 'Avanti'
      },
      messages: {
        success: 'Documento acquisito con successo',
        error: 'Si è verificato un errore. Riprova.'
      }
    },
    navigation: {
      basicProfile: 'Profilo Base',
      // altri pulsanti di navigazione verranno aggiunti qui
    },
    common: {
      navigation: {
        pages: 'Pagine'
      },
      cancel: 'Annulla',
      proceed: 'Procedi'
    },
    basicProfile: {
      title: 'Il tuo Profilo Base',
      subtitle: 'Raccontaci di te e della tua esperienza professionale',
      age: {
        label: 'Età',
        placeholder: 'Inserisci la tua età'
      },
      education: {
        label: 'Titolo di Studio',
        placeholder: 'Seleziona il tuo titolo di studio',
        options: {
          highSchool: 'Diploma di Scuola Superiore',
          bachelor: 'Laurea Triennale',
          master: 'Laurea Magistrale',
          phd: 'Dottorato',
          other: 'Altro'
        }
      },
      location: {
        label: 'Area Geografica',
        placeholder: 'Inserisci la tua città o regione'
      },
      currentOccupation: {
        label: 'Occupazione Attuale',
        placeholder: 'Es: Sviluppatore Software presso Acme Inc.'
      },
      experience: {
        label: 'Anni di Esperienza Professionale',
        options: {
          junior: '0-3 anni',
          mid: '3-10 anni',
          senior: '10+ anni'
        }
      },
      cv: {
        label: 'Curriculum Vitae',
        upload: 'Carica CV',
        dragDrop: 'Trascina qui il tuo CV o clicca per selezionarlo',
        format: 'File PDF (max 5MB)',
        parsing: 'Analisi del CV in corso...',
        parseComplete: 'Analisi completata',
        parseError: 'Errore durante l\'analisi'
      },
      buttons: {
        save: 'Salva Profilo',
        addExperience: 'Aggiungi Esperienza'
      }
    },
    idCheck: {
      title: 'Verifica Documento',
      steps: {
        documento: 'Documento',
        dati: 'Dati',
        foto: 'Foto',
        selfie: 'Selfie'
      }
    },
    biometric: {
      popup: {
        title: 'Verifica Biometrica',
        description: 'Per completare la verifica della tua identità, dovrai:',
        selfie: 'Scattare un selfie chiaro',
        video: 'Registrare un breve video di verifica',
        explanation: 'Questo ci aiuta a garantire la sicurezza della piattaforma e verificare la tua identità.'
      }
    },
    idCardForm: {
      title: 'Inserisci i dati della carta d\'identità',
      fields: {
        nome: 'Nome',
        cognome: 'Cognome',
        dataNascita: 'Data di nascita',
        numeroDocumento: 'Numero carta d\'identità',
        dataScadenza: 'Data di scadenza'
      },
      errors: {
        dataNascita: 'La data di nascita deve essere nel passato',
        dataScadenza: 'La data di scadenza deve essere nel futuro'
      },
      buttons: {
        back: 'INDIETRO',
        next: 'AVANTI'
      }
    }
    // ... existing code ...
  },
  en: {
    // ... existing code ...
    documents: {
      selectTitle: 'Identity Verification',
      selectDescription: 'To complete the registration, we will ask you to:',
      idCard: 'ID CARD',
      passport: 'PASSPORT',
      driverLicense: 'DRIVER\'S LICENSE',
      descriptions: {
        idCard: 'National identity document',
        passport: 'International travel document',
        driverLicense: 'Driving and identity document'
      },
      tooltip: 'You can select multiple documents to verify',
      altText: {
        documents: 'Documents',
        selfie: 'Selfie'
      },
      steps: {
        documents: 'Indicate which documents you want to use (e.g. ID card or passport).',
        photos: 'Take a photo of your document and a selfie (photo and video).'
      },
      whyVerify: {
        title: 'Why is this verification needed?',
        certify: 'Certifies that you are the person indicated in the documents.',
        certifiedCV: 'Makes your CV certified, increasing your opportunities.'
      },
      privacy: {
        title: 'What about your privacy?',
        dataSecurity: 'Your data is safe and will only be provided to employers.',
        securityStandards: 'Our site is certified with the highest cybersecurity standards.'
      },
      tooltips: {
        documents: 'If you have a driver\'s license, we recommend showing it as it\'s useful to indicate that you have a license in your CV. Of course, if you also have a passport, this allows you to travel anywhere (for visas, you can rely on our legal support)',
        certifiedCV: 'Being able to certify that practical tests were completely performed by you is a guarantee for your potential employer! Certify your CV and increase your chances of finding a job!',
        gdpr: 'Your data is protected according to GDPR regulations and is only used for specified purposes'
      },
      buttons: {
        understand: 'I understand, let\'s proceed',
        back: 'Back',
        next: 'Next',
        cancel: 'Cancel'
      }
    },
    documentPopup: {
      title: 'Document Verification',
      description: 'Please follow the instructions carefully to verify your document',
      steps: {
        prepare: 'Prepare your document',
        position: 'Position the document',
        capture: 'Take the photo'
      },
      instructions: {
        prepare: 'Make sure the document is clean and well-lit',
        position: 'Center the document within the frame',
        capture: 'Keep the document steady and take the photo'
      },
      buttons: {
        retake: 'Retake photo',
        confirm: 'Confirm photo',
        next: 'Next'
      },
      messages: {
        success: 'Document captured successfully',
        error: 'An error occurred. Please try again.'
      }
    },
    navigation: {
      basicProfile: 'Basic Profile',
      // other navigation buttons will be added here
    },
    common: {
      navigation: {
        pages: 'Pages'
      },
      cancel: 'Cancel',
      proceed: 'Proceed'
    },
    basicProfile: {
      title: 'Your Basic Profile',
      subtitle: 'Tell us about yourself and your professional experience',
      age: {
        label: 'Age',
        placeholder: 'Enter your age'
      },
      education: {
        label: 'Education Level',
        placeholder: 'Select your education level',
        options: {
          highSchool: 'High School Diploma',
          bachelor: 'Bachelor\'s Degree',
          master: 'Master\'s Degree',
          phd: 'PhD',
          other: 'Other'
        }
      },
      location: {
        label: 'Geographic Area',
        placeholder: 'Enter your city or region'
      },
      currentOccupation: {
        label: 'Current Occupation',
        placeholder: 'E.g.: Software Developer at Acme Inc.'
      },
      experience: {
        label: 'Years of Professional Experience',
        options: {
          junior: '0-3 years',
          mid: '3-10 years',
          senior: '10+ years'
        }
      },
      cv: {
        label: 'Curriculum Vitae',
        upload: 'Upload CV',
        dragDrop: 'Drag your CV here or click to select',
        format: 'PDF file (max 5MB)',
        parsing: 'Analyzing CV...',
        parseComplete: 'Analysis complete',
        parseError: 'Analysis error'
      },
      buttons: {
        save: 'Save Profile',
        addExperience: 'Add Experience'
      }
    },
    idCheck: {
      title: 'Document Verification',
      steps: {
        documento: 'Document',
        dati: 'Data',
        foto: 'Photo',
        selfie: 'Selfie'
      }
    },
    biometric: {
      popup: {
        title: 'Biometric Verification',
        description: 'To complete your identity verification, we need you to:',
        selfie: 'Take a clear selfie photo',
        video: 'Record a short verification video',
        explanation: 'This helps us ensure the security of our platform and verify your identity.'
      }
    },
    idCardForm: {
      title: 'Enter your ID card details',
      fields: {
        nome: 'First Name',
        cognome: 'Last Name',
        dataNascita: 'Date of Birth',
        numeroDocumento: 'ID Card Number',
        dataScadenza: 'Expiry Date'
      },
      errors: {
        dataNascita: 'Date of birth must be in the past',
        dataScadenza: 'Expiry date must be in the future'
      },
      buttons: {
        back: 'BACK',
        next: 'NEXT'
      }
    }
    // ... existing code ...
  },
  bg: {
    // ... existing code ...
    documents: {
      selectTitle: 'Проверка на самоличността',
      selectDescription: 'За да завършим регистрацията, ще ви помолим да:',
      idCard: 'ЛИЧНА КАРТА',
      passport: 'ПАСПОРТ',
      driverLicense: 'ШОФЬОРСКА КНИЖКА',
      descriptions: {
        idCard: 'Национален документ за самоличност',
        passport: 'Документ за международно пътуване',
        driverLicense: 'Документ за шофиране и самоличност'
      },
      tooltip: 'Можете да изберете няколко документа за проверка',
      altText: {
        documents: 'Документи',
        selfie: 'Селфи'
      },
      steps: {
        documents: 'Indica quali документи искате да използвате (напр. лична карта или паспорт).',
        photos: 'Направете снимка на документа и селфи (снимка и видео).'
      },
      whyVerify: {
        title: 'Защо е необходима тази проверка?',
        certify: 'Потвърждава, че сте лицето, посочено в документите.',
        certifiedCV: 'Прави вашият CV сертифициран, увеличавайки възможностите ви.'
      },
      privacy: {
        title: 'А какво с вашата поверителност?',
        dataSecurity: 'Вашите данни са в безопасност и ще бъдат предоставени само на работодатели.',
        securityStandards: 'Нашият сайт е сертифициран с най-високите стандарти за киберсигурност.'
      },
      tooltips: {
        documents: 'Ако имате шофьорска книжка, препоръчваме да я покажете, тъй като е полезно да посочите, че имате книжка в CV-то си. Разбира се, ако имате и паспорт, това ви позволява да пътувате навсякъде (за визи можете да разчитате на нашата правна поддръжка)',
        certifiedCV: 'Възможността да сертифицирате, че практическите тестове са извършени изцяло от вас, е гаранция за вашия потенциален работодател! Сертифицирайте CV-то си и увеличете шансовете си да намерите работа!',
        gdpr: 'Вашите данни са защитени съгласно разпоредбите на GDPR и се използват само за определени цели'
      },
      buttons: {
        understand: 'Разбрах, продължете',
        back: 'Назад',
        next: 'Напред',
        cancel: 'Отказ'
      }
    },
    documentPopup: {
      title: 'Проверка на документ',
      description: 'Моля, следвайте внимателно инструкциите за проверка на вашия документ',
      steps: {
        prepare: 'Подгответе документа си',
        position: 'Позиционирайте документа',
        capture: 'Направете снимка'
      },
      instructions: {
        prepare: 'Уверете се, че документът е чист и добре осветен',
        position: 'Центрирайте документа в рамката',
        capture: 'Задръжте документа стабилно и направете снимка'
      },
      buttons: {
        retake: 'Повторно снимане',
        confirm: 'Потвърди снимката',
        next: 'Напред'
      },
      messages: {
        success: 'Документът е заснет успешно',
        error: 'Възникна грешка. Моля, опитайте отново.'
      }
    },
    navigation: {
      basicProfile: 'Основен Профил',
      // other navigation buttons will be added here
    },
    common: {
      navigation: {
        pages: 'Страници'
      },
      cancel: 'Отказ',
      proceed: 'Продължи'
    },
    basicProfile: {
      title: 'Вашият Основен Профил',
      subtitle: 'Разкажете ни за себе си и вашия професионален опит',
      age: {
        label: 'Възраст',
        placeholder: 'Въведете вашата възраст'
      },
      education: {
        label: 'Образование',
        placeholder: 'Изберете вашето образование',
        options: {
          highSchool: 'Средно Образование',
          bachelor: 'Бакалавър',
          master: 'Магистър',
          phd: 'Докторантура',
          other: 'Друго'
        }
      },
      location: {
        label: 'Географски Район',
        placeholder: 'Въведете вашия град или регион'
      },
      currentOccupation: {
        label: 'Текуща Заетост',
        placeholder: 'Напр.: Софтуерен Разработчик в Acme Inc.'
      },
      experience: {
        label: 'Години Професионален Опит',
        options: {
          junior: '0-3 години',
          mid: '3-10 години',
          senior: '10+ години'
        }
      },
      cv: {
        label: 'Автобиография',
        upload: 'Качи CV',
        dragDrop: 'Провлачете вашето CV тук или кликнете за избор',
        format: 'PDF файл (макс 5MB)',
        parsing: 'Анализиране на CV...',
        parseComplete: 'Анализът е завършен',
        parseError: 'Грешка при анализа'
      },
      buttons: {
        save: 'Запази Профил',
        addExperience: 'Добави Опит'
      }
    },
    idCheck: {
      title: 'Проверка на документи',
      steps: {
        documento: 'Документ',
        dati: 'Данни',
        foto: 'Снимка',
        selfie: 'Селфи'
      }
    },
    biometric: {
      popup: {
        title: 'Биометрична Верификация',
        description: 'За да завършим проверката на самоличността ви, трябва да:',
        selfie: 'Направите ясна селфи снимка',
        video: 'Запишете кратко видео за верификация',
        explanation: 'Това ни помага да осигурим сигурността на платформата и да потвърдим вашата самоличност.'
      }
    },
    idCardForm: {
      title: 'Въведете данните за личната карта',
      fields: {
        nome: 'Име',
        cognome: 'Фамилия',
        dataNascita: 'Дата на раждане',
        numeroDocumento: 'Номер на лична карта',
        dataScadenza: 'Дата на валидност'
      },
      errors: {
        dataNascita: 'Датата на раждане трябва да е в миналото',
        dataScadenza: 'Датата на валидност трябва да е в бъдещето'
      },
      buttons: {
        back: 'НАЗАД',
        next: 'НАПРЕД'
      }
    }
    // ... existing code ...
  }
}; 