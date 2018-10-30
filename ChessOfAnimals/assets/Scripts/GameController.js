// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var animal = require("Animal");

cc.Class({
    extends: cc.Component,

    properties: {
        b0: {
            type: animal,
            default: null,
        },
        b1: {
            type: animal,
            default: null,
        },
        b2: {
            type: animal,
            default: null,
        },
        b3: {
            type: animal,
            default: null,
        },
        b4: {
            type: animal,
            default: null,
        },
        b5: {
            type: animal,
            default: null,
        },
        b6: {
            type: animal,
            default: null,
        },
        b7: {
            type: animal,
            default: null,
        },

        r0: {
            type: animal,
            default: null,
        },
        r1: {
            type: animal,
            default: null,
        },
        r2: {
            type: animal,
            default: null,
        },
        r3: {
            type: animal,
            default: null,
        },
        r4: {
            type: animal,
            default: null,
        },
        r5: {
            type: animal,
            default: null,
        },
        r6: {
            type: animal,
            default: null,
        },
        r7: {
            type: animal,
            default: null,
        },

        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.time = 0;
        this.b0.node.x = 0;
        this.b0.node.y = 0;
        
        this.datas = [this.b0 , this.b1 , this.b2 , this.b3 ,
                      this.b4 , this.b5 , this.b6 , this.b7 ,
                      this.r0 , this.r1 , this.r2 , this.r3 , 
                      this.r4 , this.r5 , this.r6 , this.r7 ];

        this.nums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        
        for (let i = 0; i < 100; i++) {
            var aaa = this.randomSort(this.nums);
            console.log(aaa);
        }

        console.log(this.nums);
    },

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
    },

    update (dt) {
        this.time += dt;
        if (this.time > 3) {
            
            
            this.time = 0;
            
        }



    },
});
