# Tbilisi Hack Club Submissions

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b2c3d4-e5f6-4a5b-9c8d-7e6f5g4h3i2j/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A simple web application to handle submissions for Tbilisi Hack Club events. It features a frontend to display submissions and a backend powered by Netlify Functions and Supabase to manage the data.

---

## Features

-   **View Submissions**: A clean and modern interface to view all event submissions.
-   **Add Submissions**: An API endpoint to add new submissions to the database.
-   **Serverless Backend**: Powered by Netlify Functions for scalability and ease of deployment.
-   **Supabase Integration**: Uses Supabase for the database and authentication.

---

## Technologies Used

-   **Frontend**: HTML, Tailwind CSS, JavaScript
-   **Backend**: Netlify Functions, Node.js
-   **Database**: Supabase

---

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/tbilisihc/submissions.git](https://github.com/tbilisihc/submissions.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Supabase URL and anonymous key:
    ```
    SUPABASE_URL=your-supabase-url
    SUPABASE_ANON_KEY=your-supabase-anon-key
    ```
4.  **Run locally:**
    Use the Netlify CLI to run the functions locally:
    ```bash
    netlify dev
    ```

---

## File Structure

```
.
├── .gitignore
├── index.html
├── netlify.toml
├── netlify/
│   └── functions/
│       ├── add-submissions.js
│       └── read-submissions.js
└── package.json
```

---

## API Endpoints

### Add a new submission

-   **URL**: `/.netlify/functions/add-submissions`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890"
    }
    ```

### Get all submissions

-   **URL**: `/.netlify/functions/read-submissions`
-   **Method**: `GET`

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

[ISC](https://opensource.org/licenses/ISC)
