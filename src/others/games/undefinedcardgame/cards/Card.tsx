class Effect {
    execute(){

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

    executeEffects(){
        this.effects.forEach(effect => effect.execute());
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