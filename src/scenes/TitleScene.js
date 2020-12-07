import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  create() {
    this.add.image(480, 270, 'spacebackground');
    const button = this.add.image(480, 270, 'startbutton').setScale(0.25);
    button.setInteractive();
    const self = this;
    this.input.on('gameobjectdown', () => {
      self.scene.start('gameScene');
    });
  }
}
