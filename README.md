# Hacker News Scraper

A Node.js service that scrapes stories from Hacker News, stores them in a MySQL database, and provides REST API endpoints and WebSocket updates for accessing the data.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nitish-singh07/backendAssignment.git
   cd backendAssignment
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_HOST=<your-database-host>
   DB_USER=<your-database-username>
   DB_PASSWORD=<your-database-password>
   DB_NAME=<your-database-name>
   PORT=3000
   WS_PORT=8080
   ```

4. **Initialize the Database:**
   Run the SQL script provided in the `scripts` folder to set up the `stories` table.

5. **Start the Application:**
   ```bash
   npm start
   ```

## Usage Examples

### REST API

#### Get Recent Stories
- **Endpoint:** `GET /api/stories`
- **Response:**
  ```json
  {
    "stories": [
      {
        "title": "Story Title",
        "url": "https://story-url.com",
        "author": "Author Name",
        "score": 123,
        "time_published": "2025-01-25T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get Recent Count and Stories
- **Endpoint:** `GET /api/stories/count`
- **Response:**
  ```json
  {
    "count": 10,
    "stories": [
      {
        "title": "Story Title",
        "url": "https://story-url.com",
        "author": "Author Name",
        "score": 123,
        "time_published": "2025-01-25T12:00:00.000Z"
      }
    ]
  }
  ```

### WebSocket

1. Connect to the WebSocket server:
   ```
   ws://localhost:8080
   ```

2. On connection, receive:
   - **Initial Count:** Number of stories published in the last 5 minutes.
   - **Recent Stories:** Stories published in the last 5 minutes.

3. Real-time updates:
   - Broadcasts new stories every 5 minutes.

   **Example Message:**
   ```json
   {
    "type": "recent-stories",
    "data": {
        "count": 2,
        "stories": [
            {
                "title": "Story Title",
                "url": "https://story-url.com",
                "time_published": "2025-02-01T12:55:56.000Z"
            },
            {
                "title": "Story Title",
                "url": "https://story-url.com",
                "time_published": "2025-02-01T12:55:56.000Z"
            }
            
        ]
    }

   ```

---



