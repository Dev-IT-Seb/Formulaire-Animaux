//
//---------- JS FORMULAIRES + AFFICHAGE DATA JSON - AJAX ---------//
//
ElementsjSON = [];
//
//----------------------------------------------------------------//
//---------- VERIF CHARGEMENT DU FICHIER ---------//
fetch("data.json")
  .then(function(response) {
    //-- Si nok, j'affiche message erreur
    if (!response.ok) {
      throw new Error("Erreur : le fichier JSON n'est pas chargé 😞");
    }
    //-- Chargement du fichier Json Ok !
    console.log("Chargement du fichier JSON OK !");
    return response.json();
  })
  //-----------------------------------------------//
  .then(function(FichierJsonTableau) {
    //-- Données elements Tableau JSON
    ElementsjSON = FichierJsonTableau;
    //-- Lancer Function - Traitement
    Affichage();
  })
//---------------------------------------------------------------------------//
//------------------------------ AFFICHAGE ----------------------------------//
//---------------------------------------------------------------------------//
  //---- AFFICHAGE DES DONNEES JSON + ACTUALISATION DES MODIFICATIONS ----//
  function Affichage() {
    //
    //---- SELECTION BALISE HTML - UL LISTE + VARIABLE
    let liste = document.getElementById('liste-animaux'); 

    //---- VIDE LA LISTE A ZERO
    liste.innerHTML = "";

    //---- BOUCLE POUR PARCOURIR LES DONNEES DANS LE TABLEAU JSON
    for (let i = 0; i < ElementsjSON.length; i++) {

      //---- AJOUTE LES DONNEES DU JSON UN PAR UN DANS UNE VARIABLE 'ANIMAUX'
      let animaux = ElementsjSON[i];

      //----- CREATION BALISE LI HTML POUR INSERER LES DONNEES
      let li = document.createElement('li');

      //----- FILTRER POUR RECUPERER LES DONNEES + ENGLOBER LE TOTAL DANS UNE VARIABLE
      let DataJson = animaux.nom;
      //---- FUNCTION MODIFIER ET SUPPRIMER
      DataJson += " <button onclick='modifier(" + animaux.id + ")'>Modifier</button>";
      DataJson += " <button onclick='supprimer(" + animaux.id + ")'>Supprimer</button>";

      //----- ENCAPSULATION DES DONNEES 'DataJson'
      li.innerHTML = DataJson;

      //----- AFFICHAGE DES DONNEES DANS LES BALISES LI 
      liste.appendChild(li);
    }
  }      
//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-------- MODIFICATION (RELATION AVEC FUNCTION MODIFIER) ET AJOUT ANIMAL ---//
//---------------------------------------------------------------------------//
//------ POINTER SUR NOTRE FORMULAIRE + VARIABLE POUR L'EVENEMENT
let formulaire = document.getElementById("formulaire-animal"); 
//
//--- EVENEMENT ECOUTE BOUTON 'SUBMIT' -> ID + INPUT TYPE
formulaire.addEventListener('submit', function(event) {

  //-- Block l'envoi du formulaire
  event.preventDefault();

  //-- ParseInt : Change le texte en nombre
  let inputId = parseInt(document.getElementById('animaux').value);

  //--- VALEUR CHAMPS REMPLISSAGE
  let nom = document.getElementById('animalNom').value;

  //-- VERIFICATION SI LE CHAMPS EST VIDE
  if (nom === "") {
    alert("Veuillez entrer un nom !");
    return;
  }
  //
  //-- SI L'ID EXISTE DANS LE JSON, LE CHANGEMENT DE NOM S'EFFECTUE EN TEMPORAIRE
  if (inputId) {
    for (let i = 0; i < ElementsjSON.length; i++) {
      if (ElementsjSON[i].id === inputId) {

        ElementsjSON[i].nom = nom;
        break;
      }
    }
  }
  //-- SINON ON AJOUTE L'ELEMENT - DateNOW = Renvoie un nombre en milliseconde "number"
  else {
    let nouvelAninmal = {
      id: Date.now(), 
      nom: nom //--- NOM DE LA VALEUR DANS LIBELLE JSON
    };
    //--- ENVOIE DANS LE FICHIER JSON EN TEMPORAIRE
    ElementsjSON.push(nouvelAninmal);
  }
  //
  //-- UTILISATION FUNCTION POUR AFFICHAGE
  Affichage();
});
//
//---------------------------------------------------------------------------//
          //-----------------------------------------------//
          //------------ MODIFICATION ANIMAL --------------//
//---------------------------------------------------------------------------//
//--- FUNCTION 'MODIFIER' CREER DANS JS FUNCTION 'AFFICHAGE' = MODIFIE ELEMENTS LI
function modifier(id) {
  
  for (let i = 0; i < ElementsjSON.length; i++) {

    //-- SI LA VALEUR EXISTE DANS LE JSON, JE RECUPERE LES INFOS
    if (ElementsjSON[i].id === id) {

      //-- AFFICHAGE DU CLIC DANS LE CHAMPS DE SAISIE
      document.getElementById('animalNom').value = ElementsjSON[i].nom;
      document.getElementById('animaux').value = ElementsjSON[i].id;

      //-- LA BOUCLE S'ARRETE APRES D'AVOIR TROUVE L'ID
      break;
    }
  }
}
//---------------------------------------------------------------------------//
            //-----------------------------------------------//
            //------------ SUPPRESSION ANIMAL --------------//
//---------------------------------------------------------------------------//
//--- FUNCTION SUPPRIMER UN ELEMENT -> LI
function supprimer(id) {

  //--- MAJ D'UN NOUVEAU TABLEAU
  let NouveauTableau = [];

  //-- Parcourir le tableau pour trouver l'element
  for (let i = 0; i < ElementsjSON.length; i++) {

    //--- Si l'ID EST DIFFERENT, ON LE CONSERVE SINON ON SUPPRIME
    if (ElementsjSON[i].id !== id) {
      NouveauTableau.push(ElementsjSON[i]);
    }
  }
  //-- Mettre à jour le fichier JSON = 'temporaire'
  ElementsjSON = NouveauTableau;

  //-- FUNCTION QUI MET A JOUR L'AFFICHAGE APRES MODIFICATION
  Affichage();
}
//---------------------------------------------------------------------------//