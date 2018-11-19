import MsEngine from "./MsEngine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    ms:MsEngine = MsEngine.getInstance();

    @property(cc.EditBox) editBox:cc.EditBox = null;
    @property(cc.Button) createBtn:cc.Button = null;
    
    start () {

    }


    clickCreateRoomBtn() {
        console.log(this.editBox.string);
        
        //this.ms.createRoom(this.editBox.string)
    }

    // update (dt) {}
}
