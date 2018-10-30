// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property(cc.Sprite) bird0 : cc.Sprite = null;
    @property(cc.Sprite) bird1 : cc.Sprite = null;
    @property(cc.Sprite) bird2 : cc.Sprite = null;
    @property(cc.Sprite) bird3 : cc.Sprite = null;
    
    @property speed : number = 0.18;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    
    start () {
        console.log("start bird node");
    }

    time : number = 0;
    update (dt:number) {
        this.time = this.time + dt;

        if (this.time > this.speed) {
            if (this.bird0.node.active == true) {
                this.bird0.node.active = false;
                this.bird1.node.active = true;
            } else if (this.bird1.node.active == true) {
                this.bird1.node.active = false;
                this.bird2.node.active = true;
            } else if (this.bird2.node.active == true) {
                this.bird2.node.active = false;
                this.bird3.node.active = true;
            } else if (this.bird3.node.active == true) {
                this.bird3.node.active = false;
                this.bird0.node.active = true;
            }
            this.time = 0;
        }
    }
}
