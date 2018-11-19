


const {ccclass, property} = cc._decorator;

@ccclass
export default class MsEngine extends cc.Component {

    msInfo = {
        gameId : 202401,
        appKey : "6efa8c090fcd424787dd3d2da45d850a#M",
        secretKey: "cfd414edafeb4438bb181c59c965e8f7"
    };

    //MsRegistRsp {status: 0, id: 1368202, userID: 1368202, token: "EAEAYQFAJURLOTYTWAMLZBPLLLZDYAGY", name: "玩家N2Zu8tcp", …}
    //{"status":0,"id":1506857,"userID":1506857,"token":"AMBIKQPGOYQWWVRKORYRSVDUCONSLBFU","name":"玩家cPx48VcW","avatar":"http://pic.vszone.cn/upload/avatar/1464079978.png"}
    public user:MsRegistRsp = null;

    private static _instance: MsEngine;
        engine: MatchvsEngine = new MatchvsEngine();
        response: MatchvsResponse = new MatchvsResponse();
    
    public static getInstance(): MsEngine {
        console.log("get");
        if (MsEngine._instance == null) {
            MsEngine._instance = new MsEngine();
        }
        return MsEngine._instance;
    }

    init() {
        console.log("init");
        this.response.initResponse = (status:number) => {
            console.log("init response:" + status);
            console.log(this);
            if(status == 200){
                //成功
                this.registerUser();
            }else{
                //失败
                
            }
        };

        this.engine.init(this.response,"Matchvs", "alpha",this.msInfo.gameId);
    }

    registerUser() {
        this.response.registerUserResponse = (userInfo:MsRegistRsp) => {
            if (userInfo.status == 0) {
                this.user = userInfo;
                console.log('注册成功: '+userInfo.userID);
                this.login();
            } else {
                console.log('注册用户失败!');
            }
        };
        this.engine.registerUser();
    }

    login() {
        this.response.loginResponse = (rsp:MsLoginRsp) => {
            if (rsp.status == 200) {
                console.log('登录成功');
            } else {
                console.log('登录失败!');
            }
        };
        this.engine.login(this.user.userID,
                            this.user.token,
                            this.msInfo.gameId,
                            1,
                            this.msInfo.appKey,
                            this.msInfo.secretKey,
                            "1",
                            0);
    }


    createRoom() {
        var info = new MsCreateRoomInfo(this.user.name+'的房间',2,0,2,0,'property');
        this.engine.createRoom(info,"");
    }



    start () {
        console.log("MsEngine  start");
    }

    // update (dt) {}
}








//     public init(): any {
//         console.log("init");
        

//         //return MsEngine.engine.init(MsEngine.response,"Matchvs", "alpha",202401 );
//     }

    // public uninit(): any {
    //     return MvsManager.engine.uninit();
    // }

    // public registerUser(): any {
    //     return MvsManager.engine.registerUser();
    // }

    // public login(): any {
    //     return MvsManager.engine.login(GameData.userId, GameData.token, Const.gameId, Const.gameVersion,
    //         Const.appKey, Const.secretKey, Const.deviceId, Const.gatewayId)
    // }

    // public logout(cpProto): any {
    //     return MvsManager.engine.logout(cpProto);
    // }

    // public joinRandomRoom(maxPlayer: number, userProfile: string) {
    //     return MvsManager.engine.joinRandomRoom(maxPlayer, userProfile);
    // }

    // public joinRoom(roomId: string, userProfile: string) {
    //     return MvsManager.engine.joinRoom(roomId, userProfile);
    // }
    // public joinLiveRoom(roomId: string, userProfile: string) {
    //     return MvsManager.engine.joinWatchRoom(roomId, userProfile);
    // }
    // public setLiveOffSet(offset:number) {
    //     return MvsManager.engine.setLiveOffset(offset);
    // }

    // public joinOver(cpProto: string) {
    //     return MvsManager.engine.joinOver(cpProto);
    // }

    // public createRoom(createRoom, userProfile,watch) {
    //     return MvsManager.engine.createRoom(createRoom, userProfile,watch)
    // }

    // public leaveRoom(cpProto: string): number {
    //     return MvsManager.engine.leaveRoom(cpProto)
    // }
    // public leaveWatchRoom(cpProto: string): number {
    //     return MvsManager.engine.leaveWatchRoom(cpProto)
    // }

    // public setFrameSync(rate: number) {
    //     return MvsManager.engine.setFrameSync(rate);
    // }

    // public sendFrameEvent(cpProto: string) {
    //     return MvsManager.engine.sendFrameEvent(cpProto);
    // }

    // public sendEvent(cpProto: string) {
    //     return MvsManager.engine.sendEvent(cpProto);
    // }

    // public kickPlayer(srcUserid, cpProto) {
    //     return MvsManager.engine.kickPlayer(srcUserid, cpProto);
    // }

    // public getRoomList(filter) {
    //     return MvsManager.engine.getRoomListEx(filter);
    // }
// }