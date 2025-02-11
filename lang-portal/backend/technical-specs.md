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
- words (vocabulary)
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
    - created at datetime

- word_review_items - a record of word practice, determining if the word was correct or not 
    - word_id integer
    - study_session_id integer
    - correct boolean
    - created_at datetime

- study_sessions - records of study sessions grouping word_review_items
    - id integer
    - group_id integer
    - study_activity_id integer
    - created at datetime

### API Endpoints
- `GET /words` - Retrieve all words in the vocabulary.
- `GET /words/:id` - Retrieve a specific word by ID.
- `POST /words` - Add a new word to the vocabulary.
- `PUT /words/:id` - Update an existing word by ID.
- `DELETE /words/:id` - Delete a word by ID.

- `GET /groups` - Retrieve all groups.
- `GET /groups/:id` - Retrieve a specific group by ID.
- `POST /groups` - Add a new group.
- `PUT /groups/:id` - Update an existing group by ID.
- `DELETE /groups/:id` - Delete a group by ID.

- `GET /study_sessions` - Retrieve all study sessions.
- `GET /study_sessions/:id` - Retrieve a specific study session by ID.
- `POST /study_sessions` - Create a new study session.
- `PUT /study_sessions/:id` - Update an existing study session by ID.
- `DELETE /study_sessions/:id` - Delete a study session by ID.

- `GET /study_activities` - Retrieve all study activities.
- `GET /study_activities/:id` - Retrieve a specific study activity by ID.
- `POST /study_activities` - Create a new study activity.
- `PUT /study_activities/:id` - Update an existing study activity by ID.
- `DELETE /study_activities/:id` - Delete a study activity by ID.

- `GET /word_review_items` - Retrieve all word review items.
- `GET /word_review_items/:id` - Retrieve a specific word review item by ID.
- `POST /word_review_items` - Create a new word review item.
- `PUT /word_review_items/:id` - Update an existing word review item by ID.
- `DELETE /word_review_items/:id` - Delete a word review item by ID.