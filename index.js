function collectFormData() {
    const filtersForm = document.getElementById("filtersForm");

    // Collect selected colors
    const colorInputs = filtersForm.color;
    const selectedColors = [];
    for(let i=0; i < colorInputs.length; i++){
        if (colorInputs[i].checked) {
            selectedColors.push(colorInputs[i].value);
        }
    }   
    
    const selectedCategory = filtersForm.category.options[filtersForm.category.selectedIndex].value;
    const selectedPrice = parseInt(filtersForm.price.value, 10);
    const selectedSort = filtersForm.search.options[filtersForm.search.selectedIndex].value;
    
    return {
        colors: selectedColors,
        category: selectedCategory,
        price: selectedPrice,
        sort: selectedSort,
    };
}

function handleFilters(event) {
    event.preventDefault();
    const selectedFilters = collectFormData();

    // Full pie

    const colorFilteredProducts = PRODUCTS.filter(product => {        
        let matchedColor = false;
        for(let i=0; i < selectedFilters.colors.length; i++) {
            if (product.colors.includes(selectedFilters.colors[i])) {
                matchedColor = true;
            }        
        }

        return matchedColor;
    });

    // couple of bites off

    const categoryFilteredProducts = colorFilteredProducts.filter(product => {            
        return selectedFilters.category === "" || product.type === selectedFilters.category     
    });

    // couple of bites off

    const filteredProducts = categoryFilteredProducts.filter(product => {               
        return product.price <= selectedFilters.price;
    });

    // couple of bites off


    // filteredProducts => left-over pie

    let sortedProducts = filteredProducts;

    if (selectedFilters.sort !== "" ) {
        filteredProducts.sort((a, b) => {
            return (selectedFilters.sort === "DESC") 
                ? b.price - a.price 
                : a.price - b.price;
        });    
    }

    printProducts(sortedProducts);
}

function printProducts(products) {
    const productListEl = document.getElementById('productList');
    productListEl.innerHTML = '';

    products.forEach(product => {
        const productEl = document.createElement('div');        
        productListEl.appendChild(productEl);
        productEl.innerText = `${product.name} | ${product.type} | ${product.price} | ${product.colors.join(', ')}`;
    });
}

printProducts(PRODUCTS);
