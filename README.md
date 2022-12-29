# GLIMPSE BACKEND IN NODEJS
- [GLIMPSE BACKEND IN NODEJS](#glimpse-backend-in-nodejs)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation-1)
  - [Routes](#routes)

## Installation
### Prerequisites
- NodeJS
- MariaDB

### Installation
- Clone the repository
- Run `npm install` to install all dependencies
- Create a database in MariaDB
- Copy the `.env.example` file to `.env` and fill in the database credentials

## Routes

1. `localhost:7000/place/show/1`

   ```
   {
    "id": 1,
    "title": "Fonderie Abandonnée",
    "description": "Fonderie Abandonnée dans les alentours de Rennes. Lieu agréable mais protégé et parfois dangereux",
    "history": "Bâtie en 1908, la fonderie de savon était idéalement située, à la fois proche d’une ligne de chemin de fer et d’un lac. Après avoir résisté pendant les deux Guerres Mondiales, la fonderie passe en liquidation judiciaire en 1973 et l’ensemble de ses 120 employés sont licenciés. Elle est rachetée, mais au bout de 15 ans, en 1988, elle ferme définitivement. Depuis 10 ans, la fonderie appartient à L’Etat et est à l’abandon pour attendre sa dépollution (encore longtemps).",
    "latitude": 48.1113,
    "longitude": -1.46031,
    "keyword": "fonderie, usine, nature, structure, rouille, industriel",
    "categoriesId": 1,
    "accessibilitiesId": 2,
    "usersId": 1,
    "created_at": "2022-12-06T10:23:01.000Z",
    "PicturePlaces": [
        {
            "url": "../images/fonderie1.jpg"
        },
        {
            "url": "../images/fonderie2.png"
        }
    ],
    "User": {
        "id": 1,
        "pseudonym": "User1",
        "avatar": ""
    },
    "Category": {
        "label": "Industriel"
    },
    "Accessibility": {
        "label": "Intermédiaire"
    },
    "Comments": [
        {
            "comment": "Super endroit, j’y est croisé un crackhead très sympathique (il m’a prêté sa seringue pour que je puisse prendre mon insuline)",
            "created_at": "2022-12-06T11:03:33.000Z",
            "PictureComments": []
        }
    ]
    }
    ```

2. `localhost:7000/place/listall`
   
   ```
   [
    {
        "id": 1,
        "title": "Fonderie Abandonnée",
        "created_at": "2022-12-06T10:23:01.000Z",
        "PicturePlaces": [
            {
                "url": "../images/fonderie1.jpg"
            },
            {
                "url": "../images/fonderie2.png"
            }
        ],
        "User": {
            "id": 1,
            "pseudonym": "User1"
        },
        "Category": {
            "label": "Industriel"
        },
        "Accessibility": {
            "label": "Intermédiaire"
        }
    },
    {
        "id": 2,
        "title": "Cimetière de bateaux",
        "created_at": "2022-12-06T10:23:01.000Z",
        "PicturePlaces": [
            {
                "url": "../images/cimetiere1.jpg"
            },
            {
                "url": "../images/cimetiere2.png"
            }
        ],
        "User": {
            "id": 2,
            "pseudonym": "User2"
        },
        "Category": {
            "label": "Autre"
        },
        "Accessibility": {
            "label": "Débutant"
        }
    }
    ]
    ```