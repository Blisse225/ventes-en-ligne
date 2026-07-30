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