const catContainer = document.getElementById("categories-container");
const modalContainer = document.getElementById("modal-container");
const cartContainer = document.getElementById("card-parent");
const modal = document.querySelector("#modalbox");
// spiner
const spinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-sec").classList.add("hidden");
  } else {
    document.getElementById("card-sec").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
//! taking id to add to card

let total = 0;
const totalCount = 0;

//!  card fetching

const cardItems = () => {
  spinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      cardShow(data.plants);
    });
};

//! categories fetching
const getCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      categories.forEach((names) => {
        catContainer.innerHTML += `
        <li id=${names.id} class="text-[#1F2937] rounded-md p-1 mt-2 hover:bg-[#15803D] hover:text-white 
        md:text-center md:w-full">${names.category_name}</li>
        `;
      });
    });
};

//! add  effect to the element
catContainer.addEventListener("click", (e) => {
  if (e.target.localName == "li") {
    const li = e.target.id;
    document.querySelectorAll("li").forEach((rem) => {
      rem.classList.remove("bg-[#15803D]", "text-white");
    });
    e.target.classList.add("bg-[#15803D]", "text-white");
    if (e.target.id == "all-trees") {
      cardItems();
    } else {
      loadTrees(li);
    }
  }
});

const loadTrees = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const allPlants = data.plants;
      cardShow(allPlants);
    });
};

//! card show in UI
const cardShow = (getData) => {
  const fruitsCardParent = document.getElementById("middle-card-parent");
  fruitsCardParent.innerHTML = "";
  getData.forEach((fruit) => {
    fruitsCardParent.innerHTML += `
     <div class="card bg-base-100 shadow-sm addBtn" id="${fruit.id} ">
      <figure>
        <img
          src="${fruit.image}"
          alt="Shoes"
          class="object-cover h-40 w-full md:h-46"
        />
      </figure>
      <div class="p-2 md:card-body">
        <h2 onclick="modalClick('${fruit.name}','${fruit.image}','${fruit.category}',${fruit.price},'${fruit.description}')" class="card-title">${fruit.name}</h2>
        <p class="small md:text-base">
          ${fruit.description}
        </p>
        <div class="card-actions justify-between items-center mt-0 md:mt">
          <div
            class="badge bg-[#DCFCE7] text-[#15803D] border-none p-1  md:p-4  rounded-lg"
          >
            ${fruit.category}
          </div>
          <h1 class="font-bold md:text-xl">${fruit.price}</h1>
        </div>
      </div>
      <button onclick="showItem(${fruit.price},'${fruit.name}','${fruit.name}')" class="w-[90%] mx-auto my-2  bg-[#15803D] rounded-full p-1 md:p-3 text-white">
        Add to Cart
      </button>
    </div>
    `;
  });
  spinner(false);
};

//! making add to card

const showItem = (price, product, productName) => {
  const div = document.createElement("div");
  div.innerHTML = `  <div
              class="flex justify-between items-center bg-[#F0FDF4] p-2 rounded-md mt-2"
            >
              <div class="flex flex-col ga-2">
              <h1 class="font-bold">${product}</h1>
                <h1>
                  <span>${price}</span><span class="cursor-pointer"> x </span
                  ><span>1</span>
                </h1>
              </div>
              <div><span class="delete">❌</span></div>
            </div> 
            `;

  total += price;

  document.getElementById("total").innerText = total;
  document.getElementById("cart-div").classList.remove("hidden");

  cartContainer.append(div);

  alert(productName + " has been added to the cart");
  const deleteBtn = () => {
    div.remove();

    total -= price;
    // alert(productName + " is removed");
    document.getElementById("total").innerText = total;
    if (total === 0) {
      document.getElementById("cart-div").classList.add("hidden");
    }
  };
  div.querySelector(".delete").addEventListener("click", deleteBtn);
};

const modalClick = (trees, image, category, price, description) => {
 
  modalContainer.innerHTML = `
  <h1 class="font-bold my-2 ">${trees}</h1>
<img src="${image}" alt="${trees}" class="w-full h-48 object-cover rounded mb-2"/>

  <h1 class=""><span class="font-bold">Category: </span>${category}</h1>
  <h1><span class="font-bold">Price : </span>${price}</h1>
  <p><span class="font-bold">Description:</span>${description}</p>`;
  modal.showModal();
};
//! making modal

cardItems();
getCategories();
