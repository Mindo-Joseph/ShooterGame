import Phaser from 'phaser';

import { setScore } from '../leaderboard/leaderboard';

import { playerName, SAVED_NAME } from './BootScene';
import { kills } from './GameScene';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    const gameDetails = {
      // eslint-disable-next-line quote-props
      user: playerName,
      // eslint-disable-next-line quote-props
      score: kills,
    };

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
    setScore(gameDetails, SAVED_NAME);
  }
}
