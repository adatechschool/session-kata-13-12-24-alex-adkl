//etape 1

let colors = ["blue", "red", "yellow", "green"]; //couleurs 
let codemakerCombination = ["red", "blue"]; //combinaison à trouver
let codebreakerProposition = []; //proposition du joueur
let attemptsNumber = 0; //nombre de tentatives

function checkColors(codebreakerProposition) { //fonction qui vérifie que les couleurs sont valides
  return codebreakerProposition.every((color) => {
    if (colors.includes(color)) {
      return true;
    } else {
      alert("La couleur n'est pas valide. Choisissez une combinaison de 2 couleurs parmi 'blue', 'red','yellow','green', en les séparant par des espaces.");
      return false;
    }
  });
}

// function checkCombination(codebreakerProposition) {  //fonction qui verifie si la combinaison est juste ou fausse
//   if (
//     codebreakerProposition.length === codemakerCombination.length &&
//     codebreakerProposition.every((color, index) => color === codemakerCombination[index])
//   ) {
//     alert("Bravo, vous avez trouvé !");
//     return true;
//   } else {
//     alert(`Essayez encore ! Il vous reste ${12 - attemptsNumber} tentatives.`);
//     return false;
//   }
// }

//fonction qui vérifie si la combinaison est juste ou fausse + qui renvoie les couleurs bien placées ou non
function checkCombinationV2(codebreakerProposition) {

  let placeOK = 0;                                       //nombre de couleurs bien placées
  let placeWrong = 0;                                   //nombre de couleurs justes mais mal placées

  const combinationCopy = [...codemakerCombination];    // on fait une copie de la réponse pour ne pas la modifier pendant les comparaisons

  codebreakerProposition.forEach((color, index) => {    //boucle pour compter les couleurs bien placées
    if (color === codemakerCombination[index]) {        // on compare chaque couleur avec la réponse au même index
    placeOK++;                                          // si la couleur est bien placée on incrémente placeOK
    combinationCopy[index] = null;                      // on "désactive" cette couleur de la réponse
    codebreakerProposition[index] = null;               // on "désactive" cette couleur de la proposition
    }
  });

  codebreakerProposition.forEach((color) => {                         //boucle pour compter les couleurs justes mais mal placées
    if (color !== null && combinationCopy.includes(color)) {          // si la couleur n'est pas "null" et si elle est présente dans la réponse
      placeWrong++;                                                   // on augmente le nombre de bonnes couleurs mal placées
      combinationCopy[combinationCopy.indexOf(color)] = null;         // on enlève la première occurrence de la couleur de la réponse
    }
  });

  alert(`[${placeOK}, ${placeWrong}] Essayez encore ! Il vous reste ${12 - attemptsNumber} tentatives.`);  // affiche [nombre de couleurs bien placées, nombre de couleurs mal placées]

  
  return placeOK === codemakerCombination.length;       //si toutes les couleurs sont bien placées, la fonction retourne "true"
}

function game() {  //
  while (attemptsNumber < 12) {                           // boucle while : tant que le nbre de tentatives est inférieur à 12, on continue
    //on récupère la combinaison du joueur dans une variable string
    let userInput = prompt("Choisissez une combinaison de 2 couleurs parmi 'blue', 'red','yellow','green', en les séparant par des espaces."); 

    codebreakerProposition = userInput.split(" ");          //on met l'input dans un tableau

    if (!checkColors(codebreakerProposition)) continue;     // si une couleur ne sont pas valide, on recommence la boucle

    attemptsNumber++;                                       // on incrémente le nombre de tentatives uniquement si les couleurs sont valides

    if (checkCombinationV2(codebreakerProposition)) break;  // si la combinaison est juste, on sort de la boucle
  }

  if (attemptsNumber >= 12) {                               //si le nombre de tentatives arrive à 12, on arrête et on donne la réponse
    alert(
      "Plus de tentatives ! La solution était : " +
        codemakerCombination.join(" ")
    );
  }
}

game();

