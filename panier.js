let panier = JSON.parse(localStorage.getItem("panier")) || [];

const contenuPanier = document.getElementById("contenu-panier");
const totalPanier = document.getElementById("total-panier");


// Afficher le panier
function afficherPanier() {

    if (!contenuPanier) return;

    contenuPanier.innerHTML = "";

    let total = 0;

    panier.forEach((produit, index) => {

      total += produit.prix * (produit.quantite || 1);


        contenuPanier.innerHTML += `
            <div class="panier-produit">

                <img src="${produit.image}" alt="${produit.nom}">

               <div class="info-produit">
    <h3>${produit.nom}</h3>

    <p>${produit.prix} FCFA</p>

    <div class="quantite">
        <button onclick="changerQuantite(${index}, -1)">-</button>

        <span>${produit.quantite || 1}</span>

        <button onclick="changerQuantite(${index}, 1)">+</button>
    </div>

    
</div>

                <button onclick="supprimerProduit(${index})">
                    Supprimer
                </button>

            </div>
        `;
    });


    if (totalPanier) {
        totalPanier.innerHTML = "Total : " + total + " FCFA";
    }
}


// Supprimer un produit
function supprimerProduit(index) {

    panier.splice(index, 1);

    localStorage.setItem("panier", JSON.stringify(panier));

    afficherPanier();
}


// Ajouter un produit au panier
function ajouterAuPanier(id) {

    let produit = produits.find(p => p.id === id);

    if (produit) {

        panier.push(produit);

        localStorage.setItem(
            "panier",
            JSON.stringify(panier)
        );

        alert("Produit ajouté au panier !");
    }
}


// Lancement
afficherPanier();
function changerQuantite(index, changement) {

    panier[index].quantite = (panier[index].quantite || 1) + changement;

    if (panier[index].quantite < 1) {
        panier[index].quantite = 1;
    }

    localStorage.setItem("panier", JSON.stringify(panier));

    afficherPanier();
}
// ===============================
// COMMANDE WHATSAPP
// ===============================

function commanderWhatsApp(){

    let nom = document.getElementById("nom")?.value;
    let quartier = document.getElementById("quartier")?.value;
    let telephone = document.getElementById("telephone")?.value;


    if(!nom || !quartier || !telephone){

        alert("Veuillez remplir vos informations client");
        return;

    }


    if(panier.length === 0){

        alert("Votre panier est vide");
        return;

    }


    let message = "Bonjour Fatou Shop 👋%0A%0A";
    
    message += "Nouvelle commande :%0A%0";


    let total = 0;


    panier.forEach((produit)=>{

        let quantite = produit.quantite || 1;

        let prix = produit.prix * quantite;

        total += prix;


        message += "🛍️ " + produit.nom;
        message += " x" + quantite;
        message += " - " + prix + " FCFA%0A";

    });


    message += "%0A💰 Total : " + total + " FCFA%0A%0A";


    message += "👤 Nom : " + nom + "%0A";
    message += "📍 Quartier : " + quartier + "%0A";
    message += "📞 Téléphone : " + telephone;


    // Remplacez par votre numéro WhatsApp Fatou Shop
    let numero = "2250564554171";


    let url = "https://wa.me/" + numero + "?text=" + message;


    window.open(url, "_blank");

}
