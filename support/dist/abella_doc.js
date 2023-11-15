function b(o){return new Option(o).innerHTML}var B=[{rex:/(:[:=-]?|=(?:&gt;)?|\|-|-&gt;|\\\/?|\/\\|\{|\})/g,style:"color:#9d1f1f;"},{rex:/\b(olist|prop|o)\b/g,style:"color:#1640b0;"},{rex:/\b(forall|exists|nabla|pi|sigma)\b/g,style:"color:#9d1f1f;"}];function H(o){return o=b(o),B.forEach(s=>{o=o.replaceAll(s.rex,`<span style=${s.style}>$1</span>`)}),o}function E(o){return o&1?"rl-odd":"rl-even"}function T(o,s){let i='<div class="rl">';o.name&&(i+=`<div><span class="rl-name">Subgoal ${o.name}</span></div>`);let p=0;if(o.vars&&o.vars.length>0){let r=[],a=[];o.vars.forEach(d=>{d[1]?a.push(d):r.push(d[0])}),r.length&&(i+=`<div class="${E(p++)}"><code>Variables: ${r.join(" ")}</code></div>`),s&&a.forEach(d=>{i+=`<div class="${E(p++)}"><code>  ${d[0]} &larr; ${d[1]}</code></div>`})}return o.hyps.forEach(r=>{i+=`<div class="${E(p++)}"><code><span class="rl-hyp">${r[0]}</span>: ${H(r[1])}</code></div>`}),i+='<div class="rl-line"></div>',i+=`<div>&nbsp;<code>${H(o.goal)}</code></div>`,o.more>0&&(i+=`<div class="rl-more">(+ ${o.more} more subgoal${o.more>1?"s":""})</div>`),i+="</div>",i}function R(o){if(o==null)throw new Error("Bug: isPresent()");return o}var x=class{source;marks;dirty;constructor(s){this.source=s,this.marks=new Array,this.dirty=!1}addMark(s,i){if(s<0||s>this.source.length)throw new Error(`bug: Content.addMark(${s}, ${i}, limit=${this.source.length})`);this.marks.push([s,i]),this.dirty=!0}fontify(s,i,p,r){if(s<0||s>i||i>this.source.length)throw new Error(`bug: Content.fontify(${s}, ${i}, ..., ${r})`);let a=this.source.slice(s,i);for(let d of a.matchAll(p)){let u=s+R(d.index),l=u+d[0].length;l>i||(this.addMark(u,`<span class="${r}">`),this.addMark(l,"</span>"))}}toString(){this.dirty&&(this.marks.sort((r,a)=>r[0]-a[0]),this.dirty=!1);let s=this.marks.values(),i="",p=0;for(;p<this.source.length;){let r=s.next();if(r.done)break;let[a,d]=r.value;if(a<p)throw new Error(`bug: Content.toString(curPos = ${p}, nextMarkPos = ${a})`);i+=b(this.source.slice(p,a)),p=a,i+=d}return p<this.source.length&&(i+=b(this.source.slice(p,this.source.length))),i}},k=/(:[:=-]?|=(?:>)?|\|-|->|\\\/?|\/\\|\{|\}|;|\.)/g,M=/\b(olist|prop|o)\b/g,w=/\b(forall|exists|nabla|pi|sigma|sig|module|end)\b/g,D=/\b(Import|Specification|Query|Set|Show|Close)\b/g,q=/\b((?:Co)?Define|Theorem|Split|by|Kind|Type)\b/g,P=/\b(abbrev|all|apply|assert|backchain|case|clear|(?:co)?induction|cut|inst|intros|keep|left|monotone|on|permute|rename|right|search|split(?:\*)?|to|unabbrev|unfold|with|witness)\b/g,O=/\b(skip|undo|abort)\b/g,C=/\b(type|kind)\b/g,_="[expand proof]",W="[collapse proof]";function $(o){let s=document.getElementById(o);if(!s)throw new Error(`Bug: cannot find #${o}`);if(s.tagName!=="DIV")throw new Error(`Bug: #${o} is a <${s.tagName}>, not a <div>`);return s}var I=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
</svg>`,L=class{box;inner;content;show(s){this.content.innerHTML=s,this.box.style.display="",this.inner.style.width=`${this.content.offsetWidth+40}px`,this.inner.style.height=`${this.content.offsetHeight+20}px`}close(){this.box.style.display="none",this.content.replaceChildren()}constructor(){this.box=document.createElement("div"),this.box.id="focusbox",this.box.classList.add("focusbox"),this.box.style.display="none",this.inner=document.createElement("div"),this.inner.classList.add("focusbox-inner"),this.box.append(this.inner);let s=document.createElement("button");s.type="button",s.innerHTML=I,s.classList.add("focusbox-close"),this.inner.append(s),this.content=document.createElement("div"),this.content.classList.add("focusbox-content"),this.inner.append(this.content),s.addEventListener("click",()=>{this.close()}),this.box.addEventListener("mousedown",i=>{i.target.matches("#focusbox")&&this.close()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.close()}),document.body.insertAdjacentElement("beforeend",this.box)}};async function N(o,s,i){let p=new L,r=$(o),a=new x(s),d=i,u=new Map;d.forEach(e=>{e.id!==void 0&&u.set(e.id,e)}),d.forEach(e=>{if(e.type==="top_command"||e.type==="proof_command"){let[n,,,t,,]=e.range;a.addMark(n,`<div id="chunk-${e.id}" class="ab-command">`),a.addMark(t,"</div>"),a.fontify(n,t,k,"s-op"),a.fontify(n,t,M,"s-ty"),a.fontify(n,t,w,"s-tm"),e.type==="top_command"&&(a.fontify(n,t,D,"s-tb"),a.fontify(n,t,q,"s-tc")),e.type==="proof_command"&&(a.fontify(n,t,P,"s-pc"),a.fontify(n,t,O,"s-ps")),e.command=b(a.source.slice(n,t))}else if(e.type==="link"){let[n,,,t,,]=e.source;a.addMark(n+1,`<a href="/${e.url}" class="ln">`),a.addMark(t-1,"</a>")}}),d.forEach(e=>{if(e.type==="proof_command"){let n=e.range[3],t=u.get(e.thm_id);if(!t)throw new Error(`Bug: can't find ${e.id} -> ${e.thm_id}`);t.proofStop=Math.max(n,t.proofStop??n)}}),d.forEach(e=>{e.type==="top_command"&&e.proofStop&&(a.addMark(e.range[3],'<div class="ab-proof">'),a.addMark(e.proofStop,"</div>"))}),r.innerHTML=a.toString(),document.querySelectorAll('div[class="ab-proof"]').forEach(e=>{let n=e;for(let f=n.firstChild;f!=null&&f.nodeType===Node.TEXT_NODE;f=n.firstChild)n.before(f);let t=document.createElement("button");t.classList.add("proof-toggle"),t.innerText=_;let c=f=>{t.dataset.state=f,f==="C"?(t.textContent=_,n.style.display="none"):(t.textContent=W,n.style.display="")};t.addEventListener("click",()=>{let f=t.dataset.state;c(f==="C"?"E":"C")}),n.before(t),n.before(document.createElement("br")),c("C")}),d.forEach(e=>{if(e.float="",(e.type==="top_command"||e.type==="proof_command")&&e.type!=="top_command"){let n=e.start_state,t=e.end_state;e.float+=T(n),e.theorem=b(e.theorem),e.float+=`<div class="ab-int"><span class="ab-pr">${e.theorem} &lt;</span> <strong>${e.command}</strong></div>`,t&&(e.float+=T(t))}});let l;d.forEach(e=>{if(e.type==="system_message"&&l){if(l.float===void 0)return;e.message=b(e.message),l.float+=`<div class="ab-sys">${e.message}</div>`}(e.type==="top_command"||e.type==="proof_command")&&(l=e)}),d.forEach(e=>{if(e.float){let n=document.getElementById(`chunk-${e.id}`);if(!n){console.log(`Bug: could not find chunk #${e.id}`);return}let t=document.createElement("div");t.classList.add("float"),t.style.position="fixed",t.style.zIndex="10100",t.style.display="none",t.style.transformOrigin="top left",t.style.opacity="0",t.style.transition="opacity .3s ease-in .5s",t.innerHTML=`<div class="float-container">${e.float}</div>`,n.addEventListener("mousemove",()=>{t.style.display="block";let c=Math.max(t.offsetWidth,1),f=Math.max(t.offsetHeight,1),S=window.innerWidth,v=window.innerHeight,g=n.getBoundingClientRect(),m=1;g.bottom+f<=v?t.style.top=`${g.bottom}px`:g.top-f>=0?t.style.top=`${g.top-f}px`:g.top>v-g.bottom?(m=g.top/f,t.style.top="0px",t.style.transform=`scale(${m})`):(m=Math.max(v-g.bottom,1)/f,t.style.top=`${g.bottom}px`,t.style.transform=`scale(${m})`),g.left+c*m<=S?t.style.left=`${g.left}px`:t.style.left=`${Math.max(S-c*m,0)}px`,t.style.opacity="1"}),n.addEventListener("mouseleave",()=>{t.style.opacity="0",t.style.display="none"}),n.addEventListener("click",c=>{if(n.querySelector("a"))return c.stopPropagation(),!1;t.style.display="none",p.show(t.innerHTML)}),r.append(t)}});let y=document.createElement("button");y.classList.add("proof-toggle"),y.textContent="[expand all proofs]",y.addEventListener("click",()=>{r.querySelectorAll('.proof-toggle[data-state="C"]').forEach(e=>{e.dispatchEvent(new MouseEvent("click"))})});let h=document.createElement("button");h.classList.add("proof-toggle"),h.textContent="[collapse all proofs]",h.addEventListener("click",()=>{r.querySelectorAll('.proof-toggle[data-state="E"]').forEach(e=>{e.dispatchEvent(new MouseEvent("click"))})}),r.insertAdjacentText("afterbegin",`
`),r.insertAdjacentElement("afterbegin",h),r.insertAdjacentText("afterbegin"," "),r.insertAdjacentElement("afterbegin",y)}async function z(o,s,i,p,r,a){let d=$(o),u=$(p),l=new x(s),y=i,h=new x(r),e=a;y.forEach(n=>{if(n.kind==="name")l.addMark(n.range[0],'<span class="s-op">'),l.addMark(n.range[1],"</span>");else if(n.kind==="accum_sig"){let[t,c]=n.range,f=l.source.slice(t,c);l.addMark(t,`<a href="./${f}.lp.html" class="ln">`),l.addMark(c,"</a>")}else if(n.kind==="decl"){let[t,c]=n.range;l.addMark(t,'<div class="ab-command">'),l.fontify(t,c,k,"s-op"),l.fontify(t,c,M,"s-ty"),l.fontify(t,c,w,"s-tm"),l.fontify(t,c,C,"s-op"),l.addMark(c,"</div>")}}),d.innerHTML=l.toString(),e.forEach(n=>{if(n.kind==="name")h.addMark(n.range[0],'<span class="s-op">'),h.addMark(n.range[1],"</span>");else if(n.kind==="accum"){let[t,c]=n.range,f=h.source.slice(t,c);h.addMark(t,`<a href="./${f}.lp.html" class="ln">`),h.addMark(c,"</a>")}else if(n.kind==="clause"){let[t,c]=n.range;h.addMark(t,'<div class="ab-command">'),h.fontify(t,c,k,"s-op"),h.fontify(t,c,M,"s-ty"),h.fontify(t,c,w,"s-tm"),h.fontify(t,c,C,"s-tc"),h.addMark(c,"</div>")}}),u.innerHTML=h.toString()}window.loadModule=N;window.loadLP=z;