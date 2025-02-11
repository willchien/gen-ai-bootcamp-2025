# Frontend Technical Specs

## Pages

### Dashboard /dashboard
Summary of learning and default landing page.

#### Components
- Last Study Session
    - shows last activity used
    - shows when last activity used
    - summarizes wrong vs correct from last activity
    - has a link to the group

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

##### API Endpoints
- `GET /dashboard/last_study_session`
- `GET /dashboard/study_progress`
- `GET /dashboard/quick-stats`

### Studies Activities /study-activities
A collection of studies activities with a thumbnail and its name, to either launch or view the study activity.

#### API Endpoints
- `GET /dashboard/last_study_session`
- `GET /dashboard/study_progress`
- `GET /dashboard/quick-stats`