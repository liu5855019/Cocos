import Animal from "./Animal";
import Player from "./Player";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {
    ccclass,
    property
} = cc._decorator;



@ccclass
export default class GameController extends cc.Component {

    @property(cc.Node) item: cc.Node = null;
    @property([cc.Node]) nodes: Array<cc.Node> = [];        //front node

    @property(cc.Label) stateLab: cc.Label = null;          //标识自己是什么阵容
    @property(cc.Label) stepLab: cc.Label = null;           //标识该谁出手了

    
    time = 0;
    datas = [];
    result = [ [] ];
    
    me : Player = new Player();
    other : Player = new Player();

    _isMe = true;   // 当前要操作的角色是不是我
    public set isMe(v : boolean) {
        this._isMe = v;
        this.updateStepLab();
    }
    public get isMe() :boolean  {
        return this._isMe;
    }
    
    

    selectdV2:cc.Vec2 = null;       // 如果是me操作,可能要操作两次,保存下来第一次选择的v2



    start() {
        this.time = 0;

       
        this.setupDatas();

        var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        nums = this.randomSort(nums);
        this.setupPositions(nums);

        this.stateLab.string = "游戏开始,请翻牌";
        this.stepLab.string = "你先手";
    }


    setupDatas() 
    {
        var datas = [];
        for (let i = 0; i < this.nodes.length; i++) {
            const front = this.nodes[i];
            this.node.removeChild(front);

            var itemNode = cc.instantiate(this.item);
            var animal = itemNode.getComponent(Animal);
            
            animal.node.removeChild(animal.front);
            animal.front = front;
            animal.node.insertChild(front,0);
            animal.front.width = 110;
            animal.front.height = 140;
            animal.rank = i%8;
            animal.isRed = i >= 8;
            animal.back.active = true;
        
            datas[i] = itemNode;
            this.node.addChild(itemNode);
        }
        console.log(datas);
        
        this.datas = datas;
    }


    //根据随机数组 重新排序datas
    setupPositions(randomArr) {
        var result = [ [], [], [], [] ];
        for (let i = 0; i < randomArr.length; i++) {
            var index = randomArr[i];
            result[Math.floor(i / 4)][i % 4] = this.datas[index];
        }
        this.result = result;

        console.log(this.result);

        var animalW = 110;
        var animalH = 140;
        var spaceW = (this.node.width - 4 * animalW) / 5;
        var spaceH = (this.node.height - 4 * animalH) / 5;

        for (let i = 0; i < 16; i++) {
            const animalNode = this.result[Math.floor(i/4)][i%4];
            animalNode.x = -this.node.width/2 + (spaceW * (i%4+1)) + i%4 * animalW + animalW * 0.5;            
            animalNode.y = -this.node.height/2 + (spaceH * (Math.floor(i/4)+1)) +  Math.floor(i/4) * animalH + animalH * 0.5;
        }
    }


    /** action */
    animalClickAction(e: cc.Event.EventTouch)
     {
        let itemNode: cc.Node = e.target;

        //开局第一步
        if (this.me.isInit == false && this.other.isInit == false) {
            this.nextStepWithInitPlayer(this.isMe,itemNode);
            return;
        } 

        let animal: Animal = itemNode.getComponent(Animal);

        if (animal.back.active) { //如果还没有翻牌 , 翻牌,切换选手
            this.nextStepWithOpen(itemNode);
        } else { // 已经翻开
            if (this.selectdV2) {   //当已经选择了一个的时候
                var selectNode:cc.Node = this.result[this.selectdV2.x][this.selectdV2.y];
                var selectAnimal:Animal = selectNode.getComponent(Animal);
                if (selectNode == itemNode) {   //选择的与刚才选的相同,则取消刚才的选择
                    this.selectdV2 = null;
                    animal.isSelect = false;
                } else if(selectAnimal.isRed == animal.isRed && !animal.isOver) { //与刚才选择的是同色的: 取消掉刚才选的,选择新的
                    selectAnimal.isSelect = false;
                    this.selectdV2 = this.v2OfItemNode(itemNode);
                    animal.isSelect = true;
                } else {
                    this.nextStepWithFromeTo(this.selectdV2,this.v2OfItemNode(itemNode))
                }
            } else if (!animal.isOver) {    //当还没有选择的时候,且操作的不是over的,选择一个,继续
                var player:Player = this.isMe ? this.me : this.other;
                if (player.isRed == animal.isRed) {
                    this.selectdV2 = this.v2OfItemNode(itemNode);
                    animal.isSelect = true;
                } else {
                    console.log("点了不是自己颜色方的动物");
                }
            }
        }
    }


    

    nextStepWithInitPlayer(isMe:boolean , itemNode:cc.Node)
    {
        let animal: Animal = itemNode.getComponent(Animal);
        animal.back.active = false;

        this.me.isRed = isMe ? animal.isRed : !animal.isRed;
        this.other.isRed = isMe ? !animal.isRed : animal.isRed;
        this.me.isInit = true;
        this.other.isInit = true;

        this.stateLab.string = this.me.isRed ? "我是红色方" : "我是蓝色方";
        //this.stateLab.node.color = this.me.isRed ? cc.Color.RED : cc.Color.BLUE;

        this.isMe = !this.isMe;
        
    }

