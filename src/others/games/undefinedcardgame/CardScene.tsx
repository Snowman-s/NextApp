import { CustomP5 } from "src/others/CustomP5";
import P5Button from "../P5Button";
import P5Typography from "../P5Typography";
import { createRandomCard } from "./cards/Card";
import { Player } from "./fields/Player";
import Scene from "./Scene";
import calcCenterSquare from "./Utility";

export default class CardScene extends Scene{
    startButton: P5Button;
    titleText: P5Typography;

    player1InfoText: P5Typography;
    player2InfoText: P5Typography;

    c: {x:number, y:number, size:number}

    player1 : Player;
    player2 : Player;
    turnPlayer: Player;

    scaleToWorldX(normalizedX:number){
        return normalizedX * this.c.size;
    }

    scaleToWorldY(normalizedY:number){
        return normalizedY * this.c.size;
    }

    convertToWorldX(normalizedX:number){
        return this.c.x + normalizedX * this.c.size;
    }

    convertToWorldY(normalizedY:number){
        return this.c.y + normalizedY * this.c.size;
    }

    init(p5: CustomP5): void {
        this.c = calcCenterSquare(p5);

        this.titleText = new P5Typography();
        this.titleText.setGeometry(
            this.convertToWorldX(0.2), 
            this.convertToWorldY(0.4), 
            this.scaleToWorldX(0.6), 
            this.scaleToWorldY(0.2)
        );
        this.titleText.setFillColor(p5.color(0));
        this.titleText.setStrokeColor(p5.color(0));
        this.titleText.setTextColor(p5.color(255, 100));
        this.titleText.setText("あんのうん")

        this.player1InfoText = new P5Typography();
        this.player1InfoText.setGeometry(
            this.convertToWorldX(0), 
            this.convertToWorldY(0.6), 
            this.scaleToWorldX(0.3), 
            this.scaleToWorldY(0.2)
        );
        this.player1InfoText.setFillColor(p5.color(0, 0));
        this.player1InfoText.setStrokeColor(p5.color(255));
        this.player1InfoText.setTextColor(p5.color(255));

        this.player2InfoText = new P5Typography();
        this.player2InfoText.setGeometry(
            this.convertToWorldX(0.7), 
            this.convertToWorldY(0.2), 
            this.scaleToWorldX(0.3),
            this.scaleToWorldY(0.2)
        );
        this.player2InfoText.setFillColor(p5.color(0, 0));
        this.player2InfoText.setStrokeColor(p5.color(255));
        this.player2InfoText.setTextColor(p5.color(255));

        this.player1 = new Player(20, 0);

        this.player1.cards = this.player1.cards.concat(
            createRandomCard(),
            createRandomCard(),
            createRandomCard(),
            createRandomCard(),
            createRandomCard()
        );

        this.player2 = new Player(20, 0);

        this.player2.cards = this.player2.cards.concat(
            createRandomCard(),
            createRandomCard(),
            createRandomCard(),
            createRandomCard(),
            createRandomCard()
        );

        this.turnPlayer = this.player1;
    }
    
    update(p5: CustomP5): void {
        this.titleText.update(p5);
        this.player1InfoText.setText(
            "Life:" + this.player1.life.toString() + "\n" +
            "Mana:" + this.player1.mana.toString() + "\n"
        );
        this.player1InfoText.update(p5);
        this.player2InfoText.setText(
            "Life:" + this.player2.life.toString() + "\n" +
            "Mana:" + this.player2.mana.toString() + "\n"
        );
        this.player2InfoText.update(p5);
    }

    draw(p5: CustomP5): void {
        p5.background(128);

        p5.push();
        p5.noStroke();
        p5.fill(0);
        p5.square(this.c.x, this.c.y, this.c.size);
        p5.pop();

        this.titleText.draw(p5);

        this.player1InfoText.draw(p5);

        this.player1.cards.forEach(
            (card, index) => {
                const cardSize = this.scaleToWorldX(0.2);
                const x = this.convertToWorldX(0.2 * index);
                const y = this.convertToWorldY(1) - cardSize;

                p5.push();
                p5.fill(255);
                p5.square(x, y, cardSize);
                p5.fill(0);
                p5.stroke(0);
                p5.textSize(p5.int(0.3 * cardSize));
                p5.textAlign(p5.LEFT);
                p5.text(card.getCost().toString(), x, y, x + cardSize);
                p5.textSize(p5.int(0.15 * cardSize));
                p5.text(card.getText(), x, y + cardSize * 0.4, cardSize);
                p5.pop();
            }
        )

        this.player2InfoText.draw(p5);

        this.player2.cards.forEach(
            (_card, index) => {
                const cardSize = this.scaleToWorldX(0.2);
                const x = this.convertToWorldX(0.2 * index);
                const y = 0;

                p5.push();
                p5.fill(255);
                p5.square(x, y, cardSize);
                p5.pop();
            }
        )
    }
}