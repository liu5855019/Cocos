

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label) userLab1:cc.Label = null;
    @property(cc.Sprite) userSprite1:cc.Sprite = null;

    @property(cc.Label) userLab2:cc.Label = null;
    @property(cc.Sprite) userSprite2:cc.Sprite = null;

    //@property(cc.Button)

    


    

    start () {

    }

    // update (dt) {}
}
