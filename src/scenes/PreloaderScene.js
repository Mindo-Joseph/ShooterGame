/* eslint-disable import/extensions */
import Phaser from 'phaser';
import rexvirtualjoystickplugin from '../plugins/rexvirtualjoystickplugin.min.js';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(10000, this.ready, [], this);

    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('joystick', 'assets/joystick.png');
    this.load.image('zombie', 'assets/zombie.png');
    this.load.image('woman', 'assets/womanenemy.png');
    this.load.image('startbutton', 'assets/startgame.png');
    this.load.image('killedmenu', 'assets/killedmenu.png');
    this.load.image('continuebtn', 'assets/continuebtn.png');
    this.load.image('quitbutton', 'assets/quitbutton.png');
    this.load.image('gameoverscreen', 'assets/gameover.png');
    this.load.image('namerequest', 'assets/namerequest.png');
    this.load.image('submitbtn', 'assets/leaderboardviewbtn.png');

    this.load.audio('laser', 'assets/laser.wav');
    this.load.audio('gameover', 'assets/gameover.wav');
    this.load.plugin('rexvirtualjoystickplugin', rexvirtualjoystickplugin, true);
  }

  ready() {
    this.scene.start('titleScene');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('titleScene');
    }
  }
}
