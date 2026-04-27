function e(e){let t=window.location.href,n=e=>{let t=e.match(/\/shorts\/([^/?]+)/);return t?t[1]:null};new MutationObserver(()=>{if(window.location.href!==t){t=window.location.href;let r=n(t);r&&e(r)}}).observe(document.body,{childList:!0,subtree:!0});let r=n(window.location.href);r&&e(r)}var t=`brainDeRotterState`,n=300*60*1e3,r={sessionCount:0,lastVideoId:null,questionLevel:0,cooldownUntil:0,lastShortOpenedAt:0,points:0,discountCode:null};function i(e){return{sessionCount:e.sessionCount,lastVideoId:e.lastVideoId,questionLevel:e.questionLevel,cooldownUntil:e.cooldownUntil,lastShortOpenedAt:e.lastShortOpenedAt,points:e.points,discountCode:e.discountCode}}function a(e){return i(e)}function o(){return chrome.storage.local}function s(){return new Promise(e=>{o().get([t],n=>{e(n[t]||{})})})}function c(e){return new Promise(n=>{o().set({[t]:e},n)})}function l(){let e=``;for(let t=0;t<8;t+=1)e+=`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`[Math.floor(Math.random()*32)];return`LULU-15-${e}`}function u(){let e=i(r),t=(async()=>{let t=await s();e={...i(r),...t},await o()})();async function o(){e.points>=1e3&&!e.discountCode&&(e.discountCode=l()),e.cooldownUntil=0,e.cooldownUntil&&e.cooldownUntil<=Date.now()&&(e.cooldownUntil=0),await c(i(e))}function u(t=0){let r=a(e),i=Date.now(),o=r.lastShortOpenedAt?r.lastShortOpenedAt+n:i+n;return{state:r,rewardDelta:t,cooldownRemainingMs:Math.max(0,r.cooldownUntil-i),nextRewardAt:o}}return{ready:t,async registerView(r){if(await t,r===e.lastVideoId)return{changed:!1,...u(0)};let i=Date.now(),a=e.lastShortOpenedAt?i-e.lastShortOpenedAt:0,s=(a>=n?Math.floor(a/n):0)*100;return s>0&&(e.points+=s),e.lastVideoId=r,e.lastShortOpenedAt=i,e.sessionCount+=1,await o(),console.log(`[Brain De-rotter] Viewed #${e.sessionCount}: ${r}`),{changed:!0,...u(s)}},async getState(){return await t,await o(),u(0)},async startCooldown(){return await t,e.cooldownUntil=0,e.sessionCount=0,e.lastVideoId=null,await o(),u(0)},async levelUpQuestion(){return await t,e.questionLevel=(e.questionLevel+1)%5,await o(),i(e)}}}var d=`brain-derotter-styles`,f=`brain-derotter-status`,p=`brain-derotter-banner`,m=`brain-derotter-toast`;function h(){if(document.getElementById(d))return;let e=document.createElement(`style`);e.id=d,e.textContent=`
    :root {
      --bdr-ink: #0f172a;
      --bdr-panel: rgba(255, 248, 240, 0.94);
      --bdr-panel-strong: rgba(255, 255, 255, 0.98);
      --bdr-line: rgba(15, 23, 42, 0.1);
      --bdr-accent: #ff6b35;
      --bdr-accent-deep: #c2410c;
      --bdr-gold: #f4b400;
      --bdr-sage: #2f6f62;
      --bdr-muted: #5b6475;
      --bdr-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
      --bdr-radius: 22px;
    }

    @keyframes bdrFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bdrRiseIn {
      from { opacity: 0; transform: translateY(14px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes bdrSlideDown {
      from { opacity: 0; transform: translate(-50%, -18px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .bdr-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background:
        radial-gradient(circle at top, rgba(255, 196, 118, 0.24), transparent 34%),
        linear-gradient(160deg, rgba(11, 15, 25, 0.86), rgba(20, 20, 33, 0.74));
      backdrop-filter: blur(18px);
      z-index: 999999;
      animation: bdrFadeIn 180ms ease-out;
    }

    .bdr-card {
      width: min(460px, calc(100vw - 32px));
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: var(--bdr-radius);
      padding: 28px;
      color: var(--bdr-ink);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 240, 0.94));
      box-shadow: var(--bdr-shadow);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      animation: bdrRiseIn 200ms ease-out;
    }

    .bdr-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 11px;
      border-radius: 999px;
      background: rgba(255, 107, 53, 0.12);
      color: var(--bdr-accent-deep);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .bdr-title {
      margin: 18px 0 10px;
      font-size: clamp(28px, 3vw, 34px);
      line-height: 1.02;
      font-weight: 800;
    }

    .bdr-subtitle {
      margin: 0;
      color: var(--bdr-muted);
      font-size: 15px;
      line-height: 1.55;
    }

    .bdr-question {
      margin: 22px 0 0;
      padding: 18px 18px 20px;
      border-radius: 18px;
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.06);
      font-size: 20px;
      font-weight: 700;
      line-height: 1.35;
      text-wrap: balance;
    }

    .bdr-input {
      width: 100%;
      margin-top: 16px;
      padding: 15px 16px;
      border-radius: 16px;
      border: 1px solid rgba(15, 23, 42, 0.12);
      background: rgba(255, 255, 255, 0.92);
      color: var(--bdr-ink);
      font: inherit;
      font-size: 15px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
    }

    .bdr-input:focus {
      border-color: rgba(255, 107, 53, 0.48);
      box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.12);
      transform: translateY(-1px);
    }

    .bdr-actions {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 20px;
    }

    .bdr-actions-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .bdr-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 16px;
      border: 0;
      border-radius: 16px;
      cursor: pointer;
      font: inherit;
      font-size: 15px;
      font-weight: 700;
      transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
    }

    .bdr-button:hover {
      transform: translateY(-1px);
    }

    .bdr-button-primary {
      color: white;
      background: linear-gradient(135deg, var(--bdr-accent), var(--bdr-accent-deep));
      box-shadow: 0 16px 28px rgba(194, 65, 12, 0.28);
    }

    .bdr-button-secondary {
      color: var(--bdr-ink);
      background: rgba(15, 23, 42, 0.08);
    }

    .bdr-feedback {
      min-height: 22px;
      margin-top: 12px;
      color: var(--bdr-accent-deep);
      font-size: 14px;
      font-weight: 700;
    }

    .bdr-status {
      position: fixed;
      top: 18px;
      right: 18px;
      width: min(320px, calc(100vw - 36px));
      padding: 18px;
      border-radius: 20px;
      color: var(--bdr-ink);
      background:
        radial-gradient(circle at top right, rgba(255, 209, 102, 0.22), transparent 32%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 240, 0.95));
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      z-index: 999998;
      backdrop-filter: blur(16px);
      border: 1px solid rgba(15, 23, 42, 0.08);
    }

    .bdr-status-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .bdr-status-title {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.72;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .bdr-status-points {
      margin-top: 8px;
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
    }

    .bdr-status-points span {
      font-size: 14px;
      font-weight: 700;
      opacity: 0.75;
      margin-left: 8px;
    }

    .bdr-progress {
      height: 10px;
      margin-top: 14px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.08);
    }

    .bdr-progress > div {
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #ff9a62, #ffd166);
      transition: width 240ms ease;
    }

    .bdr-status-copy {
      margin-top: 12px;
      font-size: 13px;
      line-height: 1.5;
      color: rgba(15, 23, 42, 0.72);
    }

    .bdr-status-code {
      margin-top: 14px;
      padding: 12px 14px;
      border-radius: 16px;
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.08);
      font-size: 13px;
      line-height: 1.5;
    }

    .bdr-status-code strong {
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.62;
    }

    .bdr-banner {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      width: min(560px, calc(100vw - 36px));
      padding: 14px 18px;
      border-radius: 18px;
      color: #fffdf8;
      background: linear-gradient(135deg, rgba(194, 65, 12, 0.94), rgba(127, 29, 29, 0.92));
      box-shadow: 0 18px 40px rgba(120, 53, 15, 0.32);
      z-index: 999997;
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      animation: bdrSlideDown 180ms ease-out;
    }

    .bdr-banner-title {
      font-size: 14px;
      font-weight: 800;
    }

    .bdr-banner-body {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.45;
      color: rgba(255, 253, 248, 0.82);
    }

    .bdr-toast {
      position: fixed;
      right: 18px;
      bottom: 18px;
      max-width: min(320px, calc(100vw - 36px));
      padding: 14px 16px;
      border-radius: 18px;
      background: rgba(47, 111, 98, 0.96);
      color: #f8fafc;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.24);
      font-family: "Avenir Next", "Trebuchet MS", "Segoe UI", sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 1.45;
      z-index: 999998;
      animation: bdrRiseIn 180ms ease-out;
    }

    @media (max-width: 680px) {
      .bdr-status {
        top: auto;
        right: 12px;
        bottom: 12px;
        width: min(100vw - 24px, 320px);
      }

      .bdr-banner {
        top: 12px;
        width: calc(100vw - 24px);
      }

      .bdr-card {
        padding: 22px;
      }

      .bdr-title {
        font-size: 26px;
      }
    }
  `,document.head.appendChild(e)}function g(e,t,n){let r=document.createElement(e);return t&&(r.className=t),typeof n==`string`&&(r.textContent=n),r}function _(e,t){h();let n=document.getElementById(e);return n||(n=document.createElement(`div`),n.id=e,n.className=t,document.body.appendChild(n)),n}function v({points:e,rewardProgress:t,discountCode:n,nextRewardText:r,footerText:i}){let a=_(f,`bdr-status`);a.innerHTML=``;let o=g(`div`,`bdr-status-header`),s=g(`div`,`bdr-status-title`,`Rewards`),c=g(`div`,`bdr-eyebrow`,n?`15% unlocked`:`Earn mode`);o.append(s,c);let l=g(`div`,`bdr-status-points`);l.textContent=String(e);let u=g(`span`,``,`points`);l.appendChild(u);let d=g(`div`,`bdr-progress`),p=g(`div`);p.style.width=`${t}%`,d.appendChild(p);let m=g(`div`,`bdr-status-copy`,r),h=g(`div`,`bdr-status-copy`,i);if(a.append(o,l,d,m,h),n){let e=g(`div`,`bdr-status-code`),t=g(`strong`,``,`Lululemon 15% code`),r=g(`div`,``,n);e.append(t,r),a.appendChild(e)}}function y(e){let t=document.getElementById(p);if(!e){t?.remove();return}let n=_(p,`bdr-banner`);n.innerHTML=``,n.append(g(`div`,`bdr-banner-title`,e.title),g(`div`,`bdr-banner-body`,e.body))}function b(e){let t=document.getElementById(m);t&&t.remove();let n=_(m,`bdr-toast`);n.textContent=e,window.setTimeout(()=>{n.isConnected&&n.remove()},2600)}function x({mode:e,question:t,category:n,promptLabel:r,title:i,subtitle:a,detail:o}){h();let s=g(`div`,`bdr-overlay`),c=g(`div`,`bdr-card`);if(s.appendChild(c),document.body.appendChild(s),e===`intent`){let e=g(`div`,`bdr-eyebrow`,`Intent check`),t=g(`h2`,`bdr-title`,i||`Are you still here intentionally?`),n=g(`p`,`bdr-subtitle`,`A quick pause before the next stretch of Shorts.`),r=g(`div`,`bdr-actions`),a=g(`button`,`bdr-button bdr-button-primary`,`Yes, continue`),o=g(`button`,`bdr-button bdr-button-secondary`,`No, close it`);return r.append(a,o),c.append(e,t,n,r),{yesBtn:a,noBtn:o,destroy:()=>s.remove()}}if(e===`question`){let e=g(`div`,`bdr-eyebrow`,r||n||`Question`),i=g(`h2`,`bdr-title`,n||`Question`),a=g(`p`,`bdr-subtitle`,`One grounded answer, then you can keep moving.`),o=g(`div`,`bdr-question`,t),l=g(`input`,`bdr-input`);l.type=`text`,l.autocomplete=`off`,l.spellcheck=!1,l.placeholder=`Type your answer`;let u=g(`div`,`bdr-actions bdr-actions-single`),d=g(`button`,`bdr-button bdr-button-primary`,`Submit answer`),f=g(`div`,`bdr-feedback`);return u.appendChild(d),c.append(e,i,a,o,l,u,f),l.addEventListener(`keydown`,e=>{e.key===`Enter`&&d.click()}),window.setTimeout(()=>l.focus(),60),{input:l,submit:d,feedback:f,destroy:()=>s.remove()}}if(e===`cooldown`){let e=g(`div`,`bdr-eyebrow`,`Cooldown`),t=g(`h2`,`bdr-title`,i||`Shorts locked`),n=g(`p`,`bdr-subtitle`,a||``),r=g(`div`,`bdr-question`,o||``);return c.append(e,t,n,r),{update(e){t.textContent=e.title||``,n.textContent=e.subtitle||``,r.textContent=e.detail||``},destroy:()=>s.remove()}}return{destroy:()=>s.remove()}}var S=[{name:`History`,promptLabel:`History checkpoint`,questions:[{question:`Which wall fell in 1989, becoming a symbol of the Cold War ending?`,answers:[`berlin wall`]},{question:`Who was the first woman to fly solo across the Atlantic Ocean?`,answers:[`amelia earhart`,`earhart`]},{question:`What ship famously sank on its maiden voyage in 1912?`,answers:[`titanic`,`the titanic`]},{question:`Which empire built Machu Picchu?`,answers:[`inca`,`inca empire`,`the inca`]},{question:`Who delivered the 'I Have a Dream' speech in 1963?`,answers:[`martin luther king jr`,`martin luther king`,`mlk`,`mlk jr`]},{question:`Which city hosted the signing of the U.S. Constitution?`,answers:[`philadelphia`]},{question:`What ancient wonder was located in Alexandria?`,answers:[`lighthouse of alexandria`,`the lighthouse of alexandria`,`pharos of alexandria`,`pharos`]},{question:`Who was the first emperor of Rome?`,answers:[`augustus`,`caesar augustus`]}]},{name:`Science`,promptLabel:`Science checkpoint`,questions:[{question:`What gas do plants absorb from the atmosphere for photosynthesis?`,answers:[`carbon dioxide`,`co2`]},{question:`What is the hardest natural substance on Earth?`,answers:[`diamond`,`a diamond`]},{question:`What part of the cell contains most of its genetic material?`,answers:[`nucleus`,`the nucleus`]},{question:`What force keeps planets in orbit around the sun?`,answers:[`gravity`]},{question:`What is the chemical symbol for gold?`,answers:[`au`]},{question:`What blood cells help your body fight infection?`,answers:[`white blood cells`,`white cells`,`leukocytes`]},{question:`What scale is used to measure earthquake magnitude?`,answers:[`richter scale`,`richter`]},{question:`What vitamin do humans naturally make from sunlight exposure?`,answers:[`vitamin d`,`d`]}]},{name:`Geography`,promptLabel:`Geography checkpoint`,questions:[{question:`What is the longest river in South America?`,answers:[`amazon`,`amazon river`,`the amazon`,`the amazon river`]},{question:`What country has the city of Marrakesh?`,answers:[`morocco`]},{question:`What desert covers much of northern Africa?`,answers:[`sahara`,`sahara desert`,`the sahara`,`the sahara desert`]},{question:`Which country is home to Mount Fuji?`,answers:[`japan`]},{question:`What ocean lies on the west coast of the United States?`,answers:[`pacific`,`pacific ocean`,`the pacific`,`the pacific ocean`]},{question:`What river runs through Cairo?`,answers:[`nile`,`nile river`,`the nile`,`the nile river`]},{question:`What is the capital city of Canada?`,answers:[`ottawa`]},{question:`Which continent contains the most countries?`,answers:[`africa`]}]},{name:`Arts & Culture`,promptLabel:`Culture checkpoint`,questions:[{question:`Who painted 'The Starry Night'?`,answers:[`vincent van gogh`,`van gogh`]},{question:`Which instrument has 88 keys on a standard version?`,answers:[`piano`,`the piano`]},{question:`What language is primarily spoken in Brazil?`,answers:[`portuguese`]},{question:`Who wrote the play 'Hamlet'?`,answers:[`william shakespeare`,`shakespeare`]},{question:`What dance style originated in the Bronx in the 1970s alongside hip-hop culture?`,answers:[`breakdancing`,`breaking`,`break dancing`]},{question:`Which artist is known as the 'Queen of Soul'?`,answers:[`aretha franklin`,`franklin`]},{question:`Which studio created the film 'Spirited Away'?`,answers:[`studio ghibli`,`ghibli`]},{question:`What is the Japanese word for comic books and graphic novels?`,answers:[`manga`]}]},{name:`Technology`,promptLabel:`Technology checkpoint`,questions:[{question:`What does 'HTTP' stand for?`,answers:[`hypertext transfer protocol`]},{question:`What company created the iPhone?`,answers:[`apple`,`apple inc`,`apple inc.`]},{question:`In computing, what does 'CPU' stand for?`,answers:[`central processing unit`]},{question:`What does 'GPS' stand for?`,answers:[`global positioning system`]},{question:`What symbol is commonly used to tag topics on social media?`,answers:[`hashtag`,`#`]},{question:`What video platform are you probably avoiding right now?`,answers:[`youtube`,`youtube shorts`,`shorts`]},{question:`What does 'Wi-Fi' allow devices to do without cables?`,answers:[`connect to the internet`,`connect wirelessly`,`connect to a network wirelessly`,`connect to the internet wirelessly`]},{question:`What company developed the Chrome browser?`,answers:[`google`]}]}];function C(e){return String(e).toLowerCase().trim().replace(/[^a-z0-9#\s]/g,``).replace(/\s+/g,` `)}function w(e=0){let t=Math.max(0,Math.min(e,S.length-1));function n(){return S[t]}function r(){let e=n(),t=Math.floor(Math.random()*e.questions.length),r=e.questions[t];return{category:e.name,promptLabel:e.promptLabel,question:r.question,answers:r.answers}}function i(e,t){let n=C(e);return t.some(e=>C(e)===n)}function a(){return t=(t+1)%S.length,console.log(`[Brain De-rotter] Category advanced ->`,n().name),t}function o(){return t}return{generateQuestion:r,validate:i,levelUp:a,getLevel:o,getCategory:n}}var T=30,E=5,D=[`Are you still here intentionally?`,`Did you mean to keep scrolling?`,`Still choosing this on purpose?`,`Is this next Short worth your attention?`,`Are you watching with intention right now?`];function O(e){let t=!1,n=null,r=null,i=0,a=w();function o(e){let t=Math.max(1,Math.ceil(e/6e4)),n=Math.floor(t/60),r=t%60;return n>0&&r>0?`${n}h ${r}m`:n>0?`${n}h`:`${r}m`}function s(e){for(;a.getLevel()!==e.questionLevel;)a.levelUp()}function c(e){let{state:t,nextRewardAt:n,cooldownRemainingMs:r}=e,i=Math.max(0,n-Date.now()),a=!!t.discountCode,s=Math.min(100,Math.round(t.points/1e3*100));v({points:t.points,rewardProgress:s,discountCode:t.discountCode,nextRewardText:r>0?`Cooldown active for ${o(r)}`:`Stay off Shorts for ${o(i)} to earn +100`,footerText:a?`You unlocked a 15% lululemon code.`:`Reach 1000 points to unlock a 15% lululemon code.`})}function l(){r&&=(window.clearInterval(r),null),n&&=(n.destroy(),null),y(null)}function u(i){let a=()=>{let e=i.state,t=o(Math.max(0,e.cooldownUntil-Date.now()));return y({tone:`warning`,title:`Shorts locked for now`,body:`You've exhausted your Shorts credit for today. Come back in ${t}.`}),{title:`Shorts locked`,subtitle:`You've exhausted your Shorts credit for today. Come back in ${t}.`,detail:`Take a breath, do literally anything else, and let the points meter work for you.`}};l(),n=x({mode:`cooldown`,...a()}),r=window.setInterval(async()=>{let r=await e.getState();if(c(r),r.cooldownRemainingMs<=0){l(),t=!1;return}i=r,n.update(a())},1e3)}function d(){t=!0;let n=D[i];i=(i+1)%D.length;let{yesBtn:r,noBtn:a,destroy:o}=x({mode:`intent`,title:n});r.onclick=()=>{o(),f()},a.onclick=async()=>{o();let t=await e.startCooldown();c(t),u(t),chrome.runtime.sendMessage({type:`CLOSE_TAB`})}}function f(){let n=a.generateQuestion(),{input:r,submit:i,feedback:o,destroy:s}=x({mode:`question`,question:n.question,category:n.category,promptLabel:n.promptLabel});i.onclick=async()=>{a.validate(r.value,n.answers)?(o.innerText=`Correct. You're back in control.`,a.levelUp(),await e.levelUpQuestion(),setTimeout(()=>{s(),t=!1},500)):o.innerText=`Not quite. Take another swing.`}}return{async initialize(){let n=await e.getState();s(n.state),c(n),n.cooldownRemainingMs>0&&(t=!0,u(n))},async evaluate(n){if(s(n.state),c(n),n.rewardDelta>0&&b(`+${n.rewardDelta} points for staying away from Shorts.`),t&&n.cooldownRemainingMs<=0&&(t=!1),!t){if(n.cooldownRemainingMs>0){t=!0,u(n);return}if(n.state.sessionCount>=T){console.log(`[Brain De-rotter] `+T+` limit reached`);let t=await e.startCooldown();c(t),u(t),chrome.runtime.sendMessage({type:`CLOSE_TAB`});return}n.state.sessionCount%E===0&&d()}}}}console.log(`[Brain De-rotter] Loaded`);var k=u(),A=O(k);(async()=>{await k.ready,await A.initialize(),e(async e=>{let t=await k.registerView(e);t.changed&&await A.evaluate(t)})})();