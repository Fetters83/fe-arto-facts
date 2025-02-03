# fe-arto-facts


Arto-Facts is a web application that allows users to explore artworks from renowned institutions of the Art Institute of Chicago and Cleveland Museum of Art. Users can filter, view, and save artworks into temporary exhibitions, which are stored locally in the browser.

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

1. **Art Institute of Chicago**
   - Get artworks:
     ```
     GET /api/collections/ArtInstitueChicago
     Params: {
       q: String
       page: Number,
       limit: Number,
       placeOfOrigin: String,
       artistName: String,
       artTypeTitle: String
     }

     Response: "ArtInstituteOfChicago": {
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
                "medium": [
                    "oil on canvas",
                ],
                "id": 28560,
                "title": "The Bedroom",
                "artist": "Vincent van Gogh",
                "date": 1889,
                "department": "Painting and Sculpture of Europe",
                "img": "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/600,/0/default.jpg",
                "smallImg": "https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg",
                "country": "Saint-Rémy-de-Provence",
                "creditedTo": "Helen Birch Bartlett Memorial Collection",
                "alt": "Painting of bedroom, blue walls, green window, tan bed, red bedding.",
                "description": "<p>Vincent van Gogh so highly esteemed his bedroom painting that he made three distinct versions: the first, now in the collection of the Van Gogh Museum, Amsterdam;
            },
            {
                "classification": "Painting",
                "medium": [
                    "oil on canvas",
                ],
                "id": 20684,
                "title": "Paris Street; Rainy Day",
                "artist": "Gustave Caillebotte",
                "date": 1877,
                "department": "Painting and Sculpture of Europe",
                "img": "https://www.artic.edu/iiif/2/f8fd76e9-c396-5678-36ed-6a348c904d27/full/600,/0/default.jpg",
                "smallImg": "https://www.artic.edu/iiif/2/f8fd76e9-c396-5678-36ed-6a348c904d27/full/843,/0/default.jpg",
                "country": "Paris",
                "creditedTo": "Charles H. and Mary F. S. Worcester Collection",
                "alt": "Life-size painting of an urban scene in Paris.
            },]}
   
   - Get artwork by ID:
  
     GET /api/collections/ArtInstitueChicago/:id

     response: {
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
    "alt": "A work made of watercolor over graphite on cream wove paper.",
    "description": "No description available"
}

  - Get artwork Types:

     GET /api/ArtInstituteChicago/artworkTypes

   Response: {
    "ArtInstituteOfChicagoArtworkTypes": [
        "Painting",
        "Vessel",
        "Basketry",
        ........
        ]}

    - Get artwork places of origin

    GET /api/ArtInstituteChicago/places

    Response: {
    "ArtInstituteOfChicagoPlaces": [
        "Osaka",
        "Château du Bréau",
        "Brittany",
        "Greenwich",
        .........
        ]}

2. **Cleveland Museum of Art**
   - Get artworks:
   
     GET /api/collections/ClevelandArtMuseum
     Params: {
       q:String,
       limit: Number,
       department: String,
       culture:String,
       type: String,
       created_after: Number,
       created_before: Number,
       title: String,
       artists: String,
       sortBy:String
     }

     Response: {
    "clevelandArtPieces": [
        {
            "id": 94979,
            "artist": "John Singleton Copley (American, 1738–1815)",
            "description": "Hurd was a prominent silversmith and engraver in Boston.",
            "title": "Nathaniel Hurd",
            "date": "c. 1765",
            "earliest_date": 1760,
            "latest_date": 1770,
            "type": "Painting",
            "department": "American Painting and Sculpture",
            "country": "America",
            "img": "https://openaccess-cdn.clevelandart.org/1915.534/1915.534_web.jpg",
            "linkToWebSiteImg": "https://clevelandart.org/art/1915.534",
            "creditedTo": "Gift of the John Huntington Art and Polytechnic Trust",
            "alt": "artwork piece classifed as Painting from the American Painting and Sculpture department by John Singleton Copley (American, 1738–1815)"
        },
        {
            "id": 102578,
            "artist": "William Merritt Chase (American, 1849–1916)",
            "description": "Dora Wheeler became Chase's first student when he returned from overseas study in Munich and set up a teaching studio in New York.",
            "title": "Portrait of Dora Wheeler",
            "date": "1882–83",
            "earliest_date": 1882,
            "latest_date": 1883,
            "type": "Painting",
            "department": "American Painting and Sculpture",
            "country": "America",
            "img": "https://openaccess-cdn.clevelandart.org/1921.1239/1921.1239_web.jpg",
            "linkToWebSiteImg": "https://clevelandart.org/art/1921.1239",
            "creditedTo": "Gift of Mrs. Boudinot Keith in memory of  Mr. and Mrs. J. H. Wade",
            "alt": "artwork piece classifed as Painting from the American Painting and Sculpture department by William Merritt Chase (American, 1849–1916)"
        }]}
   
   - Get artwork by ID:
     
     GET /api/collections/ClevelandArtMuseum/:id

     Response: {
    "clevelandArtPiece": {
        "id": 132015,
        "artist": "Du Jin (Chinese, 1446-c. 1519)",
        "description": "Lin Bu (967–1028), a Northern Song (960–1127) poet",
        "title": "The Poet Lin Bu Wandering in the Moonlight",
        "date": "late 1400s",
        "earliest_date": 1460,
        "latest_date": 1492,
        "type": "Painting",
        "department": "Chinese Art",
        "country": "China, Ming dynasty (1368–1644)",
        "img": "https://openaccess-cdn.clevelandart.org/1954.582/1954.582_web.jpg",
        "linkToWebSiteImg": "https://clevelandart.org/art/1954.582",
        "creditedTo": "John L. Severance Fund",
        "alt": "artwork piece classifed as Painting from the Chinese Art department by Du Jin (Chinese, 1446-c. 1519)"
    }
}
   
 

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/arto-facts.git
   cd arto-facts

2. Install dependencies:
    npm install
3. Start the development server:
    npm run dev
4. Open your browser and visit:
    http://localhost:5173        

## Usage

1. Explore Artworks: Use the dropdown menu in the navigation bar to select and explore collections from Cleveland Museum of Art or the Art Institute of Chicago.
2. Filter Results: Use the filtering options to refine your search.
3. View Details: Click on an artwork to view its details.
4. Create Temporary Exhibitions:
5. Navigate to the "Temporary Exhibitions" page.
6. Create an exhibition and save artworks to it for later viewing.
7. Artworks can also be removed from exhibitions.

## Acknowledgements
- Data sourced from the Cleveland Museum of Art and the Art Institute of Chicago.
- UI powered by Tailwind CSS and HeroIcons.