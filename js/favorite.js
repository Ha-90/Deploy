//Hiển thị Favorite
    function viewFavorite(){
        let listFavorite = JSON.parse(localStorage.getItem("listFavorite"));
        console.log(listFavorite);
        let data = "";
        for (i = 0; i < listFavorite.length; i++){
            data += `
                <div class="product" >
                    <img src="${listFavorite[i].image}" alt="">
                    <p>${listFavorite[i].name}</p>
                    <label for="price">${listFavorite[i].price}</label><br>
                    <div>
                       
                        <i onclick="addToCart(${i})" class="fa-solid fa-cart-shopping"></i>
                        <i onclick="removeFavorite(${i})" class="fa-solid fa-trash"></i>
                    </div>
                </div>
                `
            document.getElementById("showProduct").innerHTML = data;
        }
    }
    viewFavorite();

// Remove sp khỏi Favorite
    function removeFavorite(i){
        let listFavorite = JSON.parse(localStorage.getItem("listFavorite"));
        for(i = 0; i < listFavorite.length; i++){
            listFavorite.splice(i, 1);
            localStorage.setItem('listFavorite', JSON.stringify(listFavorite));
            viewFavorite();
            removeFavorite(i);
        }
    }
// thêm sp vào Cart
function addToCart(i){
    alert("Đã thêm sản phẩm vào giỏ hàng");
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let listProductCart = localStorage.getItem("listProductCart");
    if (listProductCart==null) {
        listProductCart=[]; // khởi tạo mảng chứa giỏ hàng
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
    JSON.parse(localStorage.getItem("listProductCart"));// giống dòng dưới
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
