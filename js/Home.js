const Api__Url = `https://makeup-api.herokuapp.com/api/v1/products.json?brend=maybelline`;
let Data__Array = [];
let NeW__Data__Array = Data__Array;

const Loading__Contaner = document.querySelector("[Loading__Contaner]");
const Container = document.querySelector("[Container]");

// ======= Header Start ======= //
const Btn__OpanCart = document.querySelector("[Btn__OpanCart]");
const Btn__OpanUser = document.querySelector("[Btn__OpanUser]");
// ======= Header End ======= //

// ======= Nav Start ======= // 
const Nav__Container = document.querySelector("[Nav__Container]");
const Nav__Overlay = document.querySelector("[Nav__Overlay]");
const Btn__NavClose = document.querySelector("[Btn__NavClose]");
// Nav Action Buttons
const Nav__Button__Wrapper = document.querySelector("[Nav__Button__Wrapper]");
// ======= Nav End ======= //

// ======= Main Start ======= //
const Main = document.querySelector("[Main]");
const Main__Content__Wrapper = document.querySelector("[Main__Content__Wrapper]");
const Card__Item__Wrapper = document.querySelector("[Card__Item__Wrapper]");
// Select //
const Select__SortBy = document.querySelector("[Select__SortBy]");
// Button //
const Btn__OpanFilter = document.querySelector("[Btn__OpanFilter]");
// ======= Main End ======= //

// ======= Filter Start ======= //
const Filter__Container = document.querySelector("[Filter__Container]");
const Filter__Overlay = document.querySelector("[Filter__Overlay]");
const Filter__Title = document.querySelector("[Filter__Title]");
// input //
const Search__Input = document.querySelector("[Search__Input]");
const PriceFrom__Input = document.querySelector("[PriceFrom__Input]");
const PriceEnd__Input = document.querySelector("[PriceEnd__Input]");
// Select //
const Select__Brend = document.querySelector("[Select__Brend]");
const Select__Category = document.querySelector("[Select__Category]");
const Select__Type = document.querySelector("[Select__Type]");
// Button //
const Btn__Filter = document.querySelector("[Btn__Filter]");
const Btn__FilterClose = document.querySelector("[Btn__FilterClose]");
const Btn__FilterClear = document.querySelector("[Btn__FilterClear]");
// ======= Filter End ======= //

// ======= Aside Start ======= //
const Aside__Container = document.querySelector("[Aside__Container]");
const Aside__Overlay = document.querySelector("[Aside__Overlay]");
const Btn__AsideClose = document.querySelector("[Btn__AsideClose]");
const Aside__Title = document.querySelector("[Aside__Title]");
const Product__Info__Contaner = document.querySelector("[Product__Info__Contaner]");
const Btn__Add__Cart = document.querySelector("[Btn__Add__Cart]");
// ======= Aside End ======= //

// ======= Image Start ======= //
const Image__Container = document.querySelector("[Image__Container]");
const Image__Overlay = document.querySelector("[Image__Overlay]");
// button //
const Btn__ImageClose = document.querySelector("[Btn__ImageClose]");
// image //
const Product__Image = document.querySelector(".Container .Image__Container img");

// ======= Aside End ======= //

// ======= Eventlistener Start ======= //
Select__SortBy.addEventListener('change', Get__SortBy__Value);
Search__Input.addEventListener('keyup', Get__Search__Value);
Search__Input.addEventListener('change', Get__Search__Value);
// Filter opan Btn
Btn__OpanFilter.addEventListener('click', Opan__Filter__Contaner);
// Filter Close Btn
Btn__FilterClose.addEventListener('click', Opan__Filter__Contaner);
Filter__Overlay.addEventListener('click', Opan__Filter__Contaner);
Btn__Filter.addEventListener('click', Get__All__Filter__Value);
// image Close Btn
Btn__ImageClose.addEventListener('click', Close__Image__Container);
Image__Overlay.addEventListener('click', Close__Image__Container);
// aside Close Btn
Aside__Overlay.addEventListener('click', Close__Aside__Container);
Btn__AsideClose.addEventListener('click', Close__Aside__Container);
// window
window.addEventListener("popstate", Detect__History);
// ======= Eventlistener End ======= //

window.onload = () => {
  Loading__Contaner.classList.add('active');
  setTimeout(() => {
    Container.classList.add('active');
    Loading__Contaner.classList.remove('active');
  }, 1500)
};

function Get__Api__Data() {
  // Loading__Contaner.classList.add('active');
  // Container.classList.remove('active');
  fetch(Api__Url).then(res => res.json()).then(data => {
    for (let i = 0; i < 100; i++) {
      Data__Array.push(data[i]);
    }
    Get__Data()
  });
}
Get__Api__Data();

