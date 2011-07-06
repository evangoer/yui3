YUI.add("graphics-canvas",function(c){var o="canvasShape",e=c.config.doc,q=c.Lang,j=c.AttributeLite,k,l,r,m,h,f,g=c.Color,n=parseInt,i=RegExp,p=g.toRGB,a=g.toHex;function b(){}b.prototype={_toRGBA:function(t,s){s=(s!==undefined)?s:1;if(!g.re_RGB.test(t)){t=a(t);}if(g.re_hex.exec(t)){t="rgba("+[n(i.$1,16),n(i.$2,16),n(i.$3,16)].join(",")+","+s+")";}return t;},_toRGB:function(s){return p(s);},setSize:function(s,t){if(this.get("autoSize")){if(s>this.node.getAttribute("width")){this.node.style.width=s+"px";this.node.setAttribute("width",s);}if(t>this.node.getAttribute("height")){this.node.style.height=t+"px";this.node.setAttribute("height",t);}}},_updateCoords:function(s,t){this._xcoords.push(s);this._ycoords.push(t);},_clearAndUpdateCoords:function(){var s=this._xcoords.pop()||0,t=this._ycoords.pop()||0;this._updateCoords(s,t);},_updateNodePosition:function(){var t=this.get("node"),s=this.get("x"),u=this.get("y");t.style.position="absolute";t.style.left=(s+this._left)+"px";t.style.top=(u+this._top)+"px";},_properties:null,_updateDrawingQueue:function(s){this._methods.push(s);},lineTo:function(B,z,s){var w=arguments,t=0,v,C,A,u=this._stroke&&this._strokeWeight?this._strokeWeight:0;if(!this._lineToMethods){this._lineToMethods=[];}if(typeof B==="string"||typeof B==="number"){w=[[B,z]];}v=w.length;for(;t<v;++t){if(w[t]){C=w[t][0];A=w[t][1];this._updateDrawingQueue(["lineTo",C,A]);this._lineToMethods[this._lineToMethods.length]=this._methods[this._methods.length-1];this._trackSize(C-u,A-u);this._trackSize(C+u,A+u);this._updateCoords(C,A);}}this._drawingComplete=false;return this;},moveTo:function(t,u){var s=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["moveTo",t,u]);this._trackSize(t-s,u-s);this._trackSize(t+s,u+s);this._updateCoords(t,u);this._drawingComplete=false;return this;},curveTo:function(v,t,C,B,A,z){var w,u,s,D;this._updateDrawingQueue(["bezierCurveTo",v,t,C,B,A,z]);this._drawingComplete=false;w=Math.max(A,Math.max(v,C));u=Math.max(z,Math.max(t,B));s=Math.min(A,Math.min(v,C));D=Math.min(z,Math.min(t,B));this._trackSize(w,u);this._trackSize(s,D);this._updateCoords(w,u);return this;},quadraticCurveTo:function(w,v,B,A){var u,t,s,C,z=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._updateDrawingQueue(["quadraticCurveTo",w,v,B,A]);this._drawingComplete=false;u=Math.max(B,w);t=Math.max(A,v);s=Math.min(B,w);C=Math.min(A,v);this._trackSize(u+z,t+z);this._trackSize(s-z,C-z);this._updateCoords(u,t);return this;},drawCircle:function(u,A,t){var w=0,v=2*Math.PI,s=this._stroke&this._strokeWeight?this._strokeWeight:0,z=t*2;z+=s;this._drawingComplete=false;this._trackSize(u+z,A+z);this._trackSize(u-s,A-s);this._updateCoords(u,A);this._updateDrawingQueue(["arc",u+t,A+t,t,w,v,false]);return this;},drawEllipse:function(G,E,H,M){var J=8,B=-(45/180)*Math.PI,O=0,A,v=H/2,z=M/2,K=0,D=G+v,C=E+z,I,F,N,L,u,t,s=this._stroke&&this._strokeWeight?this._strokeWeight:0;I=D+Math.cos(0)*v;F=C+Math.sin(0)*z;this.moveTo(I,F);for(;K<J;K++){O+=B;A=O-(B/2);N=D+Math.cos(O)*v;L=C+Math.sin(O)*z;u=D+Math.cos(A)*(v/Math.cos(B/2));t=C+Math.sin(A)*(z/Math.cos(B/2));this._updateDrawingQueue(["quadraticCurveTo",u,t,N,L]);}this._trackSize(G+H+s,E+M+s);this._trackSize(G-s,E-s);this._updateCoords(G,E);return this;},drawRect:function(t,z,u,v){var s=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",t,z]);this._updateDrawingQueue(["lineTo",t+u,z]);this._updateDrawingQueue(["lineTo",t+u,z+v]);this._updateDrawingQueue(["lineTo",t,z+v]);this._updateDrawingQueue(["lineTo",t,z]);this._trackSize(t-s,z-s);this._trackSize(t+u+s,z+v+s);return this;},drawRoundRect:function(t,B,u,z,v,A){var s=this._stroke&&this._strokeWeight?this._strokeWeight:0;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",t,B+A]);this._updateDrawingQueue(["lineTo",t,B+z-A]);this._updateDrawingQueue(["quadraticCurveTo",t,B+z,t+v,B+z]);this._updateDrawingQueue(["lineTo",t+u-v,B+z]);this._updateDrawingQueue(["quadraticCurveTo",t+u,B+z,t+u,B+z-A]);this._updateDrawingQueue(["lineTo",t+u,B+A]);this._updateDrawingQueue(["quadraticCurveTo",t+u,B,t+u-v,B]);this._updateDrawingQueue(["lineTo",t+v,B]);this._updateDrawingQueue(["quadraticCurveTo",t,B,t,B+A]);this._trackSize(t-s,B-s);this._trackSize(t+u+s,B+z+s);this._updateCoords(u,z);return this;},drawWedge:function(D,B,H,A,u,v){var G,F,z,L,w,E,C,K,J,t,s,I=0;v=v||u;this._drawingComplete=false;this._updateDrawingQueue(["moveTo",D,B]);v=v||u;if(Math.abs(A)>360){A=360;}G=Math.ceil(Math.abs(A)/45);F=A/G;z=-(F/180)*Math.PI;L=(H/180)*Math.PI;if(G>0){E=D+Math.cos(H/180*Math.PI)*u;C=B+Math.sin(H/180*Math.PI)*v;this.lineTo(E,C);for(;I<G;++I){L+=z;w=L-(z/2);K=D+Math.cos(L)*u;J=B+Math.sin(L)*v;t=D+Math.cos(w)*(u/Math.cos(z/2));s=B+Math.sin(w)*(v/Math.cos(z/2));this._updateDrawingQueue(["quadraticCurveTo",t,s,K,J]);}this._updateDrawingQueue(["lineTo",D,B]);}this._trackSize(0,0);this._trackSize(u*2,u*2);return this;},end:function(){this._paint();return this;},_getLinearGradient:function(){var H=c.Lang.isNumber,M=this.get("fill"),D=M.stops,A,L,K,N=0,O=D.length,s,F=0,E=0,G=this.get("width"),P=this.get("height"),J=M.rotation,R,Q,z,u,v=F+G/2,t=E+P/2,C,B=Math.PI/180,I=parseFloat(parseFloat(Math.tan(J*B)).toFixed(8));if(Math.abs(I)*G/2>=P/2){if(J<180){z=E;u=E+P;}else{z=E+P;u=E;}R=v-((t-z)/I);Q=v-((t-u)/I);}else{if(J>90&&J<270){R=F+G;Q=F;}else{R=F;Q=F+G;}z=((I*(v-R))-t)*-1;u=((I*(v-Q))-t)*-1;}s=this._context.createLinearGradient(R,z,Q,u);for(;N<O;++N){K=D[N];A=K.opacity;L=K.color;C=K.offset;if(H(A)){A=Math.max(0,Math.min(1,A));L=this._toRGBA(L,A);}else{L=p(L);}C=K.offset||N/(O-1);s.addColorStop(C,L);}return s;},_getRadialGradient:function(){var K=c.Lang.isNumber,Q=this.get("fill"),L=Q.r,C=Q.fx,A=Q.fy,E=Q.stops,B,N,M,R=0,T=E.length,t,H=0,G=0,I=this.get("width"),U=this.get("height"),V,S,z,v,P,O,s,J,W,X,D,F,u;O=H+I/2;s=G+U/2;V=I*C;z=U*A;S=H+I/2;v=G+U/2;P=I*L;X=Math.sqrt(Math.pow(Math.abs(O-V),2)+Math.pow(Math.abs(s-z),2));if(X>=P){F=X/P;if(F===1){F=1.01;
}J=(V-O)/F;W=(z-s)/F;J=J>0?Math.floor(J):Math.ceil(J);W=W>0?Math.floor(W):Math.ceil(W);V=O+J;z=s+W;}if(L>=0.5){t=this._context.createRadialGradient(V,z,L,S,v,L*I);u=1;}else{t=this._context.createRadialGradient(V,z,L,S,v,I/2);u=L*2;}for(;R<T;++R){M=E[R];B=M.opacity;N=M.color;D=M.offset;if(K(B)){B=Math.max(0,Math.min(1,B));N=this._toRGBA(N,B);}else{N=p(N);}D=M.offset||R/(T-1);D*=u;if(D<=1){t.addColorStop(D,N);}}return t;},_initProps:function(){this._methods=[];this._lineToMethods=[];this._xcoords=[0];this._ycoords=[0];this._width=0;this._height=0;this._left=0;this._top=0;this._right=0;this._bottom=0;},_drawingComplete:false,_createGraphic:function(s){var t=c.config.doc.createElement("canvas");return t;},_trackSize:function(s,t){if(s>this._right){this._right=s;}if(s<this._left){this._left=s;}if(t<this._top){this._top=t;}if(t>this._bottom){this._bottom=t;}this._width=this._right-this._left;this._height=this._bottom-this._top;}};c.CanvasDrawing=b;k=function(s){k.superclass.constructor.apply(this,arguments);};k.NAME="canvasShape";c.extend(k,c.BaseGraphic,c.mix(c.CanvasDrawing.prototype,{init:function(){this.initializer.apply(this,arguments);},initializer:function(s){var t=this;t._initProps();t.createNode();t._graphic=s.graphic;t._xcoords=[0];t._ycoords=[0];t._updateHandler();},addClass:function(s){var t=c.one(this.get("node"));t.addClass(s);},removeClass:function(s){var t=c.one(this.get("node"));t.removeClass(s);},getXY:function(){var v=this.get("graphic"),t=v.getXY(),s=this.get("x"),u=this.get("y");return[t[0]+s,t[1]+u];},setXY:function(u){var w=this.get("graphic"),t=w.getXY(),s=u[0]-t[0],v=u[1]-t[1];this._set("x",s);this._set("y",v);this._updateNodePosition(s,v);},contains:function(s){return s===c.one(this.node);},test:function(s){return c.one(this.get("node")).test(s);},compareTo:function(s){var t=this.node;return t===s;},_getDefaultFill:function(){return{type:"solid",cx:0.5,cy:0.5,fx:0.5,fy:0.5,r:0.5};},_getDefaultStroke:function(){return{weight:1,dashstyle:"none",color:"#000",opacity:1};},_left:0,_right:0,_top:0,_bottom:0,createNode:function(){var s=c.config.doc.createElement("canvas"),t=this.get("id");this._context=s.getContext("2d");s.setAttribute("overflow","visible");s.style.overflow="visible";s.setAttribute("class","yui3-"+o);s.setAttribute("class","yui3-"+this.name);s.setAttribute("id",t);t="#"+t;this.node=s;},isMouseEvent:function(s){if(s.indexOf("mouse")>-1||s.indexOf("click")>-1){return true;}return false;},before:function(t,s){if(this.isMouseEvent(t)){return c.before(t,s,"#"+this.get("id"));}return c.on.apply(this,arguments);},on:function(t,s){if(this.isMouseEvent(t)){return c.on(t,s,"#"+this.get("id"));}return c.on.apply(this,arguments);},after:function(t,s){if(this.isMouseEvent(t)){return c.after(t,s,"#"+this.get("id"));}return c.on.apply(this,arguments);},_setStrokeProps:function(y){var t=y.color,x=y.weight,w=y.opacity,v=y.linejoin||"round",u=y.linecap||"butt",s=y.dashstyle;this._miterlimit=null;this._dashstyle=(s&&c.Lang.isArray(s)&&s.length>1)?s:null;this._strokeWeight=x;if(x){this._stroke=1;}else{this._stroke=0;}if(w){this._strokeStyle=this._toRGBA(t,w);}else{this._strokeStyle=t;}this._linecap=u;if(v=="round"||v=="square"){this._linejoin=v;}else{v=parseInt(v,10);if(c.Lang.isNumber(v)){this._miterlimit=Math.max(v,1);this._linejoin="miter";}}},set:function(){var s=this,t=arguments[0];j.prototype.set.apply(s,arguments);if(s.initialized&&t!="x"&&t!="y"){s._updateHandler();}},_setFillProps:function(w){var u=c.Lang.isNumber,s=w.color,t,v=w.type;if(v=="linear"||v=="radial"){this._fillType=v;}else{if(s){t=w.opacity;if(u(t)){t=Math.max(0,Math.min(1,t));s=this._toRGBA(s,t);}else{s=p(s);}this._fillColor=s;this._fillType="solid";}else{this._fillColor=null;}}},translate:function(s,t){this._translateX=s;this._translateY=t;this._translate.apply(this,arguments);},_translate:function(s,u){var t="translate("+s+"px, "+u+"px)";this._updateTransform("translate",/translate\(.*\)/,t);},skewX:function(s){},skewY:function(s){},_rotation:0,rotate:function(t){var s="rotate("+t+"deg)";this._rotation=t;this._updateTransform("rotate",/rotate\(.*\)/,s);},_transformOrigin:function(s,u){var t=this.get("node");t.style.MozTransformOrigin=(100*s)+"% "+(100*u)+"%";},scale:function(s){},matrix:function(t,s,x,w,v,u){},_updateTransform:function(u,x,w){var v=this.get("node"),t=v.style.MozTransform||v.style.webkitTransform||v.style.msTransform||v.style.OTransform,s=this.get("transformOrigin");if(t&&t.length>0){if(t.indexOf(u)>-1){t=t.replace(x,w);}else{t+=" "+w;}}else{t=w;}s=(100*s[0])+"% "+(100*s[1])+"%";v.style.MozTransformOrigin=s;v.style.webkitTransformOrigin=s;v.style.msTransformOrigin=s;v.style.OTransformOrigin=s;v.style.MozTransform=t;v.style.webkitTransform=t;v.style.msTransform=t;v.style.OTransform=t;this._graphic.addToRedrawQueue(this);},_updateHandler:function(){this._draw();this._graphic.addToRedrawQueue(this);},_draw:function(){this.clear();this._paint();},_paint:function(){if(!this._methods){return;}var x=this.get("node"),E=this._right-this._left,B=this._bottom-this._top,t=this._context,y=[],u=this._methods.concat(),A=0,z,s,D,v,C=0;this._context.clearRect(0,0,x.width,x.height);if(this._methods){C=u.length;if(!C||C<1){return;}for(;A<C;++A){y[A]=u[A].concat();D=y[A];v=D[0]=="quadraticCurveTo"?D.length:3;for(z=1;z<v;++z){if(z%2===0){D[z]=D[z]-this._top;}else{D[z]=D[z]-this._left;}}}x.setAttribute("width",E);x.setAttribute("height",B);t.beginPath();for(A=0;A<C;++A){D=y[A].concat();if(D&&D.length>0){s=D.shift();if(s){if(s&&s=="lineTo"&&this._dashstyle){D.unshift(this._xcoords[A]-this._left,this._ycoords[A]-this._top);this._drawDashedLine.apply(this,D);}else{t[s].apply(t,D);}}}}if(this._fillType){if(this._fillType=="linear"){t.fillStyle=this._getLinearGradient();}else{if(this._fillType=="radial"){t.fillStyle=this._getRadialGradient();}else{t.fillStyle=this._fillColor;}}t.closePath();t.fill();}if(this._stroke){if(this._strokeWeight){t.lineWidth=this._strokeWeight;}t.lineCap=this._linecap;t.lineJoin=this._linejoin;
if(this._miterlimit){t.miterLimit=this._miterlimit;}t.strokeStyle=this._strokeStyle;t.stroke();}this._drawingComplete=true;this._clearAndUpdateCoords();this._updateNodePosition();this._methods=u;}},_drawDashedLine:function(B,H,s,E){var t=this._context,F=this._dashstyle[0],D=this._dashstyle[1],v=F+D,y=s-B,C=E-H,G=Math.sqrt(Math.pow(y,2)+Math.pow(C,2)),w=Math.floor(Math.abs(G/v)),u=Math.atan2(C,y),A=B,z=H,x;y=Math.cos(u)*v;C=Math.sin(u)*v;for(x=0;x<w;++x){t.moveTo(A,z);t.lineTo(A+Math.cos(u)*F,z+Math.sin(u)*F);A+=y;z+=C;}t.moveTo(A,z);G=Math.sqrt((s-A)*(s-A)+(E-z)*(E-z));if(G>F){t.lineTo(A+Math.cos(u)*F,z+Math.sin(u)*F);}else{if(G>0){t.lineTo(A+Math.cos(u)*G,z+Math.sin(u)*G);}}t.moveTo(s,E);},clear:function(){this._initProps();if(this.node){this._context.clearRect(0,0,this.node.width,this.node.height);}return this;},getBounds:function(){var Q=this.get("rotation"),u=Math.PI/180,P=parseFloat(parseFloat(Math.sin(Q*u)).toFixed(8)),z=parseFloat(parseFloat(Math.cos(Q*u)).toFixed(8)),M=this.get("width"),R=this.get("height"),A=this.get("stroke"),K=this.get("x"),I=this.get("y"),S=K+M,C=I+R,E,B,J,G,N,L,H,t,s=0,U=this.get("translateX"),T=this.get("translateY"),v={},O=this.get("transformOrigin"),F=O[0],D=O[1];if(A&&A.weight){s=A.weight;}if(Q!==0){F=K+(F*M);D=I+(D*R);E=this._getRotatedCornerX(K,I,F,D,z,P);B=this._getRotatedCornerY(K,I,F,D,z,P);J=this._getRotatedCornerX(K,C,F,D,z,P);G=this._getRotatedCornerY(K,C,F,D,z,P);N=this._getRotatedCornerX(S,C,F,D,z,P);L=this._getRotatedCornerY(S,C,F,D,z,P);H=this._getRotatedCornerX(S,I,F,D,z,P);t=this._getRotatedCornerY(S,I,F,D,z,P);v.left=Math.min(E,Math.min(J,Math.min(N,H)));v.right=Math.max(E,Math.max(J,Math.max(N,H)));v.top=Math.min(B,Math.min(G,Math.min(L,t)));v.bottom=Math.max(B,Math.max(G,Math.max(L,t)));}else{v.left=K-s+U;v.top=I-s+T;v.right=K+M+s+U;v.bottom=I+R+s+T;}return v;},_getRotatedCornerX:function(t,z,s,w,u,v){return(s+(t-s)*u+(z-w)*v);},_getRotatedCornerY:function(t,z,s,w,u,v){return(w-(t-s)*v+(z-w)*u);},destroy:function(){var t=this.node,s=this._context;if(t){if(s){s.clearRect(0,0,t.width,t.height);}if(this._graphic&&this._graphic._node){this._graphic._node.removeChild(this.node);}}}}));k.ATTRS={transformOrigin:{valueFn:function(){return[0.5,0.5];}},rotation:{setter:function(s){this.rotate(s);},getter:function(){return this._rotation;}},translateX:{getter:function(){return this._translateX;},setter:function(s){this._translateX=s;this._translate(s,this._translateY);return s;}},translateY:{getter:function(){return this._translateY;},setter:function(s){this._translateY=s;this._translate(this._translateX,s);return s;}},node:{readOnly:true,getter:function(){return this.node;}},id:{valueFn:function(){return c.guid();},setter:function(t){var s=this.node;if(s){s.setAttribute("id",t);}return t;}},width:{value:0},height:{value:0},x:{value:0},y:{value:0},visible:{value:true,setter:function(t){var s=t?"visible":"hidden";this.get("node").style.visibility=s;return t;}},fill:{valueFn:"_getDefaultFill",setter:function(u){var t,s=this.get("fill")||this._getDefaultFill();t=(u)?c.merge(s,u):null;if(t&&t.color){if(t.color===undefined||t.color=="none"){t.color=null;}}this._setFillProps(t);return t;}},stroke:{valueFn:"_getDefaultStroke",setter:function(t){var s=this.get("stroke")||this._getDefaultStroke();t=(t)?c.merge(s,t):null;this._setStrokeProps(t);return t;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},graphic:{readOnly:true,getter:function(){return this._graphic;}}};c.CanvasShape=k;l=function(s){l.superclass.constructor.apply(this,arguments);};l.NAME="canvasPath";c.extend(l,c.CanvasShape,{_type:"path",_draw:function(){this._paint();},createNode:function(){var s=c.config.doc.createElement("canvas"),t=this.get("id");this._context=s.getContext("2d");s.setAttribute("overflow","visible");s.setAttribute("pointer-events","none");s.style.pointerEvents="none";s.style.overflow="visible";s.setAttribute("class","yui3-"+o);s.setAttribute("class","yui3-"+this.name);s.setAttribute("id",t);t="#"+t;this.node=s;},end:function(){this._draw();}});l.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{getter:function(){var s=this._stroke&&this._strokeWeight?(this._strokeWeight*2):0;return this._width-s;},setter:function(s){this._width=s;return s;}},height:{getter:function(){var s=this._stroke&&this._strokeWeight?(this._strokeWeight*2):0;return this._height-s;},setter:function(s){this._height=s;return s;}},path:{readOnly:true,getter:function(){return this._path;}}});c.CanvasPath=l;r=function(){r.superclass.constructor.apply(this,arguments);};r.NAME="canvasRect";c.extend(r,c.CanvasShape,{_type:"rect",_draw:function(){var s=this.get("width"),t=this.get("height");this.clear();this.drawRect(0,0,s,t);this._paint();}});r.ATTRS=c.CanvasShape.ATTRS;c.CanvasRect=r;m=function(s){m.superclass.constructor.apply(this,arguments);};m.NAME="canvasEllipse";c.extend(m,k,{_type:"ellipse",_draw:function(){var s=this.get("width"),t=this.get("height");this.clear();this.drawEllipse(0,0,s,t);this._paint();}});m.ATTRS=k.ATTRS;c.CanvasEllipse=m;h=function(s){h.superclass.constructor.apply(this,arguments);};h.NAME="canvasCircle";c.extend(h,c.CanvasShape,{_type:"circle",_draw:function(){var s=this.get("radius");if(s){this.clear();this.drawCircle(0,0,s);this._paint();}}});h.ATTRS=c.merge(c.CanvasShape.ATTRS,{width:{setter:function(s){this.set("radius",s/2);return s;},getter:function(){return this.get("radius")*2;}},height:{setter:function(s){this.set("radius",s/2);return s;},getter:function(){return this.get("radius")*2;}},radius:{lazyAdd:false}});c.CanvasCircle=h;f=function(){f.superclass.constructor.apply(this,arguments);};f.NAME="canvasPieSlice";c.extend(f,c.CanvasShape,{_type:"path",_draw:function(w){var t=this.get("cx"),z=this.get("cy"),v=this.get("startAngle"),u=this.get("arc"),s=this.get("radius");this.clear();this._left=t;this._right=s;this._top=z;this._bottom=s;this.drawWedge(t,z,v,u,s);this.end();}});f.ATTRS=c.mix({cx:{value:0},cy:{value:0},startAngle:{value:0},arc:{value:0},radius:{value:0}},c.CanvasShape.ATTRS);
c.CanvasPieSlice=f;function d(s){d.superclass.constructor.apply(this,arguments);}d.NAME="canvasGraphic";d.ATTRS={render:{},id:{valueFn:function(){return c.guid();},setter:function(t){var s=this._node;if(s){s.setAttribute("id",t);}return t;}},shapes:{readOnly:true,getter:function(){return this._shapes;}},contentBounds:{readOnly:true,getter:function(){return this._contentBounds;}},node:{readOnly:true,getter:function(){return this._node;}},width:{setter:function(s){if(this._node){this._node.style.width=s+"px";}return s;}},height:{setter:function(s){if(this._node){this._node.style.height=s+"px";}return s;}},autoSize:{value:false},resizeDown:{getter:function(){return this._resizeDown;},setter:function(s){this._resizeDown=s;this._redraw();return s;}},x:{getter:function(){return this._x;},setter:function(s){this._x=s;if(this._node){this._node.style.left=s+"px";}return s;}},y:{getter:function(){return this._y;},setter:function(s){this._y=s;if(this._node){this._node.style.top=s+"px";}return s;}},autoDraw:{value:true},visible:{value:true,setter:function(s){this._toggleVisible(s);return s;}}};c.extend(d,c.BaseGraphic,{_x:0,_y:0,getXY:function(){var s=c.one(this._node),t;if(s){t=s.getXY();}return t;},_resizeDown:false,initializer:function(t){var v=this.get("render"),s=this.get("width")||0,u=this.get("height")||0;this._shapes={};this._redrawQueue={};this._contentBounds={left:0,top:0,right:0,bottom:0};this._node=e.createElement("div");this._node.style.position="absolute";this.set("width",s);this.set("height",u);if(v){this.render(v);}},render:function(v){var s=c.one(v),x=this._node,t=this.get("width")||parseInt(s.getComputedStyle("width"),10),u=this.get("height")||parseInt(s.getComputedStyle("height"),10);s=s||e.body;s.appendChild(x);x.style.display="block";x.style.position="absolute";x.style.left="0px";x.style.top="0px";this.set("width",t);this.set("height",u);this.parentNode=s;return this;},destroy:function(){this._removeAllShapes();this._removeChildren(this._node);if(this._node&&this._node.parentNode){this._node.parentNode.removeChild(this._node);}},getShape:function(s){s.graphic=this;var u=this._getShapeClass(s.type),t=new u(s);this.addShape(t);return t;},addShape:function(t){var u=t.node,s=this._frag||this._node;if(this.get("autoDraw")){s.appendChild(u);}else{this._getDocFrag().appendChild(u);}},removeShape:function(s){if(!(s instanceof k)){if(q.isString(s)){s=this._shapes[s];}}if(s&&s instanceof k){s.destroy();delete this._shapes[s.get("id")];}if(this.get("autoDraw")){this._redraw();}return s;},removeAllShapes:function(){var s=this._shapes,t;for(t in s){if(s.hasOwnProperty(t)){s[t].destroy();}}this._shapes={};},_removeChildren:function(s){if(s.hasChildNodes()){var t;while(s.firstChild){t=s.firstChild;this._removeChildren(t);s.removeChild(t);}}},_toggleVisible:function(v){var u,t=this._shapes,s=v?"visible":"hidden";if(t){for(u in t){if(t.hasOwnProperty(u)){t[u].set("visible",v);}}}this._node.style.visibility=s;},_getShapeClass:function(t){var s=this._shapeClass[t];if(s){return s;}return t;},_shapeClass:{circle:c.CanvasCircle,rect:c.CanvasRect,path:c.CanvasPath,ellipse:c.CanvasEllipse,pieslice:c.CanvasPieSlice},getShapeById:function(t){var s=this._shapes[t];return s;},batch:function(t){var s=this.get("autoDraw");this.set("autoDraw",false);t();this._redraw();this.set("autoDraw",s);},_getDocFrag:function(){if(!this._frag){this._frag=e.createDocumentFragment();}return this._frag;},_redraw:function(){var s=this.get("resizeDown")?this._getUpdatedContentBounds():this._contentBounds;if(this.get("autoSize")){this.set("width",s.right);this.set("height",s.bottom);}if(this._frag){this._node.appendChild(this._frag);this._frag=null;}},addToRedrawQueue:function(s){var u,t;this._shapes[s.get("id")]=s;if(!this.get("resizeDown")){u=s.getBounds();t=this._contentBounds;t.left=t.left<u.left?t.left:u.left;t.top=t.top<u.top?t.top:u.top;t.right=t.right>u.right?t.right:u.right;t.bottom=t.bottom>u.bottom?t.bottom:u.bottom;t.width=t.right-t.left;t.height=t.bottom-t.top;this._contentBounds=t;}if(this.get("autoDraw")){this._redraw();}},_getUpdatedContentBounds:function(){var w,u,t,s=this._shapes,v={left:0,top:0,right:0,bottom:0};for(u in s){if(s.hasOwnProperty(u)){t=s[u];w=t.getBounds();v.left=Math.min(v.left,w.left);v.top=Math.min(v.top,w.top);v.right=Math.max(v.right,w.right);v.bottom=Math.max(v.bottom,w.bottom);}}v.width=v.right-v.left;v.height=v.bottom-v.top;this._contentBounds=v;return v;}});c.CanvasGraphic=d;},"@VERSION@",{requires:["graphics"],skinnable:false});