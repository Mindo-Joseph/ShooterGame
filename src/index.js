import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  width: 960,
  height: 540,
  backgroundColor: 'black',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [],
  pixelArt: true,
  roundPixels: true,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('titleScene', TitleScene);
    this.scene.add('gameScene', GameScene);
    this.scene.start('BootScene');
  }
}

window.game = new Game();
