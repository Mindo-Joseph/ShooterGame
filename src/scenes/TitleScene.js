import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('titleScene');
  }

  create() {
    const button = this.add.image(450, 270, 'startbutton').setScale(1.25);
    button.setInteractive();
    const self = this;
    this.input.on('gameobjectdown', () => {
      self.scene.start('gameScene');
    });
  }
}
