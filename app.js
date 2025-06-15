let scrolled = false;

const scrollBtn = document.getElementById("scrollTopBtn");

const handleScroll = () => {
  if (window.scrollY > 100) {
    scrollBtn.classList.add("opacity-100", "pointer-events-auto");
    scrollBtn.classList.remove("opacity-0", "pointer-events-none");
  } else {
    scrollBtn.classList.remove("opacity-100", "pointer-events-auto");
    scrollBtn.classList.add("opacity-0", "pointer-events-none");
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", handleScroll);

const allRecipesApi = async () => {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await res.json();

    loding();
    allRecipes(data.meals);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
};

const loding = () => {
  const lodingicon = document.getElementById("loding");
  lodingicon.classList.add("hidden");
};

const allRecipes = (e) => {
  const recipesContainer = document.getElementById("recipes");

  if (e) {
    const recipe = e.map((e) => {
      return `
       <div class="w-[300px] rounded-[12px] shadow-2xl">
              <img src=${
                e.strMealThumb
              } alt="" class="rounded-t-[12px] w-[320px] h-[200px] object-cover " />
              <div class="flex flex-col gap-[10px] p-[12px]">
                <h2 class="text-2xl">${e.strMeal}</h2>
                <p class="text-[13px]">
                 ${e.strInstructions.split(" ").slice(0, 18).join(" ")}
                </p>
                <div class="flex justify-end">
                  <button
                    onclick="clickMe('${e.idMeal}')"
                    class="bg-[#FBBA1A] px-[20px] py-[10px] cursor-pointer hover:bg-[#d99a00] rounded-[8px] font-semibold text-white"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </div>`;
    });

    recipesContainer.innerHTML = recipe.join("");
  } else {
    recipesContainer.innerHTML = `<div class=" mt-[100px]">
              <h1 class=" text-4xl text-[#f00] font-semibold ">  No Data Found... </h1>
            </div>`;
  }
};

async function handleSearch(foodName) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php/?s=${foodName}`
  );

  const data = await response.json();
  const meals = data.meals;
  allRecipes(meals);
}

const btn = document.getElementById("searchBtn");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const searchButton = document.querySelector("#searchInput");
  const searchText = searchButton.value.trim();
  console.log(searchText);

  handleSearch(searchText);
});

const clickMe = async (e) => {
  console.log(e);

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`
    );
    const data = await res.json();
    console.log(data.meals);
    recipesDetails(data.meals);
  } catch (error) {
    console.error("Error loading categories:", error);
  }

  function recipesDetails(a) {
    const popapId = document.getElementById("popap");

    popapId.classList.remove("hidden");
    const recipePopap = a.map((e) => {
      return ` <div
        class="fixed inset-0 flex justify-center p-8 items-center z-50 bg-opacity-50"
      >
        <div
          class="bg-[#dadada] p-4 md:p-6 rounded-lg shadow-2xl max-w-[80%] md:max-w-[70%] xl:max-w-[900px] max-h-[80vh] flex flex-col overflow-hidden"
        >
          <div
            class="bg-[#fff] rounded-2xl inset-shadow-sm inset-shadow-indigo-700  flex flex-col overflow-y-auto"
          >
            <img src=${e.strMealThumb} alt="image" class="h-[300px]" />
            <div class="px-4 md:px-5 py-4">
              <h3 class="text-2xl font-semibold">${e.strMeal}</h3>
              <p class="mt-4 text-gray-800">
                ${e.strInstructions}
              </p>
            </div>
          </div>
          <div class="flex justify-end mt-[20px]">
            <button onclick="closeMe()"
              class="bg-[#FBBA1A] px-[20px] font-semibold py-[10px] cursor-pointer hover:bg-[#d99a00] rounded-[8px] text-white"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>`;
    });
    popapId.innerHTML = recipePopap.join("");
  }
};

function closeMe() {
  console.log("sufal");
  const popapId = document.getElementById("popap");

  popapId.classList.add("hidden");
}

allRecipesApi();
