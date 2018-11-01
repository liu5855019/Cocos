// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class Animal extends cc.Component {

    @property(cc.Node) front: cc.Node = null;
    @property(cc.Node) back: cc.Node = null;

    _isSelect = false;                 
    public get isSelect(): boolean {
        return this._isSelect;
    }
    public set isSelect(v: boolean) {
        this._isSelect = v;
        this.front.color = v ? cc.Color.RED : cc.Color.WHITE;
    }

    /** 象 = 0 ,...., 老鼠 = 7 */
    rank = -1;    

    /** 是否是红色的 */
    isRed = true;

    /** 是否已经阵亡 */
    _isOver = false;
    public get isOver() : boolean {
        return this._isOver
    }
    public set isOver(v : boolean) {
        this._isOver = v;
        if (v) {
            this.isSelect = false;
        }
    }
    
    


    start() {
        this.front.x = 0;
        this.front.y = 0;
        this.back.x = 0;
        this.back.y = 0;
    }

    isBigTo(other:Animal) :number
    {
        if (this.rank == 7 && other.rank == 0) {
            return 1;
        }
        if (this.rank == 0 && other.rank == 7) {
            return -1;
        }
        if (this.rank == other.rank) {
            return 0;
        }
        if (this.rank < other.rank) {
            return 1;
        }
        return -1;
    }


    // update (dt) {}
}