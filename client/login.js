const loginForm = document.querySelector("#loginForm");
const username = document.querySelector("#username");

const password = document.querySelector("#password");

const serverInfo = document.querySelector(".server-info");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!username || !password) return console.log("missing details");
  let fetchOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  };
  let result = await fetch("http://127.0.0.1:4000/auth/login", fetchOptions);
  let jsonResult = await result.json();
  let p = document.createElement("p");
  if (result.status == 200) {
    sessionStorage.setItem("AUTH_TOKEN", jsonResult.jwt);
    sessionStorage.setItem(
      "USER_DETAILS",
      JSON.stringify(jsonResult.userDetails)
    );

    console.log(jsonResult);
    window.location.href = "/client/index.html";
  } else if (result.status == 400) {
    p.innerText = jsonResult;
  }
  serverInfo.append(p);
});
