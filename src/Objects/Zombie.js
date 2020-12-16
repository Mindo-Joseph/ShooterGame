import Phaser from 'phaser';
import Entity from './Entity';

export default class ZombieEnemy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'zombie', 'zombieEnemy');
    this.body.velocity.x = -Phaser.Math.Between(20, 100);
  }
}
