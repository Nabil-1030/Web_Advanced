# Pokémon API Webapp

Een interactieve single-page webapplicatie gemaakt met **React** en **Vite**. Deze app maakt gebruik van de [PokéAPI](https://pokeapi.co/) om gegevens van Pokémon op te halen. Gebruikers kunnen Pokémon zoeken, filteren, sorteren en markeren als favoriet.

---

## Functionaliteiten

- Zoeken op naam  
- Filteren op type (bijv. vuur, water, gras)  
- Sorteren op type, HP en snelheid  
- Weergave van Pokémon in overzichtelijke kaarten  
- Favorieten markeren en bewaren via `localStorage`  
- Responsive weergave voor verschillende schermformaten  
- Single Page Applicatie (SPA) zonder reloads  

---

##  Gebruikte Technologieën

- **React** (via [Vite](https://vitejs.dev/))  
- **CSS** (eigen stylesheet)  
- **PokéAPI** - [https://pokeapi.co/](https://pokeapi.co/)  
- **Git & GitHub** - versiebeheer  

---

## PokéAPI

- **URL**: [https://pokeapi.co/](https://pokeapi.co/)  
- **Doel**: Ophalen van Pokémon-gegevens zoals naam, type, stats en afbeeldingen.  

---

## Technische vereisten

| Vereiste                  | Beschrijving                                                        | Bestand/Lijn                     |
|--------------------------|---------------------------------------------------------------------|----------------------------------|
| API-gebruik              | Ophalen van data via PokéAPI                                       | `App.jsx` (± regel 8)            |
| Data filteren            | Filteren op type en zoekterm                                       | `App.jsx` (± regel 40–70)        |
| Sorteren van data        | Sorteren op type, HP en snelheid                                   | `App.jsx` (± regel 30–40, 80–100)|
| Single Page Applicatie   | Alles op 1 pagina, geen reloads                                    | `App.jsx`                        |
| Gebruik van LocalStorage | Bewaren van favorieten over sessies heen                           | `App.jsx` (± regel 12–30)        |
| DOM-manipulatie          | Selecteren, aanpassen en events koppelen aan elementen             | `App.jsx`                        |
| Modern JavaScript        | Gebruik van `const`, arrow functions, `map`, `filter`, `sort`, etc | `App.jsx`                        |

---

##  Installatiehandleiding

1. **Clone de repository**

```bash
git clone https://github.com/Nabil-1030/Web_Advanced.git
cd pokemon_api_project
