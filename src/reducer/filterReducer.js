const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr=action.payload.map((curElem)=>curElem.price);
      // 1way
      // console.log(Math.max.apply(null, priceArr));

      // let maxPrice = priceArr.reduce(
      //   (initialVal, curVal) => Math.max(initialVal, curVal),
      //   0
      // );
      // console.log(
      //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
      //   maxPrice
      // );


      // max price
      let maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };
    case "GET_SORT_VIEW":
      // const userSortvalue=document.getElementById("sort");
      // const sort_value=userSortvalue.options[userSortvalue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };
    case "SORT_PRODUCTS":
      let newProduct;
      const { filter_products, sorting_value } = state;
      let tempProduct = [...filter_products];

      const sortingProduct = (a, b) => {
        switch (sorting_value) {
          case "lowest":
            return a.price - b.price;
          case "highest":
            return b.price - a.price;
          case "a-z":
            return a.name.localeCompare(b.name);
          case "z-a":
            return b.name.localeCompare(a.name);
        }
      };
      newProduct = tempProduct.sort(sortingProduct);
      return {
        ...state,
        filter_products: newProduct,
      };

    case "UPDATE_FILTER_PRODUCT":
      const { name, value } = action.payload;
      
       return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
      // case "FILTER_PRODUCTS" :
      //   const { all_products} = state;
      //   let tempFilterProduct=[...all_products];
      //   let {text} =state.filters;
      //   if(text) {
      //     tempFilterProduct=tempFilterProduct.filter((curElem)=>{
      //      return curElem.name.toLowerCase().includes(text);
      //     })
      //   }
       
      //   return {
      //     ...state,
      //     filter_products:tempFilterProduct
      //   }
        case "FILTER_PRODUCTS":
          let { all_products } = state;
          let tempFilterProduct = [...all_products];
    
          const { text, category, company, color, price } = state.filters;
    
          if (text) {
            tempFilterProduct = tempFilterProduct.filter((curElem) => {
              return curElem.name.toLowerCase().includes(text);
            });
          }
    
          if (category !== "all") {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.category == category
            );
          }
    
          if (company !== "all") {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.company.toLowerCase() == company.toLowerCase()
            );
          }
    
          if (color!=='all') {
            tempFilterProduct = tempFilterProduct.filter((curElem) =>
              curElem.colors.includes(color)
            );
          }
          if (price == 0) {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.price == price
            );
          } else {
            tempFilterProduct = tempFilterProduct.filter(
              (curElem) => curElem.price <= price
            );
          }
          return {
            ...state,
            filter_products: tempFilterProduct,
          };
    
        case "CLEAR_FILTERS":
          return {
            ...state,
            filters: {
              ...state.filters,
              text: "",
              category: "all",
              company: "all",
              color: "all",
              maxPrice: 0,
              price: state.filters.maxPrice,
              minPrice: state.filters.maxPrice,
            },
          };

    default:
      return state;
  }
};

export default filterReducer;
