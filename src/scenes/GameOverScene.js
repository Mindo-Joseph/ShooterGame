import Phaser from 'phaser';

import { kills } from './GameScene';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    const button = this.add.image(450, 270, 'gameoverscreen').setScale(1.25);
    button.setInteractive();
    const self = this;
    this.input.on('gameobjectdown', () => {
      self.registry.destroy();
      self.events.off();
      self.scene.start('gameScene');
    });
    this.message = this.add
      .text(400, 320, kills, {
        color: '#FFFFFF',
        fontSize: 60,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }
}
