import { FieldContext } from "../fields/FieldContext";

class Effect {
    execute(context: FieldContext){

    }
}

export class Card{
    private cost: number;
    private effects: Effect[];

    constructor(cost: number, effects: Effect[]){
        this.cost = cost;
        this.effects = effects.concat();
    }

    getCost(){
        return this.cost;
    }

    getText(){
        return this.effects.map(effect => "・" + effect.toString() + "\n").join("");
    }

    executeEffects(context: FieldContext){
        this.effects.forEach(effect => effect.execute(context));
    }
}

export function createRandomCard() : Card{
    return new Card(Math.floor(7 * Math.random()), [
        new class extends Effect{
            toString(){
                return "▽◇";
            }
        },
        new class extends Effect{
            toString(){
                return "○×☆";
            }
        } 
    ]);
}