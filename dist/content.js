function e(e){let t=window.location.href,n=e=>{let t=e.match(/\/shorts\/([^/?]+)/);return t?t[1]:null};new MutationObserver(()=>{if(window.location.href!==t){t=window.location.href;let r=n(t);r&&e(r)}}).observe(document.body,{childList:!0,subtree:!0});let r=n(window.location.href);r&&e(r)}function t(){let e=null,t=0;return{registerView(n){n!==e&&(e=n,t++,console.log(`[Brain De-rotter] Viewed #${t}: ${n}`))},getState(){return{count:t}}}}function n({mode:e,question:t}){let n=document.createElement(`div`);n.style=`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
  `;let r=document.createElement(`div`);if(r.style=`
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    width: 300px;
  `,n.appendChild(r),document.body.appendChild(n),e===`intent`){let e=document.createElement(`p`);e.innerText=`Are you still here intentionally?`;let t=document.createElement(`button`);t.innerText=`Yes`;let i=document.createElement(`button`);return i.innerText=`No`,r.append(e,t,i),{yesBtn:t,noBtn:i,destroy:()=>n.remove()}}if(e===`math`){let e=document.createElement(`p`);e.innerText=`Solve: ${t}`;let i=document.createElement(`input`);i.type=`number`;let a=document.createElement(`button`);a.innerText=`Submit`;let o=document.createElement(`p`);return r.append(e,i,a,o),{input:i,submit:a,feedback:o,destroy:()=>n.remove()}}}function r(){let e=1;function t(){let t,n,r,a;switch(e){case 1:t=i(1,10),n=i(1,10),r=`${t} + ${n}`,a=t+n;break;case 2:t=i(2,12),n=i(2,12),r=`${t} × ${n}`,a=t*n;break;case 3:t=i(10,50),n=i(1,10),r=`${t} - ${n}`,a=t-n;break;default:t=i(1,20),n=i(1,20),r=`${t} + ${n}`,a=t+n}return{question:r,answer:a}}function n(e,t){return Number(e)===t}function r(){e++,console.log(`[Brain De-rotter] Level up →`,e)}function i(e,t){return Math.floor(Math.random()*(t-e+1))+e}return{generateProblem:t,validate:n,levelUp:r}}function i(e){let t=!1,i=r();function a(){t=!0;let{yesBtn:e,noBtn:r,destroy:i}=n({mode:`intent`});e.onclick=()=>{i(),o()},r.onclick=()=>{i(),chrome.runtime.sendMessage({type:`CLOSE_TAB`})}}function o(){let e=i.generateProblem(),{input:r,submit:a,feedback:o,destroy:s}=n({mode:`math`,question:e.question});a.onclick=()=>{i.validate(r.value,e.answer)?(o.innerText=`Correct`,i.levelUp(),setTimeout(()=>{s(),t=!1},500)):o.innerText=`Try again`}}return{evaluate(e){if(!t){if(e.count>=30){console.log(`[Brain De-rotter] 30 limit reached`),chrome.runtime.sendMessage({type:`CLOSE_TAB`});return}e.count%5==0&&a()}}}}console.log(`[Brain De-rotter] Loaded`);var a=t(),o=i(a);e(e=>{a.registerView(e),o.evaluate(a.getState())});