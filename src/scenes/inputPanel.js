import Phaser from "phaser";
import { kills } from './GameScene';
import { setScore } from '../leaderboard/leaderboard';
export default class InputPanel extends Phaser.Scene {
  constructor() {
    super("rexUI");
  }

  getUsername(textToAdd) {
    
  }
  create() {
    this.add.image(480, 200, 'namerequest').setScale(1.15);
    const text = this.add.text(400, 300, "Default User", {
      fixedWidth: 150,
      fixedHeight: 36,
    });

    text.setOrigin(0.5, 0.5);
    
    text.setInteractive().on("pointerdown", (event) => {
      const input = this.rexUI.edit(text);
      let code = event.keyCode;

      if(code == Phaser.Input.Keyboard.KeyCodes.ENTER)
      {
        const elem = input.inputText.node.value;
        localStorage.setItem('playername', elem);
      }

    });
    const submit = this.add.image(480, 450, 'submitbtn').setScale(0.75);
    submit.setInteractive().on("pointerdown", () => {
      const username = localStorage.getItem('playername');
      const gameDetails = {
        user: username,
        score: kills,
      }
      setScore(gameDetails);
      window.open("../src/leaderboard/leaderboard.html",  "_blank")
     
    });

    
  }
  
   
}
