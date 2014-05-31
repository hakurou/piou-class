piou-class
==========

Description
-----------

Piou-class.js est une petite bibliothèque qui permet d'écrire rapidement une classe JavaScript et de profiter de la joie de la POO et de l'héritage.


Utilisation
-----------

Création d'une simple classe: 
`````javascript
var User = piou.defClass({
  firstname: "",
  lastname: "",
  
  // Le constructeur, qui n'est pas obligatoire
  __construct: function(firstname, lastname)
  {
    this.firstname = firstname;
    this.lastname = lastname;
  },
  
  getFirstname: function()
  {
    return this.firstname;
  },
  
  getLastname: function()
  {
    return this.lastname;
  }
});

var u = new User("John", "Doe");
console.log(u.getFirstname());  // Affiche "John"
`````

Mise en place de l'héritage:
`````javascript

var Bob = piou.defClass({
  extend$: User
});

var u = new User("Bob", "Dylan");
console.log(u.getFirstname());  // Affiche "Bob"
`````

Ecrire une surcharge de méthode:
`````javascript
var Vehicle = piou.defClass({
  
  // [...] diverses propriétés
  
  klaxon: function()
  {
    console.log("kring kring");
  }
});

var Focus = piou.defClass({
  extend$: Vehicle,
  
  klaxon: function()
  {
    console.log("pouet pouet");
  }
});

var v = new Focus();
v.klaxon(); // Affiche "pouet pouet"
`````

Appel à une méthode parente:
`````javascript
var Camion = piou.defClass({
  extend$: Vehicle,
  
  klaxon: function()
  {
    console.log("pouet pouet");
    this.__parent("klaxon");
  }
});

var v = new Camion();
v.klaxon(); // Affiche "pouet pouet kring kring"
`````

Il est aussi possible de remonter plusieurs parents en mettant "." devant le nom de la méthode à appeler:
`````javascript
this.parent("klaxon");  // Remonte de un parent
this.parent(".klaxon"); // Remonte de deux parents, etc...
`````

L'appel aux méthodes parentes prend en compte un second argument afin de passer des valeurs:
`````javascript
this.parent("addition", [1, 2, 3]); // Appelle une méthode "addition" sur la classe parente et lui passe 3 arguments numériques
`````

Ecrire des méthodes statiques:
`````javascript
var MaClasse = piou.defClass({
  // diverses méthodes
  
  static: {
    methode1: function(){},
    
    methode2: function(){}
  }
});

MaClasse.methode1();  // Appel d'une méthode statique
`````

Changelog
-----------

- 2014-05-31 - v1.0.7

Ajout d'un test supplémentaire au retour de résultat de regexp dans la méthode "parent"

- 2013-11-11 - v1.0.6

Erreur qui s'affiche en console lorsque la classe n'a pas d'extend$.

- 2013-10-28 - v1.0.5

Lorsque l'on mettait des attributs complexes dans une classe (objet, tableau, etc...), une référence était créée et partagée entre 
toutes les instances d'une même classe.