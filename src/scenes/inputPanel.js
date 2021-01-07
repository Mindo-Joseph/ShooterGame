import Phaser from 'phaser';
import { kills } from './GameScene';
import { setScore } from '../leaderboard/leaderboard';

export default class InputPanel extends Phaser.Scene {
  constructor() {
    super('nameInput');
  }

  create() {
    this.add.image(480, 200, 'namerequest').setScale(1.15);
    this.message = this.add.text(400, 250, "Press ENTER when done", {
      color: "#FFFFFF",
      fontSize: 20,
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.nameInput = this.add.dom(400, 300).createFromCache('form');
    this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.returnKey.on('down', () => {
      let name = this.nameInput.getChildByName('name');
      if (name.value != "") {
        localStorage.setItem('playername', name.value);
        name.value = "";
      };
    });
    const submit = this.add.image(400, 400, 'continue').setScale(0.45);
    submit.setInteractive().on('pointerdown', () => {
      this.scene.start('titleScene');
      
      
    });
   
  }
}
