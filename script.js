//!  card fetching

const cardItems = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      cardShow(data.plants);
    });
};
//! card show in UI
const cardShow = (getData) => {
  const fruitsCardParent = document.getElementById("middle-card-parent");
  fruitsCardParent.innerHTML = "";
  getData.forEach((fruit) => {
    fruitsCardParent.innerHTML += `
     <div class="card bg-base-100 shadow-sm " id="${fruit.id}">
      <figure>
        <img
          src="${fruit.image}"
          alt="Shoes"
          class="object-cover h-50 w-full"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${fruit.name}</h2>
        <p>
          ${fruit.description}
        </p>
        <div class="card-actions justify-between items-center mt-2">
          <div
            class="badge bg-[#DCFCE7] text-[#15803D] border-none p-4  rounded-lg"
          >
            ${fruit.category}
          </div>
          <h1 class="text-xl font-bold">৳<span>${fruit.price}</span></h1>
        </div>
      </div>
      <button class="w-[90%] mx-auto my-2  bg-[#15803D] rounded-full p-3 text-white">
        Add to Cart
      </button>
    </div>
    `;
  });
};

cardItems();
