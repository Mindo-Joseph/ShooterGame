import Phaser from "phaser";
import generateName from "../helpers/generatename";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    this.add.image(480, 270, "logo");
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  }

  ready() {
    this.scene.start("Preloader");
  }
}
const SAVED_NAME = generateName();
const playerName = generateName();

export { SAVED_NAME, playerName };
