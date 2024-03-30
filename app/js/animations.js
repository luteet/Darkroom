import form from "./form.js";

export default function animations() {

	let scrollWrapper, scrollContent;
	let lenis;

	let indexTimeline, indexTimeline2, typedChatList = [], startTimeline;

	const wrapper = document.querySelector(".wrapper");
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}

	function staticAnimations() {

		setTimeout(() => {
			if(typedChatList.length) {
				typedChatList.map(typed => {
					typed.destroy()
				});
			}

			let firstInit = true;
	
			if(document.querySelector(".index__chat [data-delay]")) {
				document.querySelectorAll(".index__chat_field").forEach(chat => {
	
					const cb = function(entries) {
						entries.forEach(entry => {
							if(entry.isIntersecting) {

								chat.closest(".index__chat").classList.add("in-view");

								if(firstInit) {
									firstInit = false;
									chat.querySelector("textarea").focus();
									
									let delay = 0;
									document.querySelectorAll(".index__chat_item").forEach(item => {
										delay += Number(item.dataset.delay);
										/* gsap.to(item, {
											height: item.querySelector("span").offsetHeight + "px",
											delay: delay,
											onComplete: () => {
												item.classList.add("is-visible");
											},
										}) */
										
										typedChatList.push(new Typed(item.querySelector("span"), {
											strings: [item.dataset.text],
											typeSpeed: 50,
											startDelay: delay*1000,
											onComplete: (self) => {
												item.classList.remove("is-active");
											},
											preStringTyped: (self) => {
												//console.log("self")
												item.classList.add("is-active");
												item.classList.add("is-visible");
		
												if(item.closest(".index__chat.in-view")) {
													if(lenis) {
														lenis.resize();
														lenis.scrollTo(lenis.limit, {immediate: true})
													} else {
														window.scrollTo({left: 0, top: wrapper.offsetHeight})
													}
												}
												
											},
										}));
										
									})

								}
		
								//io.disconnect(chat);
								
							} else {
								chat.closest(".index__chat").classList.remove("in-view");
							}
						});
					}
			
					const io = new IntersectionObserver(cb);
					io.disconnect(chat);
					io.observe(chat);
		
				})
			}	

		},200)

		if(document.querySelector(".fade-in-on-start")) {
			gsap.to(".fade-in-on-start", {
				opacity: 1,
				duration: 2,
				delay: 1,
				ease: "power3.out"
			})
		}

		if(document.querySelector(".index__block")) {
			if(startTimeline) startTimeline.kill();
			startTimeline = gsap.timeline();

			//const indexBlocks = document.querySelectorAll(".index__block");
			
			gsap.set(".index__hero", {
				transform: "translate3d(0,100%,0)",
			})

			gsap.set(".index__about_inner", {
				transform: "translate3d(0,100%,0)",
			})

			startTimeline.to(".index__hero", {
				transform: "translate3d(0,0,0)",
				duration: 2,
				delay: 1,
				ease: "power3.out"
			})

			startTimeline.to(".index__about_inner", {
				transform: "translate3d(0,0,0)",
				duration: 2,
				ease: "power3.out",
				onComplete: () => {
					startTimeline.kill();
				},
			},"-=1.9")

		} else {
			if(startTimeline) startTimeline.kill();	
		}

	}
	
	function scrollAnimation() {

		ScrollTrigger.killAll();

		if(document.querySelector(".index__about p")) {

			const text = new SplitType('.index__about p', { types: 'lines' });
			
			gsap.set(text.lines, {
				"--progress": "-20%",
				"--progress-2": "0%",
			})
	
			const anim = gsap.to(text.lines, {
				"--progress": "100%",
				"--progress-2": "120%",
				stagger: 1,
				duration: 1.5,
				immediateRender: !1, 
				paused: !0,
			})
	
			ScrollTrigger.create({
	
				trigger: document.querySelector(".index__about"),
				scrub: 1,
				
				start: `top center`,
				end: `bottom center`,
				scroller: scrollWrapper ? scrollWrapper : document.body,
	
				animation: anim,
				
			});
		}
		
		const indexBlocks = document.querySelectorAll(".index__block");
		if(indexBlocks[0]) {
	
		if(indexTimeline) indexTimeline.kill();
		
			indexTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: indexBlocks[0],
					start: `top top`,
					end: window.innerWidth >= 992 ? `+${window.innerHeight * 1.2} bottom` : `+${getCoords(document.querySelector(".index__about")).top*1.45} bottom`,
					scroller: scrollWrapper ? scrollWrapper : document.body,
					pin: true,
					scrub: true,
					//pinSpacing: false,
					//markers: true,
				}
			})
		
			indexTimeline.pause();
		
			if(indexTimeline2) indexTimeline2.kill();
			indexTimeline2 = gsap.timeline({
				scrollTrigger: {
					trigger: indexBlocks[1].querySelector(".index__about"),
					start: `top top`,
					end: `bottom top`,
					scroller: scrollWrapper ? scrollWrapper : document.body,
					//pin: true,
					scrub: true,
					//markers: true,
				}
			})
		
			indexTimeline2.pause();
		
			const background = document.querySelectorAll(".main-background div");
		
			indexTimeline2.to(background[0], {
				opacity: "0",
				duration: 2,
			})
		
			indexTimeline2.to(background[1], {
				opacity: "1",
				duration: 2,
			},"-=2")

			indexTimeline2.to(document.querySelector(".index__about"), {
				opacity: 0.2,
				duration: 2,
			})
		}
	}

	let windowWith = 0;
	function resize() {
		if(windowWith != window.innerWidth) {
			windowWith = window.innerWidth;
			scrollAnimation();
		}
	}

	function startAnimation() {

		if(window.innerWidth >= 992) {
			
			new SimpleBar(document.querySelector(".wrapper"), {
				//wrapper: document.querySelector(".wrapper"),
				//autoHide: false,
			})
	
			scrollWrapper = document.querySelector(".simplebar-content-wrapper");
			scrollContent = document.querySelector(".simplebar-content");

			lenis = new Lenis({
				wrapper: scrollWrapper,
				content: scrollContent,
			});
			
			function raf(time) {
				lenis.raf(time)
				requestAnimationFrame(raf)
			}
	
			lenis.on('scroll', ScrollTrigger.update)
			
			requestAnimationFrame(raf)

			window.removeEventListener("resize", resize);
			scrollAnimation();
			window.addEventListener("resize", resize);

		} else {
			window.removeEventListener("resize", resize);
			scrollAnimation();
			window.addEventListener("resize", resize)
		}
		
	}

	staticAnimations();
	startAnimation();
	form(lenis, typedChatList);
	
	if(lenis) {
		lenis.scrollTo(0,{immediate: true});
	} else {
		setTimeout(() => {
			window.scrollTo({left: 0, top: 0})
		},50)
	}

	barba.init({
		sync: true,
		transitions: [{
		  leave(data) {
			return gsap.to(data.current.container, {
				opacity: 0,
				delay: 0.2,
			});
		  },
		  enter(data) {

			if(lenis) {
				lenis.scrollTo(0, {immediate: true});
			} else {
				window.scrollTo({left: 0, top: 0})
			}

			if(data.next.container.querySelector(".main").hasAttribute("data-light")) {
				document.body.classList.add("light-mode")
			} else {
				document.body.classList.remove("light-mode");
			}

			if(window.innerWidth >= 992) {
				staticAnimations();
				form(lenis, typedChatList);
			}

			return gsap.from(data.next.container, {
				opacity: 0,
				delay: 1,
				onComplete: () => {
					window.removeEventListener("resize", resize);
					scrollAnimation();
					window.addEventListener("resize", resize)
					if(window.innerWidth < 992) {
						staticAnimations();
						form(lenis, typedChatList);
					}
				}
			});
		  }
		}]
	});
	
}