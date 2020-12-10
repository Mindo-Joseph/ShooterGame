import Phaser from 'phaser';
import Bullet from '../Objects/Bullet';

const MAX_PLAYER_SPEED = 200;
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  create() {
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 0.72);

    // Create movement joystick
    this.movementJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
      x: 100,
      y: this.cameras.main.height - 125,
      radius: 40,
      forceMin: 0,
      base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
      thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
    }).on('update', () => {}, this);

    // Create shooting joystick
    this.shootJoyStick = this.plugins.get('rexvirtualjoystickplugin').add(this.scene, {
      x: this.cameras.main.width - 100,
      y: this.cameras.main.height - 125,
      radius: 20,
      forceMin: 0,
      base: this.add.circle(0, 0, 60, 0x888888, 0.5).setDepth(100).setAlpha(0.25),
      thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
    }).on('update', () => {}, this);

    // Move joysticks dynamically based on pointer-down
    this.input.on('pointerdown', (pointer) => {
      if (pointer.x <= this.cameras.main.width * 0.4) {
        this.movementJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5);
        this.movementJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1);
      }
      if (pointer.x >= this.cameras.main.width * 0.6) {
        this.shootJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5);
        this.shootJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1);
      }
    });

    // Add transparency to joysticks on pointer-up
    this.input.on('pointerup', () => {
      if (!this.movementJoyStick.force) {
        this.movementJoyStick.base.setAlpha(0.25);
        this.movementJoyStick.thumb.setAlpha(0.5);
      }
      if (!this.shootJoyStick.force) {
        this.shootJoyStick.base.setAlpha(0.25);
        this.shootJoyStick.thumb.setAlpha(0.5);
      }
    });

    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    this.bulletCooldown = 0;
    // this.physics.add.collider(player,platform)
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  update(time, delta) {
    if (this.bulletCooldown > 0) {
      // Reduce bullet cooldown
      this.bulletCooldown -= delta;
    }

    if (this.shootJoyStick.force) {
      // Rotate according to joystick
      this.player.setAngle(this.shootJoyStick.angle);

      // Fire bullet according to joystick
      if (this.shootJoyStick.force >= this.shootJoyStick.radius && this.bulletCooldown <= 0) {
        const bullet = this.bullets.get().setActive(true).setVisible(true);
        bullet.fire(this.player);

        this.bulletCooldown = 100;
      }
    }

    if (this.movementJoyStick.force) {
      // Calculate speed based on joystick force
      // eslint-disable-next-line max-len
      const speedMultiplier = (this.movementJoyStick.force < this.movementJoyStick.radius) ? this.movementJoyStick.force / this.movementJoyStick.radius : 1;
      const speed = MAX_PLAYER_SPEED * speedMultiplier;

      // Move player according to movement joystick
      this.player.setVelocityX(speed * Math.cos(Math.PI * (this.movementJoyStick.angle / 180)));
      this.player.setVelocityY(speed * Math.sin(Math.PI * (this.movementJoyStick.angle / 180)));
    } else {
      // Stop moving
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }
}
