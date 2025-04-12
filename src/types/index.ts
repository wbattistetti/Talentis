export type SupportedLanguage = 
  | 'it'    // Italiano
  | 'en'    // English
  | 'bg';   // Български

export interface TeamMember {
  role: string;
  name: string;
  image: string;
  description: string;
  bio: string;
  help: string;
  references: string[];
}

export interface Translation {
  welcome: string;
  select: string;
  description: {
    intro: string;
    services: string[];
    costs: {
      title: string;
      points: string[];
    };
  };
  buttons: {
    meetTeam: string;
    whatWeAsk: string;
    back: string;
  };
} 