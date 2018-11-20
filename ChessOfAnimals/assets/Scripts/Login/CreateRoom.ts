import MsEngine from "./MsEngine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CreateRoom extends cc.Component {

    @property(cc.EditBox) editBox:cc.EditBox = null;
    @property(cc.Button) createBtn:cc.Button = null;
    
    ms:MsEngine = null;

    onLoad () {
        this.ms = MsEngine.getInstance();
    }

    start () {

    }


    clickCloseBtn() {
        this.node.destroy();
    }

    clickCreateRoomBtn() {
        this.ms.createRoom(this.editBox.string);
        this.node.destroy();   
    }

    // update (dt) {}
}
