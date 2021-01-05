import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import BootScene from './scenes/BootScene';
import GameOverScene from './scenes/GameOverScene';
import GameScene from './scenes/GameScene';
import InputPanel from './scenes/inputPanel';
import LifeEndedScene from './scenes/lifeEndedScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  width: 960,
  height: 540,
  parent: 'phaser-conatiner',
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  backgroundColor: '#000',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      debug: false,
    },
  },
  input: {
    activePointers: 3,
  },
  scene: [],
  pixelArt: true,
  roundPixels: true,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('BootScene', BootScene);
    this.scene.add('rexUI',InputPanel)
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('titleScene', TitleScene);
    this.scene.add('gameScene', GameScene);
    this.scene.add('lifeEndedScene',LifeEndedScene)
    this.scene.add('gameOver', GameOverScene);
    this.scene.start('BootScene');
  }
}

window.game = new Game();
