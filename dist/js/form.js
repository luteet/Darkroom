export default function form(e=!1,t=[]){document.querySelectorAll(".index__chat_field_inner textarea").forEach(s=>{s.addEventListener("focus",()=>{s.closest(".index__chat_field").classList.add("in-focus")}),s.addEventListener("blur",()=>{s.closest(".index__chat_field").classList.remove("in-focus")}),s.addEventListener("click",()=>{s.closest(".index__chat_field").classList.remove("in-static-focus")}),s.addEventListener("input",(function(e){s.value=s.value.replace(/\s+/g,""),s.parentElement.dataset.value=s.value,s.closest(".index__chat_field").classList.remove("in-static-focus")})),s.addEventListener("keydown",(function(a){"Enter"==a.key&&(s.closest(".index__chat").querySelector(".index__chat_list").insertAdjacentHTML("beforeend",`<div class="index__chat_user_item">${s.value}</div>`),s.value="",s.parentElement.dataset.value="",s.closest(".index__chat_field").classList.remove("has-value"),e?(e.resize(),e.scrollTo(e.limit,{immediate:!0})):setTimeout(()=>{window.scrollTo({left:0,top:document.querySelector(".wrapper").offsetHeight})},0),t.length&&t.map(e=>e.stop()),setTimeout(()=>{barba.go(s.closest(".index__chat").dataset.url)},500))}))}),document.querySelectorAll(".chat__textarea_inner textarea").forEach(t=>{const s=t.closest(".chat").querySelector(".chat__list");t.focus(),t.addEventListener("focus",()=>{t.closest(".chat__textarea_inner").classList.add("in-focus")}),t.addEventListener("click",()=>{t.closest(".chat__textarea_inner").classList.remove("in-static-focus")}),t.addEventListener("blur",()=>{t.closest(".chat__textarea_inner").classList.remove("in-focus")}),t.addEventListener("input",(function(e){t.value=t.value.replace(/\n+/g,""),t.parentElement.dataset.value=t.value,t.closest(".chat__textarea_inner").classList.remove("in-static-focus"),t.value?t.closest(".chat__textarea").classList.add("has-value"):t.closest(".chat__textarea").classList.remove("has-value")})),t.addEventListener("keydown",(function(a){"Enter"==a.key&&(s.insertAdjacentHTML("beforeend",`<li class="chat__user_message">${t.value}</li>`),t.value="",t.parentElement.dataset.value="",t.closest(".chat__textarea").classList.remove("has-value"),e?(e.resize(),e.scrollTo(e.limit,{immediate:!0})):setTimeout(()=>{window.scrollTo({left:0,top:document.querySelector(".wrapper").offsetHeight})},0))})),t.closest(".chat__textarea").querySelector(".chat__textarea_button").addEventListener("click",()=>{t.value&&(s.insertAdjacentHTML("beforeend",`<li class="chat__user_message">${t.value}</li>`),t.value="",t.parentElement.dataset.value="",t.closest(".chat__textarea").classList.remove("has-value"),e?(e.resize(),e.scrollTo(e.limit,{immediate:!0})):setTimeout(()=>{window.scrollTo({left:0,top:document.querySelector(".wrapper").offsetHeight})},0))})}),document.querySelectorAll(".about__feedback").forEach(e=>{const t=e.querySelector(".about__feedback_message");document.querySelectorAll("input").forEach(e=>{e.addEventListener("focus",()=>{e.classList.remove("is-error"),t.textContent=t.dataset.defaultMessage})}),e.addEventListener("submit",e=>{e.preventDefault(),document.querySelectorAll("input").forEach(e=>{var s;"email"==e.type&&(s=e.value,/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s)?(e.classList.remove("is-error"),t.textContent=t.dataset.successMessage):(e.classList.add("is-error"),t.textContent=t.dataset.errorMessage))})})})}