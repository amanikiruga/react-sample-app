(this["webpackJsonpreact-sample-app"]=this["webpackJsonpreact-sample-app"]||[]).push([[0],{14:function(e,t,s){},9:function(e,t,s){"use strict";s.r(t);var r=s(8),a=s(3),n=s(4),c=s(6),i=s(5),u=s(1),o=s.n(u),l=s(7),h=s.n(l),j=(s(14),s(0));function b(e){return Object(j.jsx)("button",{className:"square",onClick:e.onClick,children:e.value})}var v=function(e){Object(c.a)(s,e);var t=Object(i.a)(s);function s(e){var r;return Object(a.a)(this,s),(r=t.call(this,e)).state={squares:Array(9).fill(null),xIsNext:!0},r}return Object(n.a)(s,[{key:"renderSquare",value:function(e){var t=this;return Object(j.jsx)(b,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}},e)}},{key:"render",value:function(){var e=this;Array(9).map((function(t,s){return e.renderSquare(s)}));for(var t=[],s=0,r=0;r<3;++r){for(var a=[],n=0;n<3;++n)a.push(this.renderSquare(s)),s++;t.push(Object(j.jsx)("div",{className:"board-row",children:a},r))}return Object(j.jsx)("div",{children:t})}}]),s}(o.a.Component),p=function(e){Object(c.a)(s,e);var t=Object(i.a)(s);function s(e){var r;return Object(a.a)(this,s),(r=t.call(this,e)).state={history:[{squares:Array(9).fill(null),lastMove:[-1,-1]}],stepNumber:0,xIsNext:!0},r}return Object(n.a)(s,[{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),s=t[t.length-1].squares.slice();s[e]||d(s)||(s[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:s,lastMove:[e%3+1,parseInt(e/3)+1]}]),xIsNext:!this.state.xIsNext,stepNumber:t.length}))}},{key:"render",value:function(){var e,t=this,s=this.state.history,r=s[this.state.stepNumber],a=d(r.squares),n=s.map((function(e,s){var r=s?"Go to game #".concat(s," col: ").concat(e.lastMove[0]," row: ").concat(e.lastMove[1]):"Go to game start",a=t.state.stepNumber;return r=s===a?Object(j.jsxs)("b",{children:[" ",r," "]}):r,Object(j.jsx)("li",{children:Object(j.jsxs)("button",{onClick:function(){return t.jumpTo(s)},children:[" ",r," "]})},s)}));return e=a?"WINNER: "+a:e="Next player: "+(this.state.xIsNext?"X":"O"),Object(j.jsxs)("div",{className:"game",children:[Object(j.jsx)("div",{className:"game-board",children:Object(j.jsx)(v,{squares:r.squares,onClick:function(e){t.handleClick(e)}})}),Object(j.jsxs)("div",{className:"game-info",children:[Object(j.jsx)("div",{children:e}),Object(j.jsx)("ol",{children:n})]})]})}}]),s}(o.a.Component);function d(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<t.length;s++){var a=Object(r.a)(t[s],3),n=a[0],c=a[1],i=a[2];if(e[n]&&e[n]===e[c]&&e[n]===e[i])return e[n]}return null}h.a.render(Object(j.jsx)(p,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.cd8773f5.chunk.js.map