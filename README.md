# yt-sum

A powerful tool that leverages Google Gemini AI to provide concise summaries of YouTube videos. Simply enter the URL of any YouTube video, and get an AI-generated summary in seconds!

## Table of Contents

-   [Features](#features)
-   [Screenshots](#screenshots)
-   [Folder Structure](#folder-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Google Gemini AI Setup](#google-gemini-ai-setup)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   Easy-to-use interface for entering YouTube video URLs
-   Utilizes Google Gemini AI for accurate and concise video summarization
-   Supports videos in multiple languages
-   Fast processing and summary generation
-   Responsive design for both desktop and mobile use

## Screenshots

![Home Page](/frontend/public/Homepage.png)
![Summary Page](/frontend/public/DemoSummary.png)

## Folder Structure

```
├── backend/
│   ├── api/
│   │   └── processVideo.js
│   ├── services/
│   │   ├── summarizer.js        # Handles summary generation logic
│   │   └── video.js             # Handle video downloading logic
│   ├── temp/                    # Temporary download files
│   ├── .env                     # Environment variables
│   └── index.js                 # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CopyBtn.jsx
│   │   │   ├── SaveBtn.jsx
│   │   │   └── RegenerateBtn.jsx
│   │   ├── helpers/
│   │   │   └── validation.js    # Validating the URL
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── index.html
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   Google Gemini AI API key

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/akdevv/yt-sum
    cd yt-sum
    ```

2. Set up the backend:

    1. Navigate to the backend directory:
        ```bash
        cd backend
        ```
    2. Install backend dependencies:
        ```bash
        npm install
        ```
    3. Create a .env file in the backend folder and paste your Google Gemini API key:
        ```js
        GOOGLE_GEMINI_API_KEY=<<your_gemini_api_key_here>>
        ```
    4. Start the backend server using Nodemon:
        ```bash
        nodemon index.js
        ```

3. Set up the frontend:

    1. Open a new terminal session, then navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    2. Install frontend dependencies:
        ```bash
        npm install
        ```
    3. Start the development server:
        ```bash
        npm run dev
        ```

4. Visit `http://localhost:5173` in your browser to use the app.

## Google Gemini AI Setup

1. Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a new project or select an existing one.
3. Generate an API key for Gemini AI.
4. Copy the API key and paste it into your `.env` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
