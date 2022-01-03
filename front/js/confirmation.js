const loc = window.location.href;
const url = new URL(loc);
const id = url.searchParams.get("orderId");

orderId.innerHTML = id;
localStorage.clear();
