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

    @property(cc.Node) birdNode: cc.Node = null;

    @property(cc.Sprite) bg0: cc.Sprite = null;
    @property(cc.Sprite) bg1: cc.Sprite = null;

    @property(cc.Node) pipe0: cc.Node = null;
    @property(cc.Node) pipe1: cc.Node = null;
    @property(cc.Node) pipe2: cc.Node = null;

    @property birdSpeed = 0;
    @property pipeSpeed = 1.1;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log(" main controller start ")
        
        this.resetPipe()
    }

    update (dt) {
        this.birdSpeed -= 0.1;
        this.birdNode.y += this.birdSpeed; 



        this.moveBg(this.bg0);
        this.moveBg(this.bg1);
        this.movePipe(this.pipe0);
        this.movePipe(this.pipe1);
        this.movePipe(this.pipe2);
    }

    moveBg (bg: cc.Sprite) {
        bg.node.x -= 1;
        
        if (bg.node.x < -bg.node.width) {
            bg.node.x += 2 * bg.node.width;
        }
    }

    movePipe (pipe: cc.Node) {
        pipe.x -= this.pipeSpeed;
        if (pipe.x < -(288+52)/2) {
            pipe.x += (288+52)/2*3; 

            pipe.y = 50 - (Math.random() * 100);
        }
    } 

    resetPipe() {
        let pipeOx = 170;
        let pipeSpace = (288+52)/2;
        this.pipe0.x = pipeOx + pipeSpace * 0;
        this.pipe1.x = pipeOx + pipeSpace * 1;
        this.pipe2.x = pipeOx + pipeSpace * 2;

        this.pipe0.y = 50 - (Math.random() * 100);
        this.pipe1.y = 50 - (Math.random() * 100);
        this.pipe2.y = 50 - (Math.random() * 100);
    }

    clickJumpBtn() {
        console.log("click jump btn")
        this.birdSpeed = 3;
    }
}
