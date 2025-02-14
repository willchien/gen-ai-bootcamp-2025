# Backend Server Technical Specs

## Business Goal
A language learning school wants to build a prototype of learning portal which will act as three things:
- Inventory of possible vocabulary that can be learned.
- Act as a  Learning record store (LRS), providing correct and wrong score on practice vocabulary.
- A unified launchpad to launch different learning apps.

## Technical Requirements
- Backend: JS, Express.js
- Database: SQLite3
- Task runner: npm
- The API will always return JSON
- There's no authentication or authorization features, assume single user

## Database Schema
We have the following tables:
- words - vocabulary
    - id integer
    - French string
    - English string
    - parts json

- words_groups - join table for words and groups many-to-many
    - id integer
    - word_id integer
    - group_id integer

- groups - thematic groups of words
    - id integer
    - name string

- study_activities - a specific study activity, linking a study session to group
    - id integer
    - study_session_id integer
    - group_id integer
    - created_at datetime

- word_review_items - a record of word practice, determining if the word was correct or not 
    - word_id integer
    - study_session_id integer
    - correct boolean
    - created_at datetime

- study_sessions - records of study sessions grouping word_review_items
    - id integer
    - group_id integer
    - study_activity_id integer
    - created_at datetime

## API Endpoints

### `GET /api/dashboard/last_study_session`
Returns information about the most recent study session.
#### JSON Response
```json
{
  "id": 123,
  "group_id": 456,
  "created_at": "2025-02-08T17:20:23-05:00",
  "study_activity_id": 789,
  "group_name": "Basic Greetings"
}
```

### `GET /api/dashboard/study_progress`
Returns study progress statistics. The frontend will determine progress bar based on the total words studied and the total available words.
#### JSON Response
```json
{
  "total_words_studied": 3,
  "total_available_words": 124,
}
```

### `GET /api/dashboard/quick_stats`
Returns quick overview stats.
#### JSON Response
```json
{
  "success_rate": 80.0,
  "total_study_sessions": 4,
  "total_active_groups": 3,
  "study_streak_days": 4
}
```

### `GET /api/api/study_activities/:id`
#### JSON Response
```json
{
  "id": 1,
  "name": "Vocabulary Quiz",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "description": "Practice your vocabulary with flashcards"
}
```

### `GET /api/api/study_activities/:id/study_sessions`
#### JSON Response
```json
{
  "items": [
    {
      "id": 123,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2025-02-08T17:20:23-05:00",
      "end_time": "2025-02-08T17:30:23-05:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100,
    "items_per_page": 20
  }
}
```

### `POST /api/study_activities`
Required params: 
- group_id integer 
- study_activity_id integer
#### JSON Response
```json

{
  "id": 124,
  "group_id": 123
}
```

### `GET /api/words` 
Pagination list of words with 100 items per page, with review stats.
- page: Page number (default: 1)
- sort_by: Sort field ('French', 'english', 'correct_count', 'wrong_count') (default: 'French')
- order: Sort order ('asc' or 'desc') (default: 'asc')
#### JSON Response
```json
{
  "items": [
    {
      "french": "bonjour",
      "english": "hello",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 500,
    "items_per_page": 100
  }
}
```

### `GET /api/words/:id` 
#### JSON Response
```json
{
  "french": "bonjour",
  "english": "hello",
  "stats": {
    "correct_count": 5,
    "wrong_count": 2
  },
  "groups": [
    {
      "id": 1,
      "name": "Basic Greetings"
    }
  ]
}
```

### `GET /api/groups` 
Pagination list of word groups with 100 items per page, with word counts.
#### JSON Response
```json
{
  "items": [
    {
      "id": 1,
      "name": "Basic Greetings",
      "word_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_items": 10,
    "items_per_page": 100
  }
}
```

### `GET /api/groups/:id` 
Get words from a specific group (intended to be used by target apps).
- page: Page number (default: 1)
- sort_by: Sort field ('name', 'words_count') (default: 'name')
- order: Sort order ('asc' or 'desc') (default: 'asc')
#### JSON Response
```json
{
  "id": 1,
  "name": "Basic Greetings",
  "stats": {
    "total_word_count": 20
  }
}
```

