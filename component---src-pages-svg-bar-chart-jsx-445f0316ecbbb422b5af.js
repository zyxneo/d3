(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{219:function(t,e,a){"use strict";a.r(e);var n=a(32),r=a.n(n),c=a(1),l=a.n(c),i=a(250),u=a(309),o=a(243),m=(a(583),function(t){function e(e){var a;return(a=t.call(this,e)||this).props=void 0,a.state=void 0,a.updateBar=function(){var t=u.f().range([0,500]),e=u.g(".chart").attr("width",500);u.h(Object(i.withPrefix)("/db/data.tsv")).then(function(a){t.domain([0,Math.max.apply(Math,a.map(function(t){return t.value}))]),e.attr("height",24*a.length);var n=e.selectAll("g").data(a).enter().append("g").attr("transform",function(t,e){return"translate(0,"+24*e+")"});n.append("rect").attr("width",function(e){return t(e.value)}).attr("height",23),n.append("text").attr("x",function(e){return t(e.value)-3}).attr("y",12).attr("dy",".35em").text(function(t){return t.value})})},a.state={},a}r()(e,t);var a=e.prototype;return a.componentDidMount=function(){this.updateBar()},a.componentDidUpdate=function(){this.updateBar()},a.render=function(){return l.a.createElement(o.a,null,l.a.createElement("div",{className:"svg-bar-chart"},l.a.createElement("svg",{className:"chart"})))},e}(l.a.Component));e.default=m},241:function(t,e,a){},243:function(t,e,a){"use strict";var n=a(1),r=a.n(n),c=a(258),l=a.n(c),i=a(590),u=a(593),o=function(){return r.a.createElement(u.a,{vertical:!0},r.a.createElement(i.a,null,"D3 examples"))},m=a(250),s=a.n(m),p=a(592),h=a(591),d=function(){return r.a.createElement(p.a,{size:"large"},r.a.createElement(i.a,null,r.a.createElement(p.a.Item,{as:s.a,to:"/"},"Home"),r.a.createElement(p.a.Menu,{position:"right"},r.a.createElement(p.a.Menu,{position:"right"},r.a.createElement(h.a,{item:!0,text:"Examples"},r.a.createElement(h.a.Menu,null,r.a.createElement(h.a.Item,{as:s.a,to:"/simple-bar-chart"},"simple-bar-chart"),r.a.createElement(h.a.Item,{as:s.a,to:"/svg-bar-chart"},"svg-bar-chart"),r.a.createElement(h.a.Item,{as:s.a,to:"/svg-bar-chart-vertical"},"svg-bar-chart-vertical")))))))},v=(a(275),a(276),a(241),function(t){return r.a.createElement("div",null,r.a.createElement(l.a,{title:"D3 examples",meta:[{name:"description",content:"D3 examples and tutorials in built with Gatsby react"},{name:"keywords",content:"D3, React"}]}),r.a.createElement(d,null),r.a.createElement(i.a,null,t.children),r.a.createElement(o,null))});e.a=v},583:function(t,e,a){}}]);
//# sourceMappingURL=component---src-pages-svg-bar-chart-jsx-445f0316ecbbb422b5af.js.map