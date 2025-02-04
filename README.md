# Arto-Facts

Arto-Facts is a web application that allows users to explore artworks from renowned institutions, including the Art Institute of Chicago and the Cleveland Museum of Art. Users can filter, view, and save artworks into temporary exhibitions, which are stored locally in the browser.

## Live URL hosted on Netlify
 You can view a live hosted version of this app at the address: 
 https://arto-facts.netlify.app/

## Notes - PLEASE READ!!!!

The Firebase features, such as account creation and saving art works to user profiles and subscribing to public collections available in the backend are not available to use in this front end release of Arto-Facts. They will be included in the next release however coming in March 2025. Artworks however can still be saved on temporary basis using your local storage.

## Features

- Explore artworks from:
  - Cleveland Museum of Art
  - Art Institute of Chicago
- Filter artworks by various parameters (e.g., type, artist, place of origin).
- View detailed information about individual artworks.
- Create temporary exhibitions in your browser.
- Save artworks to exhibitions for future viewing.

## Technologies Used

- **Frontend Framework**: React.js
- **State Management**: Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Icons**: HeroIcons, React Icons
- **HTTP Client**: Axios
- **Build Tool**: Vite

## API

The backend API serves data about artworks, their details, and metadata like departments. It is hosted at:  
`https://be-arto-facts.onrender.com/api/`

### API Endpoints

#### 1. **Art Institute of Chicago**
- **Get artworks:**
  
  ```http
  GET /api/collections/ArtInstitueChicago
  ```

  **Params:**
  ```json
  {
    "q": "String",
    "page": "Number",
    "limit": "Number",
    "placeOfOrigin": "String",
    "artistName": "String",
    "artTypeTitle": "String"
  }
  ```

  **Response:**
  ```json
  {
    "ArtInstituteOfChicago": {
      "pagination": {
        "total": 30348,
        "limit": 12,
        "offset": 0,
        "total_pages": 2529,
        "current_page": 1
      },
      "artCollection": [
        {
          "classification": "Painting",
          "medium": ["oil on canvas"],
          "id": 28560,
          "title": "The Bedroom",
          "artist": "Vincent van Gogh",
          "date": 1889,
          "department": "Painting and Sculpture of Europe",
          "img": "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/600,/0/default.jpg",
          "smallImg": "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg",
          "country": "Saint-Rémy-de-Provence",
          "creditedTo": "Helen Birch Bartlett Memorial Collection",
          "alt": "Painting of bedroom, blue walls, green window, tan bed, red bedding."
        }
      ]
    }
  }
  ```

- **Get artwork by ID:**
  
  ```http
  GET /api/collections/ArtInstitueChicago/:id
  ```

  **Response:**
  ```json
  {
    "classification": "Drawing and Watercolor",
    "medium": [
      "drawings (visual works)",
      "paper (fiber product)",
      "watercolor",
      "water-base paint",
      "paint",
      "graphite",
      "prints and drawing"
    ],
    "id": 4,
    "title": "Priest and Boy",
    "artist": "Lawrence Carmichael Earle",
    "date": 1880,
    "department": "Prints and Drawings",
    "img": "https://www.artic.edu/iiif/2/1753b638-d4fb-8e45-3db9-92dde7f053da/full/600,/0/default.jpg",
    "smallImg": "https://www.artic.edu/iiif/2/1753b638-d4fb-8e45-3db9-92dde7f053da/full/843,/0/default.jpg",
    "country": "United States",
    "creditedTo": "The Charles Deering Collection",
    "alt": "A work made of watercolor over graphite on cream wove paper."
  }
  ```

#### 2. **Cleveland Museum of Art**
- **Get artworks:**
  
  ```http
  GET /api/collections/ClevelandArtMuseum
  ```

  **Params:**
  ```json
  {
    "q": "String",
    "limit": "Number",
    "department": "String",
    "culture": "String",
    "type": "String",
    "created_after": "Number",
    "created_before": "Number",
    "title": "String",
    "artists": "String",
    "sortBy": "String"
  }
  ```

  **Response:**
  ```json
  {
    "clevelandArtPieces": [
      {
        "id": 94979,
        "artist": "John Singleton Copley (American, 1738–1815)",
        "description": "Hurd was a prominent silversmith and engraver in Boston.",
        "title": "Nathaniel Hurd",
        "date": "c. 1765",
        "type": "Painting",
        "department": "American Painting and Sculpture",
        "country": "America",
        "img": "https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg",
        "creditedTo": "Gift of the John Huntington Art and Polytechnic Trust"
      }
    ]
  }
  ```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/arto-facts.git
   cd arto-facts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Usage

1. **Explore Artworks**: Use the dropdown menu in the navigation bar to select and explore collections.
2. **Filter Results**: Use the filtering options to refine your search.
3. **View Details**: Click on an artwork to view its details.
4. **Create Temporary Exhibitions**: You create "Temporary Exhibitions" on the single artwork page and save the artwork to that exhibition.
5. **Temporary Exhibitions**: Click on the Temporary Exhibitions button in the navigation bar to view all created temporary exhibitions and view the artworks associated with them, you can edit exhbitions, remove artworks froms them and delete entire exhibitions in this page too.

## Acknowledgements

- Data sourced from the Cleveland Museum of Art and the Art Institute of Chicago.
- UI powered by Tailwind CSS and HeroIcons.