### `GET /api/groups/:id/words`
#### JSON Response
```json
{
  "items": [
    {
      "french": "bonjour",
      "english": "hello",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_items": 20,
    "items_per_page": 100
  }
}
```

### `GET /api/groups/:id/study_sessions`
#### JSON Response
```json
{
  "items": [
    {
      "id": 123,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2025-02-08T17:20:23-05:00",
      "end_time": "2025-02-08T17:30:23-05:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_items": 5,
    "items_per_page": 100
  }
}
```

### `GET /api/study_sessions`
Pagination with 100 items per page.
#### JSON Response
```json
{
  "items": [
    {
      "id": 123,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2025-02-08T17:20:23-05:00",
      "end_time": "2025-02-08T17:30:23-05:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 100,
    "items_per_page": 100
  }
}
```

### `GET /api/study_sessions/:id`
#### JSON Response
```json
{
  "id": 123,
  "activity_name": "Vocabulary Quiz",
  "group_name": "Basic Greetings",
  "start_time": "2025-02-08T17:20:23-05:00",
  "end_time": "2025-02-08T17:30:23-05:00",
  "review_items_count": 20
}
```

### `GET /api/study_sessions/:id/words`
Pagination with 100 items per page.
#### JSON Response
```json
{
  "items": [
    {
      "french": "bonjour",
      "english": "hello",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_items": 20,
    "items_per_page": 100
  }
}
```

### `POST /api/reset_history`
#### JSON Response
```json
{
  "success": true,
  "message": "Study history has been reset"
}
```

### `POST /api/full_reset`
#### JSON Response
```json
{
  "success": true,
  "message": "System has been fully reset"
}
```

### `POST /api/study_sessions/:id/words/:word_id/review`
Log a review attempt for a word during a study session.
Required params: 
- id (study_session_id) integer
- word_id integer
- correct boolean
#### Request Payload
```json
{
  "correct": true
}
```
#### JSON Response
```json
{
  "success": true,
  "word_id": 1,
  "study_session_id": 123,
  "correct": true,
  "created_at": "2025-02-08T17:33:07-05:00"
}
```


## Tasks
### Initialize Database
Initialize the sqlite database called `words.db`.

### Migrate Database
Run migration sql files on the database.
Migrations live in the `migrations` folder.
The migration files will be run in order of their file name.
The file names should looks like this:

```sql
0001_init.sql
0002_create_words_table.sql
```

### Seed Data
Import json files and transform them into target data for our database.
All seed files live in the `seeds` folder.
We should have DSL to specific each seed file and its expected group word name.

```json
[
  {
    "french": "payer",
    "english": "to pay",
  },
  ...
]
```

<!-- - `POST /api/words` - Add a new word to the vocabulary.
- `PUT /api/words/:id` - Update an existing word by ID.
- `DELETE /api/words/:id` - Delete a word by ID. -->
<!-- - `POST /api/groups` - Add a new group.
- `PUT /api/groups/:id` - Update an existing group by ID.
- `DELETE /api/groups/:id` - Delete a group by ID.

- `GET /api/study_sessions` - Retrieve all study sessions.
- `GET /api/study_sessions/:id` - Retrieve a specific study session by ID.
- `POST /api/study_sessions` - Create a new study session.
- `PUT /api/study_sessions/:id` - Update an existing study session by ID.
- `DELETE /api/study_sessions/:id` - Delete a study session by ID.

- `GET /api/study_activities` - Retrieve all study activities.
- `GET /api/study_activities/:id` - Retrieve a specific study activity by ID.
- `POST /api/study_activities` - Create a new study activity.
- `PUT /api/study_activities/:id` - Update an existing study activity by ID.
- `DELETE /api/study_activities/:id` - Delete a study activity by ID.

- `GET /api/word_review_items` - Retrieve all word review items.
- `GET /api/word_review_items/:id` - Retrieve a specific word review item by ID.
- `POST /api/word_review_items` - Create a new word review item.
- `PUT /api/word_review_items/:id` - Update an existing word review item by ID.
- `DELETE /api/word_review_items/:id` - Delete a word review item by ID. -->