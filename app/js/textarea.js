document.querySelectorAll('.index__chat_field_inner textarea').forEach(textarea => {

	const textCursor = textarea.closest(".index__chat_field").querySelector(".text-cursor");

	//textarea.focus();

	/* textarea.addEventListener("click", () => {
		const text = textarea.value.split("");
		textarea.setSelectionRange(text.length, text.length);
	}) */

	/* if(lenis) lenis.stop()
	textarea.focus();
	if(lenis) {
		setTimeout(() => {
			lenis.start()
		},100)
	} */

	textarea.addEventListener("focus", () => {
		const text = textarea.value.split("");
		//textarea.setSelectionRange(text.length, text.length);
		textarea.closest(".index__chat_field").classList.add("in-focus");
	})

	textarea.addEventListener("blur", () => {
		textarea.closest(".index__chat_field").classList.remove("in-focus");
	})

	textarea.addEventListener("click", () => {
		textarea.closest(".index__chat_field").classList.remove("in-static-focus");
	})

	//textCursor.style.transform = `translate(0, ${textarea.offsetHeight}px)`;

	/* textarea.addEventListener('keydown', function (event) {

	}) */
	
	textarea.addEventListener('input', function (event) {

		textarea.value = textarea.value.replace(/\s+/g, '');
		textarea.parentElement.dataset.value = textarea.value;
		
		textarea.closest(".index__chat_field").classList.remove("in-static-focus");
		/* if(textarea.value) {

			textarea.closest(".index__chat_field").classList.add("has-value");
			//console.log(textarea.selectionStart);
			//textarea.selectionEnd = textarea.selectionEnd;
			

			if(document.querySelector(".last-letter") && event.inputType == "deleteContentBackward") {
				gsap.to(document.querySelector(".last-letter"), {
					opacity: 0,
					duration: 0.1,
				})
			}
			
			let text = textarea.value.split(""),
			lastLetter = text[text.length-1];
			
			//if(lastLetter == "\n") lastLetter = "\n";

			//textarea.setSelectionRange(text.length, text.length);

			const lastLetterElement = document.createElement("span");
			lastLetterElement.classList.add("last-letter");
			lastLetterElement.insertAdjacentHTML("beforeend", `<span>${lastLetter}</span>`);
			//lastLetterElement.style.opacity = 0;

			setTimeout(() => {
				
				textField.innerHTML = `<span>${textarea.value.slice(0,-1)}</span>`;
				textField.append(lastLetterElement);

				if(lastLetter == "\n") {
					gsap.to(textCursor, {
						x: lastLetterElement.offsetWidth + "px",
						y: textarea.offsetHeight,
						duration: 0.2,
					})
				} else {
					gsap.to(textCursor, {
						x: lastLetterElement.getBoundingClientRect().left - textField.getBoundingClientRect().left + lastLetterElement.offsetWidth + "px",
						y: textarea.offsetHeight,
						duration: 0.2,
					})
				}

			},100)
		} else {

			textarea.closest(".index__chat_field").classList.remove("has-value");

			textField.innerHTML = "";
			gsap.to(textCursor, {
				x: "0px",
				y: textarea.offsetHeight,
				duration: 0.2,
			})
		} */
	})

	textarea.addEventListener('keydown', function (event) {

		if(event.key == "Enter") {
			textarea.closest(".index__chat").querySelector(".index__chat_list").insertAdjacentHTML("beforeend", `<div class="index__chat_user_item">${textarea.value}</div>`);
			textarea.value = "";
			textarea.parentElement.dataset.value = "";
			textarea.closest(".index__chat_field").classList.remove("has-value");

			if(lenis) {
				lenis.resize();
				lenis.scrollTo(lenis.limit/* , {immediate: true} */)
			} else {

				setTimeout(() => {
					window.scrollTo({left: 0, top: document.querySelector(".wrapper").offsetHeight})
				},0)
				//document.body.scrollTop = document.querySelector(".wrapper").offsetTop;
			}

			if(typedChatList.length) {
				typedChatList.map(typed => typed.stop());
			}

			setTimeout(() => {
				//window.location.href = "chat.html";
				barba.go(textarea.closest(".index__chat").dataset.url);
			},500)
		}

	})
	
})