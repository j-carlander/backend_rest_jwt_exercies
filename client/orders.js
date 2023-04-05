const serverInfo = $(".server-info");

let headersList = {
  Authorization: "Bearer " + sessionStorage.getItem("AUTH_TOKEN"),
};

let response = fetch("http://127.0.0.1:4000/api/order", {
  method: "GET",
  headers: headersList,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let order of data.orders) {
      let categoryBlock = $(`<div class="category-block"></div>`);
      let orderDate = $(`<h3>${order.order_placed}</h3>`);
      let orderFood = $(`<ul></ul>`);

      for (let food of order.ordered_food) {
        let foodItem = $(`<li>${food}</li>`);
        orderFood.append(foodItem);
      }
      categoryBlock.append(orderDate);
      categoryBlock.append(orderFood);
      serverInfo.prepend(categoryBlock);
    }
  });
