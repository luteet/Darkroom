export default function form(lenis=false, typedChatList=[]) {
	
	function validateEmail(email) {
	
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
		if (emailRegex.test(email)) {
			return true;
		} else {
			return false;
		}
	
	}

	document.querySelectorAll('.index__chat_field_inner textarea').forEach(textarea => {

		textarea.addEventListener("focus", () => {
			textarea.closest(".index__chat_field").classList.add("in-focus");
		})

		textarea.addEventListener("blur", () => {
			textarea.closest(".index__chat_field").classList.remove("in-focus");
		})

		textarea.addEventListener("click", () => {
			textarea.closest(".index__chat_field").classList.remove("in-static-focus");
		})

		textarea.addEventListener('input', function (event) {

			//textarea.value = textarea.value.replace(/\s+/g, '');
			textarea.parentElement.dataset.value = textarea.value;
			
			textarea.closest(".index__chat_field").classList.remove("in-static-focus");
			
		})

		textarea.addEventListener('keydown', function (event) {

			if(event.key == "Enter") {
				event.preventDefault();
				textarea.closest(".index__chat").querySelector(".index__chat_list").insertAdjacentHTML("beforeend", `<div class="index__chat_user_item">${textarea.value}</div>`);
				textarea.value = "";
				textarea.parentElement.dataset.value = "";
				textarea.closest(".index__chat_field").classList.remove("has-value");

				if(lenis) {
					lenis.resize();
					lenis.scrollTo(lenis.limit, {immediate: true})
				} else {

					setTimeout(() => {
						window.scrollTo({left: 0, top: document.querySelector(".wrapper").offsetHeight})
					},0)

				}

				if(typedChatList.length) {
					typedChatList.map(typed => typed.stop());
				}

				setTimeout(() => {
					barba.go(textarea.closest(".index__chat").dataset.url);
				},500)
			}

		})
		
	})

	document.querySelectorAll('.chat__textarea_inner textarea').forEach(textarea => {

		const list = textarea.closest(".chat").querySelector(".chat__list");

		textarea.focus({
			preventScroll: true
		});

		textarea.addEventListener("focus", () => {
			textarea.closest(".chat__textarea_inner").classList.add("in-focus");
		})

		textarea.addEventListener("click", () => {
			textarea.closest(".chat__textarea_inner").classList.remove("in-static-focus");
		})

		textarea.addEventListener("blur", () => {
			textarea.closest(".chat__textarea_inner").classList.remove("in-focus");
		})
		
		textarea.addEventListener('input', function (event) {

			//textarea.value = textarea.value.replace(/\n/, '');
			textarea.parentElement.dataset.value = textarea.value;

			textarea.closest(".chat__textarea_inner").classList.remove("in-static-focus");

			if(textarea.value) {
				textarea.closest(".chat__textarea").classList.add("has-value");
			} else {
				textarea.closest(".chat__textarea").classList.remove("has-value");
			}

		})

		textarea.addEventListener('keydown', function (event) {
			if(event.key == "Enter") {
				event.preventDefault();

				list.insertAdjacentHTML("beforeend", `<li class="chat__user_message">${textarea.value}</li>`);
				textarea.value = "";
				textarea.parentElement.dataset.value = "";
				textarea.closest(".chat__textarea").classList.remove("has-value");

				if(lenis) {
					lenis.resize();
					lenis.scrollTo(lenis.limit, {immediate: true})
				} else {
					setTimeout(() => {
						window.scrollTo({left: 0, top: document.querySelector(".wrapper").offsetHeight})
					},0)
				}
			}

		})

		textarea.closest(".chat__textarea").querySelector(".chat__textarea_button").addEventListener("click", () => {
			if(textarea.value) {
				list.insertAdjacentHTML("beforeend", `<li class="chat__user_message">${textarea.value}</li>`);
				textarea.value = "";
				textarea.parentElement.dataset.value = "";
				textarea.closest(".chat__textarea").classList.remove("has-value");
				if(lenis) {
					lenis.resize();
					lenis.scrollTo(lenis.limit, {immediate: true})
				} else {
					setTimeout(() => {
						window.scrollTo({left: 0, top: document.querySelector(".wrapper").offsetHeight})
					},0)
				}
			}
		})
		
	})

	document.querySelectorAll(".about__feedback").forEach(form => {

		const message = form.querySelector(".about__feedback_message");

		document.querySelectorAll("input").forEach(input => {
			input.addEventListener("focus", () => {
				input.classList.remove("is-error");
				message.textContent = message.dataset.defaultMessage;
			})
		})

		form.addEventListener("submit", (event) => {
			event.preventDefault();

			document.querySelectorAll("input").forEach(input => {
				if(input.type == "email") {
					if(!validateEmail(input.value)) {
						input.classList.add("is-error");
						message.textContent = message.dataset.errorMessage;
					} else {
						input.classList.remove("is-error");
						message.textContent = message.dataset.successMessage;
					}
				}
			})
		})
	})
}