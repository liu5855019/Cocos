

var ToastConfig = {
    LENGTH_LONG: 3,
    LENGTH_SHORT: 2,
    CENTER: 0,
    TOP: 1,
    BOTTOM: 2,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Toast extends cc.Object  {

    text:string = null;
    duration:number = 0;
    type:number = 0;
    bgSpriteFrame:cc.SpriteFrame = null;

    constructor(text:string,duration?:number,type?:number) {
        super(); 
        this.text = text;
        this.duration = duration ? duration : ToastConfig.LENGTH_LONG;
        this.type = type;
    }

    public static makeText(text:string,duration?:number,type?:number): Toast {
        return new Toast(text,duration,type);
    }

    public static showText(text:string,duration?:number,type?:number) {
        Toast.makeText(text,duration,type).show();
    }

    show() {
        if (this.bgSpriteFrame == null) {
            this.loadBgScriptFrame();
            return;
        }

        // canvas
        var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        var width = canvas.node.width;
        var height = canvas.node.height;
        if (this.duration == 0) {
            this.duration = ToastConfig.LENGTH_SHORT;
        }

        // 背景图片设置
        let bgNode = new cc.Node();
        // 背景图片透明度
        bgNode.opacity = 200;
        bgNode.color = cc.Color.WHITE;
        let bgSprite = bgNode.addComponent(cc.Sprite);
        bgSprite.type = cc.Sprite.Type.SLICED;
        let bgLayout = bgNode.addComponent(cc.Layout);
        bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        // Lable文本格式设置
        let textNode = new cc.Node();
        var textLabel = textNode.addComponent(cc.Label);
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.fontSize = 30;
        textLabel.string = this.text;

        //背景图片与文本内容的间距
        let hPadding = textLabel.fontSize / 8;
        let vPadding = 2;
        bgLayout.paddingLeft = hPadding;
        bgLayout.paddingRight = hPadding;
        bgLayout.paddingTop = vPadding;
        bgLayout.paddingBottom = vPadding;

        // 当文本宽度过长时，设置为自动换行格式
        if (this.text.length * textLabel.fontSize > width / 3) {
            textNode.width = width / 3;
            textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }

        bgNode.addChild(textNode);
        if (this.bgSpriteFrame) {
            bgSprite.spriteFrame = this.bgSpriteFrame;
        }
        
        textNode.y = 0;
        textNode.x = 0;
    
        canvas.node.addChild(bgNode);

        let finished = cc.callFunc(function (target) {
            bgNode.destroy();
        }, this);
        let action = cc.sequence(cc.moveBy(this.duration,cc.v2(0,0)),cc.fadeOut(0.3), finished);
        bgNode.runAction(action);

    }

    loadBgScriptFrame() {
        cc.loader.load({ 'uuid': 'b43ff3c2-02bb-4874-81f7-f2dea6970f18' }, function (error, result) {
            
            if (error) {
                cc.error(error);
                return;
            }
            
            this.bgSpriteFrame = new cc.SpriteFrame(result);
            this.bgSpriteFrame.insetTop = 3;
            this.bgSpriteFrame.insetBottom = 3;
            this.bgSpriteFrame.insetLeft = 4;
            this.bgSpriteFrame.insetRight = 4;
            //加载完再调用
            this.show();
        }.bind(this));
    }
}
