(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{218:function(t,e,a){"use strict";a.r(e),a(376);var n=a(31),r=a.n(n),i=a(1),o=a.n(i),c=a(252),s=a(238),l=function(t){function e(){for(var e,a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(e=t.call.apply(t,[this].concat(n))||this).props=void 0,e.state=void 0,e.updateBar=function(){var t=c.p(".axis-styling svg"),e=+t.attr("width")-0-0,a=+t.attr("height")-20-20,n=t.append("g").attr("transform","translate(0, 20)").attr("class","wrapper"),r=c.g(".1f"),i=c.o().domain([new Date(2010,7,1),new Date(2012,7,1)]).range([0,e]),o=c.m().domain([0,2e6]).range([a,0]),s=c.a(i).ticks(c.s),l=c.c(o).tickSize(e).tickFormat(function(t,e,a){var n=r(t/1e6);return e===a.length-1?"$"+n+" million":" "+n});n.append("g").attr("class","x axis").attr("transform","translate(0, "+a+")").call(s).select(".domain").remove();var u=function(t){var e=t.selection?t.selection():t;t.call(l),e.select(".domain").remove(),e.selectAll(".tick line").filter(Number).attr("stroke","#777").attr("stroke-dasharray","2,2"),e.selectAll(".tick text").attr("x",4).attr("dy",-4),e!==t&&t.selectAll(".tick text").attrTween("x",null).attrTween("dy",null)},p=n.append("g").attr("class","y axis").call(u);c.t(function(){o.domain([0,4e6]),p.transition().duration(2500).call(u)},1e3)},e}r()(e,t);var a=e.prototype;return a.componentDidMount=function(){this.updateBar()},a.componentDidUpdate=function(){this.updateBar()},a.render=function(){return o.a.createElement(s.a,null,o.a.createElement("div",{className:"axis-styling"},o.a.createElement("svg",{width:"960",height:"500",style:{display:"block",margin:"0 auto"}})))},e}(o.a.Component);e.default=l},236:function(t,e,a){},238:function(t,e,a){"use strict";var n=a(1),r=a.n(n),i=a(245),o=a.n(i),c=a(596),s=a(599),l=function(){return r.a.createElement(s.a,{vertical:!0},r.a.createElement(c.a,null,"D3 examples"))},u=a(242),p=a.n(u),m=a(598),f=a(597),d=function(){return r.a.createElement(m.a,{size:"large"},r.a.createElement(c.a,null,r.a.createElement(m.a.Item,{as:p.a,to:"/"},"Home"),r.a.createElement(m.a.Menu,{position:"right"},r.a.createElement(m.a.Menu,{position:"right"},r.a.createElement(f.a,{item:!0,text:"Examples"},r.a.createElement(f.a.Menu,null,r.a.createElement(f.a.Item,{as:p.a,to:"/simple-bar-chart"},"simple-bar-chart"),r.a.createElement(f.a.Item,{as:p.a,to:"/svg-bar-chart"},"svg-bar-chart"),r.a.createElement(f.a.Item,{as:p.a,to:"/svg-bar-chart-vertical"},"svg-bar-chart-vertical"),r.a.createElement(f.a.Item,{as:p.a,to:"/general-update-pattern"},"general-update-pattern"),r.a.createElement(f.a.Item,{as:p.a,to:"/nested-selections"},"nested-selections"),r.a.createElement(f.a.Item,{as:p.a,to:"/working-with-transitions"},"working-with-transitions"),r.a.createElement(f.a.Item,{as:p.a,to:"/axis-styling"},"axis-styling"),r.a.createElement(f.a.Item,{as:p.a,to:"/stacked-to-grouped-bars"},"stacked-to-grouped-bars")))))))},g=(a(250),a(251),a(236),function(t){return r.a.createElement("div",null,r.a.createElement(o.a,{title:"D3 examples",meta:[{name:"description",content:"D3 examples and tutorials in built with Gatsby react"},{name:"keywords",content:"D3, React"}]}),r.a.createElement(d,null),r.a.createElement(c.a,null,t.children),r.a.createElement(l,null))});e.a=g},376:function(t,e,a){"use strict";var n=a(5),r=a(16),i=a(19),o=a(377),c=a(45),s=a(10),l=a(76).f,u=a(121).f,p=a(14).f,m=a(379).trim,f=n.Number,d=f,g=f.prototype,E="Number"==i(a(75)(g)),h="trim"in String.prototype,v=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){var a,n,r,i=(e=h?e.trim():m(e,3)).charCodeAt(0);if(43===i||45===i){if(88===(a=e.charCodeAt(2))||120===a)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+e}for(var o,s=e.slice(2),l=0,u=s.length;l<u;l++)if((o=s.charCodeAt(l))<48||o>r)return NaN;return parseInt(s,n)}}return+e};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof f&&(E?s(function(){g.valueOf.call(a)}):"Number"!=i(a))?o(new d(v(e)),a,f):v(e)};for(var y,I=a(15)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;I.length>N;N++)r(d,y=I[N])&&!r(f,y)&&p(f,y,u(d,y));f.prototype=g,g.constructor=f,a(18)(n,"Number",f)}},377:function(t,e,a){var n=a(9),r=a(378).set;t.exports=function(t,e,a){var i,o=e.constructor;return o!==a&&"function"==typeof o&&(i=o.prototype)!==a.prototype&&n(i)&&r&&r(t,i),t}},378:function(t,e,a){var n=a(9),r=a(12),i=function(t,e){if(r(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{(n=a(25)(Function.call,a(121).f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,a){return i(t,a),e?t.__proto__=a:n(t,a),t}}({},!1):void 0),check:i}},379:function(t,e,a){var n=a(11),r=a(33),i=a(10),o=a(380),c="["+o+"]",s=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),u=function(t,e,a){var r={},c=i(function(){return!!o[t]()||"​"!="​"[t]()}),s=r[t]=c?e(p):o[t];a&&(r[a]=s),n(n.P+n.F*c,"String",r)},p=u.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(s,"")),2&e&&(t=t.replace(l,"")),t};t.exports=u},380:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=component---src-pages-axis-styling-jsx-92c6898bc8edeab83233.js.map