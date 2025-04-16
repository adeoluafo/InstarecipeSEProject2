# 📌 InstaRecipe

InstaRecipe is a web-based recipe sharing platform that offers instant recipe suggestions based on available ingredients. Users can upload, search, filter, and manage their own recipes, and get AI-powered recommendations to reduce food waste and save time. Whether you're a guest looking for inspiration or a registered user creating your own recipe book, InstaRecipe enhances your cooking experience.

---

## 🚀 Key Features

- Upload recipes with titles, ingredients, directions, and photos.
- Categorize recipes by diet, cuisine, difficulty, and meal type.
- Discover trending recipes or get personalized suggestions.
- AI-powered ingredient-based recipe recommendations.
- Save drafts, publish recipes, and manage them from a dashboard.
- Leave comments and reviews on shared recipes.

---

## ⚙️ Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adeoluafo/InstarecipeSEProject
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

Supabase acts as the **backend** and **database** layer for InstaRecipe. It handles:

1. **PostgreSQL Database**  
   Stores all recipes, users, comments, and favorites in structured tables.

2. **Authentication**  
   Secure sign-up and login for users using email/password.

3. **File Storage**  
   Upload and retrieve images of recipes via Supabase storage buckets.

4. **APIs for CRUD Operations**  
   Recipes can be added, updated, deleted, or fetched via Supabase's RESTful APIs.

5. **Row-Level Security (RLS)**  
   Ensures users only access their own data (e.g., can't edit others' recipes).

---

## 🛠 Development Environment

- Visual Studio Code (VS Code)
- GitHub (version control)
- Google Chrome / Firefox (browser testing)
- Canvas (submission platform)

**Target Platform**: Web  
**Languages Used**: JavaScript, Python (optional), HTML, CSS

---

## 👥 Team Members & Responsibilities

**Agustina Lorda**  
Frontend development (React.js, CSS), user authentication, and UI responsiveness.

**Adeoluwa Afolabi**  
Backend development (Node.js, Supabase integration), recipe management, database setup.

**Joint Responsibility**  
AI-powered recommendation system using OpenAI API.

---

## 📬 Contact

For questions or collaboration, reach out via Canvas or GitHub.