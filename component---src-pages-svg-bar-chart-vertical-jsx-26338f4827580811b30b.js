(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{144:function(t,e,n){"use strict";n.r(e);var a=n(6),r=n.n(a),u=n(0),c=n.n(u),i=n(149),o=n(173),l=n(157),s=(n(433),function(t){function e(){for(var e,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))||this).updateBar=function(){var t=20,e=30,n=30,a=40,r=960-a-e,u=500-t-n,c=o.q().range([0,r]).paddingInner(.2).paddingOuter(.8).round(!0),l=o.r().range([u,0]),s=o.u(".chart").attr("width",r+a+e).attr("height",u+t+n).append("g").attr("transform","translate("+a+", "+t+")");o.B(Object(i.withPrefix)("/db/data-vertical.tsv")).then(function(t){c.domain(t.map(function(t){return t.letter})),l.domain([0,Math.max.apply(Math,t.map(function(t){return t.frequency}))]);var e=s.selectAll("g.column").data(t).enter().append("g").attr("class",".column").attr("transform",function(t){return"translate("+c(t.letter)+",0)"});e.append("rect").attr("y",function(t){return l(t.frequency)}).attr("height",function(t){return u-l(t.frequency)}).attr("width",c.bandwidth()),e.append("text").attr("text-anchor","start").attr("dy",".35em").attr("dx",function(t){return l(t.frequency)>=u/2?"-1em":"4em"}).attr("class",function(t){return l(t.frequency)>=u/2?"upper":"lower"}).attr("transform",function(t){return"rotate(90), translate("+l(t.frequency)+", -"+c.bandwidth()/2+")"}).text(function(t){return t.frequency});var n=o.a(c).tickValues(t.map(function(t){return t.letter}));s.append("g").attr("class","x axis").attr("transform","translate(0, "+u+")").call(n);var a=o.b(l).ticks(10);s.append("g").attr("class","y axis").call(a)})},e}r()(e,t);var n=e.prototype;return n.componentDidMount=function(){this.updateBar()},n.componentDidUpdate=function(){},n.render=function(){return c.a.createElement(l.a,null,c.a.createElement("div",{className:"svg-bar-chart-vertical"},c.a.createElement("svg",{className:"chart"})))},e}(c.a.Component));e.default=s},151:function(t,e,n){var a;t.exports=(a=n(155))&&a.default||a},155:function(t,e,n){"use strict";n.r(e);n(29);var a=n(0),r=n.n(a),u=n(4),c=n.n(u),i=n(49),o=n(2),l=function(t){var e=t.location,n=o.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(i.a,Object.assign({location:e,pageResources:n},n.json))};l.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},e.default=l},156:function(t,e,n){},157:function(t,e,n){"use strict";var a=n(0),r=n.n(a),u=n(165),c=n.n(u),i=n(441),o=n(444),l=function(){return r.a.createElement(o.a,{vertical:!0},r.a.createElement(i.a,null,"D3 examples"))},s=n(149),d=n.n(s),f=n(443),p=function(){return r.a.createElement(f.a,{size:"large"},r.a.createElement(i.a,null,r.a.createElement(f.a.Item,{as:d.a,to:"/"},"Home")))},m=(n(168),n(169),n(156),function(t){return r.a.createElement("div",null,r.a.createElement(c.a,{title:"D3 examples",meta:[{name:"description",content:"D3 examples and tutorials in built with Gatsby react"},{name:"keywords",content:"D3, React"}]}),r.a.createElement(p,null),r.a.createElement(i.a,null,t.children),r.a.createElement(l,null))});e.a=m},164:function(t,e,n){"use strict";n.r(e),n.d(e,"graphql",function(){return m}),n.d(e,"StaticQueryContext",function(){return f}),n.d(e,"StaticQuery",function(){return p});var a=n(0),r=n.n(a),u=n(4),c=n.n(u),i=n(149),o=n.n(i);n.d(e,"Link",function(){return o.a}),n.d(e,"withPrefix",function(){return i.withPrefix}),n.d(e,"navigate",function(){return i.navigate}),n.d(e,"push",function(){return i.push}),n.d(e,"replace",function(){return i.replace}),n.d(e,"navigateTo",function(){return i.navigateTo});var l=n(151),s=n.n(l);n.d(e,"PageRenderer",function(){return s.a});var d=n(28);n.d(e,"parsePath",function(){return d.a});var f=r.a.createContext({}),p=function(t){return r.a.createElement(f.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function m(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},433:function(t,e,n){}}]);
//# sourceMappingURL=component---src-pages-svg-bar-chart-vertical-jsx-26338f4827580811b30b.js.map