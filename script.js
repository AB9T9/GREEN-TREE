const catContainer = document.getElementById("categories-container");

//! taking id to add to card

let total = 0;
const totalCount = 0;

//!  card fetching

const cardItems = () => {
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
        <li id=${names.id} class="text-[#1F2937] p-2 mt-2 hover:bg-[#15803D] hover:text-white ">${names.category_name}</li>
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
        <h2 class="card-title">${fruit.name}</h2>
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
};

//! making add to card
const cartContainer = document.getElementById("card-parent");

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

  cartContainer.append(div);

  alert(productName + " is added");
  const deleteBtn = () => {
    div.remove();

    total -= price;
    // alert(productName + " is removed");
    document.getElementById("total").innerText = total;
  };
  div.querySelector(".delete").addEventListener("click", deleteBtn);
};

cardItems();
getCategories();
