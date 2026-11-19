const $ = (s) => document.querySelector(s);
const copy = {build:{eyebrow:'01 / THE PRODUCT STUDIO',headline:'用邏輯<span>打造。</span>',intro:'把複雜的問題，整理成能落地的產品。<br>我是 Chris，關注 AI 產品、工程與系統整合。',label:'SELECTED DIRECTIONS / 01—03',title:'從問題，走向可能。',note:'研究與展示方向，非已完成的客戶案例。',ticker:'BUILD WITH INTENTION.',other:'走進夜間暗房 ↗'},observe:{eyebrow:'02 / THE OBSERVATION ROOM',headline:'用感受<span>觀看。</span>',intro:'把容易錯過的瞬間，留下來。<br>攝影、設計，以及另一種理解世界的方法。',label:'VISUAL EXPERIMENTS / 01—03',title:'在光與留白之間。',note:'視覺實驗版位，非本人攝影作品。',ticker:'OBSERVE WITH CURIOSITY.',other:'回到日間工作室 ↗'}};
let mode='build';
function apply(next,announce=false){mode=next==='observe'?'observe':'build';const c=copy[mode];document.documentElement.dataset.world=mode;$('#eyebrow').textContent=c.eyebrow;$('#headline').innerHTML=c.headline;$('#intro').innerHTML=c.intro;$('#work-label').textContent=c.label;$('#work-title').textContent=c.title;$('#work-note').textContent=c.note;$('#ticker-last').textContent=c.ticker;$('#other-world').textContent=c.other;$('#hero-link').innerHTML=(mode==='build'?'探索產品思考':'探索視覺實驗')+' <span>↗</span>';$('#build-content').hidden=mode!=='build';$('#observe-content').hidden=mode!=='observe';document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));document.title='Chris Yang — '+(mode==='build'?'日間工作室':'夜間暗房');if(announce)$('#announcement').textContent='已切換至'+(mode==='build'?'日間工作室':'夜間暗房');try{localStorage.setItem('chris-world',mode)}catch{}}

const motionStyle=document.createElement('style');
motionStyle.textContent=`
html.world-transition body{transition:none!important}
.world-wipe{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:10000;contain:strict}
.world-wipe-disc{position:absolute;width:2px;height:2px;margin:-1px;border-radius:50%;transform-origin:center;will-change:transform}
@media(prefers-reduced-motion:reduce){.world-wipe{display:none!important}}
`;
document.head.append(motionStyle);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionProfiles={
  observe:{cover:560,fade:190,color:'#202327',glow:'rgba(228,168,137,.23)',ease:'cubic-bezier(.45,0,.2,1)'},
  build:{cover:420,fade:180,color:'#f4f1ea',glow:'rgba(255,239,205,.3)',ease:'cubic-bezier(.16,1,.3,1)'}
};
let activeMotion=null;
function stopMotion(commit=false){
  const job=activeMotion;if(!job)return;activeMotion=null;
  try{if(commit)job.commit()}finally{job.animations.forEach(a=>a.cancel());job.layer.remove();document.documentElement.classList.remove('world-transition')}
}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)stopMotion(true)});
window.addEventListener('resize',()=>stopMotion(true));
window.addEventListener('pagehide',()=>stopMotion(true));
async function choose(next,origin,returnToTop=false){
  if(activeMotion||next===mode||!motionProfiles[next])return;
  let committed=false;
  const commit=()=>{if(committed)return;committed=true;history.pushState(null,'','#'+next);apply(next,true);if(returnToTop)window.scrollTo({top:0,behavior:'instant'})};
  if(reducedMotion.matches||typeof Element.prototype.animate!=='function'){commit();return}
  const p=motionProfiles[next];const rect=origin?.getBoundingClientRect();
  const x=rect?Math.max(0,Math.min(innerWidth,rect.left+rect.width/2)):innerWidth/2;
  const y=rect?Math.max(0,Math.min(innerHeight,rect.top+rect.height/2)):innerHeight/2;
  const radius=Math.ceil(Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)))+4;
  const layer=document.createElement('div');layer.className='world-wipe';layer.setAttribute('aria-hidden','true');
  const disc=document.createElement('div');disc.className='world-wipe-disc';
  Object.assign(disc.style,{left:x+'px',top:y+'px',background:p.color,boxShadow:`0 0 .014px .006px ${p.glow}`});
  layer.append(disc);document.body.append(layer);document.documentElement.classList.add('world-transition');
  const job={layer,commit,animations:[]};activeMotion=job;
  try{
    const cover=disc.animate([{transform:'scale(0)'},{transform:`scale(${radius})`}],{duration:p.cover,easing:p.ease,fill:'forwards'});
    job.animations.push(cover);await cover.finished;if(activeMotion!==job)return;
    commit();
    const fade=layer.animate([{opacity:1},{opacity:0}],{duration:p.fade,easing:'ease-out',fill:'forwards'});
    job.animations.push(fade);await fade.finished;
  }catch{if(activeMotion===job)commit()}finally{if(activeMotion===job)stopMotion(false)}
}
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.mode,b)));
$('#other-world').addEventListener('click',event=>choose(mode==='build'?'observe':'build',event.currentTarget,true));
function fromHash(){const h=location.hash.slice(1);stopMotion(false);if(h==='build'||h==='observe')apply(h)}
window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
let saved='build';try{saved=localStorage.getItem('chris-world')||'build'}catch{}
apply(['#build','#observe'].includes(location.hash)?location.hash.slice(1):saved);
const details={ai:{title:'AI 工作流：先證明有用，再擴大自動化。',blocks:[['問題','AI 生成結果不一定能直接進入工作流程；品質、審核與失敗處理需要一起設計。'],['設計假設','先選一個高頻任務，定義輸入、工具、人工審核點與成功標準。'],['驗證規劃','比較人工與輔助流程的完成時間、可採用率及錯誤類型。此頁沒有實測數據，不能視為已驗證成果。']]},systems:{title:'系統整合：能力邊界也是產品的一部分。',blocks:[['研究問題','SDK 能做什麼、不支援什麼，以及連線與權限如何影響使用者體驗？'],['研究框架','建立能力矩陣、最小整合原型、錯誤情境與版本相容性清單。'],['公開界線','只展示去識別的研究框架，不公開廠商保密資料、企業拓樸或未核准的程式碼。']]},content:{title:'內容工作流：從文章到一個可審核的活動。',blocks:[['構想','將公開文章整理成多個腳本切角，對應真正可用的資源與明確的讀者需求。'],['最小流程','文章 → 選題 → 腳本 → 人工審稿 → 素材匯出 → 回收回饋。'],['限制','此為產品構想，不代表已有平台串接、會員成長或全自動發布能力。']]}};
const dialog=$('#detail');let trigger;
document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>{trigger=b;const d=details[b.dataset.detail];$('#detail-title').textContent=d.title;$('#detail-body').replaceChildren(...d.blocks.map(([t,p])=>{const section=document.createElement('section');const h=document.createElement('h3');h.textContent=t;const text=document.createElement('p');text.textContent=p;section.append(h,text);return section}));dialog.showModal()}));dialog.addEventListener('close',()=>trigger?.focus());
