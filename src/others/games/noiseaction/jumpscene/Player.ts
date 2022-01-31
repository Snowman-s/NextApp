import { CustomP5 } from "src/others/CustomP5";
import Inputs from "../Inputs";
import Stage from "./Stage";

export default class Player {
  private gravityAccel = 0;
  private speedY = 0;
  private maxSpeedY = 0;
  private canJump = false;

  constructor(private x: number, private y: number, private size: number) {}

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getGravityAccel() {
    return this.gravityAccel;
  }

  getSize() {
    return this.size;
  }

  setPosition(position: { x: number; y: number }) {
    this.x = position.x;
    this.y = position.y;
  }

  setGravityAccel(gravityAccel: number) {
    this.gravityAccel = gravityAccel;
  }

  setMaxSpeedY(maxSpeedY: number) {
    this.maxSpeedY = maxSpeedY;
  }

  setSize(size: number) {
    this.size = size;
  }

  update(p5: CustomP5) {
    this.moveByKey(p5);

    let deltaSeconds = p5.deltaTime / 1000;

    this.speedY = p5.min(
      this.speedY + deltaSeconds * this.getGravityAccel(),
      this.maxSpeedY
    );

    let newY = this.y + deltaSeconds * this.speedY;

    let stage = Stage.getInstance();

    let collisions = stage.getAllCollision();

    //飛べるかどうかの判定を今から行う
    this.canJump = false;

    collisions.forEach((c) => {
      if (p5.abs(c.getCenterX() - this.x) > (c.getWidth() + this.size) / 2) {
        //台にのってないので関係なし
        return;
      }

      let cUpSideY = c.getCenterY() - c.getHeight() / 2;

      //猶予
      let pDownSideY = this.y + (this.getSize() / 2) * 0.8;
      let newPDownSideY = newY + this.getSize() / 2;

      if (pDownSideY <= cUpSideY && cUpSideY <= newPDownSideY) {
        //通り抜けたので戻す
        newY = cUpSideY - this.getSize() / 2;
        this.speedY = 0;
        this.canJump = true;
      }
    });

    this.y = newY;

    this.collectLight(p5);
  }

  private collectLight(p5: CustomP5) {
    let lights = Stage.getInstance().getAllLights();

    let intersectLight = lights.find((light) => {
      return (
        p5.abs(this.x - light.getPosition().x) * 2 <
          light.getSize() + this.getSize() &&
        p5.abs(this.y - light.getPosition().y) * 2 <
          light.getSize() + this.getSize()
      );
    });

    if (intersectLight == undefined) return;

    Stage.getInstance().decreaseDarkness();
    Stage.getInstance().removeLight(intersectLight);
  }

  private moveByKey(p5: CustomP5) {
    let deltaSeconds = p5.deltaTime / 1000;

    if (Inputs.getInstance().isLeftInputExists()) {
      this.x -= deltaSeconds * 80;
    }
    if (Inputs.getInstance().isRightInputExists()) {
      this.x += deltaSeconds * 80;
    }
    if (Inputs.getInstance().isUpInputExists() && this.canJump) {
      this.speedY = -500;
      this.canJump = false;
    }
  }

  render(p5: CustomP5) {
    //顔
    p5.push();
    p5.stroke(0);
    p5.fill(255);
    p5.rectMode(p5.CENTER);
    p5.square(this.x, this.y, this.size);
    p5.pop();
    //眼
    p5.push();
    p5.noStroke();
    p5.fill(0);
    p5.rect(
      this.x - this.size / 3,
      this.y - this.size / 3,
      this.size / 6,
      (this.size * 2) / 3
    );
    p5.rect(
      this.x + this.size / 6,
      this.y - this.size / 3,
      this.size / 6,
      (this.size * 2) / 3
    );
    p5.pop();
  }
}
