import Animal from "./Animal";

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
export default class GameController extends cc.Component {

    @property(cc.Node) item : cc.Node = null;

    datas = [];
    time = 0;
    result = [[]];
    urlDict = {
        b0:"res/b0",
        b1:"/b1"
    };



    res = null;

    start () {
        this.time = 0;
 
        this.load();
        //this.setupDatas();

        
        

        var nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        nums = this.randomSort(nums);
        this.setupPositions(nums);

    }

    loadCallBack(err: any, res:any) {
        //this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }

        console.log(res);
        this.res = res;
        this.setupDatas();
        
       
    }

    load() {
        var url = this.urlDict.b1;
        var loadCallBack = this.loadCallBack.bind(this);
        
           
        // specify the type to load sub asset from texture's url
        cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
              
    }



    setupDatas()
    {
        var node = new cc.Node("front");
        node.setPosition(0, 0);
        var component = null;
      
        component = node.addComponent(cc.Sprite);
        component.spriteFrame = this.res;
        console.log(this.res);
        

        this.node.addChild(node);
    }

   

    animalClickAction(e:cc.Event.EventTouch)
    {
        console.log(e.getLocationInView());
        console.log(e.target);
        
        let node:cc.Node = e.target;
        let animal:Animal = node.getComponent(Animal);
        
        animal.isSelect = !animal.isSelect;
        
        
        
    }


     //根据随机数组 重新排序datas
    setupPositions(randomArr) {
        var result = [[],[],[],[]];
        for (let i = 0; i < randomArr.length; i++) {
            var index = randomArr[i];
            var animalNode = cc.instantiate(this.item);
            this.node.addChild(animalNode);
            result[Math.floor(i/4)][i%4] =  animalNode;  //this.datas[index];
        }
        this.result = result;

        console.log(this.result);
        

        
        // var animal = this.datas[0];
        // var animalW = animal.front.width;
        // var animalH = animal.front.height;
        
        // var spaceW = (this.node.width - 4 * animalW) / 5;
        // var spaceH = (this.node.height - 4 * animalH) / 5

        // for (let i = 0; i < 16; i++) {
        //     const animalNode = this.result[Math.floor(i/4)][i%4];
            

        //     animalNode.x = -this.node.width/2 + (spaceW * (i%4+1)) + i%4 * animalW + animalW * 0.5;            
        //     animalNode.y = -this.node.height/2 + (spaceH * (Math.floor(i/4)+1)) +  Math.floor(i/4) * animalH + animalH * 0.5;
            
        // }
    }



    // 随机排序函数
    randomSort(arr) {
        var input = [];
        for (let i = 0; i < arr.length; i++) {
            input[i] = arr[i];
        }

        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1)); 
            var itemAtIndex = input[randomIndex]; 
            input[randomIndex] = input[i]; 
            input[i] = itemAtIndex;
        }
        return input;
    }

    



    update (dt) {


    }
}
