(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{206:function(t,e,a){"use strict";a.r(e);var n=a(32),r=a.n(n),c=a(1),i=a.n(c),l=a(298),u=a(231),o=(a(582),function(t){function e(e){var a;return(a=t.call(this,e)||this).props=void 0,a.state=void 0,a.updateBar=function(){var t=450,e=l.f().range([0,890]).paddingInner(.2).paddingOuter(.8).round(!0),a=l.g().range([t,0]),n=l.h(".chart").attr("width",960).attr("height",500).append("g").attr("transform","translate(40, 20)"),r=l.a(e).ticks(20,"s");n.append("g").attr("class","x axis").attr("transform","translate(0, 450)").call(r),l.i("/db/data-vertical.tsv").then(function(r){e.domain(r.map(function(t){return t.letter})),a.domain([0,Math.max.apply(Math,r.map(function(t){return t.frequency}))]);var c=n.selectAll("g").data(r).enter().append("g").attr("transform",function(t){return"translate("+e(t.letter)+",0)"});c.append("rect").attr("y",function(t){return a(t.frequency)}).attr("height",function(e){return t-a(e.frequency)}).attr("width",e.bandwidth()),c.append("text").attr("text-anchor","start").attr("dy",".35em").attr("dx",function(t){return a(t.frequency)>=225?"-1em":"4em"}).attr("transform",function(t){return"rotate(90), translate("+a(t.frequency)+", -"+e.bandwidth()/2+")"}).text(function(t){return t.frequency})})},a.state={},a}r()(e,t);var a=e.prototype;return a.componentDidMount=function(){this.updateBar()},a.componentDidUpdate=function(){},a.render=function(){return i.a.createElement(u.a,null,i.a.createElement("div",{className:"svg-bar-chart-vertical"},i.a.createElement("svg",{className:"chart"})))},e}(i.a.Component));e.default=o},229:function(t,e,a){},231:function(t,e,a){"use strict";var n=a(1),r=a.n(n),c=a(245),i=a.n(c),l=a(591),u=a(594),o=function(){return r.a.createElement(u.a,{vertical:!0},r.a.createElement(l.a,null,"D3 examples"))},s=a(262),m=a.n(s),d=a(593),p=a(592),f=function(){return r.a.createElement(d.a,{size:"large"},r.a.createElement(l.a,null,r.a.createElement(d.a.Item,{as:m.a,to:"/"},"Home"),r.a.createElement(d.a.Menu,{position:"right"},r.a.createElement(d.a.Menu,{position:"right"},r.a.createElement(p.a,{item:!0,text:"Examples"},r.a.createElement(p.a.Menu,null,r.a.createElement(p.a.Item,{as:m.a,to:"/simple-bar-chart"},"simple-bar-chart"),r.a.createElement(p.a.Item,{as:m.a,to:"/svg-bar-chart"},"svg-bar-chart"),r.a.createElement(p.a.Item,{as:m.a,to:"/svg-bar-chart-vertical"},"svg-bar-chart-vertical")))))))},h=(a(263),a(264),a(229),function(t){return r.a.createElement("div",null,r.a.createElement(i.a,{title:"D3 examples",meta:[{name:"description",content:"D3 examples and tutorials in built with Gatsby react"},{name:"keywords",content:"D3, React"}]}),r.a.createElement(f,null),r.a.createElement(l.a,null,t.children),r.a.createElement(o,null))});e.a=h},582:function(t,e,a){}}]);
//# sourceMappingURL=component---src-pages-svg-bar-chart-vertical-jsx-099ffa7700820b16d103.js.map