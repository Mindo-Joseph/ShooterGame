import Phaser from 'phaser';

import setScore from '../leaderboard/leaderboard';
import Bullet from '../Objects/Bullet';
import WomanEnemy from '../WomanEnemy';
import ZombieEnemy from '../Zombie';

import {SAVED_NAME} from './BootScene';

const MAX_PLAYER_SPEED = 200;

let life = 0;
// eslint-disable-next-line import/no-mutable-exports
let kills = 1;
export default class GameScene extends Phaser.Scene {
  constructor() { super('gameScene'); }

  create() {
    this.player = this.physics.add.sprite(200, 200, 'player');
    this.anims.create({
      key : 'explode',
      frameRate : 10,
      frames :
          this.anims.generateFrameNumbers('explosion', {start : 0, end : 9}),
      repeat : -1,
    });
    this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 0.72);

    // Create movement joystick
    this.movementJoyStick = this.plugins.get('rexvirtualjoystickplugin')
                                .add(this.scene, {
                                  x : 100,
                                  y : this.cameras.main.height - 125,
                                  radius : 40,
                                  forceMin : 0,
                                  base : this.add.circle(0, 0, 60, 0x888888)
                                             .setDepth(100)
                                             .setAlpha(0.25),
                                  thumb : this.add.image(0, 0, 'joystick')
                                              .setDisplaySize(80, 80)
                                              .setDepth(100)
                                              .setAlpha(0.5),
                                })
                                .on('update', () => {}, this);

    // Create shooting joystick
    this.shootJoyStick = this.plugins.get('rexvirtualjoystickplugin')
                             .add(this.scene, {
                               x : this.cameras.main.width - 100,
                               y : this.cameras.main.height - 125,
                               radius : 20,
                               forceMin : 0,
                               base : this.add.circle(0, 0, 60, 0x888888, 0.5)
                                          .setDepth(100)
                                          .setAlpha(0.25),
                               thumb : this.add.image(0, 0, 'joystick')
                                           .setDisplaySize(80, 80)
                                           .setDepth(100)
                                           .setAlpha(0.5),
                             })
                             .on('update', () => {}, this);

    // Move joysticks dynamically based on pointer-down
    this.input.on('pointerdown', (pointer) => {
      if (pointer.x <= this.cameras.main.width * 0.4) {
        this.movementJoyStick.base.setPosition(pointer.x, pointer.y)
            .setAlpha(0.5);
        this.movementJoyStick.thumb.setPosition(pointer.x, pointer.y)
            .setAlpha(1);
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

    this.bullets =
        this.physics.add.group({classType : Bullet, runChildUpdate : true});
    this.bulletCooldown = 0;
    this.enemies = this.add.group();
    this.time.addEvent({
      delay : 2000,
      callback() {
        const enemy = new ZombieEnemy(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            Phaser.Math.Between(0, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope : this,
      loop : true,
    });
    this.time.addEvent({
      delay : 10000,
      callback() {
        const enemy = new WomanEnemy(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            Phaser.Math.Between(0, this.game.config.height),
        );
        this.enemies.add(enemy);
      },
      callbackScope : this,
      loop : true,
    });
    this.time.addEvent({
      delay : 1000,
      callback() {
        const laser = new Bullet(
            this,
            this.x,
            this.y,
        );
        laser.setScale(this.scaleX);
        this.bullets.add(laser);

        const bullet = this.bullets.get().setActive(true).setVisible(true);
        Phaser.Actions.Call(this.enemies.getChildren(),
                            (enemy) => { bullet.fire(enemy, 'enemy'); }, this);
      },
      callbackScope : this,
      loop : true,
    });
  }

  update(time, delta) {
    this.physics.collide(this.bullets, this.enemies, this.hitEnemy, null, this);
    this.physics.collide(this.bullets, this.player, this.hitPlayer, null, this);
    this.physics.collide(this.player, this.enemy, this.hitEnemy, null, this);
    if (this.bulletCooldown > 0) {
      // Reduce bullet cooldown
      this.bulletCooldown -= delta;
    }

    if (this.shootJoyStick.force) {
      // Rotate according to joystick
      this.player.setAngle(this.shootJoyStick.angle);

      // Fire bullet according to joystick
      if (this.shootJoyStick.force >= this.shootJoyStick.radius &&
          this.bulletCooldown <= 0) {
        const bullet = this.bullets.get().setActive(true).setVisible(true);
        bullet.fire(this.player, 'shooter');

        this.bulletCooldown = 100;
      }
    }

    if (this.movementJoyStick.force) {
      // Calculate speed based on joystick force
      // eslint-disable-next-line max-len
      const speedMultiplier =
          (this.movementJoyStick.force < this.movementJoyStick.radius)
              ? this.movementJoyStick.force / this.movementJoyStick.radius
              : 1;
      const speed = MAX_PLAYER_SPEED * speedMultiplier;

      // Move player according to movement joystick
      this.player.setVelocityX(
          speed * Math.cos(Math.PI * (this.movementJoyStick.angle / 180)));
      this.player.setVelocityY(
          speed * Math.sin(Math.PI * (this.movementJoyStick.angle / 180)));
    } else {
      // Stop moving
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }

  hitEnemy() {
    const {enemies} = this;
    enemies.kill();
    // eslint-disable-next-line no-unused-vars
    kills += 1;
  }

  hitPlayer() {
    if (life > 0) {
      life -= 1;
      this.scene.restart();
    } else {
      this.scene.start('gameOver');
    }
  }
}
export {kills};
