import Phaser from 'phaser';
import logoImg from './assets/logo.png';

function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  this.add.image((window.innerWidth * window.devicePixelRatio) / 2, (window.innerHeight * window.devicePixelRatio) / 2, 'logo');

  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1,
  // });
}
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth * window.devicePixelRatio,
  height: window.innerHeight * window.devicePixelRatio,
  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);
