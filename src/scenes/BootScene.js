import Phaser from 'phaser';
import generateName from '../helpers/generatename';
import { generateGameId } from '../leaderboard/leaderboard';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('mainImage', 'assets/mainImage.png');
    this.load.audio('zombiesound', 'assets/zombiesound.wav');
  }

  create() {
    this.add.image(480, 270, 'mainImage').setScale(1.25);
    const sfx = this.sound.add('zombiesound');
    sfx.play();
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.scene.start('Preloader');
  }
}
const SAVED_NAME = generateName();
const playerName = generateName();
generateGameId(SAVED_NAME);
export { playerName };
