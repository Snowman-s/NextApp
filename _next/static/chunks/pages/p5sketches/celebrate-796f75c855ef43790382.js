(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[23],{57:function(t,e,n){"use strict";n.d(e,{c:function(){return p}});var i=n(5893),r=n(1749),s=n(2285),o=n(9895),u=n(2318),c=n(282),a=n(5517),h=n(3758),f=n(1125),l=n(3099),d=n(7294);function p(t){var e=(0,d.useState)(!0),n=e[0],p=e[1],v=n;return(0,i.jsx)("div",{children:(0,i.jsxs)(r.Z,{container:!0,direction:"row",spacing:1,children:[(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(s.Z,{in:v,children:(0,i.jsx)(o.Z,{style:{padding:20,margin:20},children:(0,i.jsxs)(r.Z,{container:!0,direction:"column",spacing:1,children:[(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsxs)(r.Z,{container:!0,direction:"row",alignItems:"center",spacing:1,children:[(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(u.Z,{variant:"h2",children:t.title})}),(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(c.Z,{variant:"contained",color:"primary",onClick:function(){return t.onRequireSave()},children:"Save"})}),(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(c.Z,{variant:"contained",color:"primary",onClick:function(){var e;null!==(e=t.slideOutOnRestart)&&void 0!==e&&e&&p(!1),t.onRequireRestart()},children:"Restart"})})]})}),(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(a.Z,{})}),(0,i.jsx)(r.Z,{item:!0,children:t.children})]})})})}),(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(h.Z,{style:{marginTop:25},onClick:function(){p(!n)},color:"secondary",children:v?(0,i.jsx)(f.Z,{}):(0,i.jsx)(l.Z,{})})})]})})}},1974:function(t,e,n){"use strict";n.d(e,{Z:function(){return x}});var i=n(5893),r=n(809),s=n.n(r),o=n(266),u=n(8216),c=n(5997),a=n(4695),h=n(9083),f=n(8847),l=n(2953),d=n(2809),p=n(7294);function v(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=(0,l.Z)(t);if(e){var r=(0,l.Z)(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return(0,f.Z)(this,n)}}var x=function(t){(0,h.Z)(r,t);var e=v(r);function r(t){var n;return(0,u.Z)(this,r),n=e.call(this,t),(0,d.Z)((0,a.Z)(n),"myRef",void 0),(0,d.Z)((0,a.Z)(n),"canvasRef",void 0),n.myRef=p.createRef(),n.canvasRef=p.createRef(),n}return(0,c.Z)(r,[{key:"componentDidMount",value:function(){var t=(0,o.Z)(s().mark((function t(){var e,i;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.e(6).then(n.t.bind(n,4035,23));case 2:e=t.sent,i=new e.default(this.props.sketch,this.canvasRef.current),this.setState({p5obj:i});case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){var t=(0,o.Z)(s().mark((function t(e){var i,r,o,u,c,a,h,f,l,d,p,v;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.sketch===this.props.sketch){t.next=7;break}return this.state.p5obj.remove(),t.next=4,n.e(6).then(n.t.bind(n,4035,23));case 4:o=t.sent,u=new o.default(this.props.sketch,this.canvasRef.current),this.setState({p5obj:u});case 7:this.props.saveRequire&&(null===(c=(a=this.state.p5obj).onSave)||void 0===c||c.call(a),null===(h=(f=this.props).onSaveEnd)||void 0===h||h.call(f)),this.props.restartRequire&&(null===(l=(d=this.state.p5obj).onRestart)||void 0===l||l.call(d),null===(p=(v=this.props).onRestartEnd)||void 0===p||p.call(v)),null===(i=(r=this.state.p5obj).onPropsUpdate)||void 0===i||i.call(r,this.props);case 10:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){return(0,i.jsxs)("div",{ref:this.myRef,style:{position:"relative"},children:[(0,i.jsx)("div",{ref:this.canvasRef,style:{position:"absolute",zIndex:-1}}),this.props.children]})}}]),r}(p.Component)},6405:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return y}});var i=n(5893),r=n(1749),s=n(2318),o=n(8799),u=n(4845),c=n(9008),a=n(7294),h=n(57),f=n(1974),l=n(8216),d=n(5997),p=function(){function t(){(0,l.Z)(this,t)}return(0,d.Z)(t,null,[{key:"choice",value:function(t,e,n){for(var i=t.concat(),r=i.length-1;r>=0;r--){var s=n(r+1),o=i[r];i[r]=i[s],i[s]=o}return i.slice(0,e)}}]),t}(),v=function(){function t(){(0,l.Z)(this,t)}return(0,d.Z)(t,[{key:"setup",value:function(t){}},{key:"render",value:function(t){t.push(),t.colorMode(t.HSB,1),t.noStroke();for(var e=60;e>0;e--)t.fill(.1,e/60,1),t.ellipse(t.width/2,t.height/2,t.width*e/40,t.height*e/40);t.pop()}},{key:"update",value:function(t){}}]),t}(),x=n(2809),Z=function(){function t(e){(0,l.Z)(this,t),(0,x.Z)(this,"happiness",50),this.happiness=e}return(0,d.Z)(t,[{key:"setup",value:function(t){}},{key:"render",value:function(t){t.push();for(var e=0,n=this.happiness/3+5,i=0;e<n;e++){var r=t.width/n,s=e/n*t.width,o=i%2==0?230:0;t.noStroke(),t.fill(230,o,o),t.rect(s,0,r,t.height),i++}t.pop()}},{key:"update",value:function(t){}}]),t}(),m=function(){function t(e){(0,l.Z)(this,t),(0,x.Z)(this,"frameCount",0),(0,x.Z)(this,"happiness",50),this.happiness=e}return(0,d.Z)(t,[{key:"setup",value:function(t){}},{key:"render",value:function(t){t.push(),t.colorMode(t.HSB,2),t.noStroke();for(var e=this.frameCount%200,n=0,i=t.int(this.happiness/3+3);n<i;n++)for(var r=n/i*t.TAU,s=t.cos(r),o=t.sin(r),u=-300;u<0;u+=5){var c=t.max(0,u+e*t.max(150,300-e)/200*8);t.fill(r/t.PI,2,2,(600-c)/300),t.circle(t.width/2+c*s,t.height/2+c*o,(150+u)/20)}t.pop()}},{key:"update",value:function(t){this.frameCount++}}]),t}(),j=function(){function t(e){(0,l.Z)(this,t),(0,x.Z)(this,"frameCount",0),(0,x.Z)(this,"happiness",50),this.happiness=e}return(0,d.Z)(t,[{key:"setup",value:function(t){}},{key:"render",value:function(t){t.push();var e=t.int(t.min(.1*t.width,t.height));t.textSize(e);for(var n=e/6,i=0,r=t.int(this.happiness/10);i<r;i++)t.push(),t.translate(i/r*t.width,t.height-n),t.rotate(t.sin(this.frameCount/9+i)/20),t.scale(t.sin(this.frameCount/9+i)/20+1),t.text("\ud83d\udc4f",0,0),t.pop();t.pop()}},{key:"update",value:function(t){this.frameCount++}}]),t}(),w=function(){function t(e,n){(0,l.Z)(this,t),(0,x.Z)(this,"happiness",50),(0,x.Z)(this,"text",""),(0,x.Z)(this,"frameCount",0),this.happiness=e,this.text=n}return(0,d.Z)(t,[{key:"setup",value:function(t){}},{key:"render",value:function(t){var e=t.min(t.width/this.text.length,t.height);t.push(),t.textSize(e);for(var n=0;n<this.text.length;n++){var i=this.text.charCodeAt(n),r=t.width/2+(n-this.text.length/2)*e,s=t.min(t.height/2-e/2,30*this.frameCount*t.noise(n)-2*e);t.fill("#FFC0CB"),t.text(t.char(i),r,s,t.width),t.fill("#000000"),t.text(t.char(i),r-e/40,s-e/40,t.width)}t.pop()}},{key:"update",value:function(t){this.frameCount++}}]),t}(),g=function(){function t(e,n){(0,l.Z)(this,t),(0,x.Z)(this,"happiness",50),(0,x.Z)(this,"text",""),(0,x.Z)(this,"frameCount",0),(0,x.Z)(this,"noiseSeed",void 0),this.happiness=e,this.text=n}return(0,d.Z)(t,[{key:"setup",value:function(t){this.noiseSeed=t.random(200)}},{key:"render",value:function(t){var e=t.min(t.width/this.text.length,t.height);t.push(),t.textSize(e);for(var n=0;n<this.text.length;n++){var i=this.text.charCodeAt(n),r=t.width/2,s=t.height,o=t.width/2+(n-this.text.length/2)*e,u=t.height/2-e/2,c=t.map(t.noise(this.noiseSeed,n)/2+.5,0,1,r,o),a=o<r?t.max(o,t.width/2+this.frameCount*(n-this.text.length/2)):t.min(o,t.width/2+this.frameCount*(n-this.text.length/2)),h=(u-s)/((o-c)*(o-c)-(r-c)*(r-c)),f=u-h*(o-c)*(o-c),l=n-this.text.length/2==0?u:h*(a-c)*(a-c)+f;t.fill("#FFC0CB"),t.text(t.char(i),a,l,t.width),t.fill("#000000"),t.text(t.char(i),a-e/40,l-e/40,t.width)}t.pop()}},{key:"update",value:function(t){this.frameCount++}}]),t}();function k(t){var e=50,n="\u306a\u306b\u304b\u3057\u3042\u308f\u305b\u306a\u3053\u3068",i=[function(){return new v},function(){return new Z(e)}],r=[function(){return new w(e,n)},function(){return new g(e,n)}],s=[function(){return new m(e)},function(){return new j(e)}],o=[],u=[],c=[];function a(){o=[i[t.int(t.random(i.length))]()],u=[r[t.int(t.random(r.length))]()],c=p.choice(s,t.int(e/50)+1,(function(e){return t.int(t.random(e))})).map((function(t){return t()})),o.forEach((function(e){return e.setup(t)})),c.forEach((function(e){return e.setup(t)})),u.forEach((function(e){return e.setup(t)}))}t.setup=function(){t.createCanvas(t.windowWidth,t.windowHeight),a()},t.draw=function(){o.forEach((function(e){return e.update(t)})),c.forEach((function(e){return e.update(t)})),u.forEach((function(e){return e.update(t)})),t.background(0),o.forEach((function(e){return e.render(t)})),c.forEach((function(e){return e.render(t)})),u.forEach((function(e){return e.render(t)}))},t.onPropsUpdate=function(t){e=t.happiness,n=t.celebrateString,t.restartRequire&&a()},t.onRestart=function(){a()},t.onSave=function(){t.save("celebrate.png")}}function y(){var t=(0,a.useState)(!1),e=t[0],n=t[1],l=(0,a.useState)(!1),d=l[0],p=l[1],v=(0,a.useState)(50),x=v[0],Z=v[1],m=(0,a.useState)("\u306a\u306b\u304b\u3057\u3042\u308f\u305b\u306a\u3053\u3068"),j=m[0],w=m[1];return(0,i.jsxs)("div",{children:[(0,i.jsxs)(c.default,{children:[(0,i.jsx)("title",{children:"\u305b\u308c\u3076\u308c\u3044\u3068 "}),(0,i.jsx)("meta",{name:"description",content:"\u8a18\u5165\u3057\u305f\u6587\u3092\u51c4\u307e\u3058\u304f\u304a\u795d\u3044\u3057\u307e\u3059"}),(0,i.jsx)("link",{rel:"icon",href:"/NextApp/favicon.ico"})]}),(0,i.jsx)(f.Z,{sketch:k,restartRequire:e,onRestartEnd:function(){n(!1)},saveRequire:d,onSaveEnd:function(){p(!1)},happiness:x,celebrateString:j,children:(0,i.jsx)(h.c,{title:"\u305b\u308c\u3076\u308c\u3044\u3068",onRequireRestart:function(){n(!0)},onRequireSave:function(){p(!0)},slideOutOnRestart:!0,children:(0,i.jsxs)(r.Z,{container:!0,direction:"column",children:[(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(r.Z,{container:!0,direction:"row",spacing:2,children:(0,i.jsxs)(r.Z,{item:!0,xs:!0,children:[(0,i.jsx)(s.Z,{gutterBottom:!0,children:"\u795d\u3044\u305f\u3044\u3053\u3068"}),(0,i.jsx)(o.Z,{onChange:function(t){w(t.target.value)}})]})})}),(0,i.jsx)(r.Z,{item:!0,children:(0,i.jsx)(r.Z,{container:!0,direction:"row",spacing:2,children:(0,i.jsxs)(r.Z,{item:!0,xs:!0,children:[(0,i.jsx)(s.Z,{gutterBottom:!0,children:"\u30cf\u30d4\u30cd\u30b9\u5ea6 (\u8ca0\u8377\u6ce8\u610f\uff01)"}),(0,i.jsx)(u.Z,{max:100,defaultValue:50,onChange:function(t,e){Z(e)}})]})})})]})})})]})}},7695:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/p5sketches/celebrate",function(){return n(6405)}])}},function(t){t.O(0,[825,542,766,799,774,888,179],(function(){return e=7695,t(t.s=e);var e}));var e=t.O();_N_E=e}]);