

class MsEngine {
    private static _instance: MsEngine;
    // public static engine: MatchvsEngine = new MatchvsEngine();
    // public static response: MatchvsResponse = new MatchvsResponse();



    public static getInstance(): MsEngine {
        console.log("get");
        
        if (MsEngine._instance == null) {
            MsEngine._instance = new MsEngine();
            //  MatchvsLog.closeLog();
        }
        return MsEngine._instance;
    }

    public init(): any {
        console.log("init");
        

        //return MsEngine.engine.init(MsEngine.response,"Matchvs", "alpha",202401 );
    }

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
}