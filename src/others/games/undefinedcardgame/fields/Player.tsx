import { Card } from "../cards/Card";

export class Player {
    constructor(firstLife: number, firstMana: number){
        this._life = firstLife;
        this._mana = firstMana;
    }

    private _life: number;
    private _mana: number;
    private _cards : Card[] = [];

    public get life(){
        return this._life;
    }

    public set life(it: number){
        this._life = it;
    }
    
    public get mana(){
        return this._mana;
    }

    public set mana(it: number){
        this._mana = it;
    }

    public get cards(){
        return this._cards.concat();
    }

    public set cards(it){
        this._cards = it;
        this._cards.sort((a, b) => a.getCost() - b.getCost());
    }
}