const registerForm = document.querySelector("#registerForm");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const reEmail = document.querySelector("#reEmail");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#rePassword");
const phone = document.querySelector("#phone");
const serverInfo = document.querySelector(".server-info");

let emailMatch = false;
let passwordMatch = false;

email.addEventListener("change", checkIfEmail);
function checkIfEmail(e) {
  let parent = e.target.parentNode;

  let regex = new RegExp("^(.+)@(.+)$");
  if (regex.test(email.value)) {
    email.classList.remove("red-outline");
    email.classList.add("green-outline");
    parent.dataset.msg = "";
  } else {
    email.classList.remove("green-outline");
    email.classList.add("red-outline");
    parent.dataset.msg = "Missing an @";
  }
}

reEmail.addEventListener("change", checkEmailMatch);

function checkEmailMatch(e) {
  let parent = e.target.parentNode;
  if (email.value != reEmail.value) {
    reEmail.classList.remove("green-outline");
    reEmail.classList.add("red-outline");
    parent.dataset.msg = "Provided emails don't match";
  }
  if (email.value == reEmail.value) {
    reEmail.classList.remove("red-outline");
    reEmail.classList.add("green-outline");
    parent.dataset.msg = "";
    emailMatch = true;
  }
}

password.addEventListener("change", checkPasswordLenght);
function checkPasswordLenght(e) {
  let parent = e.target.parentNode;
  if (e.target.value.length >= 8) {
    password.classList.remove("red-outline");
    password.classList.add("green-outline");
    parent.dataset.msg = "";
  } else {
    password.classList.remove("green-outline");
    password.classList.add("red-outline");
    parent.dataset.msg = "Password is to short";
  }
}

rePassword.addEventListener("change", checkPasswordMatch);

function checkPasswordMatch(e) {
  let parent = e.target.parentNode;
  if (password.value != rePassword.value) {
    rePassword.classList.remove("green-outline");
    rePassword.classList.add("red-outline");
    parent.dataset.msg = "Missmatching passwords";
  }
  if (password.value == rePassword.value) {
    rePassword.classList.remove("red-outline");
    rePassword.classList.add("green-outline");
    passwordMatch = true;
  }
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!emailMatch || !passwordMatch) return console.log("missmatch");
  let fetchOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
      phone: phone.value,
    }),
  };
  let result = await fetch("http://127.0.0.1:4000/auth/register", fetchOptions);
  let jsonResult = await result.json();
  console.log(jsonResult);
  let p = document.createElement("p");
  p.innerText = `Result: ${jsonResult}`;
  serverInfo.append(p);
});