function Get__Data() {
  // Loading__Contaner.classList.remove('active');
  // Container.classList.add('active');
  ProductOn__Display(Data__Array);
  Create__Select__Option();
}

function Create__Select__Option() {
  let brand__arr = [];
  Select__Brend.innerHTML = "";

  for (let Data of Data__Array) {
    brand__arr.push(Data.brand);
  }
  brand__arr = [...new Set(brand__arr)];

  let brand = document.createElement("option")
  brand.setAttribute("value", "");
  brand.innerText = "Brand";

  Select__Brend.appendChild(brand);

  for (const value of brand__arr) {
    let option = document.createElement("option")
    option.setAttribute("value", value);
    option.innerText = value;

    Select__Brend.appendChild(option);
  }
  Select__Brend.addEventListener('change', Create__Category__Option);
  Btn__FilterClear.addEventListener('click', Clear__Filter);
}

function Create__Category__Option() {
  let Brend__Value = Select__Brend.value.toLowerCase();
  let category__arr = [];
  let Temp__Arr = Data__Array.filter(i => i.brand == Brend__Value);
  Select__Category.innerHTML = "";

  if (Brend__Value != "") {
    Btn__FilterClear.classList.add('active');
  } else {
    Btn__FilterClear.classList.remove('active');
  }

  for (let Data of Temp__Arr) {
    category__arr.push(Data.category);
  }
  category__arr = [...new Set(category__arr)];

  let category = document.createElement("option")
  category.setAttribute("value", "");
  category.innerText = "Category";
  Select__Category.prepend(category);

  for (const value of category__arr) {
    let option = document.createElement("option")
    option.setAttribute("value", value);
    option.innerText = value;

    Select__Category.appendChild(option);
  }

  Select__Category.addEventListener('change', Create__Type__Option);
}

function Create__Type__Option() {
  let Category__Value = Select__Category.value.toLowerCase();
  let type__arr = [];
  let Temp__Arr = Data__Array.filter(i => i.category == Category__Value);
  Select__Type.innerHTML = "";

  for (let Data of Temp__Arr) {
    type__arr.push(Data.product_type);
  }
  type__arr = [...new Set(type__arr)];

  let type = document.createElement("option")
  type.setAttribute("value", "");
  type.innerText = "Type";
  Select__Type.prepend(type);

  for (const value of type__arr) {
    let option = document.createElement("option")
    option.setAttribute("value", value);
    option.innerText = value;

    Select__Type.appendChild(option);
  }
}

function Clear__Filter() {
  Create__Select__Option();
  Btn__FilterClear.classList.remove('active');
  Search__Input.value = "";
  PriceFrom__Input.value = "";
  PriceEnd__Input.value = "";

  Select__Category.innerHTML = "";
  let category = document.createElement("option")
  category.setAttribute("value", "");
  category.innerText = "Category";
  let type = document.createElement("option")
  type.setAttribute("value", "");
  type.innerText = "Type";

  Select__Category.prepend(category);
  Select__Type.prepend(type);

  ProductOn__Display(Data__Array);
}

function Get__SortBy__Value() {
  let SortBy__Value = Select__SortBy.value;

  if (SortBy__Value == "") {
    NeW__Data__Array = Data__Array;
    ProductOn__Display(Data__Array)
  }

  if (SortBy__Value == "Defult") {
    NeW__Data__Array = Data__Array;
    ProductOn__Display(Data__Array)
  }

  if (SortBy__Value == "Price") {
    NeW__Data__Array = Data__Array;
    NeW__Data__Array = NeW__Data__Array.sort((a, b) => {
      if (a.price < b.price) {
        return 1
      } else {
        return -1
      }
    });

    ProductOn__Display(NeW__Data__Array)
  }

  if (SortBy__Value == "Name") {
    NeW__Data__Array = Data__Array;
    NeW__Data__Array = NeW__Data__Array.sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a < b) {
        return -1
      } else {
        return 1
      }
    });
    ProductOn__Display(NeW__Data__Array)
  }

  ProductOn__Display(NeW__Data__Array)
}

function Get__Search__Value() {
  let Search__Value = Search__Input.value.trim();
  let NeW__Data = NeW__Data__Array.filter(i => i.name.toLowerCase().includes(Search__Value.toLowerCase()));

  ProductOn__Display(NeW__Data);
}

