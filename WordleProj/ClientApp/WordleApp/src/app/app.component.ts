import { Component } from '@angular/core';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  value = "";
  keyboard: Keyboard;

  public wordOfTheDay: string = "WHIMP";
  public attemptCount: number = 6;
  public letterCount: number = 5;
  public nextLetter = 0;
  public currentGuess = [];
  public wordChar: string[] = this.wordOfTheDay.split("");

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        default: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{enter} Z X C V B N M {bksp}"
        ]
      }
    });

    let board = document.getElementById("wordle-board");

    for (let i = 0; i < this.attemptCount; i++) {
      let row = document.createElement("div")
      row.className = "letter-row"

      for (let j = 0; j < this.letterCount; j++) {
        let box = document.createElement("div")
        box.className = "letter-box"
        row.appendChild(box)
      }

      board.appendChild(row)
    }
  }

  onKeyPress = (button: string) => {
    if (button == "{enter}") {
      if (this.nextLetter == this.letterCount) this.compareInputs(this.currentGuess);
    }

    else if (button == "{bksp}") {
      if (this.nextLetter > 0) {
       
        let row = document.getElementsByClassName("letter-row")[6 - this.attemptCount]
        let box = row.children[this.nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
        this.currentGuess.pop()
        this.nextLetter--;
      }
    }
    else {
      if (this.nextLetter < this.letterCount) {
        let row = document.getElementsByClassName("letter-row")[6 - this.attemptCount]
        let box = row.children[this.nextLetter]
        box.textContent = button
        box.classList.add("filled-box")
        this.currentGuess.push(button)
        this.nextLetter += 1
      }
    }
  };

  //onInputChange = (event: any) => {
  //  this.keyboard.setInput(event.target.value);
 
  //};

  compareInputs(currentGuess:any[]): void {
    
    let color = '';
    let row = document.getElementsByClassName("letter-row")[6 - this.attemptCount]

    if (JSON.stringify(currentGuess) == JSON.stringify(this.wordChar)) {
      for (let i = 0; i < this.letterCount; i++) {
        let box = row.children[i]
        box.classList.add("bgcolorgreen")
      }
      this.attemptCount = 0
      
    }
    else {

      for (let i = 0; i < this.letterCount; i++) {

        let box = row.children[i]
        let letter = currentGuess[i]
       
        if (this.wordChar.indexOf(letter) === -1)
          box.classList.add("bgcolorgrey");
        else if (this.wordChar.indexOf(letter) === i)
          box.classList.add("bgcolorgreen");
        else box.classList.add("bgcoloryellow");
      }
      this.attemptCount -= 1;
      this.currentGuess = [];
      this.nextLetter = 0;
    }
    ;
  }

}
