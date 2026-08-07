/* ==========================
HOTEL NAUTILUS POOL BAR
Main Script
========================== */

let currentLanguage = "it";

let menuData = [];

let cart = {};

const whatsappNumber = "393423318044";



/* ==========================
   CARICAMENTO MENU
========================== */

fetch("menu.json")
.then(response => {

    if (!response.ok) {
        throw new Error("Errore caricamento menu.json");
    }

    return response.json();

})
.then(data => {

    menuData = data.categories;

    renderMenu();

    updateTexts();

})
.catch(error => {

    console.error(error);

});



/* ==========================
   CAMBIO LINGUA
========================== */

function changeLanguage(language) {

    currentLanguage = language;

    renderMenu();

    updateTexts();

}



/* ==========================
   TESTI STATICI
========================== */

function updateTexts() {


    const nameLabel = document.getElementById("name-label");
    const nameInput = document.getElementById("customer-name");

    const roomLabel = document.getElementById("room-label");
    const roomInput = document.getElementById("room-number");


    if (currentLanguage === "it") {


        nameLabel.innerHTML =
            "Nome (facoltativo)";


        nameInput.placeholder =
            "Inserisci il tuo nome";


        roomLabel.innerHTML =
            "Numero camera";


        roomInput.placeholder =
            "Inserisci il numero della camera";


        document.getElementById("total-label").innerHTML =
            "Totale";


        document.getElementById("order-button").innerHTML =
            "Ordina su WhatsApp";


        document.getElementById("service-note").innerHTML =
            "Servizio piscina disponibile dalle 10:00 alle 19:00.<br>Supplemento servizio piscina +10%.";



    } else {


        nameLabel.innerHTML =
            "Name (optional)";


        nameInput.placeholder =
            "Enter your name";


        roomLabel.innerHTML =
            "Room number";


        roomInput.placeholder =
            "Enter your room number";


        document.getElementById("total-label").innerHTML =
            "Total";


        document.getElementById("order-button").innerHTML =
            "Order via WhatsApp";


        document.getElementById("service-note").innerHTML =
            "Pool service available from 10:00 am to 7:00 pm.<br>Pool service charge +10%.";

    }

}



/* ==========================
   CREAZIONE MENU
========================== */

function renderMenu() {


    const container = document.getElementById("menu-container");


    if (!container) {

        console.error("Elemento menu-container non trovato");

        return;

    }


    container.innerHTML = "";



    menuData.forEach(category => {


        const title =
            currentLanguage === "it"
            ? category.name_it
            : category.name_en;



        container.innerHTML += `

            <h3 class="category-title">
                ${title}
            </h3>

        `;



        category.items.forEach(item => {


            const name =
                currentLanguage === "it"
                ? item.name_it
                : item.name_en;



            const description =
                currentLanguage === "it"
                ? item.description_it
                : item.description_en;



            const quantity =
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


                        <span>
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



/* ==========================
   AGGIUNGI PRODOTTO
========================== */

function addItem(id) {


    if (!cart[id]) {

        cart[id] = 0;

    }


    cart[id]++;


    renderMenu();

}



/* ==========================
   RIMUOVI PRODOTTO
========================== */

function removeItem(id) {


    if (cart[id] > 0) {

        cart[id]--;

    }


    renderMenu();

}



/* ==========================
   TOTALE
========================== */

function updateTotal() {


    let total = 0;


    menuData.forEach(category => {


        category.items.forEach(item => {


            total +=
            (cart[item.id] || 0) * item.price;


        });


    });



    document.getElementById("total").innerHTML =
        total.toFixed(2);

}



/* ==========================
   WHATSAPP
========================== */

function sendOrder() {


    let message =
    currentLanguage === "it"
    ?
    "ORDINE POOL BAR - HOTEL NAUTILUS\n\nBuongiorno, vorrei ordinare dalla piscina.\n\n"
    :
    "POOL BAR ORDER - HOTEL NAUTILUS\n\nGood morning, I would like to order from the pool.\n\n";



    const name =
    document.getElementById("customer-name").value;



    const room =
    document.getElementById("room-number").value;



    if (name) {

        message +=
        (currentLanguage === "it" ? "Nome: " : "Name: ")
        +
        name
        +
        "\n";

    }



    if (room) {

        message +=
        (currentLanguage === "it" ? "Camera: " : "Room: ")
        +
        room
        +
        "\n";

    }



    message +=
    "\n"
    +
    (currentLanguage === "it" ? "Ordine:\n" : "Order:\n");



    let total = 0;



    menuData.forEach(category => {


        category.items.forEach(item => {


            const quantity =
            cart[item.id] || 0;



            if (quantity > 0) {


                const itemName =
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
    "\nTotale: €"
    +
    total.toFixed(2);



    message +=
    "\n\nThank you!";



    const url =
    "https://wa.me/"
    +
    whatsappNumber
    +
    "?text="
    +
    encodeURIComponent(message);



    window.open(url, "_blank");

}