import Phaser from 'phaser';

import setScore from '../leaderboard/leaderboard';

import { playerName } from './BootScene';
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

    this.message = this.add
      .text(400, 100, 'Game Over !!!', {
        color: '#FFFFFF',
        fontSize: 60,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    this.message = this.add
      .text(400, 200, kills, {
        color: '#FFFFFF',
        fontSize: 60,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    setScore(gameDetails);
  }
}
