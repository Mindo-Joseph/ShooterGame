import Phaser from "phaser";
import { kills } from './GameScene';
import { setScore } from '../leaderboard/leaderboard';
export default class InputPanel extends Phaser.Scene {
  constructor() {
    super("rexUI");
  }
  
  create() {
    const description = this.add.text(180, 200, "Enter your name to use leaderboard", {
      fixedWidth: 200,
      fixedHeight: 45,
    });
    description.setOrigin(0.2, 0.2);
    const text = this.add.text(400, 300, "Default User", {
      fixedWidth: 150,
      fixedHeight: 36,
    });

    text.setOrigin(0.5, 0.5);
    const submit = this.add.image(180, 450, 'submitbtn').setScale(0.5);
    const cancel = this.add.image(780, 450, 'cancelbtn').setScale(0.5);
    text.setInteractive().on("pointerdown", () => {
      const input = this.rexUI.edit(text);
      const elem = input.inputText.node.value;
      localStorage.setItem('playername', elem);

    });
    
    submit.setInteractive().on("pointerdown", () => {
      const username = localStorage.getItem('playername');
      const gameDetails = {
        user: username,
        score: kills,
      }
      setScore(gameDetails);
     
    });
    cancel.setInteractive().on("pointerdown", () => {
      window.open("../src/leaderboard/leaderboard.html",  "_blank")
    })
    
  }
  
  
}
