import Phaser from 'phaser';
import { kills } from './GameScene';
import { setScore } from '../leaderboard/leaderboard';

export default class InputPanel extends Phaser.Scene {
  constructor() {
    super('rexUI');
  }

  create() {
    this.add.image(480, 200, 'namerequest').setScale(1.15);
    const text = this.add.text(400, 300, 'Default User', {
      fixedWidth: 150,
      fixedHeight: 36,
    });

    text.setOrigin(0.5, 0.5);

    text.setInteractive().on('pointerdown', (event) => {
      const input = this.rexUI.edit(text);
      const code = event.keyCode;

      if (code === Phaser.Input.Keyboard.KeyCodes.ENTER) {
        input.close();
        const elem = input.inputText.node.value;

        localStorage.setItem('playername', elem);
      }
    });
    const submit = this.add.image(240, 400, 'submitbtn').setScale(0.75);
    const mainMenu = this.add.image(500, 400, 'mainmenubtn').setScale(0.75);
    submit.setInteractive().on('pointerdown', () => {
      const username = localStorage.getItem('playername');
      const gameDetails = {
        user: username,
        score: kills,
      };
      setScore(gameDetails).then((message) => console.log(message));
      window.open('../src/leaderboard/leaderboard.html', '_blank');
    });
    mainMenu.setInteractive().on('pointerdown', () => {
      this.game.destroy(true);
      window.location.reload();
    });
  }
}
