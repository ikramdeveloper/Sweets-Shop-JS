const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const cartInfo = document.getElementById("cart-info");
const cart = document.getElementById("cart");
const cartBtns = document.querySelectorAll(".store-item-icon");
const cartTotalDOM = document.querySelector(".cart-total-container");
const cartTotal = document.getElementById("cart-total");
const itemTotal = cartInfo.lastElementChild.lastElementChild;
const itemCount = cartInfo.lastElementChild.firstElementChild;

cartInfo.addEventListener("click", () => {
  cart.classList.toggle("show-cart");
});

cartBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("store-item-icon")) {
      const fullPath = e.target.parentElement.previousElementSibling.src;
      const pos = fullPath.indexOf("img") + 3;
      const partPath = fullPath.slice(pos);

      const name =
        e.target.parentElement.parentElement.nextElementSibling.children[0]
          .children[0].textContent;

      const priceText =
        e.target.parentElement.parentElement.nextElementSibling.children[0]
          .children[1].innerText;

      const price = priceText.slice(1).trim();

      const item = {};
      item.img = `img-cart/${partPath}`;
      item.name = name;
      item.price = price;

      const cartItem = document.createElement("div");
      cartItem.classList.add(
        "cart-item",
        "d-flex",
        "justify-content-between",
        "text-capitalize",
        "my-3"
      );

      cartItem.innerHTML = `
      
              <img
                src="${item.img}"
                alt=""
                class="img-fluid rounded-circle"
                id="item-img"
              />
              <div class="item-text">
                <p id="cart-item" class="title font-weight-bold mb-0 flex-1">
                  ${item.name};
                </p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price mb-0"
                  >${item.price}</span
                >
              </div>
              <a href="#" id="cart-item-remove" class="cart-item-remove">
                <i class="fas fa-trash"></i>
              </a>
            
      `;

      cart.insertBefore(cartItem, cartTotalDOM);
      showTotals();
    }
  });
});

function showTotals() {
  const total = [];
  const itemsPrices = document.querySelectorAll(".cart-item-price");
  itemsPrices.forEach((itemPrice) => {
    total.push(parseFloat(itemPrice.textContent));
  });
  const totalPrice = total
    .reduce((total, price) => (total += price), 0)
    .toFixed(2);
  cartTotal.innerText = totalPrice;
  itemTotal.innerText = totalPrice;
  itemCount.innerText = itemsPrices.length;
}
