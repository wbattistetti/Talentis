class AudioPlayer {
  private static instance: AudioPlayer;
  private audio: HTMLAudioElement | null = null;

  private constructor() {
    // Singleton pattern
  }

  static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  private getAudioFileName(instruction: string, language: string, specificFile?: string): string {
    if (specificFile) {
      // If a specific file is provided, use it directly
      const langCode = language.toUpperCase();
      return `/waves/${specificFile}_${langCode}.mp3`;
    }

    // Fallback to the default mapping if no specific file is provided
    const fileMapping: { [key: string]: string } = {
      'biometric.startInstructions': 'StartingVideo',
      'biometric.lookStraight': 'YouAreLookingIntoTheCamera',
      'biometric.turnLeft': 'YouAreTurningHeadToASide',
      'biometric.turnRight': 'YouAreTurningHeadOtherSide',
      'biometric.liftChin': 'YouAreRisingYourChin',
      'biometric.lowerChin': 'YouAreDroppingYourChin',
      'biometric.blink': 'YourBlinkingYourEyes',
      'biometric.smile': 'YouAreSmiling',
      'biometric.finished': 'PerfectWeHaveFinished',
    };

    const baseFileName = fileMapping[instruction];
    if (!baseFileName) {
      console.warn(`No audio file mapping for instruction: ${instruction}`);
      return '';
    }

    // Ensure language is uppercase for file naming convention
    const langCode = language.toUpperCase();
    return `/waves/${baseFileName}_${langCode}.mp3`;
  }

  async playAudio(instruction: string, language: string, specificFile?: string): Promise<void> {
    await this.stop();

    try {
      const audioFile = this.getAudioFileName(instruction, language, specificFile);
      if (!audioFile) {
        console.warn('No audio file path generated');
        return;
      }

      this.audio = new Audio(audioFile);
      
      // Add error handling for audio loading
      this.audio.onerror = (e) => {
        console.error('Error loading audio file:', audioFile, e);
      };

      await this.audio.play();

      return new Promise((resolve) => {
        if (this.audio) {
          this.audio.onended = () => {
            this.audio = null;
            resolve();
          };
        } else {
          resolve();
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      // Don't throw the error, just log it and continue
      return Promise.resolve();
    }
  }

  async stop(): Promise<void> {
    if (this.audio) {
      try {
        await this.audio.pause();
        this.audio.currentTime = 0;
      } catch (e) {
        console.log('Audio already stopped');
      }
      this.audio = null;
    }
  }
}

export const audioPlayer = AudioPlayer.getInstance(); 