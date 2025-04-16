# InstaRecipe

InstaRecipe is a web-based recipe sharing platform that offers instant recipe suggestions based on available ingredients. Users can upload, search, filter, and manage their own recipes, and get AI-powered recommendations to reduce food waste and save time. Whether you're a guest looking for inspiration or a registered user creating your own recipe book, InstaRecipe enhances your cooking experience.

---

## Key Features

- Upload recipes with titles, ingredients, directions, and photos.
- Categorize recipes by diet, cuisine, difficulty, and meal type.
- Discover trending recipes or get personalized suggestions.
- AI-powered ingredient-based recipe recommendations.
- Save drafts, publish recipes, and manage them from a dashboard.
- Leave comments and reviews on shared recipes.

---

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adeoluafo/InstarecipeSEProject2
   cd instarecipe
   ```

2. **Navigate to Client Folder**
   ```bash
   cd client
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the App**
   ```bash
   npm start
   ```

The app will start at `http://localhost:3000`.

---

## Dependencies / Libraries Used

- **React.js** – For building the user interface
- **React Router** – For navigation and routing
- **Bootstrap** – For responsive UI styling
- **Supabase** – Backend-as-a-service (database, authentication, file storage)
- **OpenAI API** – For AI-based recipe generation and suggestions
- **Node.js** – JavaScript runtime for development tools
- **Vite / Webpack** – For bundling and optimization

Optional:
- **MySQL** – Alternative database if needed
- **Firebase** – Alternative backend service if used

---

## What Supabase Is Doing

Supabase serves as the **backend** and **database** layer for InstaRecipe. It provides an all-in-one solution including a hosted PostgreSQL database, authentication, file storage, and real-time API access — all integrated without managing your own server.

---

### Supabase Responsibilities in InstaRecipe

1. **PostgreSQL Database**  
   Stores all core app data including:
   - Recipes
   - Users
   - Favorites
   - Comments

2. **Authentication**  
   - Handles secure email/password sign-up and login.
   - Manages user sessions using JWT (JSON Web Tokens).

3. **File Storage**  
   - Manages user-uploaded recipe images.
   - Files are uploaded to Supabase Storage and served via public URLs.

4. **APIs for CRUD Operations**  
   - Every table (like `Recipes`) is automatically exposed as a RESTful API.
   - You can use JavaScript/TypeScript with the `@supabase/supabase-js` client to query/update data.

5. **Row-Level Security (RLS)**  
   - Ensures data protection per user.
   - For example, users can only view/edit their own recipes and favorites.

---

### What You Need to Work with Supabase

#### 1. **Create a Supabase Project**

- Go to [https://supabase.com]
- Create a new project
- Copy your **Project URL** and **Anon/Public API Key**

#### 2. **Install the Supabase JS Client**

```bash
npm install @supabase/supabase-js


##  Development Environment

- Visual Studio Code (VS Code)
- GitHub (version control)
- Google Chrome / Firefox (browser testing)
- Canvas (submission platform)

**Target Platform**: Web  
**Languages Used**: JavaScript, Python (optional), HTML, CSS

---

## Team Members & Responsibilities

**Agustina Lorda**  
Frontend development (React.js, CSS), user authentication, and UI responsiveness.

**Adeoluwa Afolabi**  
Backend development (Node.js, Supabase integration), recipe management, database setup.

**Joint Responsibility**  
AI-powered recommendation system using OpenAI API.

---

=======
# InstarecipeSEProject2

