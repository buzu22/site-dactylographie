
//  crtl + k + c pour commenter sur vscode

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}
//  @throws {Error}

function validerNom(nom) {
    if (nom.length < 2) {
        // on passe de >= a < car il faut que ça corresponde à l'erreur
        throw new Error (`Le nom est trop court`)
    }  
    }

    // faire return pour s'en servir plus tard 
    // le mot-clé return est utilisé pour renvoyer une valeur
    //  depuis une fonction vers l'endroit où cette fonction est appelée.
     
    // si return, pas obligé de mettre else


function validerEmail(email){
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if(!emailRegExp.test(email)){
        // on rajoute ! pour inverser le test
        throw new Error (`L'e-mail n'est pas valide`)
    }
    
}


function afficherMessageErreur (message){

    let spanErreurMessage = document.getElementById("erreurMessage")
        // on récupere d'abord le span erreur message
    if(!spanErreurMessage) {
        // Si ce span n'existe pas encore
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        // Alors on créé le span et on lui met un id
        popup.append(spanErreurMessage)
        // Et on ajoute le span à la popup
    }
    spanErreurMessage.innerText = message
    // Et peu importe si le span a été créé ou récupéré,
    // on met a jour le message dans le span
}
   



function gererFormulaire(scoreEmail) {
    try{
    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    validerNom(nom)

    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    validerEmail(email)
    afficherMessageErreur ("") 
    afficherEmail (nom, email, scoreEmail)  


    } catch(erreur) {
        afficherMessageErreur (erreur.message)   
    }      
}



/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
        // event.target.value pour savoir sur quel btn radio on a cliqué

                listeProposition = listeMots

            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

    let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault ()
     // event.preventDefault () empêcher le comportement par défaut 
            // d'un événement qui se produit dans le navigateur. Ici le 
            // rechargement de la page lorsqu'on clique sur le bouton submit

            let scoreEmail = `${score} / ${i}`
            gererFormulaire(scoreEmail)

  
    
    afficherResultat(score, i)

})

}
