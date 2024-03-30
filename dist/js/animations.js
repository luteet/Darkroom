import form from"./form.js";export default function animations(){let e,t,o,r,n,i,s=[];const l=document.querySelector(".wrapper");function a(e){let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,right:t.right+window.scrollX,bottom:t.bottom+window.scrollY,left:t.left+window.scrollX}}function d(){setTimeout(()=>{s.length&&s.map(e=>{e.destroy()});let e=!0;document.querySelector(".index__chat [data-delay]")&&document.querySelectorAll(".index__chat_field").forEach(t=>{const r=new IntersectionObserver((function(r){r.forEach(r=>{if(r.isIntersecting){if(t.closest(".index__chat").classList.add("in-view"),e){e=!1,t.querySelector("textarea").focus();let r=0;document.querySelectorAll(".index__chat_item").forEach(e=>{r+=Number(e.dataset.delay),s.push(new Typed(e.querySelector("span"),{strings:[e.dataset.text],typeSpeed:50,startDelay:1e3*r,onComplete:t=>{e.classList.remove("is-active")},preStringTyped:t=>{e.classList.add("is-active"),e.classList.add("is-visible"),e.closest(".index__chat.in-view")&&(o?(o.resize(),o.scrollTo(o.limit,{immediate:!0})):window.scrollTo({left:0,top:l.offsetHeight}))}}))})}}else t.closest(".index__chat").classList.remove("in-view")})}));r.disconnect(t),r.observe(t)})},200),document.querySelector(".fade-in-on-start")&&gsap.to(".fade-in-on-start",{opacity:1,duration:2,delay:1,ease:"power3.out"}),document.querySelector(".index__block")?(i&&i.kill(),i=gsap.timeline(),gsap.set(".index__hero",{transform:"translate3d(0,100%,0)"}),gsap.set(".index__about_inner",{transform:"translate3d(0,100%,0)"}),i.to(".index__hero",{transform:"translate3d(0,0,0)",duration:2,delay:1,ease:"power3.out"}),i.to(".index__about_inner",{transform:"translate3d(0,0,0)",duration:2,ease:"power3.out",onComplete:()=>{i.kill()}},"-=1.9")):i&&i.kill()}function c(){if(ScrollTrigger.killAll(),document.querySelector(".index__about p")){const t=new SplitType(".index__about p",{types:"lines"});gsap.set(t.lines,{"--progress":"-20%","--progress-2":"0%"});const o=gsap.to(t.lines,{"--progress":"100%","--progress-2":"120%",stagger:1,duration:1.5,immediateRender:!1,paused:!0});ScrollTrigger.create({trigger:document.querySelector(".index__about"),scrub:1,start:"top center",end:"bottom center",scroller:e||document.body,animation:o})}const t=document.querySelectorAll(".index__block");if(t[0]){r&&r.kill(),r=gsap.timeline({scrollTrigger:{trigger:t[0],start:"top top",end:window.innerWidth>=992?`+${1.2*window.innerHeight} bottom`:`+${1.45*a(document.querySelector(".index__about")).top} bottom`,scroller:e||document.body,pin:!0,scrub:!0}}),r.pause(),n&&n.kill(),n=gsap.timeline({scrollTrigger:{trigger:t[1].querySelector(".index__about"),start:"top top",end:"bottom top",scroller:e||document.body,scrub:!0}}),n.pause();const o=document.querySelectorAll(".main-background div");n.to(o[0],{opacity:"0",duration:2}),n.to(o[1],{opacity:"1",duration:2},"-=2"),n.to(document.querySelector(".index__about"),{opacity:.2,duration:2})}}let u=0;function m(){u!=window.innerWidth&&(u=window.innerWidth,c())}d(),function(){if(window.innerWidth>=992){new SimpleBar(document.querySelector(".wrapper"),{}),e=document.querySelector(".simplebar-content-wrapper"),t=document.querySelector(".simplebar-content"),o=new Lenis({wrapper:e,content:t}),o.on("scroll",ScrollTrigger.update),requestAnimationFrame((function e(t){o.raf(t),requestAnimationFrame(e)})),window.removeEventListener("resize",m),c(),window.addEventListener("resize",m)}else window.removeEventListener("resize",m),c(),window.addEventListener("resize",m)}(),form(o,s),o?o.scrollTo(0,{immediate:!0}):setTimeout(()=>{window.scrollTo({left:0,top:0})},50),barba.init({sync:!0,transitions:[{leave:e=>gsap.to(e.current.container,{opacity:0,delay:.2}),enter:e=>(o?o.scrollTo(0,{immediate:!0}):window.scrollTo({left:0,top:0}),e.next.container.querySelector(".main").hasAttribute("data-light")?document.body.classList.add("light-mode"):document.body.classList.remove("light-mode"),window.innerWidth>=992&&(d(),form(o,s)),gsap.from(e.next.container,{opacity:0,delay:1,onComplete:()=>{window.removeEventListener("resize",m),c(),window.addEventListener("resize",m),window.innerWidth<992&&(d(),form(o,s))}}))}]})}