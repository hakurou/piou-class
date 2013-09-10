piou-class
==========

Description
-----------

Piou-class.js est une petite bibliothèque qui permet d'écrire rapidement une classe JavaScript et de profiter de la joie de la POO et de l'héritage.


Utilisation
-----------

Création d'une simple classe: 
`````javascript
var User = piou.class({
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

Mise en place de l'héritage
`````javascript

var Bob = piou.class({
  extend$: User
});

var u = new User("Bob", "Dylan");
console.log(u.getFirstname());  // Affiche "Bob"
`````

Ecrire une surcharge de méthode:
`````javascript
var Vehicle = piou.class({
  
  // [...] diverses propriétés
  
  klaxon: function()
  {
    console.log("kring kring");
  }
});

var Focus = piou.class({
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
var Camion = piou.class({
  extend$: Vehicle,
  
  klaxon: function()
  {
    console.log("pouet pouet");
    this.parent("klaxon");
  }
});

var v = new Focus();
v.klaxon(); // Affiche "pouet pouet kring kring"
`````

Il est aussi possible de remonter plusieurs parents en mettant "." devant le nom de la méthode à appeler:
`````javascript
this.parent("klaxon");  // Remonte de un parent
this.parent(".klaxon"); // Remonte de deux parents, etc...
`````

L'appel aux méthodes parentes prend en compte un second argument afin de passer des valeurs:
`````javascript
this.parent("addition", [1, 2, 3]); // Appele une méthode "addition" sur la classe parente lui passe 3 arguments numériques
`````

Ecrire des méthodes statiques:
`````javascript
var MaClasse = piou.class({
  // diverses méthodes
  
  static: {
    methode1: function(){},
    
    methode2: function(){}
  }
});

MaClasse.methode1();  // Appel d'une méthode statique
`````

