(this.webpackJsonpspot=this.webpackJsonpspot||[]).push([[0],{213:function(e,t,s){},378:function(e,t,s){"use strict";s.r(t);var n=s(0),a=s.n(n),c=s(29),i=s.n(c),r=(s(213),s(11)),l=(s(214),s.p+"static/media/frog.6de8bb0d.png"),o=s.p+"static/media/spotifylogo.3a0f4653.png",u=s(399),j=s(384),b=(s(66),s(1)),d=function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(u.a,{expand:"lg",className:"my-navbar justify-content-between",children:Object(b.jsx)(u.a.Brand,{className:"nav-text",children:"Statify"})}),Object(b.jsxs)("div",{className:"login-page",children:[Object(b.jsxs)(j.a,{className:"landing-jumbotron",children:[Object(b.jsx)("h1",{children:"How do you listen?"}),Object(b.jsx)("h6",{children:"Lyrics, stats, and more"}),Object(b.jsx)("a",{className:"btn btn-lg login-btn btn-gradient",href:"https://accounts.spotify.com/authorize?client_id=89f488fad6fc4e67a2607dba4d955997&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state",children:Object(b.jsxs)("div",{className:"login-btn-row",children:[Object(b.jsx)("p",{className:"btn-text",children:"Login With Spotify"}),Object(b.jsx)("span",{className:"logo-circle btn-text",children:Object(b.jsx)("img",{src:o,className:"spotify-logo",alt:""})})]})})]}),Object(b.jsxs)("div",{className:"music-notes",children:[Object(b.jsx)("div",{className:"note note1"}),Object(b.jsx)("div",{className:"note note2"})]}),Object(b.jsx)("img",{src:l,alt:"",className:"frog-img"})]})]})},h=s(44),m=s(21),p=s.n(m),O=s(31),x=s(385),f=s(386),g=function(e){return Object(b.jsxs)("div",{className:"playlist-card cursor-hover",onClick:function(){console.log(e.playlist),e.select(e.playlist)},children:[Object(b.jsxs)("span",{style:{paddingRight:"20px"},children:[e.index,"."]}),e.selected?Object(b.jsx)("strong",{children:e.playlist.name}):e.playlist.name]})},v=function(e){var t=e.list?e.list.map((function(t,s){return Object(b.jsx)(g,{playlist:t,select:e.select,selected:!!e.selected&&e.selected.id===t.id,index:s+1})})):null;return Object(b.jsx)("div",{children:Object(b.jsxs)(x.a,{className:"playlists-row row justify-content-around",children:[Object(b.jsx)("div",{className:"text-container",children:Object(b.jsxs)("h2",{children:["Your",Object(b.jsx)("br",{}),"Playlists"]})}),Object(b.jsx)("div",{className:"playlists-list col-6",children:t}),e.visible?Object(b.jsx)(f.a,{onClick:e.hide,size:"md",variant:"outline-info",className:"show-playlists-btn",children:"Hide"}):null]})})},y=s(401),S=s(400),w=s(19),N=function(e){var t="",s=Math.round(e/1e3),n=s%60;s>=60?(t+=Math.floor(s/60).toString()+" min ",t+=n.toString()+" sec"):t+=n.toString()+" secs";return t},k=function(e){if(0!==e.length){var t,s="",n=Object(w.a)(e);try{for(n.s();!(t=n.n()).done;){s+=t.value.name,s+=", "}}catch(a){n.e(a)}finally{n.f()}return s.slice(0,-2)}return""},L=function(e){var t=k(e.track.artists),s=e.audio?Object.keys(e.audio).map((function(t){return Object(b.jsxs)("p",{children:[t,": ",e.audio[t]]})})):null;return Object(b.jsx)("div",{className:"song-entry",children:Object(b.jsxs)(y.a,{children:[Object(b.jsx)(S.a.Toggle,{as:y.a.Header,eventKey:e.index,className:"song-clickable cursor-hover",onClick:function(){e.selectSong(e.index-1)},children:Object(b.jsxs)("span",{children:[e.index," ",". ",Object(b.jsx)("strong",{children:e.track.name})," "," ",t]})}),Object(b.jsx)(S.a.Collapse,{eventKey:e.index,children:Object(b.jsxs)(y.a.Body,{className:"song-info",id:"song-info-".concat(e.index-1),children:[Object(b.jsxs)("p",{children:["Album: ",e.track.album.name," (released on ",e.track.album.release_date,")"]}),Object(b.jsxs)("p",{children:["Duration: ",N(e.track.duration_ms)]})," ",Object(b.jsx)("br",{}),Object(b.jsx)("p",{children:Object(b.jsx)("u",{children:"Audio Data (provided by Spotify)"})}),s,Object(b.jsx)("br",{})]})})]})})},T=function(e){var t=e.list?e.list.map((function(t,s){return Object(b.jsx)(L,Object(h.a)({track:t.track,index:s+1,audio:e.audioFeatures[s]},e))})):null;return Object(b.jsx)("div",{className:"song-list",children:Object(b.jsx)(S.a,{defaultActiveKey:"0",className:"song-accordion",children:t})})},z=function(e){return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"playlist-title-row",children:[Object(b.jsxs)("div",{className:"playlist-title",children:[Object(b.jsx)("h6",{children:"Selected Playlist: "}),Object(b.jsx)("h4",{children:Object(b.jsx)("strong",{children:e.playlist})})]}),e.showPlaylists?null:Object(b.jsx)(f.a,{onClick:e.hideFunc,size:"sm",variant:"outline-success",className:"show-playlists-btn",children:"Choose a different playlist"})]}),Object(b.jsx)(T,{list:e.selectedSongs,audioFeatures:e.audioFeatures,selectSong:e.selectSongFunc})]})},_=s(387),C=function(e){var t=[];if(e.lyrics&&e.lyrics.lyricHTML){var s=e.lyrics.lyricHTML;if("ERROR"===e.lyrics.path)console.log(s),t.push(Object(b.jsx)("div",{dangerouslySetInnerHTML:{__html:s[0]},className:"no-lyric-msg"}));else if(e.lyrics.lyricHTML.length>0)if(s.length>1)for(var n=0;n<s.length;n++)t.push(Object(b.jsx)("div",{dangerouslySetInnerHTML:{__html:s[n]}})),t.push(Object(b.jsx)("br",{}));else t.push(Object(b.jsx)("div",{dangerouslySetInnerHTML:{__html:s[0]}}))}return Object(b.jsxs)("div",{children:[Object(b.jsx)("h5",{children:"Lyrics"}),e.song&&e.lyrics?Object(b.jsxs)("div",{children:[Object(b.jsxs)("h6",{className:"lyric-title",children:[Object(b.jsx)("strong",{children:e.song.track.name})," by ",Object(b.jsx)("strong",{children:k(e.song.track.artists)})]}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{className:"lyric-container",children:t}),Object(b.jsx)("br",{}),"ERROR"!==e.lyrics.path?Object(b.jsx)("a",{href:"https://genius.com"+e.lyrics.path,target:"_blank",children:"Lyric Source: Genius"}):null]}):e.songClicked?Object(b.jsxs)("div",{className:"triple-spinners",children:[Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"})]}):Object(b.jsx)("p",{children:"Click on a song to display its lyrics"})]})},E=s(397),F=s(394),M=function(e){return Object(b.jsx)("div",{className:"stat-card",children:e.label&&e.list&&0!==e.list.length?Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{className:"stat-label",children:Object(b.jsxs)("em",{children:[e.label,": "]})}),Object(b.jsx)("div",{children:e.list.map((function(e,t){return Object(b.jsxs)("p",{children:[t+1,". ",(s=e,s.length>0?s.length>1?s.charAt(0).toUpperCase()+s.slice(1):s.charAt(0).toUpperCase():s)]});var s}))})]}):Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{className:"stat-label",children:Object(b.jsxs)("em",{children:[e.maxLabel,": "]})}),Object(b.jsx)("p",{children:e.maxSong.track.name}),Object(b.jsx)("p",{className:"stat-label",children:Object(b.jsxs)("em",{children:[e.minLabel,": "]})}),Object(b.jsx)("p",{children:e.minSong.track.name})]})})},R=function(e){var t=e.stats?[Object(b.jsx)(M,{label:"Favorite Artists",list:e.stats.favoriteArtists}),Object(b.jsx)(M,{label:"Top Genres",list:e.stats.favoriteGenres}),Object(b.jsx)(M,{maxLabel:"Most Danceable",minLabel:"Least Danceable",maxSong:e.stats.max_danceability,minSong:e.stats.min_danceability}),Object(b.jsx)(M,{maxLabel:"Most Energetic",minLabel:"Least Energetic",maxSong:e.stats.max_energy,minSong:e.stats.min_energy}),Object(b.jsx)(M,{maxLabel:"Most Instrumental",minLabel:"Least Instrumental",maxSong:e.stats.max_instrumentalness,minSong:e.stats.min_instrumentalness}),Object(b.jsx)(M,{maxLabel:"Liveliest",minLabel:"Least Lively",maxSong:e.stats.max_liveness,minSong:e.stats.min_liveness}),Object(b.jsx)(M,{maxLabel:"Loudest",minLabel:"Quietest",maxSong:e.stats.max_loudness,minSong:e.stats.min_loudness}),Object(b.jsx)(M,{maxLabel:"Most Speech/Vocals",minLabel:"Least Speech/Vocals",maxSong:e.stats.max_speechiness,minSong:e.stats.min_speechiness}),Object(b.jsx)(M,{maxLabel:"Fastest Tempo",minLabel:"Slowest Tempo",maxSong:e.stats.max_tempo,minSong:e.stats.min_tempo})]:null;return Object(b.jsx)("div",{className:"stat-card-container",children:t})},H=s(388),P=s(389),A=s(393),I=s(201),K=s(202),D=s(89),G=s(86),q=s(204),B=function(e){var t=e.selectedSongs?function(e){var t,s={},n=Object(w.a)(e);try{for(n.s();!(t=n.n()).done;){var a,c=t.value,i=Object(w.a)(c.track.artists);try{for(i.s();!(a=i.n()).done;){var l=a.value;l.name in s?s[l.name]++:s[l.name]=1}}catch(m){i.e(m)}finally{i.f()}}}catch(m){n.e(m)}finally{n.f()}console.log(s);for(var o=[],u=0,j=Object.entries(s);u<j.length;u++){var b=Object(r.a)(j[u],2),d=b[0],h=b[1];o.push({name:d,value:h})}return o.sort((function(e,t){return t.value-e.value})),o}(e.selectedSongs):null;console.log(t);var s=e.stats?function(e){for(var t=[],s=0,n=Object.entries(e);s<n.length;s++){var a=Object(r.a)(n[s],2),c=a[0],i=a[1];t.push({name:c,value:i})}return t.sort((function(e,t){return t.value-e.value})),t}(e.stats.allGenres):null,n=25*t.length+25*s.length;return Object(b.jsx)("div",{children:t&&s?Object(b.jsxs)("div",{className:"charts",style:{height:n},children:[Object(b.jsx)("p",{className:"chart-title",children:"Artist Frequencies"}),Object(b.jsx)(H.a,{width:"100%",height:"50%",children:Object(b.jsxs)(P.a,{width:600,height:500,data:t,layout:"vertical",barSize:20,margin:{top:5,right:20,left:50,bottom:5},children:[Object(b.jsx)(A.a,{strokeDasharray:"3 3"}),Object(b.jsx)(I.a,{type:"number"}),Object(b.jsx)(K.a,{dataKey:"name",type:"category"}),Object(b.jsx)(D.a,{}),Object(b.jsx)(G.a,{}),Object(b.jsx)(q.a,{dataKey:"value",fill:"#8884d8",name:"Frequency"})]})}),Object(b.jsx)("p",{className:"chart-title",children:"Genre Frequencies"}),Object(b.jsx)(H.a,{width:"100%",height:"50%",children:Object(b.jsxs)(P.a,{width:600,height:500,data:s,layout:"vertical",barSize:20,margin:{top:5,right:20,left:50,bottom:5},children:[Object(b.jsx)(A.a,{strokeDasharray:"3 3"}),Object(b.jsx)(I.a,{type:"number"}),Object(b.jsx)(K.a,{dataKey:"name",type:"category"}),Object(b.jsx)(D.a,{}),Object(b.jsx)(G.a,{}),Object(b.jsx)(q.a,{dataKey:"value",fill:"#8884d8",name:"Frequency"})]})})]}):null})},U=function(e){return Object(b.jsxs)("div",{className:"stat-tab",children:[Object(b.jsx)("h5",{children:"Playlist Stats"}),Object(b.jsxs)(E.a,{defaultActiveKey:"stat",id:"tabs",className:"tabs",children:[Object(b.jsx)(F.a,{eventKey:"stat",title:"Superlatives",className:"list-tab",children:Object(b.jsx)(R,{stats:e.stats})}),Object(b.jsx)(F.a,{eventKey:"chart",title:"Charts",className:"chart-tab",children:Object(b.jsx)(B,Object(h.a)({},e))})]})]})},J=s(141),V=s(34),Y=s.n(V),Q="http://localhost:5000",W=function(e,t){Y.a.get(Q+"/profilename",{headers:{"Content-Type":"application/json"},params:{accessToken:e}}).then((function(e){t(e.data.displayName)})).catch((function(e){return console.log(e)}))},X=function(e,t){Y.a.get(Q+"/playlists",{headers:{"Content-Type":"application/json"},params:{accessToken:e}}).then((function(e){t(e.data.playlists)})).catch((function(e){return console.log(e)}))},Z=function(){var e=Object(O.a)(p.a.mark((function e(t,s){var n,a,c,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(){var e=Object(O.a)(p.a.mark((function e(t,s,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,Y.a.get(Q+"/getplaylist",{headers:{"Content-Type":"application/json"},params:{accessToken:s,url:n,offset:t}}).then((function(e){a=e.data.songs})).catch((function(e){return console.log(e)}));case 3:return e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(t,s,n){return e.apply(this,arguments)}}(),a=[],c=0,i=!1;case 4:if(i){e.next=9;break}return e.next=7,n(c,t,s).then((function(e){e.length<100&&(i=!0),a.push.apply(a,Object(J.a)(e)),c+=100}));case 7:e.next=4;break;case 9:return e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}(),$=function(){var e=Object(O.a)(p.a.mark((function e(t,s){var n,a,c,i,r,l,o,u,j;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(){var e=Object(O.a)(p.a.mark((function e(t,s){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,Y.a.get(Q+"/audiofeatures",{headers:{"Content-Type":"application/json"},params:{accessToken:t,url:s}}).then((function(e){n=e.data.audioFeatures})).catch((function(e){return console.log(e)}));case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}(),a=s.map((function(e){return e.track.id})),c="",i=[];case 4:if(!(a.length>0)){e.next=34;break}r="",l=0,o=Object(w.a)(a),e.prev=8,o.s();case 10:if((u=o.n()).done){e.next=18;break}if(j=u.value,r+=j+",",100!=++l){e.next=16;break}return e.abrupt("break",18);case 16:e.next=10;break;case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(8),o.e(e.t0);case 23:return e.prev=23,o.f(),e.finish(23);case 26:return a=l>=a.length?[]:a.slice(l),r=r.slice(0,-1),c="https://api.spotify.com/v1/audio-features?ids=",c+=r,e.next=32,n(t,c).then((function(e){i.push.apply(i,Object(J.a)(e))}));case 32:e.next=4;break;case 34:return e.abrupt("return",i);case 35:case"end":return e.stop()}}),e,null,[[8,20,23,26]])})));return function(t,s){return e.apply(this,arguments)}}(),ee=function(){var e=Object(O.a)(p.a.mark((function e(t,s){var n,a,c,i,r,l,o,u,j;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(){var e=Object(O.a)(p.a.mark((function e(t,s){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.next=3,Y.a.get(Q+"/artistgenres",{headers:{"Content-Type":"application/json"},params:{accessToken:t,url:s}}).then((function(e){n=e.data.genreStats})).catch((function(e){return console.log(e)}));case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}(),a=s.map((function(e){return e.track.artists[0].id})),c="",i=[];case 4:if(!(a.length>0)){e.next=34;break}r="",l=0,o=Object(w.a)(a),e.prev=8,o.s();case 10:if((u=o.n()).done){e.next=18;break}if(j=u.value,r+=j+",",50!=++l){e.next=16;break}return e.abrupt("break",18);case 16:e.next=10;break;case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(8),o.e(e.t0);case 23:return e.prev=23,o.f(),e.finish(23);case 26:return a=l>=a.length?[]:a.slice(l),r=r.slice(0,-1),c="https://api.spotify.com/v1/artists?ids=",c+=r,e.next=32,n(t,c).then((function(e){i.push(e)}));case 32:e.next=4;break;case 34:return e.abrupt("return",i);case 35:case"end":return e.stop()}}),e,null,[[8,20,23,26]])})));return function(t,s){return e.apply(this,arguments)}}(),te=s(395),se=s(396),ne=s(139),ae=function(e){var t=Object(n.useState)(null),s=Object(r.a)(t,2),a=s[0],c=s[1],i=Object(n.useState)(null),l=Object(r.a)(i,2),o=l[0],j=l[1],d=Object(n.useState)(null),m=Object(r.a)(d,2),x=m[0],g=m[1],y=Object(n.useState)(!1),S=Object(r.a)(y,2),w=S[0],N=S[1],k=Object(n.useState)(null),L=Object(r.a)(k,2),T=L[0],E=L[1],F=Object(n.useState)(null),M=Object(r.a)(F,2),R=M[0],H=M[1],P=Object(n.useState)(null),A=Object(r.a)(P,2),I=A[0],K=A[1],D=Object(n.useState)(null),G=Object(r.a)(D,2),q=G[0],B=G[1],J=Object(n.useState)(null),V=Object(r.a)(J,2),ae=V[0],ce=V[1],ie=Object(n.useState)(null),re=Object(r.a)(ie,2),le=re[0],oe=re[1],ue=function(){var t=Object(O.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a||W(e.token,c),o||X(e.token,j);case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),je=function(){T&&ee(e.token,T).then((function(e){K(function(e){var t=0!=e.length?e[0]:null;if(e.length>1)for(var s=1;s<e.length;s++)for(var n=0,a=Object.entries(e[s]);n<a.length;n++){var c=Object(r.a)(a[n],2),i=c[0],l=c[1];i in t?t[i]+=l:t[i]=l}return console.log(t),t}(e))}))},be=function(){N(!w)};Object(n.useEffect)(ue,[]),Object(n.useEffect)(Object(O.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:T&&$(e.token,T).then((function(e){H(e)})),je();case 2:case"end":return t.stop()}}),t)}))),[T]),Object(n.useEffect)((function(){R&&I&&T&&function(e,t,s,n){Y.a.post(Q+"/audiostats",{headers:{"Content-Type":"application/json"},data:{audioFeatures:e,artistGenres:t,selectedSongs:s}}).then((function(e){n(e.data.stats)})).catch((function(e){return console.log(e)}))}(R,I,T,B)}),[R,I]),Object(n.useEffect)((function(){if(oe(null),null!=ae){var e=T[ae].track.name,t=T[ae].track.artists[0].name;console.log(e+" "+t),function(e,t,s){Y.a.get(Q+"/lyrics",{headers:{"Content-Type":"application/json"},params:{title:e,artist:t}}).then((function(e){console.log(e.data),s(e.data)})).catch((function(e){return console.log(e)}))}(e,t,oe)}}),[ae]),Object(n.useEffect)((function(){if(le){console.log(le);document.querySelector("#song-info-".concat(ae));"ERROR"!==le.path||le.lyricHTML||oe({path:"ERROR",lyricHTML:['<p className="no-lyric-msg">Lyrics could not be found<p>']})}}),[le]);var de=Object(b.jsxs)("div",{className:"triple-spinners",children:[Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"}),Object(b.jsx)(_.a,{animation:"grow",variant:"success",size:"sm",className:"spinner"})]});return Object(b.jsxs)("div",{children:[Object(b.jsxs)(u.a,{expand:"lg",className:"my-navbar justify-content-between",children:[Object(b.jsx)(u.a.Brand,{className:"nav-text nav-title",children:"Statify"}),Object(b.jsxs)("div",{className:"nav-right",children:[Object(b.jsxs)(u.a.Text,{className:"nav-text",children:["Signed in as: ",a]}),Object(b.jsx)(se.a,{placement:"bottom",overlay:function(e){return Object(b.jsx)(te.a,Object(h.a)(Object(h.a)({},e),{},{children:"Note: This will briefly open a new window. You will need to log back in to view this page."}))},children:Object(b.jsx)(f.a,{onClick:e.signOut,variant:"outline-info",size:"sm","data-rh":"tooltip 1",children:"Sign Out"})})]})]}),Object(b.jsxs)("div",{className:"body",children:[!x||w?Object(b.jsx)("div",{className:"playlists-section",children:Object(b.jsx)(v,{list:o,select:function(t){t!==x&&(g(null),ce(null),E(null),H(null),B(null),oe(null),g(t),N(!1),console.log("selecting "+t.name),Z(e.token,t.href).then((function(e){console.log(e),E(e)})))},selected:x,hide:be,visible:w})}):null,x&&R?Object(b.jsx)("div",{className:"stats-section scroll-container",children:Object(b.jsxs)(ne.Split,{initialPrimarySize:"33%",minPrimarySize:"25%",minSecondarySize:"50%",children:[Object(b.jsx)("div",{className:"song-column",children:Object(b.jsx)(z,{playlist:x.name,showPlaylists:w,hideFunc:be,selectedSongs:T,audioFeatures:R,selectSongFunc:function(e){ce(e)}})}),Object(b.jsxs)(ne.Split,{initialPrimarySize:"60%",minPrimarySize:"30%",minSecondarySize:"30%",children:[Object(b.jsx)("div",{className:"stat-column",children:Object(b.jsx)(U,{stats:q,selectedSongs:T})}),Object(b.jsx)("div",{className:"lyric-column",children:Object(b.jsx)(C,{song:T[ae],lyrics:le,songClicked:null!==ae})})]})]})}):x?de:Object(b.jsx)("h6",{children:"Select a playlist to get started!"})]})]})},ce=function(e){var t=Object(n.useState)(),s=Object(r.a)(t,2),a=s[0],c=s[1],i=Object(n.useState)(),l=Object(r.a)(i,2),o=l[0],u=l[1],j=Object(n.useState)(),b=Object(r.a)(j,2),d=b[0],h=b[1],m=Object(n.useState)(),p=Object(r.a)(m,2);p[0],p[1];return Object(n.useEffect)((function(){Y.a.post("http://localhost:5000/login",{code:e}).then((function(e){console.log(e.data.body),c(e.data.accessToken),u(e.data.refreshToken),h(e.data.expiresIn),window.history.pushState({},null,"/")})).catch((function(){window.location="/"}))}),[e]),Object(n.useEffect)((function(){if(o&&d){var e=setInterval((function(){Y.a.post("http://localhost:5000/refresh",{refreshToken:o}).then((function(e){console.log(e.data),c(e.data.accessToken),h(e.data.expiresIn)})).catch((function(){window.location="/"}))}),1e3*(d-60));return function(){return clearInterval(e)}}}),[o,d]),a},ie=function(e){var t=Object(n.useState)(null),s=Object(r.a)(t,2),a=s[0],c=s[1];function i(){return(i=Object(O.a)(p.a.mark((function e(t){var s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.resolve(ce(t));case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(e){return i.apply(this,arguments)}(e.code).then((function(e){c(e)})),Object(b.jsx)("div",{children:a?Object(b.jsx)(ae,Object(h.a)({token:a},e)):Object(b.jsxs)("p",{children:[Object(b.jsx)("br",{}),"Server is not currently running at this time."]})})};var re=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),s=t[0],a=t[1],c=Object(n.useState)(null),i=Object(r.a)(c,2),l=i[0],o=i[1];return Object(n.useEffect)((function(){o(new URLSearchParams(window.location.search).get("code"))}),[]),Object(n.useEffect)((function(){l&&a(!0)}),[l]),Object(b.jsx)("div",{className:"App",children:l&&s?Object(b.jsx)(ie,{code:l,signOut:function(){var e=window.open("https://www.spotify.com/logout/","Spotify Logout","width=10,height=10,top=4000,left=4000");setTimeout((function(){return e.close()}),500),a(!1),o(null)}}):Object(b.jsx)(d,{})})};i.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(re,{})}),document.getElementById("root"))},66:function(e,t,s){}},[[378,1,2]]]);
//# sourceMappingURL=main.8c3dbd3c.chunk.js.map