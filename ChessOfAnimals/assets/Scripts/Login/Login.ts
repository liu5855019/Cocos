import MsEngine from "./MsEngine";
import Toast from "../common/Toast";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component {

    @property(cc.Button) loginBtn1: cc.Button = null;
    @property(cc.Button) loginBtn2: cc.Button = null;
    @property(cc.Label) stateLab: cc.Label = null;

    @property(cc.Prefab) createRoomPrefab:cc.Prefab = null;

    ms:MsEngine = null;

    onLoad () {
        this.ms = MsEngine.getInstance();
    }

    start () {
        console.log("Login start");

        this.ms.init();

        this.initMsResponse();
    }

    

    clickLoginBtn1() {
        this.login(1);
    }

    clickLoginBtn2() {
        this.login(2);
    }

    login(index:number) {
        this.loginBtn1.node.active = false;
        this.loginBtn2.node.active = false;

        this.ms.login(index);
    }



    initMsResponse() {
        //登录响应
        this.ms.response.loginResponse = (rsp:MsLoginRsp) => {
            if (rsp.status == 200) {
                console.log('登录成功');
                this.ms.isLogin = true;
                this.stateLab.string = '用户: ' + this.ms.user.name;
            } else {
                console.log('登录失败!');
                this.ms.isLogin = false;
                this.stateLab.string = '登录失败!';
                this.loginBtn1.node.active = true;
                this.loginBtn2.node.active = true;
            }
        };

        //创建房间的响应
        this.ms.response.createRoomResponse = (rsp:MsCreateRoomRsp) => {
            if (rsp.status == 200) {
                console.log('创建房间成功');    
            } else {
                console.log('创建房间失败!');
            }
        };
    }


    createRoom() {
        if (this.ms.isLogin) {
            //生成预制体
            var createroomNode = cc.instantiate(this.createRoomPrefab);  
            //将预制体节点加入到屏幕上
            createroomNode.setPosition(0,0);
            this.node.addChild(createroomNode);
        } else {
            Toast.showText('请先登录!');
            console.log('请先登录!');
        }
    }

    // update (dt) {}
}
