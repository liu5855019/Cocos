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


    clickCreateRoomBtn() {
        console.log(this.editBox.string);
        
        this.ms.createRoom(this.editBox.string)
    }

    // update (dt) {}
}
