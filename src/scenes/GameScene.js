import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  create() {
    this.add.image(480, 270, 'backgroundlayer');
    this.add.image(480, 270, 'foregroundlayer');
    this.add.image(480, 270, 'all');
  }
}
