import{t as d}from"./site-3xrs3AWN.js";const e={input:document.getElementById("mdInput"),preview:document.getElementById("mdPreview"),render:document.getElementById("mdRenderBtn"),clear:document.getElementById("mdClearBtn"),sample:document.getElementById("mdSampleBtn"),html:document.getElementById("mdHtml"),message:document.getElementById("mdMessage")},o=`# Markdown Preview

- Fast draft writing
- Check code blocks

\`\`\`js
console.log('hello markdown');
\`\`\``;function r(n,t=!1){e.message.textContent=n,e.message.classList.toggle("message--error",t)}function a(){const n=e.input.value;if(!window.marked||!window.marked.parse){r(d("markdown.error.lib"),!0);return}try{const t=window.marked.parse(n,{breaks:!0});e.preview.innerHTML=t,e.html.value=t,r(d("markdown.success.render"))}catch{r(d("markdown.error.render"),!0)}}e.render.addEventListener("click",a);e.sample.addEventListener("click",()=>{e.input.value=o,a()});e.clear.addEventListener("click",()=>{e.input.value="",e.preview.innerHTML="",e.html.value="",r("")});document.querySelectorAll("button[data-copy]").forEach(n=>{n.addEventListener("click",async()=>{const t=document.getElementById(n.dataset.copy);t&&(await navigator.clipboard.writeText(t.value||t.textContent||""),r(d("common.copySuccess")))})});e.input.value=o;a();
