/* ==========================
   HOTEL NAUTILUS POOL BAR
   Main Script
========================== */


let currentLanguage = "it";

let menuData = [];

let cart = {};

const whatsappNumber = "393423318044";



/* CARICAMENTO MENU */

fetch("menu.json")

    .then(response => response.json())

    .then(data => {

        menuData = data.categories;

        renderMenu();

    });



/* CAMBIO LINGUA */

function changeLanguage(language) {

    currentLanguage = language;

    renderMenu();

    updateTexts();

}



/* TESTI STATICI */

function updateTexts() {


    if (currentLanguage === "it") {


        document.getElementById("name-label").innerHTML =
            "Nome (facoltativo)";


        document.getElementById("customer-name").placeholder =
            "Inserisci il tuo nome";


        document.getElementById("total-label").innerHTML =
            "Totale";


        document.getElementById("order-button").innerHTML =
            "Ordina su WhatsApp";


        document.getElementById("service-note").innerHTML =
            "Servizio piscina disponibile dalle 10:00 alle 19:00.<br>Supplemento servizio piscina +10%.";


    } else {


        document.getElementById("name-label").innerHTML =
            "Name (optional)";


        document.getElementById("customer-name").placeholder =
            "Enter your name";


        document.getElementById("total-label").innerHTML =
            "Total";


        document.getElementById("order-button").innerHTML =
            "Order via WhatsApp";


        document.getElementById("service-note").innerHTML =
            "Pool service available from 10:00 am to 7:00 pm.<br>Pool service charge +10%.";

    }

}



/* CREAZIONE MENU */

function renderMenu() {


    const container =
        document.getElementById("menu-container");


    container.innerHTML = "";



    menuData.forEach(category => {


        let title =
            currentLanguage === "it"
            ?
            category.name_it
            :
            category.name_en;



        container.innerHTML += `

            <h3 class="category-title">
                ${title}
            </h3>

        `;



        category.items.forEach(item => {


            let name =
                currentLanguage === "it"
                ?
                item.name_it
                :
                item.name_en;



            let description =
                currentLanguage === "it"
                ?
                item.description_it
                :
                item.description_en;



            let quantity =
                cart[item.id] || 0;



            container.innerHTML += `

            <div class="product-card">


                <div class="product-name">

                    ${name}

                </div>


                <div class="product-description">

                    ${description}

                </div>



                <div class="product-bottom">


                    <div class="price">

                        €${item.price.toFixed(2)}

                    </div>



                    <div class="quantity">


                        <button onclick="removeItem(${item.id})">
                            -
                        </button>


                        <span id="qty-${item.id}">
                            ${quantity}
                        </span>


                        <button onclick="addItem(${item.id})">
                            +
                        </button>


                    </div>


                </div>


            </div>

            `;


        });


    });


    updateTotal();

}



/* AGGIUNGI */

function addItem(id) {


    if (!cart[id]) {

        cart[id] = 0;

    }


    cart[id]++;


    renderMenu();

}



/* RIMUOVI */

function removeItem(id) {


    if (cart[id] > 0) {

        cart[id]--;

    }


    renderMenu();

}



/* TOTALE */

function updateTotal() {


    let total = 0;


    menuData.forEach(category => {


        category.items.forEach(item => {


            let quantity =
                cart[item.id] || 0;


            total +=
                quantity * item.price;


        });


    });



    document.getElementById("total").innerHTML =
        total.toFixed(2);


}



/* WHATSAPP */

function sendOrder() {


    let message = "";


    if (currentLanguage === "it") {


        message +=
        "ORDINE POOL BAR - HOTEL NAUTILUS\n\n";


        message +=
        "Buongiorno, vorrei ordinare dalla piscina.\n\n";


    } else {


        message +=
        "POOL BAR ORDER - HOTEL NAUTILUS\n\n";


        message +=
        "Good morning, I would like to order from the pool.\n\n";

    }



    let name =
        document.getElementById("customer-name").value;



    if (name) {


        message +=
        (currentLanguage === "it"
        ? "Nome: "
        : "Name: ")
        +
        name
        +
        "\n\n";


    }



    message +=
    (currentLanguage === "it"
    ? "Ordine:\n"
    : "Order:\n");



    let total = 0;



    menuData.forEach(category => {


        category.items.forEach(item => {


            let quantity =
                cart[item.id] || 0;



            if (quantity > 0) {


                let itemName =
                    currentLanguage === "it"
                    ?
                    item.name_it
                    :
                    item.name_en;



                message +=
                "• "
                +
                quantity
                +
                " x "
                +
                itemName
                +
                "\n";



                total +=
                quantity * item.price;


            }


        });


    });



    if (total === 0) {


        alert(
            currentLanguage === "it"
            ?
            "Seleziona almeno un prodotto."
            :
            "Please select at least one product."
        );


        return;

    }



    message +=
    "\nTotal: €"
    +
    total.toFixed(2);



    message +=
    "\n\nThank you!";



    let url =
    "https://wa.me/"
    +
    whatsappNumber
    +
    "?text="
    +
    encodeURIComponent(message);



    window.open(url, "_blank");


}