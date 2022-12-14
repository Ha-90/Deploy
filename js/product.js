// let listProduct = [
//     {
//         name: "IPhone 5",
//         price: "3000000",
//         image : "/img/1.png", // image/quabong.png
//         id : 1,
//     },
//     {
//         name: "IPhone 6",
//         price: "3000000",
//         image : "/img/2.png",
//         id : 2,
//     },
//     {
//         name: "IPhone 7",
//         price: "3000000",
//         image : "/img/3.png",
//         id : 3,
//     },
//     {
//         name: "IPhone 8",
//         price: "3000000",
//         image : "/img/4.png",
//         id : 4,
//     },
//     {
//         name: "IPhone 9",
//         price: "3000000",
//         image : "/img/5.png",
//         id : 5,
//     },
// ]
// localStorage.setItem("listProducts", JSON.stringify(listProduct));

// vẽ giao diện SP cho trang HTML
let listProduct = JSON.parse(localStorage.getItem("listProducts"));
function renderListProducts(listProduct){ 
    let data = "";
    for (let i = 0; i < listProduct.length; i++) {
        data += `
            <div class="product" >
                <img src="${listProduct[i].image}" alt="">
                <p>${listProduct[i].name}</p>
                <label for="price">${listProduct[i].price}</label><br>
                <div class="fa-icon">
                    <span>
                    <i onclick="addToCart(${listProduct[i].id})" class="fa-solid fa-cart-shopping"></i>
                    <i onclick="addToFavorite(${listProduct[i].id})" class="fa-solid fa-heart"></i>
                    </span>
                </div>
            </div>
        `
        // listProduct[i].id => để thêm sự kiện cho icon vị trí thứ i trong mảng 
        document.getElementById("showProduct").innerHTML = data;
    }
}
renderListProducts(listProduct); // gọi hàm để chạy

// thêm sp vào Cart
function addToCart(id){
    alert("Đã thêm sản phẩm vào giỏ hàng");
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    // lấy list product khi add vào giỏ hàng.
    // key listProductCart là giỏ hàng của mình
    let listProductCart = localStorage.getItem("listProductCart");
    if (listProductCart==null) {
    // trường hợp khi chưa có sp trong giỏ hàng
        listProductCart=[]; // khởi tạo mảng chứa giỏ hàng
    // lấy thông tin sp mà KH mua
        for (let i = 0; i < listProducts.length; i++) { // duyệt trong mảng tìm id click
           
            if (listProducts[i].id==id) { // đối chiếu phần tử i trong mảng listProducts xem có trùng với id click hay k
               
                listProductCart.push(listProducts[i]); // đẩy sp vào giỏ hàng
                listProductCart[listProductCart.length-1].quantity = 1;
                localStorage.setItem("listProductCart", JSON.stringify(listProductCart)); // lưu dạng JSON (dạng chuỗi)
                break;
            }
        }
    } 
    else {
    // trường hợp giỏ hàng đã có SP rồi, add thêm SP
    /* 1. sp đã tồn tại trong giỏ hàng
        2. sp chưa tồn tại trong giỏ hàng
        */
       // let listProductAddCart = JSON.parse(localStorage.getItem("listProductCart"));// giống dòng dưới
        let listProductAddCart = JSON.parse(listProductCart);

        for (let i = 0; i < listProducts.length; i++) {
            flag = false;
            position = 0;
            if (listProducts[i].id==id) {
                for (let j = 0; j < listProductAddCart.length; j++) {
                    if (listProductAddCart[j].id==id) {
                        flag = true;
                        position = j;
                        break;
                    } else {
                        flag = false;
                    }
                }
                console.log(flag);
                if(flag==true) {
                    console.log("SP đã có trong giỏ hàng");
                    console.log(position);
                    listProductAddCart[position].quantity+=1;
                    
                } else {
                    listProductAddCart.push(listProducts[i]);
                    listProductAddCart[listProductAddCart.length-1].quantity = 1;
                }
                
            }
            localStorage.setItem("listProductCart", JSON.stringify(listProductAddCart));
        }
    }
}

// thêm sp vào Favorite **************************************
    function addToFavorite(id){
        alert("Đã thêm vào yêu thích");
        let listProducts = JSON.parse(localStorage.getItem("listProducts"));
        let listFavorite = localStorage.getItem("listFavorite");
        console.log(listFavorite);
        if (listFavorite == null){
            listFavorite = [];
            for(i = 0; i < listProducts.length; i++) {
                if(listProducts[i].id == id) {
                    listFavorite.push(listProducts[i]);
                    localStorage.setItem('listFavorite', JSON.stringify(listFavorite));
                    break;
                }
            }
        } else{
            let listFavoriteAdd = JSON.parse(listFavorite);
            for(i = 0; i < listProducts.length; i++){
                if (listProducts[i].id == id) {
                    flag = false;
                    for(j = 0; j < listFavoriteAdd.length; j++){
                        if(listFavoriteAdd[j].id == id){
                            flag = true;
                            break;
                        } else {
                            flag = false;
                        }
                    }
                    if(flag){
                        alert("SP đã có trong yêu thích");
                    } else {
                        listFavoriteAdd.push(listProducts[i]);
                    }
                }
                localStorage.setItem('listFavorite', JSON.stringify(listFavoriteAdd));
            }
        }
    }

// function Tìm kiếm sp trên ô input (nhập đến đâu gợi ý sp ra đến đấy) 1 ****************************
    function searchProduct() {
        let searchValue = document.getElementById("search").value.toUpperCase();
        let listRender = [];
        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].name.toUpperCase().indexOf(searchValue) != -1) {
                console.log(listProduct[i].name);
                listRender.push(listProduct[i]);
                console.log(listRender);
            }
        }
        renderListProducts(listRender); 
    }

    // function Tìm kiếm sp trên ô input (nhập đến đâu gợi ý sp ra đến đấy) 2*************************

    // let searchInput = document.getElementById("search");
    // let listProduct = JSON.parse(localStorage.getItem("listProducts"));
    // function searchProduct() {
    //     let data = "";
    //     let listProduct = JSON.parse(localStorage.getItem("listProducts"));
    //     for (let i = 0; i < listProduct.length; i++) {
    //         if (listProduct[i].name.toUpperCase().indexOf(searchInput.value.toUpperCase()) != -1) {
    //         data += `
    //         <div class="product" >
    //             <img src="${listProduct[i].image}" alt="">
    //             <p>${listProduct[i].name}</p>
    //             <label for="price">${listProduct[i].price}</label><br>
    //             <div>
    //                 <input type="number" value="1">
    //                 <i onclick="addToCart(${listProduct[i].id})" class="fa-solid fa-cart-shopping"></i>
    //             </div>
    //         </div>
    //         `
    //         // listProduct[i].id => để thêm sự kiện cho icon vị trí thứ i trong mảng 
    //         document.getElementById("showProduct").innerHTML = data;
    //     }
    //     }
    // }




