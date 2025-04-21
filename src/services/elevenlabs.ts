import { ELEVEN_LABS_CONFIG } from '../config/elevenlabs';

class AudioCache {
  private cache: { [key: string]: ArrayBuffer } = {};

  set(key: string, audio: ArrayBuffer) {
    this.cache[key] = audio;
  }

  get(key: string): ArrayBuffer | null {
    return this.cache[key] || null;
  }

  has(key: string): boolean {
    return key in this.cache;
  }
}

const audioCache = new AudioCache();

export class ElevenLabsService {
  private static instance: ElevenLabsService;
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): ElevenLabsService {
    if (!ElevenLabsService.instance) {
      ElevenLabsService.instance = new ElevenLabsService();
    }
    return ElevenLabsService.instance;
  }

  private async getAudioContext(): Promise<AudioContext> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private getCacheKey(text: string, language: string): string {
    return `${language}:${text}`;
  }

  private async fetchAudio(text: string, language: string): Promise<ArrayBuffer> {
    const voiceId = ELEVEN_LABS_CONFIG.VOICE_IDS[language as keyof typeof ELEVEN_LABS_CONFIG.VOICE_IDS] || ELEVEN_LABS_CONFIG.VOICE_IDS.en;
    
    const response = await fetch(`${ELEVEN_LABS_CONFIG.API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_LABS_CONFIG.API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    return await response.arrayBuffer();
  }

  async stop() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        console.log('Audio already stopped');
      }
      this.currentSource = null;
    }
  }

  async playAudio(text: string, language: string): Promise<void> {
    await this.stop();

    const cacheKey = this.getCacheKey(text, language);
    let audioData: ArrayBuffer;

    if (audioCache.has(cacheKey)) {
      audioData = audioCache.get(cacheKey)!;
    } else {
      try {
        audioData = await this.fetchAudio(text, language);
        audioCache.set(cacheKey, audioData);
      } catch (error) {
        console.error('Error fetching audio:', error);
        throw error;
      }
    }

    const context = await this.getAudioContext();
    const audioBuffer = await context.decodeAudioData(audioData.slice(0));
    
    this.currentSource = context.createBufferSource();
    this.currentSource.buffer = audioBuffer;
    this.currentSource.connect(context.destination);
    
    this.currentSource.start(0);
    
    return new Promise((resolve) => {
      this.currentSource!.onended = () => {
        this.currentSource = null;
        resolve();
      };
    });
  }
}

export const elevenlabsService = ElevenLabsService.getInstance(); 