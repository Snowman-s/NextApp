import { Player } from "./Player";

export class FieldContext {
    constructor(player1 : Player, player2 : Player){
        this._player1 = player1;
        this._player2 = player2;
    }

    private _player1 : Player
    private _player2 : Player

    public get player1() : Player {
        return this._player1;
    }
    
    public get player2() : Player {
        return this._player2;
    }
}