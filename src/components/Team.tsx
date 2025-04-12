import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface TeamMember {
  role: string;
  name: string;
  image: string;
  description: string;
  bio: string;
  help: string;
  references: string[];
}

interface TeamProps {
  teamMembers: TeamMember[];
  language: 'it' | 'en' | 'bg' | 'es' | 'fr' | 'de' | 'pl' | 'ro' | 'pt' | 'nl' | 'gr' | 'hu' | 'cz' | 'sk' | 'hr' | 'si' | 'lt' | 'lv' | 'ee' | 'mt';
  onBack: () => void;
}

const translations = {
  it: {
    buttons: {
      meetPerson: "Conoscilo",
      howHelps: "Come ti aiuterà",
      references: "Dicono di lui",
      referencesNetwork: "Dicono di loro"
    }
  },
  en: {
    buttons: {
      meetPerson: "Meet them",
      howHelps: "How they will help",
      references: "What people say",
      referencesNetwork: "What the network says"
    }
  },
  bg: {
    buttons: {
      meetPerson: "Запознайте се",
      howHelps: "Как ще помогне",
      references: "Какво казват за него",
      referencesNetwork: "Какво казват за тях"
    }
  }
};

const Team: React.FC<TeamProps> = ({ teamMembers, onBack, language = 'it' }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTab, setActiveTab] = useState<'bio' | 'help' | 'references'>('bio');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Indietro
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h3 className="text-xl font-bold">{member.role}</h3>
                  <p className="text-sm opacity-90">{member.name}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{member.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setActiveTab('bio');
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    {t.buttons.meetPerson}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setActiveTab('help');
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                  >
                    {t.buttons.howHelps}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setActiveTab('references');
                    }}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                  >
                    {member.role === 'Rete di Connazionali' || member.role === 'Network of Compatriots' || member.role === 'Мрежа от сънародници' 
                      ? t.buttons.referencesNetwork 
                      : t.buttons.references}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {activeTab === 'bio' && t.buttons.meetPerson}
                {activeTab === 'help' && t.buttons.howHelps}
                {activeTab === 'references' && (
                  selectedMember.role === 'Rete di Connazionali' || 
                  selectedMember.role === 'Network of Compatriots' || 
                  selectedMember.role === 'Мрежа от сънародници'
                    ? t.buttons.referencesNetwork 
                    : t.buttons.references
                )}
              </h2>
              <button 
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {activeTab === 'bio' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setActiveTab('help')}
                      className="flex-1 bg-blue-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      {t.buttons.howHelps}
                    </button>
                    <button
                      onClick={() => setActiveTab('references')}
                      className="flex-1 bg-green-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      {t.buttons.references}
                    </button>
                    <button
                      onClick={() => setActiveTab('references')}
                      className="flex-1 bg-purple-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                      {t.buttons.referencesNetwork}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'help' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{selectedMember.help}</p>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setActiveTab('bio')}
                      className="flex-1 bg-blue-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      {t.buttons.meetPerson}
                    </button>
                    <button
                      onClick={() => setActiveTab('references')}
                      className="flex-1 bg-green-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      {t.buttons.references}
                    </button>
                    <button
                      onClick={() => setActiveTab('references')}
                      className="flex-1 bg-purple-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                      {t.buttons.referencesNetwork}
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'references' && (
                <div className="space-y-4">
                  <ul className="space-y-4">
                    {selectedMember.references.map((reference, index) => (
                      <li key={index} className="text-gray-700 leading-relaxed">
                        {reference}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setActiveTab('bio')}
                      className="flex-1 bg-blue-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      {t.buttons.meetPerson}
                    </button>
                    <button
                      onClick={() => setActiveTab('help')}
                      className="flex-1 bg-green-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      {t.buttons.howHelps}
                    </button>
                    <button
                      onClick={() => setActiveTab('references')}
                      className="flex-1 bg-purple-600 text-white text-sm px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                      {t.buttons.referencesNetwork}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team; 