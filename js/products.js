fetch('products.json')
    .then(response => response.json())
    .then(products => {
        localStorage.setItem("products", JSON.stringify(students));
        console.log(products);
    })
    .catch(error => {
        console.log("Failed to load products data: ", error);
    });