(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},,,function(e,t,n){e.exports=n(15)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(3),l=n.n(r),o=(n(13),n(5)),i=n.n(o);n(14);function s(e,t,n,a){var c;a&&(c=JSON.stringify(a));var r=new XMLHttpRequest,l="http://localhost:8000/api".concat(t);r.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var c=n[a].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}("csrftoken");r.open(e,l),r.setRequestHeader("Content-Type","application/json"),o&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("X-CSRFToken",o)),r.onload=function(){403===r.status&&("Authentication credentials were not provided."===r.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(r.response,r.status)},r.onerror=function(e){n({message:"The request was an error"},400)},r.send(c)}function u(e,t){var n="/tweets/feed/";null!==t&&void 0!==t&&(n=t.replace("http://localhost:8000/api","")),s("GET",n,e)}function m(e,t,n){var a="/tweets/";e&&(a="/tweets/?username=".concat(e)),null!==n&&void 0!==n&&(a=n.replace("http://localhost:8000/api","")),s("GET",a,t)}function d(e){var t=e.tweet,n=e.action,a=e.didPerformAction,r=t.likes?t.likes:0,l=e.className?e.className:"btn btn-primary btn-sm",o=n.display?n.display:"Action",i=function(e,t){console.log(e,t),200!==t&&201!==t||!a||a(e,t)},u="like"===n.type?"".concat(r," ").concat(o):o;return c.a.createElement("button",{className:l,onClick:function(e){e.preventDefault(),function(e,t,n){s("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,i)}},u)}var f=n(2),w=n(1);function p(e){var t=c.a.createRef(),n=e.didTweet,a=function(e,t){201===t?n(e):(console.log(e),alert("An error occured please try again"))};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;s("POST","/tweets/create/",a,{content:n}),t.current.value=""}},c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Tweet")))}var b=n(7);function E(e){var t=e.username;return c.a.createElement("span",{className:"pointer",onClick:function(e){window.location.href="/profiles/".concat(t)}},e.children)}function v(e){var t=e.user,n=e.includeFullName,a=e.hideLink,r=!0===n?"".concat(t.first_name," ").concat(t.last_name," "):null;return c.a.createElement(c.a.Fragment,null,r,!0===a?"@".concat(t.username):c.a.createElement(E,{username:t.username},"@",t.username))}function h(e){var t=e.user,n=e.hideLink,a=c.a.createElement("span",{className:"mx-1 px-3 py-2 rounded-circle bg-dark text-white"},t.username[0]);return!0===n?a:c.a.createElement(E,{username:t.username},a)}var O=n(6),j=n.n(O);function g(e){return c.a.createElement("span",{className:e.className},j()(e.children).format("0a"))}function N(e){var t=e.user,n=e.didFollowToggle,a=e.profileLoading,r=t&&t.is_following?"Unfollow":"Follow";r=a?"Loading...":r;return t?c.a.createElement("div",null,c.a.createElement(h,{user:t,hideLink:!0}),c.a.createElement("p",null,c.a.createElement(v,{user:t,includeFullName:!0,hideLink:!0})),c.a.createElement("p",null,c.a.createElement(g,null,t.follower_count)," ",1===t.follower_count?"follower":"followers"," "),c.a.createElement("p",null,c.a.createElement(g,null,t.following_count)," following"),c.a.createElement("p",null,t.location),c.a.createElement("p",null,t.bio),c.a.createElement("button",{className:"btn btn-primary",onClick:function(e){e.preventDefault(),n&&!a&&n(r)}},r)):null}function y(e){var t=e.username,n=Object(a.useState)(!1),r=Object(w.a)(n,2),l=r[0],o=r[1],i=Object(a.useState)(null),u=Object(w.a)(i,2),m=u[0],d=u[1],f=Object(a.useState)(!1),p=Object(w.a)(f,2),b=p[0],E=p[1],v=function(e,t){200===t&&d(e)};Object(a.useEffect)((function(){!1===l&&(!function(e,t){s("GET","/profiles/".concat(e,"/"),t)}(t,v),o(!0))}),[t,l,o]);return!1===l?"Loading...":m?c.a.createElement(N,{user:m,didFollowToggle:function(e){!function(e,t,n){var a={action:"".concat(t&&t).toLowerCase()};s("POST","/profiles/".concat(e,"/follow"),n,a)}(t,e,(function(e,t){200===t&&d(e),E(!1)})),E(!0)},profileLoading:b}):null}function k(e){var t=e.tweet;return t.parent?c.a.createElement(T,{isRetweet:!0,retweeter:e.retweeter,hideActions:!0,className:" ",tweet:t.parent}):null}function T(e){var t=e.tweet,n=e.didRetweet,r=e.hideActions,l=e.isRetweet,o=e.retweeter,i=Object(a.useState)(e.tweet?e.tweet:null),s=Object(w.a)(i,2),u=s[0],m=s[1],f=e.className?e.className:"col-10 mx-auto col-md-6";f=!0===l?"".concat(f," p-2 border rounded"):f;var p=window.location.pathname.match(Object(b.a)(/([0-9]+)/,{tweetid:1})),E=p?p.groups.tweetid:-1,O="".concat(t.id)==="".concat(E),j=function(e,t){200===t?m(e):201===t&&n&&n(e)};return c.a.createElement("div",{className:f},!0===l&&c.a.createElement("div",{className:"mb-2"},c.a.createElement("span",{className:"small text-muted"},"Retweet via ",c.a.createElement(v,{user:o}))),c.a.createElement("div",{className:"d-flex"},c.a.createElement("div",{className:""},c.a.createElement(h,{user:t.user})),c.a.createElement("div",{className:"col-11"},c.a.createElement("div",null,c.a.createElement("p",null,c.a.createElement(v,{includeFullName:!0,user:t.user})),c.a.createElement("p",null,t.content),c.a.createElement(k,{tweet:t,retweeter:t.user})),c.a.createElement("div",{className:"btn btn-group px-0"},u&&!0!==r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{tweet:u,didPerformAction:j,action:{type:"like",display:"Likes"}}),c.a.createElement(d,{tweet:u,didPerformAction:j,action:{type:"unlike",display:"Unlike"}}),c.a.createElement(d,{tweet:u,didPerformAction:j,action:{type:"retweet",display:"Retweet"}})),!0===O?null:c.a.createElement("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)}},"View")))))}function S(e){var t=Object(a.useState)([]),n=Object(w.a)(t,2),r=n[0],l=n[1],o=Object(a.useState)([]),i=Object(w.a)(o,2),s=i[0],m=i[1],d=Object(a.useState)(null),p=Object(w.a)(d,2),b=p[0],E=p[1],v=Object(a.useState)(!1),h=Object(w.a)(v,2),O=h[0],j=h[1];Object(a.useEffect)((function(){var t=Object(f.a)(e.newTweets).concat(r);t.length!==s.length&&m(t)}),[e.newTweets,s,r]),Object(a.useEffect)((function(){if(!1===O){u((function(e,t){200===t&&(E(e.next),l(e.results),j(!0))}))}}),[r,O,j,e.username]);var g=function(e){var t=Object(f.a)(r);t.unshift(e),l(t);var n=Object(f.a)(s);n.unshift(s),m(n)};return c.a.createElement(c.a.Fragment,null,s.map((function(e,t){return c.a.createElement(T,{tweet:e,didRetweet:g,className:"my-5 py-5 border bg-white text-dark",key:"".concat(t,"-{item.id}")})})),null!==b&&c.a.createElement("button",{onClick:function(e){if(e.preventDefault(),null!==b){u((function(e,t){if(200===t){E(e.next);var n=Object(f.a)(s).concat(e.results);l(n),m(n)}}),b)}},className:"btn btn-outline-primary"},"Load next"))}function x(e){var t=Object(a.useState)([]),n=Object(w.a)(t,2),r=n[0],l=n[1],o=Object(a.useState)([]),i=Object(w.a)(o,2),s=i[0],u=i[1],d=Object(a.useState)(null),p=Object(w.a)(d,2),b=p[0],E=p[1],v=Object(a.useState)(!1),h=Object(w.a)(v,2),O=h[0],j=h[1];Object(a.useEffect)((function(){var t=Object(f.a)(e.newTweets).concat(r);t.length!==s.length&&u(t)}),[e.newTweets,s,r]),Object(a.useEffect)((function(){if(!1===O){m(e.username,(function(e,t){200===t?(E(e.next),l(e.results),j(!0)):alert("There was an error")}))}}),[r,O,j,e.username]);var g=function(e){var t=Object(f.a)(r);t.unshift(e),l(t);var n=Object(f.a)(s);n.unshift(s),u(n)};return c.a.createElement(c.a.Fragment,null,s.map((function(e,t){return c.a.createElement(T,{tweet:e,didRetweet:g,className:"my-5 py-5 border bg-white text-dark",key:"".concat(t,"-{item.id}")})})),null!==b&&c.a.createElement("button",{onClick:function(t){if(t.preventDefault(),null!==b){m(e.username,(function(e,t){if(200===t){E(e.next);var n=Object(f.a)(s).concat(e.results);l(n),u(n)}else alert("There was an error")}),b)}},className:"btn btn-outline-primary"},"Load next"))}function R(e){var t=Object(a.useState)([]),n=Object(w.a)(t,2),r=n[0],l=n[1],o="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!0===o&&c.a.createElement(p,{didTweet:function(e){var t=Object(f.a)(r);t.unshift(e),l(t)},className:"col-12 mb-3"}),c.a.createElement(x,Object.assign({newTweets:r},e)))}function A(e){var t=e.tweetId,n=Object(a.useState)(!1),r=Object(w.a)(n,2),l=r[0],o=r[1],i=Object(a.useState)(null),u=Object(w.a)(i,2),m=u[0],d=u[1],f=function(e,t){200===t?d(e):alert("There was an error finding your tweet.")};return Object(a.useEffect)((function(){!1===l&&(!function(e,t){s("GET","/tweets/".concat(e,"/"),t)}(t,f),o(!0))}),[t,l,o]),null===m?null:c.a.createElement(T,{tweet:m,className:e.className})}var L=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:i.a,className:"App-logo",alt:"logo"}),c.a.createElement("p",null,"Edit ",c.a.createElement("code",null,"src/App.js")," and save to reload."),c.a.createElement("div",null,c.a.createElement(R,null)),c.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var q=document.getElementById("root");q&&l.a.render(c.a.createElement(L,null),q);var F=c.a.createElement,C=document.getElementById("tweetme-2");C&&l.a.render(F(R,C.dataset),C);var P=document.getElementById("tweetme-2-feed");P&&l.a.render(F((function(e){var t=Object(a.useState)([]),n=Object(w.a)(t,2),r=n[0],l=n[1],o="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!0===o&&c.a.createElement(p,{didTweet:function(e){var t=Object(f.a)(r);t.unshift(e),l(t)},className:"col-12 mb-3"}),c.a.createElement(S,Object.assign({newTweets:r},e)))}),P.dataset),P),document.querySelectorAll(".tweetme-2-detail").forEach((function(e){l.a.render(F(A,e.dataset),e)})),document.querySelectorAll(".tweetme-2-profile-badge").forEach((function(e){l.a.render(F(y,e.dataset),e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[8,1,2]]]);
//# sourceMappingURL=main.f30308ad.chunk.js.map