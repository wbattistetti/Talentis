export type SupportedLanguage = 'it' | 'en' | 'bg';

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
  languageSelection: {
    or: string;
  };
  splash: {
    title: string;
    description: string;
    button: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    interview: {
      title: string;
      description: string;
      tooltip: string;
    };
    skills: {
      title: string;
      description: string;
      tooltip: string;
    };
    preparation: {
      title: string;
      description: string;
      tooltip: string;
    };
    companies: {
      title: string;
      description: string;
      tooltip: string;
    };
    abroad: {
      title: string;
      documentation: {
        title: string;
        description: string;
        tooltip: string;
      };
      travel: {
        title: string;
        description: string;
        tooltip: string;
      };
      culture: {
        title: string;
        description: string;
        tooltip: string;
      };
    };
    registration: {
      description: string;
      button: string;
      note: string;
    };
  };
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
    next: string;
    cancel: string;
    understand: string;
    capture: string;
  };
  verification: {
    title: string;
    description: string;
    steps: {
      documents: string;
      photos: string;
    };
    why: {
      title: string;
      points: {
        identity: string;
        certification: string;
      };
    };
    privacy: {
      title: string;
      points: {
        security: string;
        certification: string;
      };
      more: string;
    };
    buttons: {
      understand: string;
      back: string;
      next: string;
      cancel: string;
    };
    documents: {
      title: string;
      idCard: string;
      passport: string;
      driverLicense: string;
      tooltip: string;
    };
  };
} 