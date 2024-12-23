# fe-arto-facts


Arto-Facts is a web application that allows users to explore artworks from renowned institutions like the Metropolitan Museum of Art in New York and the Art Institute of Chicago. Users can filter, view, and save artworks into temporary exhibitions, which are stored locally in the browser.

## Features

- Explore artworks from:
  - Metropolitan Museum of Art in New York
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
       page: Number,
       limit: Number,
       placeOfOrigin: String,
       artistName: String,
       artTypeTitle: String
     }
   
   - Get artwork by ID:
  
     GET /api/collections/ArtInstitueChicago/:id


2. **Metropolitan Museum of Art**
   - Get artworks:
   
     GET /api/collections/MetArtMuseum
     Params: {
       limit: Number,
       offset: Number,
       departmentId: Number,
       type: String,
       searchTerm: String
     }
   
   - Get artwork by ID:
     
     GET /api/collections/MetArtMuseum/:id
   
   - Get departments:
    
     GET /api/collections/MetArtMuseum/departments
   

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

1. Explore Artworks: Use the dropdown menu in the navigation bar to select and explore collections from MET or the Art Institute of Chicago.
2. Filter Results: Use the filtering options to refine your search.
3. View Details: Click on an artwork to view its details.
4. Create Temporary Exhibitions:
5. Navigate to the "Temporary Exhibitions" page.
6. Create an exhibition and save artworks to it for later viewing.
7. Artworks can also be removed from exhibitions.

## Acknowledgements
- Data sourced from the Metropolitan Museum of Art and the Art Institute of Chicago.
- UI powered by Tailwind CSS and HeroIcons.