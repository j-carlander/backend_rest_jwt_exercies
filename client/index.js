const welcomeTitle = document.querySelector(".welcome-title");
const serverInfo = $(".server-info");
const navBar = $("nav");

const userDetails = JSON.parse(sessionStorage.getItem("USER_DETAILS")) || {};

const isDelivery = userDetails.role == "delivery" ? true : false;

if (userDetails.username)
  navBar.append(`<a href="/client/orders.html">Order history</a>`);

if (isDelivery)
  navBar.append(`<a href="/client/deliver.html">Deliver order</a>`);

if (userDetails.username) {
  navBar.append(`<button class="log-off-btn">Log out</button>`);
  const logOffBtn = $(".log-off-btn");
  logOffBtn.on("click", () => {
    sessionStorage.removeItem("AUTH_TOKEN");
    sessionStorage.removeItem("USER_DETAILS");
  });
}

if (userDetails.username) {
  welcomeTitle.innerText = `Welcome ${userDetails.username}`;
}

async function fetchFoodMenu() {
  let data = await fetch("http://127.0.0.1:4000/api/food").then((response) =>
    response.json()
  );

  sessionStorage.setItem("FOOD_DATA", JSON.stringify(data));
}
if (!sessionStorage.getItem("FOOD_DATA")) fetchFoodMenu();

const foods = JSON.parse(sessionStorage.getItem("FOOD_DATA")).foods;

for (let category of foods) {
  let categoryBlock = $(`<div class="category-block"></div>`);
  let categoryTitle = $(`<h3>${category.category_name}</h3>`);
  let categoryList = $(`<ul></ul>`);
  console.log(categoryTitle);
  for (let food of category.content) {
    let foodItem = $(
      `<li><span>${food.title}</span><span class="price">${food.price}</span></li>`
    );
    categoryList.append(foodItem);
  }
  categoryBlock.append(categoryTitle);
  categoryBlock.append(categoryList);
  serverInfo.prepend(categoryBlock);
}
console.log(foods);
