# Frontend Technical Specs

## Pages

### Dashboard `/dashboard`
Summary of learning and default landing page.

#### Components
- Last Study Session
    - last activity used
    - time of last activity used
    - wrong vs correct from last activity
    - link to the group

- Study Progress
    - total words studied e.g. 3/124
        - across all study session show the total words studies out of all possible words in out database
    - display a mastery progress e.g. 2%

- Quick Stats
    - success rate e.g. 80%
    - total study sessions e.g. 4
    - total active groups e.g. 3
    - study streak e.g. 4 days

- Start Studying Button
    - goes to study activities page

#### API Endpoints
- `GET /api/dashboard/last_study_session`
- `GET /api/dashboard/study_progress`
- `GET /api/dashboard/quick_stats`


### Studies Activities `/study_activities`
A collection of studies activities with a thumbnail and its name, to either launch or view the study activity.

#### Components
- Study Activity Card
    - thumbnail of the study activity
    - the name of the study activity
    - a launch button to take us to the launch page
    - the view page to view more information about past study sessions for this study activity

#### API Endpoints
- `GET /api/study_activities`


### Studies Activity Show `/study_activities/:id`
To show the details of a study activity and its past study sessions.

#### Components
- Name of study activity
- Thumbnail of study activity
- Description of study activity
- Launch Button
- Study activities paginated list
    - id
    - activity name
    - group name
    - start time
    - end time (inferred by the last word_review_item)
    - number of review items

#### API Endpoints
- `GET /api/study_activities/:id`
- `GET /api/study_activities/:id/study_sessions`


### Studies Activities Launch `/study_activities/:id/launch`
To launch a study activity.

#### Components
- Name of study activity
- Launch form
    - select field for group
    - launch now button
note: after the form is submitted, a new tab opens with the study activity based on its URL provided in the database. The page will redirect to the study session show page.

#### API Endpoints
- `POST /api/study_activities`


### Words Index `/words`
To show a list all words in our database.

#### Components
- Paginated word list (100 items per page)
    - Columns
        - French
        - English
        - correct count
        - wrong count 
    - Clicking the French word should take us to the word show page

#### API Endpoints
- `GET /api/words`


### Word Show `/words/:id`
To show information about a specific word.

#### Components
- French
- English
- Study stats
    - correct count
    - wrong count
- Word groups
    - show as a series of clouds
    - when group name is clicked it will take us to the group show page

#### API Endpoints
- `GET /api/words:id`


### Word Groups Index `/groups`
To show a list of groups in our database.

#### Components
-  Paginated group list
    - Columns
        - group name
        - word count
    - Clicking the group name should take us to the group show page

#### API Endpoints
- `GET /api/groups`


### Group Show `/groups/:id`
To show information about a specific group.

#### Components
- Group name
- Group stats
    - total word count
- Words in group (paginated list of words)
    - Should use the same component as the words index page.
- Study sessions (paginated list of study sessions)
    - Should use the same component as the study sessions index page.

#### API Endpoints
- `GET /api/groups/:id` (the name and groups stats)
- `GET /api/groups/:id/words`
- `GET /api/groups/:id/study_sessions`


### Study Sessions `/study_sessions`
To show a list of study sessions in our database.

#### Components
- Paginated study session list
    - Columns
        - id 
        - activity name
        - group name
        - stat time
        - end time
        - number of review items
    - Clicking the study sessions id should take us to the study session show page

#### API Endpoints
- `GET /api/study_sessions`


### Study Sessions Show `/study_sessions/:id`
To show information about a specific study session.

#### Components
- Study sessions details
    - activity name
    - group name
    - start time
    - end time
    - number of review items
- Words review items (paginated list of words)
    - should use the same component as the words index page

#### API Endpoints
- `GET /api/study_sessions/:id`
- `GET /api/study_sessions/:id/words`


### Settings `/settings`
To make configurations to the study portal.

#### Components
- Theme selection (dark, light, system default)
- Reset history button
    - deletes all study sessions and words review items
- Full reset button
    - drops all tables and re-create with seed data

#### API Endpoints
- `POST /api/reset_history`
- `POST /api/full_reset`