    nextStepWithOpen(itemNode:cc.Node) 
    {
        console.log("翻牌");
        
        if (this.selectdV2) {
            var selectNode:cc.Node = this.result[this.selectdV2.x][this.selectdV2.y];
            if (selectNode) {
                let animal:Animal = selectNode.getComponent(Animal);
                animal.isSelect = false;
            }
            this.selectdV2 = null;
        }

        let animal: Animal = itemNode.getComponent(Animal);
        animal.back.active = false;

        this.isMe = !this.isMe;
    }

    nextStepWithFromeTo(from:cc.Vec2 ,to:cc.Vec2)
    {
        var stepX = Math.abs(from.x - to.x);
        var stepY = Math.abs(from.y - to.y);
        if (stepX + stepY > 1  ) { 
            console.log("没按规则走路 " + "from:" + from + " to:" + to );
            return;
        }

        var fromNode:cc.Node = this.result[from.x][from.y];
        var fromAnimal:Animal = fromNode.getComponent(Animal);
        var toNode:cc.Node = this.result[to.x][to.y];
        var toAnimal:Animal = toNode.getComponent(Animal);

        if (toAnimal.isOver) { //正常走路
            this.move(from,to);
        } else {
            var isBig = fromAnimal.isBigTo(toAnimal);
            if (isBig == 0) {  // 相碰
                this.moveWithEqual(from,to);
            } else if (isBig == 1) { // 吃掉对方
                this.moveWithBig(from,to);
            } else { // 自杀
                this.moveWithSmall(from,to);
            }
        }
        this.isMe = !this.isMe;
        this.selectdV2 = false;
    }

    move(from:cc.Vec2 ,to:cc.Vec2)
    {
        console.log(from + "--->" + to + "正常移动");
        
        var fromNode:cc.Node = this.result[from.x][from.y];
        var fromAnimal:Animal = fromNode.getComponent(Animal);
        var toNode:cc.Node = this.result[to.x][to.y];

        this.result[from.x][from.y] = toNode;
        this.result[to.x][to.y] = fromNode;

        fromAnimal.isSelect = false;
        fromNode.setPosition(this.positionWithIndex(to));
        toNode.setPosition(this.positionWithIndex(from));
    }

    moveWithBig(from:cc.Vec2 ,to:cc.Vec2)
    {
        console.log(from + "--->" + to + "吃掉");

        var fromNode:cc.Node = this.result[from.x][from.y];
        var fromAnimal:Animal = fromNode.getComponent(Animal);
        var toNode:cc.Node = this.result[to.x][to.y];
        var toAnimal:Animal = toNode.getComponent(Animal);

        this.result[from.x][from.y] = toNode;
        this.result[to.x][to.y] = fromNode;

        fromAnimal.isSelect = false;
        toAnimal.isOver = true;

        fromNode.setPosition(this.positionWithIndex(to));
        toNode.setPosition(this.positionWithIndex(from));
    }

    moveWithSmall(from:cc.Vec2 ,to:cc.Vec2)
    {
        console.log(from + "--->" + to + "自杀");

        var fromNode:cc.Node = this.result[from.x][from.y];
        var fromAnimal:Animal = fromNode.getComponent(Animal);
        var toNode:cc.Node = this.result[to.x][to.y];
        var toAnimal:Animal = toNode.getComponent(Animal);

        fromAnimal.isSelect = false;
        fromAnimal.isOver = true;
    }

    moveWithEqual(from:cc.Vec2 ,to:cc.Vec2)
    {
        console.log(from + "--->" + to + "相撞");

        var fromNode:cc.Node = this.result[from.x][from.y];
        var fromAnimal:Animal = fromNode.getComponent(Animal);
        var toNode:cc.Node = this.result[to.x][to.y];
        var toAnimal:Animal = toNode.getComponent(Animal);

        fromAnimal.isSelect = false;
        fromAnimal.isOver = true;
        toAnimal.isOver = true;
    }


    
    



    update(dt) {


    }

    v2OfItemNode(itemNode:cc.Node) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tmpNode = this.result[i][j];
                if (tmpNode == itemNode) {
                    return cc.v2(i,j);
                }
            }
        }
        console.log("发现异常,没有找到选择的节点");
    }

    positionWithIndex(index:cc.Vec2) : cc.Vec2
    {
        var animalW = 110;
        var animalH = 140;
        var bgW = this.node.width;
        var bgH = this.node.height;
        var spaceW = (bgW - 4 * animalW) / 5;
        var spaceH = (bgH - 4 * animalH) / 5;
        
        var x = -bgW/2 + (index.y+0.5)*animalW + spaceW*(index.y+1);
        var y = -bgH/2 + (index.x+0.5)*animalH + spaceH*(index.x+1);
        
        return cc.v2(x,y);
    }


    updateStepLab()
    {
        var player:Player = this.isMe ?  this.me : this.other;
        this.stepLab.string = player.isRed ? "红色方出手" : "蓝色方出手";
        this.stepLab.node.color = player.isRed ? cc.Color.RED : cc.Color.BLUE;
    }

    // 随机排序函数
    randomSort(arr) {
        var input = [];
        for (let i = 0; i < arr.length; i++) {
            input[i] = arr[i];
        }

        for (var i = input.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }

}