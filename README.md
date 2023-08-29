# Geek Hunter Job Portal - Backend

This is the backend repository for the Geek Hunter Job Portal project, a platform that connects job seekers and companies offering tech-related positions. 
This backend is built using Node.js and MongoDB.

## Getting Started

To set up and run the backend locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for database)
- Environment variables: Create a `.env` file in the root directory with the following variables:

    SECRET=your-secret-key
    DB_USER=your-db-username
    DB_PASS=your-db-password

### Installation

1. Clone this repository:

  ```bash
 git clone https://github.com/your-username/api-geek-hunter.git

2. Navigate to the project directory:

  cd api-geek-hunter

3. Install dependencies:

  npm install

4. Start the server:

  npm run dev

API Endpoints

Candidates

POST /candidates/register: Register a new candidate.
Requires: JSON body with candidate details.
Authenticated: No

Jobs
POST /register/job: Create a new job posting.

Requires: JSON body with job details.
Authenticated: Yes (requires token)
GET /search-jobs: List job postings by desired technology.

Requires: Query parameter tecnologiasDesejada.
Authenticated: No
GET /all-jobs: List all job postings.

Authenticated: No
DELETE /delete-job: Delete a job posting.

Requires: JSON body with tituloDaVaga.
Authenticated: Yes (requires token)
Authentication
For protected routes, include an Authorization header with a valid token obtained during candidate or company registration.
Contributions
Contributions to this project are welcome. To contribute:

Fork this repository.
Create a new branch for your changes.
Make your changes and commit them.
Push your changes to your forked repository.
Create a pull request to the original repository.
License
This project is licensed under the MIT License - see the LICENSE file for details.
