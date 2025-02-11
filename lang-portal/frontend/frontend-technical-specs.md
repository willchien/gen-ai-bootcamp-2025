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
- `GET /api/dashboard/quick-stats`


### Studies Activities `/study-activities`
A collection of studies activities with a thumbnail and its name, to either launch or view the study activity.

#### Components
- Study Activity Card
    - thumbnail of the study activity
    - the name of the study activity
    - a launch button to take us to the launch page
    - the view page to view more information about past study sessions for this study activity

#### API Endpoints
- `GET /api/study-activities`


### Studies Activity Show `/study-activities/:id`
A collection of studies activities with a thumbnail and its name, to either launch or view the study activity.

#### Components
#### API Endpoints
