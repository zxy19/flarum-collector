/*! For license information please see admin.js.LICENSE.txt */
(()=>{var t={912:function(t){t.exports=function(){"use strict";var t=6e4,n=36e5,e="millisecond",r="second",a="minute",o="hour",i="day",s="week",c="month",u="quarter",l="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var n=["th","st","nd","rd"],e=t%100;return"["+t+(n[(e-20)%10]||n[e]||n[0])+"]"}},v=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},y={s:v,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),a=e%60;return(n<=0?"+":"-")+v(r,2,"0")+":"+v(a,2,"0")},m:function t(n,e){if(n.date()<e.date())return-t(e,n);var r=12*(e.year()-n.year())+(e.month()-n.month()),a=n.clone().add(r,c),o=e-a<0,i=n.clone().add(r+(o?-1:1),c);return+(-(r+(e-a)/(o?a-i:i-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:s,d:i,D:d,h:o,m:a,s:r,ms:e,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",w={};w[g]=p;var b="$isDayjsObject",_=function(t){return t instanceof S||!(!t||!t[b])},x=function t(n,e,r){var a;if(!n)return g;if("string"==typeof n){var o=n.toLowerCase();w[o]&&(a=o),e&&(w[o]=e,a=o);var i=n.split("-");if(!a&&i.length>1)return t(i[0])}else{var s=n.name;w[s]=n,a=s}return!r&&a&&(g=a),a||!r&&g},O=function(t,n){if(_(t))return t.clone();var e="object"==typeof n?n:{};return e.date=t,e.args=arguments,new S(e)},E=y;E.l=x,E.i=_,E.w=function(t,n){return O(t,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var S=function(){function p(t){this.$L=x(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[b]=!0}var v=p.prototype;return v.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(E.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r){var a=r[2]-1||0,o=(r[7]||"0").substring(0,3);return e?new Date(Date.UTC(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(n)}(t),this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return E},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,n){var e=O(t);return this.startOf(n)<=e&&e<=this.endOf(n)},v.isAfter=function(t,n){return O(t)<this.startOf(n)},v.isBefore=function(t,n){return this.endOf(n)<O(t)},v.$g=function(t,n,e){return E.u(t)?this[n]:this.set(e,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,n){var e=this,u=!!E.u(n)||n,f=E.p(t),h=function(t,n){var r=E.w(e.$u?Date.UTC(e.$y,n,t):new Date(e.$y,n,t),e);return u?r:r.endOf(i)},m=function(t,n){return E.w(e.toDate()[t].apply(e.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(n)),e)},p=this.$W,v=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(f){case l:return u?h(1,0):h(31,11);case c:return u?h(1,v):h(0,v+1);case s:var w=this.$locale().weekStart||0,b=(p<w?p+7:p)-w;return h(u?y-b:y+(6-b),v);case i:case d:return m(g+"Hours",0);case o:return m(g+"Minutes",1);case a:return m(g+"Seconds",2);case r:return m(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,n){var s,u=E.p(t),f="set"+(this.$u?"UTC":""),h=(s={},s[i]=f+"Date",s[d]=f+"Date",s[c]=f+"Month",s[l]=f+"FullYear",s[o]=f+"Hours",s[a]=f+"Minutes",s[r]=f+"Seconds",s[e]=f+"Milliseconds",s)[u],m=u===i?this.$D+(n-this.$W):n;if(u===c||u===l){var p=this.clone().set(d,1);p.$d[h](m),p.init(),this.$d=p.set(d,Math.min(this.$D,p.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},v.set=function(t,n){return this.clone().$set(t,n)},v.get=function(t){return this[E.p(t)]()},v.add=function(e,u){var d,f=this;e=Number(e);var h=E.p(u),m=function(t){var n=O(f);return E.w(n.date(n.date()+Math.round(t*e)),f)};if(h===c)return this.set(c,this.$M+e);if(h===l)return this.set(l,this.$y+e);if(h===i)return m(1);if(h===s)return m(7);var p=(d={},d[a]=t,d[o]=n,d[r]=1e3,d)[h]||1,v=this.$d.getTime()+e*p;return E.w(v,this)},v.subtract=function(t,n){return this.add(-1*t,n)},v.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||f;var r=t||"YYYY-MM-DDTHH:mm:ssZ",a=E.z(this),o=this.$H,i=this.$m,s=this.$M,c=e.weekdays,u=e.months,l=e.meridiem,d=function(t,e,a,o){return t&&(t[e]||t(n,r))||a[e].slice(0,o)},h=function(t){return E.s(o%12||12,t,"0")},p=l||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r};return r.replace(m,(function(t,r){return r||function(t){switch(t){case"YY":return String(n.$y).slice(-2);case"YYYY":return E.s(n.$y,4,"0");case"M":return s+1;case"MM":return E.s(s+1,2,"0");case"MMM":return d(e.monthsShort,s,u,3);case"MMMM":return d(u,s);case"D":return n.$D;case"DD":return E.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return d(e.weekdaysMin,n.$W,c,2);case"ddd":return d(e.weekdaysShort,n.$W,c,3);case"dddd":return c[n.$W];case"H":return String(o);case"HH":return E.s(o,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return p(o,i,!0);case"A":return p(o,i,!1);case"m":return String(i);case"mm":return E.s(i,2,"0");case"s":return String(n.$s);case"ss":return E.s(n.$s,2,"0");case"SSS":return E.s(n.$ms,3,"0");case"Z":return a}return null}(t)||a.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(e,d,f){var h,m=this,p=E.p(d),v=O(e),y=(v.utcOffset()-this.utcOffset())*t,g=this-v,w=function(){return E.m(m,v)};switch(p){case l:h=w()/12;break;case c:h=w();break;case u:h=w()/3;break;case s:h=(g-y)/6048e5;break;case i:h=(g-y)/864e5;break;case o:h=g/n;break;case a:h=g/t;break;case r:h=g/1e3;break;default:h=g}return f?h:E.a(h)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return w[this.$L]},v.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),r=x(t,n,!0);return r&&(e.$L=r),e},v.clone=function(){return E.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},p}(),A=S.prototype;return O.prototype=A,[["$ms",e],["$s",r],["$m",a],["$H",o],["$W",i],["$M",c],["$y",l],["$D",d]].forEach((function(t){A[t[1]]=function(n){return this.$g(n,t[0],t[1])}})),O.extend=function(t,n){return t.$i||(t(n,S,O),t.$i=!0),O},O.locale=x,O.isDayjs=_,O.unix=function(t){return O(1e3*t)},O.en=w[g],O.Ls=w,O.p={},O}()},24:(t,n,e)=>{var r=e(735).default;function a(){"use strict";t.exports=a=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var n,e={},o=Object.prototype,i=o.hasOwnProperty,s=Object.defineProperty||function(t,n,e){t[n]=e.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",d=c.toStringTag||"@@toStringTag";function f(t,n,e){return Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{f({},"")}catch(n){f=function(t,n,e){return t[n]=e}}function h(t,n,e,r){var a=n&&n.prototype instanceof b?n:b,o=Object.create(a.prototype),i=new T(r||[]);return s(o,"_invoke",{value:D(t,e,i)}),o}function m(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var p="suspendedStart",v="suspendedYield",y="executing",g="completed",w={};function b(){}function _(){}function x(){}var O={};f(O,u,(function(){return this}));var E=Object.getPrototypeOf,S=E&&E(E(L([])));S&&S!==o&&i.call(S,u)&&(O=S);var A=x.prototype=b.prototype=Object.create(O);function M(t){["next","throw","return"].forEach((function(n){f(t,n,(function(t){return this._invoke(n,t)}))}))}function $(t,n){function e(a,o,s,c){var u=m(t[a],t,o);if("throw"!==u.type){var l=u.arg,d=l.value;return d&&"object"==r(d)&&i.call(d,"__await")?n.resolve(d.__await).then((function(t){e("next",t,s,c)}),(function(t){e("throw",t,s,c)})):n.resolve(d).then((function(t){l.value=t,s(l)}),(function(t){return e("throw",t,s,c)}))}c(u.arg)}var a;s(this,"_invoke",{value:function(t,r){function o(){return new n((function(n,a){e(t,r,n,a)}))}return a=a?a.then(o,o):o()}})}function D(t,e,r){var a=p;return function(o,i){if(a===y)throw Error("Generator is already running");if(a===g){if("throw"===o)throw i;return{value:n,done:!0}}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var c=N(s,r);if(c){if(c===w)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===p)throw a=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=y;var u=m(t,e,r);if("normal"===u.type){if(a=r.done?g:v,u.arg===w)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(a=g,r.method="throw",r.arg=u.arg)}}}function N(t,e){var r=e.method,a=t.iterator[r];if(a===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,N(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),w;var o=m(a,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,w;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,w):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,w)}function C(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function k(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function L(t){if(t||""===t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function e(){for(;++a<t.length;)if(i.call(t,a))return e.value=t[a],e.done=!1,e;return e.value=n,e.done=!0,e};return o.next=o}}throw new TypeError(r(t)+" is not iterable")}return _.prototype=x,s(A,"constructor",{value:x,configurable:!0}),s(x,"constructor",{value:_,configurable:!0}),_.displayName=f(x,d,"GeneratorFunction"),e.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===_||"GeneratorFunction"===(n.displayName||n.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,d,"GeneratorFunction")),t.prototype=Object.create(A),t},e.awrap=function(t){return{__await:t}},M($.prototype),f($.prototype,l,(function(){return this})),e.AsyncIterator=$,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new $(h(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},M(A),f(A,d,"Generator"),f(A,u,(function(){return this})),f(A,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var n=Object(t),e=[];for(var r in n)e.push(r);return e.reverse(),function t(){for(;e.length;){var r=e.pop();if(r in n)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=L,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,a){return s.type="throw",s.arg=t,e.next=r,a&&(e.method="next",e.arg=n),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=n&&n<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=n,a?(this.method="next",this.next=a.finallyLoc,w):this.complete(o)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),w},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),k(e),w}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var a=r.arg;k(e)}return a}}throw Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),w}},e}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports},735:t=>{function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},183:(t,n,e)=>{var r=e(24)();t.exports=r;try{regeneratorRuntime=r}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}}},n={};function e(r){var a=n[r];if(void 0!==a)return a.exports;var o=n[r]={exports:{}};return t[r].call(o.exports,o,o.exports,e),o.exports}e.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},e.d=(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};(()=>{"use strict";e.r(r),e.d(r,{Condition:()=>T,ConditionConfigure:()=>G,HumanizeUtils:()=>h,OPERATOR:()=>u,RewardConfigure:()=>Y,addCondition:()=>p,addReward:()=>v,addRewardSelection:()=>g,extend:()=>K,rewardValueConvert:()=>y});const t=flarum.core.compat["admin/app"];var n=e.n(t);function a(t,n,e,r,a,o,i){try{var s=t[o](i),c=s.value}catch(t){return void e(t)}s.done?n(c):Promise.resolve(c).then(r,a)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var i=t.apply(n,e);function s(t){a(i,r,o,s,c,"next",t)}function c(t){a(i,r,o,s,c,"throw",t)}s(void 0)}))}}var i=e(183),s=e.n(i);const c=flarum.core.compat["common/extend"];var u=function(t){return t.EQUAL="=",t.NOT_EQUAL="!=",t.GREATER_THAN=">",t.LESS_THAN="<",t.GREATER_THAN_OR_EQUAL=">=",t.LESS_THAN_OR_EQUAL="<=",t}({}),l=function(t){return t[t.SUM=1]="SUM",t[t.MAX=2]="MAX",t[t.DAY_COUNT=3]="DAY_COUNT",t}({});const d=flarum.core.compat["common/utils/ItemList"];var f=e.n(d),h=function(){function t(t){this.app=void 0,this.definitionLoaded=!1,this.rawConditionDefinition={},this.conditionTranslations={},this.rewardTranslations={},this.conditionsKeys=[],this.rewardsKeys=[],this.app=t}var n=t.prototype;return n.loadDefinition=function(){var t=o(s().mark((function t(){var n;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.definitionLoaded){t.next=2;break}return t.abrupt("return");case 2:if(!this.app.data["collector-definition"]){t.next=5;break}return this._loadDefinition(this.app.data["collector-definition"]),t.abrupt("return");case 5:return t.next=7,this.app.request({method:"GET",url:this.app.forum.attribute("apiUrl")+"/collector-data"});case 7:n=t.sent,this._loadDefinition(n);case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}(),n._loadDefinition=function(t){var n=this;t.conditions.forEach((function(t){n.conditionTranslations[t.key]=t.trans,n.conditionsKeys.push(t.key),n.rawConditionDefinition[t.key]=t})),t.rewards.forEach((function(t){n.rewardTranslations[t.key]=t.trans,n.rewardsKeys.push(t.key)})),this.definitionLoaded=!0},t.getInstance=function(n){return this.instance||(this.instance=new t(n)),this.instance},n.getAllConditions=function(){var t=this,n=new(f());return this.conditionsKeys.forEach((function(e){n.add(e,t.conditionTranslations[e])})),n},n.getAllRewards=function(){var t=this,n=new(f());return this.rewardsKeys.forEach((function(e){n.add(e,t.rewardTranslations[e])})),n},n.getConditionName=function(t){return this.getAllConditions().has(t)?this.getAllConditions().get(t):t},n.getRewardName=function(t){return this.getAllRewards().has(t)?this.getAllRewards().get(t):t},n.getRewardValue=function(t,n){return n},n.rewardSelection=function(){var t=o(s().mark((function t(n){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return","");case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),n.humanizeCondition=function(t){var n=this;if(Array.isArray(t))return t.map((function(t){return n.humanizeCondition(t)}));if(t.alter_name)return t.alter_name;var e=t.span?this.app.translator.trans("xypp-collector.forum.condition.span",{span:t.span}):"";return Array.isArray(e)&&(e=e.join("")),this.app.translator.trans("xypp-collector.forum.condition.format",{b:m("b",null),name:this.getConditionName(t.name),operator:t.operator,value:t.value,calculate:this.getCalculate(t.calculate||l.SUM),span:e})},n.humanizeReward=function(t){var n=this;return Array.isArray(t)?t.map((function(t){return n.humanizeReward(t)})):t.alter_name?t.alter_name:this.app.translator.trans("xypp-collector.forum.reward.format",{b:m("b",null),name:this.getRewardName(t.name),value:this.getRewardValue(t.name,t.value)})},n.getCalculate=function(t){var n,e=((n={})[l.SUM]="sum",n[l.MAX]="max",n[l.DAY_COUNT]="days",n);return this.app.translator.trans("xypp-collector.lib.calculate."+e[t])},n.getRawConditionDefinition=function(t){return this.rawConditionDefinition[t]||!1},t}();function p(t,n){(0,c.extend)(h.prototype,"getAllConditions",(function(e){e.add(t,n)}))}function v(t,n){(0,c.extend)(h.prototype,"getAllRewards",(function(e){e.add(t,n)}))}function y(t,n){(0,c.override)(h.prototype,"getRewardValue",(function(e,r,a){return t===r?n(a):e(r,a)}))}function g(t,n){(0,c.override)(h.prototype,"rewardSelection",function(){var e=o(s().mark((function e(r,a){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t!==a){e.next=4;break}return e.abrupt("return",n());case 4:return e.abrupt("return",r(a));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}function w(t,n){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},w(t,n)}function b(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,w(t,n)}h.instance=void 0;const _=flarum.core.compat["common/components/Modal"];var x=e.n(_);const O=flarum.core.compat["common/components/Button"];var E=e.n(O);const S=flarum.core.compat["common/components/Select"];var A=e.n(S),M=function(t){function n(){for(var n,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return(n=t.call.apply(t,[this].concat(r))||this).selection="",n.done=!1,n}b(n,t);var e=n.prototype;return e.oninit=function(n){t.prototype.oninit.call(this,n),this.selection=this.attrs.items[Object.keys(this.attrs.items)[0]]},e.className=function(){return"Modal"},e.title=function(){return this.attrs.title},e.oncreate=function(n){t.prototype.oncreate.call(this,n)},e.onremove=function(n){t.prototype.onremove.call(this,n),this.done||this.attrs.cancel()},e.content=function(){var t=this;return m("div",{className:"Modal-body"},m("div",{className:"Form"},m("div",{className:"Form-group"},m(A(),{className:"FormControl",value:this.selection,options:this.attrs.items,onchange:function(n){t.selection=n}.bind(this)})),m("div",{className:"Form-group"},m(E(),{class:"Button Button--primary",type:"submit",loading:this.loading},this.attrs.button))))},e.onsubmit=function(){var t=o(s().mark((function t(n){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),this.done=!0,this.attrs.callback(this.selection);case 3:case"end":return t.stop()}}),t,this)})));return function(n){return t.apply(this,arguments)}}(),n.open=function(t,e,r,a){return new Promise((function(o,i){t.modal.show(n,{items:e,title:r,button:a,cancel:function(){i()},callback:function(n){o(n),t.modal.close()}},!0)}))},n}(x());const $=flarum.core.compat["common/Model"];var D=e.n($),N=e(912),C=e.n(N);function k(t){if(!t)return null;try{return JSON.parse(t)}catch(t){return null}}var T=function(t){function n(){for(var n,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return(n=t.call.apply(t,[this].concat(r))||this).name=D().attribute("name"),n.value=D().attribute("value"),n.accumulation=D().attribute("accumulation",k),n}b(n,t);var e=n.prototype;return e.getSpan=function(t,n){void 0===n&&(n=l.SUM);var e=this.accumulation();if(!e||t<1)return 0;var r=C()(C()().format("YYYYMMDD"),"YYYYMMDD");1!=t&&(r=r.subtract(t-1,"day"));var a=0;return Object.keys(e).forEach((function(t){if("all"!=t&&"rest"!=t){var o=C()(t,"YYYYMMDD");(o.isAfter(r)||o.isSame(r))&&(n==l.MAX?a=Math.max(a,e[t]):n==l.SUM?a+=e[t]:n==l.DAY_COUNT&&e[t]>0&&(a+=1))}})),a},e.getTotal=function(t){var n,e,r;return void 0===t&&(t=l.SUM),t==l.MAX?(null==(n=this.accumulation())?void 0:n.max)||0:t==l.DAY_COUNT?(null==(e=this.accumulation())?void 0:e.days)||0:(null==(r=this.accumulation())?void 0:r.all)||0},n}(D());const L=flarum.core.compat["common/Component"];var j=e.n(L);function R(t,n,e){return t?n:e||""}function U(t){return"*"!==t.name}var Y=function(t){function e(){for(var n,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return(n=t.call.apply(t,[this].concat(r))||this).rewards=[],n.REG_REWARDS={},n.rewardGettingValue={},n}b(e,t);var r=e.prototype;return r.oninit=function(e){var r=this;t.prototype.oninit.call(this,e);var a=h.getInstance(n()).getAllRewards().toObject();Object.keys(a).forEach((function(t){r.REG_REWARDS[t]=a[t].content})),this.REG_REWARDS["*"]=n().translator.trans("xypp-collector.admin.list.new_item")+"",this.rewards=JSON.parse(JSON.stringify(this.attrs.rewards())),this.rewards.push({name:"*",value:"*"})},r.onbeforeupdate=function(n){this.rewards=JSON.parse(JSON.stringify(this.attrs.rewards())),this.rewards.push({name:"*",value:"*"}),t.prototype.onbeforeupdate.call(this,n)},r.view=function(t){var e=this;return m("table",{className:"Table"},m("thead",null,m("tr",null,m("th",null,n().translator.trans("xypp-collector.admin.list.reward-name")),m("th",null,n().translator.trans("xypp-collector.admin.list.reward-value")),m("th",null,n().translator.trans("xypp-collector.admin.list.reward-get_value")),m("th",null,n().translator.trans("xypp-collector.admin.list.reward-alter_name")))),m("tbody",null,this.rewards.map((function(t,n){return m("tr",null,m("td",null,m(A(),{className:"FormControl",value:t.name,options:e.REG_REWARDS,onchange:function(t){e.rewards.length==n+1&&e.rewards.push({name:"*",value:"*"}),e.rewards[n].name=t,e.attrs.rewards(e.rewards.filter(U))}.bind(e)})),m("td",null,m("input",{className:"FormControl",type:"text",value:t.value,onchange:function(t){e.rewards[n].value=t.target.value,e.attrs.rewards(e.rewards.filter(U))}.bind(e)})),m("td",null,m(E(),{className:"Button Button--primary",onclick:e.getValue.bind(e),"data-id":n,disabled:e.rewardGettingValue[n],loading:e.rewardGettingValue[n]},m("i",{class:"fas fa-eye"}))),m("td",null,m("input",{className:"FormControl",type:"text",value:t.alter_name||"",onchange:function(t){e.rewards[n].alter_name=t.target.value||void 0,e.attrs.rewards(e.rewards.filter(U))}.bind(e)})),m("td",null,R("*"!=t.name,m(E(),{className:"Button Button--danger",onclick:function(t){e.rewards.splice(n,1),e.attrs.rewards(e.rewards.filter(U)),m.redraw()}.bind(e),"data-id":n},m("i",{class:"fas fa-trash"})))))}))))},r.getValue=function(){var t=o(s().mark((function t(e){var r,a;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=parseInt(e.currentTarget.getAttribute("data-id")),this.rewardGettingValue[r]=!0,m.redraw(),t.next=5,h.getInstance(n()).rewardSelection(this.rewards[r].name);case 5:(a=t.sent)&&(this.rewards[r].value=a),this.rewardGettingValue[r]=!1,this.attrs.rewards(this.rewards.filter(U)),m.redraw();case 10:case"end":return t.stop()}}),t,this)})));return function(n){return t.apply(this,arguments)}}(),e}(j());function I(t){return"*"!==t.name}var G=function(t){function e(){for(var n,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return(n=t.call.apply(t,[this].concat(r))||this).conditions=[],n.REG_OPERATOR={"=":"=",">":">",">=":">=","<":"<","<=":"<=","!=":"!="},n.REG_CALCULATE={},n.REG_CONDITIONS={},n}b(e,t);var r=e.prototype;return r.oninit=function(e){var r=this;t.prototype.oninit.call(this,e);var a=h.getInstance(n()),o=a.getAllConditions().toObject();Object.keys(o).forEach((function(t){r.REG_CONDITIONS[t]=o[t].content})),this.REG_CONDITIONS["*"]=n().translator.trans("xypp-collector.admin.list.new_item")+"",this.REG_CALCULATE[l.SUM]=a.getCalculate(l.SUM)+"",this.REG_CALCULATE[l.MAX]=a.getCalculate(l.MAX)+"",this.REG_CALCULATE[l.DAY_COUNT]=a.getCalculate(l.DAY_COUNT)+"",this.conditions=JSON.parse(JSON.stringify(this.attrs.conditions())),this.conditions.push({name:"*",operator:u.EQUAL,value:0})},r.onbeforeupdate=function(n){this.conditions=JSON.parse(JSON.stringify(this.attrs.conditions())),this.conditions.push({name:"*",operator:u.EQUAL,value:0}),t.prototype.onbeforeupdate.call(this,n)},r.view=function(t){var e=this;return m("table",{className:"Table"},m("thead",null,m("tr",null,m("th",null,n().translator.trans("xypp-collector.admin.list.condition-name")),m("th",null,n().translator.trans("xypp-collector.admin.list.condition-operator")),m("th",null,n().translator.trans("xypp-collector.admin.list.condition-value")),m("th",null,n().translator.trans("xypp-collector.admin.list.condition-span")),m("th",null,n().translator.trans("xypp-collector.admin.list.condition-calculate")),m("th",null,n().translator.trans("xypp-collector.admin.list.condition-alter_name")))),m("tbody",null,this.conditions.map((function(t,n){return m("tr",null,m("td",null,m(A(),{className:"FormControl",value:t.name,options:e.REG_CONDITIONS,onchange:function(t){e.conditions.length==n+1&&e.conditions.push({name:"*",operator:u.EQUAL,value:0}),e.conditions[n].name=t,e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,m(A(),{className:"FormControl",value:t.operator,options:e.REG_OPERATOR,onchange:function(t){e.conditions[n].operator=t,e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,m("input",{className:"FormControl",type:"text",value:t.value,onchange:function(t){e.conditions[n].value=parseInt(t.target.value),e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,m("input",{className:"FormControl",type:"number",value:t.span,onchange:function(t){e.conditions[n].span=t.target.value?parseInt(t.target.value):void 0,e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,m(A(),{className:"FormControl",value:t.calculate||l.SUM,options:e.REG_CALCULATE,onchange:function(t){e.conditions[n].calculate=parseInt(t),e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,m("input",{className:"FormControl",type:"text",value:t.alter_name||"",onchange:function(t){e.conditions[n].alter_name=t.target.value||void 0,e.attrs.conditions(e.conditions.filter(I))}.bind(e)})),m("td",null,R("*"!=t.name,m(E(),{className:"Button Button--danger",onclick:function(t){e.conditions.splice(n,1),m.redraw(),e.attrs.conditions(e.conditions.filter(I))}.bind(e),"data-id":n},m("i",{class:"fas fa-trash"})))))}))))},e}(j());const F=flarum.core.compat["admin/components/ExtensionPage"];var P=e.n(F);const H=flarum.core.compat["common/components/LoadingIndicator"];var J=e.n(H);const B=flarum.core.compat["common/components/Checkbox"];var V=e.n(B);const W=flarum.core.compat["common/components/LinkButton"];var z=e.n(W),Q=function(t){function e(){for(var n,e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return(n=t.call.apply(t,[this].concat(r))||this).loadingData=!1,n.autoEmit=void 0,n.autoEmitObj={},n}b(e,t);var r=e.prototype;return r.oncreate=function(n){this.autoEmit=this.setting("xypp.collector.emit_control","{}"),this.autoEmitObj=JSON.parse(this.autoEmit()),t.prototype.oncreate.call(this,n),this.loadData()},r.content=function(t){return m("div",{className:"xypp-collector-adminPage-container container"},m("div",{className:"Form-group"},m("h2",null,n().translator.trans("xypp-collector.admin.emit_control.title")),m("table",{className:"Table"},m("thead",null,m("tr",null,m("th",null,n().translator.trans("xypp-collector.admin.emit_control.name")),m("th",null,m(z(),{onclick:this.toggleAll("event")},n().translator.trans("xypp-collector.admin.emit_control.event"))),m("th",null,m(z(),{onclick:this.toggleAll("update")},n().translator.trans("xypp-collector.admin.emit_control.update"))),m("th",null,m(z(),{onclick:this.toggleAll("manual")},n().translator.trans("xypp-collector.admin.emit_control.manual"))))),m("tbody",null,this.getControls()))),R(this.loadingData,m(J(),null)),this.buildSettingComponent({setting:"xypp.collector.max_keep",label:n().translator.trans("xypp-collector.admin.max_keep"),type:"number",min:1}),this.submitButton())},r.loadData=function(){var t=o(s().mark((function t(){return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.loadingData=!0,m.redraw(),t.next=4,h.getInstance(n()).loadDefinition();case 4:this.loadingData=!1,m.redraw();case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}(),r.getControls=function(){var t=this;if(this.loadingData)return[];var e=h.getInstance(n()).getAllConditions().toObject();return Object.keys(e).map((function(n){return m("tr",{className:"emit-control-row"},m("td",{className:"emit-control-label"},m(z(),{onclick:t.toggleRow(n)},e[n].content)),m("td",{className:"emit-control-event"},m(V(),{onchange:t.changeStateCbMaker("event",n),state:t.checked("event",n),disabled:!t.checkType("event",n)})),m("td",{className:"emit-control-update"},m(V(),{onchange:t.changeStateCbMaker("update",n),state:t.checked("update",n),disabled:!t.checkType("update",n)})),m("td",{className:"emit-control-manual"},m(V(),{onchange:t.changeStateCbMaker("manual",n),state:t.checked("manual",n),disabled:!t.checkType("manual",n)})))}))},r.checked=function(t,n){return!(!this.checkType(t,n)||this.autoEmitObj[t]&&!0===this.autoEmitObj[t][n])},r.checkType=function(t,e){var r=h.getInstance(n()).getRawConditionDefinition(e);return"event"===t?!(r&&r.manual):"update"===t?r&&r.abs:"manual"===t&&r&&r.manual},r.toggleRow=function(t){var n=this;return function(e){e.preventDefault();var r=["event","update","manual"].filter((function(e){return n.checkType(e,t)})),a=void 0===r.find((function(e){return n.autoEmitObj[e]&&n.autoEmitObj[e][t]}));r.forEach((function(e){a?n.autoEmitObj[e][t]=!0:n.autoEmitObj[e][t]&&delete n.autoEmitObj[e][t]}))}.bind(this)},r.toggleAll=function(t){var e=this;return function(r){r.preventDefault();var a=Object.keys(h.getInstance(n()).getAllConditions().toObject()).filter((function(n){return e.checkType(t,n)}));e.autoEmitObj[t]||(e.autoEmitObj[t]={});var o=!0;0==Object.keys(e.autoEmitObj[t]).length&&(o=!1),a.forEach((function(n){o?e.autoEmitObj[t][n]=!0:e.autoEmitObj[t][n]&&delete e.autoEmitObj[t][n]})),e.autoEmit(JSON.stringify(e.autoEmit))}.bind(this)},r.changeStateCbMaker=function(t,n){var e=this;return function(r){e.autoEmitObj[t]||(e.autoEmitObj[t]={}),r?e.autoEmitObj[t][n]&&delete e.autoEmitObj[t][n]:e.autoEmitObj[t][n]=!0,e.autoEmit(JSON.stringify(e.autoEmitObj))}.bind(this)},e}(P());n().initializers.add("xypp/collector",(function(){var t,e;t=n(),e="xypp-collector."+"admin"+".integration",flarum.extensions["xypp-store"]&&function(t,n){var e={};y("store_item",(function(r){var a=t.store.getById("store-item",r);return a?a.attribute("name"):void 0===e[r]?(e[r]=!0,t.store.find("store-item",r).then((function(){m.redraw()})).catch((function(){e[r]=!1})),t.translator.trans(n+".reward.store_item_loading")+""):!1===e[r]?t.translator.trans(n+".reward.store_item_error")+"":t.translator.trans(n+".reward.store_item_loading")+""})),g("store_item",o(s().mark((function e(){var r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.store.find("store-item");case 2:return r=e.sent,a=r.reduce((function(t,n){return t[n.id()]=n.attribute("name"),t}),{}),e.next=6,M.open(t,a,t.translator.trans(n+".reward.store_item_select"),t.translator.trans(n+".reward.store_item_select_button"));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))))}(t,e),flarum.extensions["v17development-user-badges"]&&function(t,n){var e={};y("badge",(function(r){var a=t.store.getById("badges",r);return a?a.attribute("name"):void 0===e[r]?(e[r]=!0,t.store.find("badges",r).then((function(){m.redraw()})).catch((function(){e[r]=!1})),t.translator.trans(n+".reward.badge_loading")+""):!1===e[r]?t.translator.trans(n+".reward.badge_error")+"":t.translator.trans(n+".reward.badge_loading")+""})),g("badge",o(s().mark((function e(){var r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.store.find("badges");case 2:return r=e.sent,a=r.reduce((function(t,n){return t[n.id()]=n.attribute("name"),t}),{}),e.next=6,M.open(t,a,t.translator.trans(n+".reward.badge_select"),t.translator.trans(n+".reward.badge_select_button"));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))))}(t,e),n().extensionData.for("xypp-collector").registerPage(Q)}));const X=flarum.core.compat["common/extenders"],K=[(new(e.n(X)().Store)).add("condition",T)]})(),module.exports=r})();
//# sourceMappingURL=admin.js.map