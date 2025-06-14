import 'package:audioplayers/audioplayers.dart';
import '../../data/models/models.dart';

class AudioService {
  static final AudioService _instance = AudioService._internal();
  factory AudioService() => _instance;
  AudioService._internal() {
    // Initialiser les deux AudioPlayers globaux
    _audioPlayerMusic = AudioPlayer();
    _audioPlayerMusic.setReleaseMode(ReleaseMode.loop);
    print('🔊 🎵 AudioPlayerMusic initialisé: ${_audioPlayerMusic.state}');

    print('🔊 🎵 AudioPlayerMusic initialisé: ${_audioPlayerMusic.playerId}');
    _audioPlayerSFX = AudioPlayer();
    _audioPlayerSFX.setReleaseMode(ReleaseMode.release);
    print('🔊 🎵 AudioPlayerSFX initialisé: ${_audioPlayerSFX.state}');
    print('🔊 🎵 AudioPlayerSFX initialisé: ${_audioPlayerSFX.playerId}');
  }

  // Deux AudioPlayers globaux
  late AudioPlayer _audioPlayerMusic; // Pour la musique de fond

  late AudioPlayer _audioPlayerSFX; // Pour tous les effets sonores

  bool _soundEnabled = true;

  // Getters/Setters pour les préférences
  bool get soundEnabled => _soundEnabled;
  set soundEnabled(bool enabled) => _soundEnabled = enabled;

  // Musique de fond
  Future<void> playPackOpeningMusic() async {
    if (!_soundEnabled) return;
    try {
      print(
        '🔊 🎵 Tentative lecture pack_opening.mp3 en boucle sur audioPlayerMusic',
      );

      // Configurer et lancer la musique
      print('ID: ${_audioPlayerMusic.playerId}');
      await _audioPlayerMusic.setVolume(0.3);
      await _audioPlayerMusic.play(AssetSource('sounds/pack_opening.mp3'));

      print('🔊 ✅ Musique pack_opening lancée en boucle sur audioPlayerMusic');
    } catch (e) {
      print('🔊 ❌ Erreur musique pack_opening: $e');
    }
  }

  Future<void> stopPackOpeningMusic() async {
    try {
      print('🔊 🎵 Arrêt de la musique pack_opening');
      await _audioPlayerMusic.stop();
      print('🔊 ✅ Musique pack_opening arrêtée');
    } catch (e) {
      print('🔊 ❌ Erreur arrêt musique: $e');
    }
  }

  bool get isMusicPlaying => _audioPlayerMusic.state == PlayerState.playing;

  // Vérifier et maintenir la musique en boucle
  Future<void> ensureMusicIsPlaying() async {
    if (!_soundEnabled) return;

    if (_audioPlayerMusic.state != PlayerState.playing) {
      print('🔊 🎵 Musique arrêtée détectée, relance...');
      await playPackOpeningMusic();
    }
  }

  // Jouer un SFX sur l'AudioPlayer dédié aux effets sonores
  Future<void> _playSFX(String soundFile, {double volume = 1.0}) async {
    if (!_soundEnabled) return;

    try {
      print('🔊 🎯 Lecture SFX: $soundFile sur audioPlayerSFX');

      // Configurer et jouer le SFX
      print('🔊 🎯 Volume: $volume');
      print('🔊 🎯 AudioPlayerSFX: ${_audioPlayerSFX.state}');
      print('🔊 🎯 AudioPlayerSFX: ${_audioPlayerSFX.playerId}');
      await _audioPlayerSFX.setVolume(volume);
      await _audioPlayerSFX.play(AssetSource(soundFile));

      print('🔊 ✅ SFX $soundFile lancé sur audioPlayerSFX');
    } catch (e) {
      print('🔊 ❌ Erreur SFX $soundFile: $e');
    }
  }

  // Sons d'interface
  Future<void> playBoosterSelect() async {
    print('🔊 🎯 Lancement booster select sur SFX player...');
    await _playSFX('sounds/booster_select.mp3', volume: 0.8);
  }

  Future<void> playSwipeOpen() async {
    print('🔊 🎯 Lancement swipe open sur SFX player...');
    await _playSFX('sounds/swipe_open.mp3', volume: 0.9);
  }

  Future<void> playCardReveal() async {
    print('🔊 🎯 Lancement card reveal sur SFX player...');
    await _playSFX('sounds/card_reveal.mp3', volume: 0.8);
  }

  // Sons de rareté
  Future<void> playRaritySound(PrankRarity rarity) async {
    if (!_soundEnabled) return;

    String soundFile;
    double volume;
    switch (rarity) {
      case PrankRarity.common:
        soundFile = 'sounds/rarity_common.mp3';
        volume = 0.7;
        break;
      case PrankRarity.rare:
        soundFile = 'sounds/rarity_rare.mp3';
        volume = 0.8;
        break;
      case PrankRarity.extreme:
        soundFile = 'sounds/rarity_extreme.mp3';
        volume = 1.0;
        break;
    }

    try {
      print('🔊 🎯 Lancement son rareté ${rarity.name} sur SFX player...');
      await _playSFX(soundFile, volume: volume);
    } catch (e) {
      print('🔊 ❌ Erreur audio rareté ${rarity.name}: $e');
    }
  }

  // Méthodes utilitaires
  Future<void> setMusicVolume(double volume) async {
    try {
      await _audioPlayerMusic.setVolume(volume.clamp(0.0, 1.0));
    } catch (e) {
      print('🔊 Erreur volume musique: $e');
    }
  }

  Future<void> setSFXVolume(double volume) async {
    try {
      await _audioPlayerSFX.setVolume(volume.clamp(0.0, 1.0));
    } catch (e) {
      print('🔊 Erreur volume SFX: $e');
    }
  }

  Future<void> stopMusic() async {
    try {
      await _audioPlayerMusic.stop();
    } catch (e) {
      print('🔊 Erreur arrêt musique: $e');
    }
  }

  Future<void> stopSFX() async {
    try {
      await _audioPlayerSFX.stop();
    } catch (e) {
      print('🔊 Erreur arrêt SFX: $e');
    }
  }

  Future<void> stopAll() async {
    await stopMusic();
    await stopSFX();
  }

  void dispose() {
    _audioPlayerMusic.dispose();
    _audioPlayerSFX.dispose();
  }
}
