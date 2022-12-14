// Hiển thị giỏ hàng
    // function viewCart(){
    //     let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    //     console.log(listProductCart);
    //     let data = "";
    //     for (i = 0; i < listProductCart.length; i++){
    //         data += `
    //             <div class="product" >
    //                 <img src="${listProductCart[i].image}" alt="">
    //                 <p>${listProductCart[i].name}</p>
    //                 <label for="price">${listProductCart[i].price}</label><br>
    //                 <div>
    //                     <input type="number" value="1">
    //                     <i onclick="addToCart(${listProductCart[i].id})" class="fa-solid fa-cart-shopping"></i>
    //                     <i class="fa-solid fa-trash"></i>
    //                     <i class="fa-solid fa-wrench"></i>
    //                 </div>
    //             </div>
    //             `
    //         document.getElementById("showProduct").innerHTML = data;
    //     }
    // }
    // viewCart();

// Hiển thị thông tin sp và số tiền trong giỏ hàng Cart
    function payCart(){
        let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
        let data = "";
        for (i = 0; i < listProductCart.length; i++){
            data += `<tr>
                        <td><img src="${listProductCart[i].image}"></td>
                        <td>${listProductCart[i].name}</td>
                        <td>${listProductCart[i].price}</td>
                        <td><input id="changeValue" onchange="changeQuantity(${i})" type="number" value="${listProductCart[i].quantity}"></td>
                        <td><button onclick="removeProduct(${i})">Remove</button></td>
                        <td>${listProductCart[i].price*listProductCart[i].quantity}</td>
                    </tr>`
        }
        document.getElementById("money").innerHTML = data;
    }
    payCart();

// Tính tổng số tiền trong Cart
    function totalMoney(){
        let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
        let money = 0;
        for (i = 0; i < listProductCart.length; i++){
            money += listProductCart[i].price * listProductCart[i].quantity;
        } 
        document.getElementById("total-money").innerHTML = money;
    }
    totalMoney();
    
    // Remove sản phẩm khỏi cart
    function removeProduct(i){
        let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
        console.log(listProductCart);
        listProductCart.splice(i, 1);
        localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
        payCart();
        totalMoney();

    }

// thay đổi số lượng sp trong cart
function changeQuantity(i){
    // let value = document.getElementById("changeValue").value;
    let value = document.querySelectorAll("#changeValue")[i].value;
    console.log(value);

    let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    if (value < 0) {
        alert("Không thể thực hiện hành động")
        return false;
    } else if (value == 0){
        let confirm1 = confirm("Bạn thực sự muốn xóa sp?");
        if (confirm1){
            listProductCart.splice(i, 1);           
        }
    } else{
    listProductCart[i].quantity = value;
    }
    localStorage.setItem("listProductCart", JSON.stringify(listProductCart));
    payCart();
    totalMoney();
}