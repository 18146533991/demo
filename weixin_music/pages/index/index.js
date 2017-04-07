//index.js

var musicData = require('../music/music.js');
var playMsg = require('../playMsg/msg.js');
var selfData = require('../self/self.js');
var headerData = require('../header/header.js');

Page({
    //数据
    data: {
        header:0,

        //headerData
        headerData:headerData,

        //self
        self:selfData,

        //music
        music:musicData,

        //footer(正在播放信息)
        playMsg:playMsg,
        animationData:{},

        open:0

    },
    onReady:function(){
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1500,
            timingFunction: "linear",
            delay: 0
        });

        this.audioCtx = wx.createAudioContext('myAudio');
        this.audioCtx.setSrc( 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46' );
    },

    //导航
    navChangeFn:function(ev){
        this.setData({
            header:ev.target.dataset.num
        })
    },

    //播放
    rotate:function(){

        if( this.data.open == 1 )return;

        var i = 1;

        this.animation.rotate( 360 ).step();
        this.setData({ animationData: this.animation.export() });

        clearInterval( this.timer );
        this.timer = setInterval(function(){
            i++;
            this.animation.rotate( 360*i ).step();
            this.setData({ animationData: this.animation.export() });
        }.bind(this),i*1500);
        
        this.audioCtx.play();

        this.data.open = 1;
    },

    //暂停
    pause:function(){
        clearInterval( this.timer );
        this.animation.rotate(0, 0).step({ duration: 0 })
        this.setData({ animationData: this.animation.export() });

        this.audioCtx.pause();

        this.data.open = 0;
    },

    //搜索
    search:function(){
        console.log(12);
        wx.navigateTo({
            url: '../search/search.wxml'
        })
    }

    
})
