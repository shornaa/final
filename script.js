const searchInput = document.getElementById('search-input');
const errorContent = document.getElementById('error-area');

// Search area
const clickToSearch = () => {
  const itemsName = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemsName}`)
    .then((res) => res.json())
    .then((data) => {
      const foodItems = document.getElementById('food-items');
      let dataItem = '';

      if (itemsName === '') {
        errorContent.innerHTML = `
          <div class="error-content">
            <h2>The search box cannot be empty.</h2>
            <button onclick="closeBtn()" class="close">X</button>
          </div>
        `;

        errorContent.style.display = 'block';
        foodItems.innerHTML = '';
      } else if (data.meals) {
        data.meals.forEach((item) => {
          dataItem += `
          <div onclick="itemDetails('${item.strMeal}')" class="food-item"> 
            <img src="${item.strMealThumb}" />
            <h4>${item.strMeal}</h4>
          </div>`;
        });

        foodItems.innerHTML = dataItem;
      } else {
        errorContent.innerHTML = `
          <div class="error-content">
            <h2>Sorry, We do not have this item at this time.</h2>
            <button onclick="closeBtn()" class="close">X</button>
          </div>
        `;

        errorContent.style.display = 'block';
        foodItems.innerHTML = '';
      }
      detailsArea.style.display = 'none';
    });
  searchInput.value = '';
};
