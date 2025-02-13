# Backend Server Technical Specs

## Business Goal
A language learning school wants to build a prototype of learning portal which will act as three things:
- Inventory of possible vocabulary that can be learned.
- Act as a  Learning record store (LRS), providing correct and wrong score on practice vocabulary.
- A unified launchpad to launch different learning apps.

## Technical Requirements
- Backend: JS, Express.js
- Database: SQLite3
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
- `GET /api/dashboard/last_study_session`
- `GET /api/dashboard/study_progress`
- `GET /api/dashboard/quick_stats`
- `GET /api/api/study_activities/:id`
- `GET /api/api/study_activities/:id/study_sessions`
- `POST /api/study_activities`
    - required params: group_id, study_activity_id
- `GET /api/words` 
    - pagination with 100 items per page
- `GET /api/words/:id` 
<!-- - `POST /api/words` - Add a new word to the vocabulary.
- `PUT /api/words/:id` - Update an existing word by ID.
- `DELETE /api/words/:id` - Delete a word by ID. -->

- `GET /api/groups` 
    - pagination with 100 items per page
- `GET /api/groups/:id` 
- `GET /api/groups/:id/words`
- `GET /api/groups/:id/study_sessions`
- `GET /api/study_sessions`
- `GET /api/study_sessions/:id`
- `GET /api/study_sessions/:id/words`
- `POST /api/reset_history`
- `POST /api/full_reset`
- `POST /api/study_sessions/:id/words/:word_id/review`
    - required param: correct

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