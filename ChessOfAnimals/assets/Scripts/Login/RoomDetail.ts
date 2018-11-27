import MsEngine from "./MsEngine";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label) userLab1:cc.Label = null;
    @property(cc.Sprite) userSprite1:cc.Sprite = null;

    @property(cc.Label) userLab2:cc.Label = null;
    @property(cc.Sprite) userSprite2:cc.Sprite = null;

    @property(cc.Button) startBtn:cc.Button = null;

    ms:MsEngine = null;

    onLoad() {
        this.ms = MsEngine.getInstance();
    }

    start () {
        console.log('room detail start');

        this.userLab1.string = this.ms.user.name;
        this.setSpriteImg(this.userSprite1,this.ms.user.avatar);

        this.ms.response.joinRoomNotify = (roomUserInfo:MsRoomUserInfo) => {
            console.log('有人加入房间了:' + roomUserInfo);
        };
    }

    setSpriteImg(sprite:cc.Sprite , url:string) {
        cc.loader.load(url,(err,texture:cc.Texture2D) => {
            if (err) {
                console.log(err);
            } else {
                var frame:cc.SpriteFrame = new cc.SpriteFrame(texture);
                sprite.spriteFrame = frame;
            }
        });
    }

    clickStartBtn ()
    {

    }

    clickBackBtn ()
    {

    }

    // update (dt) {}
}
