import Phaser from 'phaser';
import { setScore } from '../leaderboard/leaderboard';
import { kills } from './GameScene';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOver');
  }

  create() {
    const username = localStorage.getItem('playername');
    const gameDetails = {
      user: username,
      score: kills,
    };
    setScore(gameDetails);
    this.add.image(450, 200, 'gameoverscreen').setScale(1.25);
    const viewboard = this.add.image(240, 400, 'viewboard').setScale(0.5);
    const newgame = this.add.image(500, 400, 'newgame').setScale(0.5);
    viewboard.setInteractive().on('pointerdown', () => {
      window.open('../src/leaderboard/leaderboard.html', '_blank');
    });
    newgame.setInteractive().on('pointerdown', () => {
      this.game.destroy(true);
      window.location.reload();
    });
  }
}
