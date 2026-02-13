import"./site-CIRqnWQe.js";const e={input:document.getElementById("mdInput"),preview:document.getElementById("mdPreview"),render:document.getElementById("mdRenderBtn"),clear:document.getElementById("mdClearBtn"),sample:document.getElementById("mdSampleBtn"),html:document.getElementById("mdHtml"),message:document.getElementById("mdMessage")},a=`# Markdown Preview

- 빠르게 문서 초안 작성
- 코드 블록 확인

\`\`\`js
console.log('hello markdown');
\`\`\``;function d(n,t=!1){e.message.textContent=n,e.message.classList.toggle("message--error",t)}function r(){const n=e.input.value;if(!window.marked||!window.marked.parse){d("Markdown 라이브러리를 불러오지 못했습니다.",!0);return}try{const t=window.marked.parse(n,{breaks:!0});e.preview.innerHTML=t,e.html.value=t,d("렌더링 완료.")}catch{d("렌더링 실패",!0)}}e.render.addEventListener("click",r);e.sample.addEventListener("click",()=>{e.input.value=a,r()});e.clear.addEventListener("click",()=>{e.input.value="",e.preview.innerHTML="",e.html.value="",d("")});document.querySelectorAll("button[data-copy]").forEach(n=>{n.addEventListener("click",async()=>{const t=document.getElementById(n.dataset.copy);t&&(await navigator.clipboard.writeText(t.value||t.textContent||""),d("복사했습니다."))})});e.input.value=a;r();
