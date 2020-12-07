import Phaser from 'phaser';

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

    this.load.image('backgroundlayer', 'assets/background/backgroundlayer.png');
    this.load.image('foregroundlayer', 'assets/background/foregroundlayer.png');
    this.load.image('actions', 'assets/screen_assets/actions.png');
    this.load.image('all', 'assets/screen_assets/all.png');
    this.load.image('compass', 'assets/screen_assets/compass.png');
    this.load.image('indicator', 'assets/screen_assets/indicator.png');
    this.load.image('meters', 'assets/screen_assets/meters.png');
    this.load.image('spacebackground', 'assets/background/spacebackground.png');
    this.load.image('startbutton', 'assets/startgame.png');

    this.load.spritesheet('eye-guy', 'assets/sprites/baddie[eye-guy].png', {
      frameWidth: 277,
      frameHeight: 265,
    });
    this.load.spritesheet('legs-guy', 'assets/sprites/baddie[legs].png', {
      frameWidth: 323,
      frameHeight: 257,
    });
    this.load.spritesheet('bigGun', 'assets/sprites/bigGun.png', {
      frameWidth: 306,
      frameHeight: 107,
    });
    this.load.spritesheet('mainChar', 'assets/sprites/mainChar.png', {
      frameWidth: 250,
      frameHeight: 415,
    });
    this.load.spritesheet('smallGun', 'assets/sprites/smallGun.png', {
      frameWidth: 159,
      frameHeight: 57,
    });
  }

  ready() {
    this.scene.start('titleScene');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('titleScene');
    }
  }
}
