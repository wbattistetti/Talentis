import { Translation } from './types';

export const translations: Record<string, Translation> = {
  it: {
    welcome: 'Benvenuto in Talentis',
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
      back: 'Indietro'
    }
  },
  en: {
    welcome: 'Welcome to Talentis',
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
      back: 'Back'
    }
  },
  bg: {
    welcome: 'Добре дошли в Talentis',
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
      back: 'Назад'
    }
  }
}; 