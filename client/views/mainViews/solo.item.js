import {editItem} from "../../client_controller/admin.controller.js"

export default async () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = `/items/${item.id}`;
    });
  });
};
