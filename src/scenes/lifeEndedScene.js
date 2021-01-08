import Phaser from 'phaser';

export default class LifeEndedScene extends Phaser.Scene {
  constructor() {
    super('lifeEndedScene');
  }

  create() {
    this.add.image(450, 270, 'killedmenu').setScale(1.25);
    const quitbutton = this.add.image(250, 400, 'quitbutton').setInteractive();
    const continuebtn = this.add
      .image(500, 400, 'continuebtn')
      .setInteractive();
    quitbutton.on('pointerdown', () => {
      this.registry.destroy();
      this.events.off();
      this.scene.start('gameOver');
    }, this);
    continuebtn.on('pointerdown', () => {
      this.registry.destroy();
      this.events.off();
      this.scene.start('gameScene');
    }, this);
  }
}
