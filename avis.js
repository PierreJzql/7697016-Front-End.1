export function ajoutListenersAvis() {



    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {

      piecesElements[i].addEventListener("click", async function (event) {
      

            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();


            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
    
        
        
         // Ajout de la réponse des avis
        const pieceElement=event.target.parentElement;
        afficherAvis(pieceElement,avis)
      });
      
    }
    
}

export function afficherAvis(pieceElement, avis){
    const avisElement = document.createElement("p");
        for (let i=0; i< avis.length;i++){

            avisElement.innerHTML += ` <br><b><i><u>${avis[i].utilisateur}:</u></i></b>
            ${avis[i].commentaire} <br>
            Note : ${avis[i].nbEtoiles?? "Pas d'évalution"} <br>  `;
           
        }
        
        pieceElement.appendChild(avisElement);

}



export function ajoutListenerEnvoyerAvis(){
    // Ajout de la fonction envoyer un avis
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function(event){
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur: event.target.querySelector("[name=utilisateur").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: parseInt(event.target.querySelector("[name=notation]").value),
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
}
