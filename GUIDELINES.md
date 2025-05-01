# Linee Guida di Sviluppo

## 🌍 Internazionalizzazione (i18n)

### Regola globale per la gestione dei testi

Tutte le pagine devono essere sviluppate **con supporto i18n attivo**:

- ❌ **Nessun testo hardcoded** (es. titoli, etichette, placeholder, messaggi)
- ✅ Ogni stringa testuale deve essere gestita tramite sistema di localizzazione (es. `t('chiave')`)
- 🗣️ Supporta da subito le lingue:
  - 🇮🇹 Italiano
  - 🇬🇧 Inglese
  - 🇧🇬 Bulgaro
- 🔧 Utilizza `react-i18next` come libreria di traduzione

### Implementazione

1. Importare il hook `useTranslation` in ogni componente:
```typescript
import { useTranslation } from 'react-i18next';
```

2. Utilizzare il hook nel componente:
```typescript
const { t } = useTranslation();
```

3. Utilizzare le chiavi di traduzione invece di testo hardcoded:
```typescript
<Typography>{t('chiave.sottosezione.elemento')}</Typography>
```

4. Aggiungere le nuove chiavi nel file `src/i18n/translations.ts` per tutte le lingue supportate

5. Aggiornare l'interfaccia `Translation` in `src/types.ts` quando si aggiungono nuove chiavi

### Struttura delle Chiavi

Organizzare le chiavi di traduzione in modo gerarchico per mantenere il codice organizzato:

```typescript
{
  sezione: {
    sottosezione: {
      chiave: "valore"
    }
  }
}
```

### Esempio Pratico

```typescript
// ❌ Non fare
<Button>Conferma</Button>

// ✅ Fare
<Button>{t('common.buttons.confirm')}</Button>
``` 