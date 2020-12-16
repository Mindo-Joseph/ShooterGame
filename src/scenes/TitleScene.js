import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() { super('titleScene'); }

  create() {
    this.message = this.add
                       .text(400, 100, 'Hello, --', {
                         color : '#FFFFFF',
                         fontSize : 60,
                         fontStyle : 'bold',
                       })
                       .setOrigin(0.5);
    const button = this.add.image(200, 270, 'startbutton').setScale(0.25);
    button.setInteractive();
    const self = this;
    this.input.on('gameobjectdown', () => { self.scene.start('gameScene'); });
  }
}