function Get__All__Filter__Value() {
  let PriceFrom__Value = PriceFrom__Input.value;
  let PriceEnd__Value = PriceEnd__Input.value;
  let Brend__Value = Select__Brend.value.toLowerCase();
  let Category__Value = Select__Category.value.toLowerCase();
  let Type__Value = Select__Type.value.toLowerCase();

  let Brand = "";
  let Category = "";
  let Type = "";

  let Price = NeW__Data__Array.filter(i => i.price >= PriceFrom__Value && i.price <= PriceEnd__Value);
  if (Price != "") {
    if (PriceFrom__Value < PriceEnd__Value && PriceEnd__Value > PriceFrom__Value) {
      ProductOn__Display(Price);
      if (Price != "") {
        Brand = Price.filter(i => i.brand == Brend__Value);
        if (Brand != "") {
          ProductOn__Display(Brand);
          Category = Brand.filter(i => i.category == Category__Value);
          if (Category != "") {
            ProductOn__Display(Category);
            Type = Category.filter(i => i.product_type == Type__Value);
            if (Type != "") {
              ProductOn__Display(Type);
            }
          }
        }
      }
    }
  } else {
    Brand = NeW__Data__Array.filter(i => i.brand == Brend__Value);
    if (Brand != "") {
      ProductOn__Display(Brand);
      Category = Brand.filter(i => i.category == Category__Value);
      if (Category != "") {
        ProductOn__Display(Category);
        Type = Category.filter(i => i.product_type == Type__Value);
        if (Type != "") {
          ProductOn__Display(Type);
        }
      }
    }
  }
}

function ProductOn__Display(Data__Array) {
  Card__Item__Wrapper.innerHTML = "";

  for (const i in Data__Array) {
    let Card__Item = document.createElement('div');
    Card__Item.classList.add('Card__Item');

    Card__Item.innerHTML = `
    <div class="Image__Wrapper" Id="${i}">
      <img src="${Data__Array[i].api_featured_image}" alt="">
    </div>
    <div class="Card__Bottom">
      <h3 class="Card__Title" Id="${i}">${Data__Array[i].name}</h3>
      <span class="price">${Data__Array[i].price}${Data__Array[i].price_sign}</span>
      <button class="Btn Btn__AddCart" Id="${i}">
        <i class="fa fa-shopping-bag"></i>
        <span>Add To Cart</span>
      </button>
    </div>`;

    Card__Item__Wrapper.appendChild(Card__Item);
  }

  document.querySelectorAll(".Card__Item .Card__Bottom .Card__Title").forEach((Title, i) => {
    Title.addEventListener("click", () => {
      let index = Title.getAttribute('Id')
      Opan__Aside__Container(index, Data__Array)
    });
  });

  document.querySelectorAll(".Card__Item .Image__Wrapper").forEach((Image, i) => {
    Image.addEventListener("click", () => {
      let index = Image.getAttribute('Id')
      Opan__Image__Container(index, Data__Array)
    });
  });
}

function Opan__Image__Container(i, Data__Array) {
  Image__Container.classList.add('active');
  window.history.pushState({ id: 1 }, null, `?image=${Data__Array[i].api_featured_image}`);

  Product__Image.setAttribute("src", `${Data__Array[i].api_featured_image}`);
}

function Close__Image__Container() {
  Image__Container.classList.remove('active');
}

function Opan__Aside__Container(i, Data__Array) {
  Aside__Container.classList.add('active');
  window.history.pushState({ id: 1 }, null, `?Name=${Data__Array[i].name}`);

  Product__Info__Contaner.innerHTML = `
  <div class="Product__Image__Wrapper">
  <img src="${Data__Array[i].api_featured_image}" alt="">
  <div class="Product__Info__Top__Wrapper">
    <h3 class="Product__Title">${Data__Array[i].name}</h3>
    <span class="Product__Price">${Data__Array[i].price}${Data__Array[i].price_sign}</span>
  </div>
</div>

<div class="Product__Info__Bottom__Wrapper">
  <div class="Info__Wrapper">
    <h3 class="Info__Title">Brend: </h3>
    <span class="Info__value">${Data__Array[i].brand}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">category: </h3>
    <span class="Info__value">${Data__Array[i].category}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">type: </h3>
    <span class="Info__value">${Data__Array[i].product_type}</span>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">description: </h3>
    <p class="Info__value">${Data__Array[i].description}</p>
  </div>
  <div class="Info__Wrapper">
    <h3 class="Info__Title">website link: </h3>
    <a href="${Data__Array[i].product_link}" class="Info__value">${Data__Array[i].product_link}</a>
  </div>
  </div>`;
}

function Close__Aside__Container() {
  Aside__Container.classList.remove('active');
}

function Opan__Filter__Contaner() {
  Main.classList.toggle('active');
}

function Detect__History() {
  Close__Aside__Container();
  Close__Image__Container();
}

// ======= Function End ======= //