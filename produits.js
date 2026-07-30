const produits = [];

for (let i = 1; i <= 45; i++) {

    produits.push({
        id: i,
        nom: "Drap 2 places " + i,
        prix: 4000,
        image: "drap2place (" + i + ").jpg",
        categorie: "Draps",
        description: "Drap 2 places confortable et élégant, parfait pour votre chambre."
    });

}


// Affichage des produits
const listeProduits = document.getElementById("liste-produits");

if (listeProduits) {

    produits.forEach(produit => {

        listeProduits.innerHTML += `

        <div class="produit">

            <img src="${produit.image}" alt="${produit.nom}">

            <h3>${produit.nom}</h3>

            <p>${produit.prix} FCFA</p>

            <button onclick="voirProduit(${produit.id})">
                Voir le produit
            </button>

            <button onclick="ajouterAuPanier(${produit.id})">
                Ajouter au panier
            </button>

        </div>

        `;

    });

}


// Page détail produit
function voirProduit(id) {

    localStorage.setItem("produitSelectionne", id);

    window.location.href = "produit.html";

}


// Ajouter au panier
function ajouterAuPanier(id) {

    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    let produit = produits.find(p => p.id === id);

    if (produit) {

        produit.quantite = 1;

        panier.push(produit);

        localStorage.setItem(
            "panier",
            JSON.stringify(panier)
        );

        alert("Produit ajouté au panier !");
    }

}
