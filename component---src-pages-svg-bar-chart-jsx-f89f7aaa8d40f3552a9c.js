(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{147:function(t,e,n){"use strict";n.r(e);var a=n(6),r=n.n(a),u=n(0),i=n.n(u),c=n(152),o=n(171),l=n(160),s=(n(437),function(t){function e(e){var n;return(n=t.call(this,e)||this).updateBar=function(){var t=o.v().range([0,500]),e=o.y(".chart").attr("width",500);o.G(Object(c.withPrefix)("/db/data.tsv")).then(function(n){t.domain([0,Math.max.apply(Math,n.map(function(t){return t.value}))]),e.attr("height",24*n.length);var a=e.selectAll("g").data(n).enter().append("g").attr("transform",function(t,e){return"translate(0,"+24*e+")"});a.append("rect").attr("width",function(e){return t(e.value)}).attr("height",23),a.append("text").attr("x",function(e){return t(e.value)-3}).attr("y",12).attr("dy",".35em").text(function(t){return t.value})})},n.state={},n}r()(e,t);var n=e.prototype;return n.componentDidMount=function(){this.updateBar()},n.componentDidUpdate=function(){this.updateBar()},n.render=function(){return i.a.createElement(l.a,null,i.a.createElement("div",{className:"svg-bar-chart"},i.a.createElement("svg",{className:"chart"})))},e}(i.a.Component));e.default=s},154:function(t,e,n){var a;t.exports=(a=n(158))&&a.default||a},158:function(t,e,n){"use strict";n.r(e);n(29);var a=n(0),r=n.n(a),u=n(4),i=n.n(u),c=n(49),o=n(2),l=function(t){var e=t.location,n=o.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(c.a,Object.assign({location:e,pageResources:n},n.json))};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},e.default=l},159:function(t,e,n){},160:function(t,e,n){"use strict";var a=n(0),r=n.n(a),u=n(165),i=n.n(u),c=n(444),o=n(447),l=function(){return r.a.createElement(o.a,{vertical:!0},r.a.createElement(c.a,null,"D3 examples"))},s=n(152),d=n.n(s),p=n(446),f=function(){return r.a.createElement(p.a,{size:"large"},r.a.createElement(c.a,null,r.a.createElement(p.a.Item,{as:d.a,to:"/"},"Home")))},m=(n(166),n(167),n(159),function(t){return r.a.createElement("div",null,r.a.createElement(i.a,{title:"D3 examples",meta:[{name:"description",content:"D3 examples and tutorials in built with Gatsby react"},{name:"keywords",content:"D3, React"}]}),r.a.createElement(f,null),r.a.createElement(c.a,null,t.children),r.a.createElement(l,null))});e.a=m},164:function(t,e,n){"use strict";n.r(e),n.d(e,"graphql",function(){return m}),n.d(e,"StaticQueryContext",function(){return p}),n.d(e,"StaticQuery",function(){return f});var a=n(0),r=n.n(a),u=n(4),i=n.n(u),c=n(152),o=n.n(c);n.d(e,"Link",function(){return o.a}),n.d(e,"withPrefix",function(){return c.withPrefix}),n.d(e,"navigate",function(){return c.navigate}),n.d(e,"push",function(){return c.push}),n.d(e,"replace",function(){return c.replace}),n.d(e,"navigateTo",function(){return c.navigateTo});var l=n(154),s=n.n(l);n.d(e,"PageRenderer",function(){return s.a});var d=n(28);n.d(e,"parsePath",function(){return d.a});var p=r.a.createContext({}),f=function(t){return r.a.createElement(p.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function m(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},437:function(t,e,n){}}]);
//# sourceMappingURL=component---src-pages-svg-bar-chart-jsx-f89f7aaa8d40f3552a9c.js.map