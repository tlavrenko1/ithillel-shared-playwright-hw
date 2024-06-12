# ithillel-shared-playwright-hw

This repository contains a Playwright-based test automation framework. Follow the instructions below to install and run the tests.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)
- Github

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/tlavrenko1/ithillel-shared-playwright-hw
   cd ithillel-shared-playwright-hw

2. **Install dependencies:**

npm install

3. **Install Playwright browsers:**

npx playwright install

<!--or specific browser, e.g., chromium:-->

npx playwright install chromium

4. **Create a .env file based on the provided example file:**

cp .env.example .env

<!--Edit the .env file and fill in the necessary values (e.g., BASE_URL, HTTP_CREDENTIALS_USERNAME, HTTP_CREDENTIALS_PASSWORD)-->

5. **Run tests**

npm test
npm test:ui
npm report