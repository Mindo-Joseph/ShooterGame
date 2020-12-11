import Phaser from 'phaser';
import Entity from './Entity';

class WomanEnemy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'woman', 'womanEnemy');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}
export default WomanEnemy;
