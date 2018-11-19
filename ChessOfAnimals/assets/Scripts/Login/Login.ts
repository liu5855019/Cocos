import MsEngine from "./MsEngine";



const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {

    ms = MsEngine.getInstance();


    onLoad () {}

    start () {

        console.log("Login start");

        this.ms.init();
        
    }

    

    createRoom() {
        this.ms.response.createRoomResponse = (rsp:MsCreateRoomRsp) => {
            if (rsp.status == 200) {
                console.log('创建房间成功');    
            } else {
                console.log('创建房间失败!');
            }
        };

        this.ms.createRoom();
    }




    // update (dt) {}
}
