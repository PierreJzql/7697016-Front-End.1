// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


for (let i = 0; i < pieces.length; i++){
    const article = pieces[i];
    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");



    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";

    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";


    // Rattachement de nos balises au DOM
    sectionFiches.appendChild(pieceElement);

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

}

// Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click",function (){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort (function (a, b){
        return a.prix-b.prix;
    });
    console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
console.log(piecesFiltrees);
})


const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function () {
   const piecesDescription = pieces.filter(function (piece) {
       return piece.description;
   });
console.log(piecesDescription);
})


const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click",function (){
    const piecesDesordonnees = Array.from(pieces);
    piecesDesordonnees.sort (function (a, b){
        return b.prix-a.prix;
    });
    console.log(piecesDesordonnees);
});

// Liste des pièces abordables
const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length-1; i >= 0 ;i--){
    if(pieces[i].prix >35){
        noms.splice(i,1);
    }
}

// Création de la liste des pièces abordables
const abordablesElements = document.createElement('ul');
for (let i = 0; i < noms.length;i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}

document.querySelector('.abordables').appendChild(abordablesElements)


// Liste des pièces disponibles
const nomsDisponible = pieces.map(piece => piece.nom);
const prixDisponible = pieces.map(piece => piece.prix);

for (let i =pieces.length-1;i >= 0; i --){
    if(pieces[i].disponibilite === false){
    nomsDisponible.splice(i,1);
    prixDisponible.splice(i,1);
}}

// Liste des pièces disponibles bis
// const nomsDisponible = pieces.map(piece => piece.nom +" - "+ piece.prix + " €.");
// for (let i = pieces.length-1; i >= 0 ;i--){
//     if(pieces[i].disponibilite === false ){
//         nomsDisponible.splice(i,1);
//     }
// }

// Création de la liste des pièces disponibles
const disponibleElements = document.createElement('ul');

for (let i = 0; i < nomsDisponible.length;i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponible[i]} - ${prixDisponible[i]} €`;
    
    disponibleElements.appendChild(nomElement)
}

document.querySelector('.disponible').appendChild(disponibleElements)