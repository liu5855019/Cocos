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
export default class Animal extends cc.Component {

    @property(cc.Node) front : cc.Node = null;
    @property(cc.Node) back : cc.Node = null;

    _isSelect : Boolean;
    public get isSelect() : Boolean {
        return this._isSelect;
    }
    public set isSelect(v : Boolean) {
        this._isSelect = v;
        this.front.color = v ? cc.Color.RED : cc.Color.WHITE;
    }
    

    start () {
        this.front.x = 0;
        this.front.y = 0;
        this.back.x = 0;
        this.back.y = 0;
    }

    // update (dt) {}
}
