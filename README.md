# CoinCap

CoinCap is a React application built with TypeScript that displays real-time cryptocurrency data fetched from the CoinCap API. The application features a paginated table view with sorting and favoriting capabilities, as well as a detailed view and history for individual cryptocurrencies.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Technologies and Frameworks](#technologies-and-frameworks)
- [Testing](#testing)
- [Extra Features](#extra-features)

## Features

1. **Real-Time Cryptocurrency Data**:
    - Fetch data from the CoinCap API (https://api.coincap.io/v2/assets).
    - Display cryptocurrency data in a table with columns for the symbol, name, price, and market cap in USD.
    - Refresh data every 10 seconds.
    - Pagination with 10 items per page.

2. **Table Features**:
    - Sorting by symbol, name, price, and market cap.
    - Persistent sorting across data refreshes.
    - Clickable currency names that redirect to a details page.

3. **Favorites Feature**:
    - Toggle button for favoriting/unfavoriting cryptocurrencies.
    - Store favorite list in local storage.
    - Persist favorite status across sessions.

4. **Details Page**:
    - Fetch data from the CoinCap API (https://api.coincap.io/v2/assets/{{id}}) using dynamic route parameters.
    - Display detailed information for selected cryptocurrencies.

5. **History Table**:
    - Fetch data from the CoinCap API (https://api.coincap.io/v2/assets/{{id}}/history?interval={{interval}}).
    - Display price of the selected cryptocurrencies for every 5 minutes.

6. **Testing**:
    - Jest setup for unit testing.

## Installation

To install the dependencies and run the application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ANCHITAYUSH/coincap.git
    ```

2. Navigate to the project directory:

    ```bash
    cd coincap
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the application:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

The CoinCap allows you to:
- View a list of cryptocurrencies with real-time data.
- Sort and paginate the cryptocurrency table.
- Favorite/unfavorite cryptocurrencies.
- View detailed information about selected cryptocurrencies.
- View history of selected cryptocurrencies.

## Project Structure

```plaintext
src/
  ├── components/
  │   ├── CoinDetail.tsx
  │   ├── CoinTable.tsx
  │   ├── HistoryTable.tsx
  │   └── Pagination.tsx
  ├── constants/
  │   └── index.ts
  ├── interfaces/
  │   ├── Coin.ts
  │   ├── CoinDetailProps.ts
  │   ├── CoinHistory.ts
  │   ├── CoinTableProps.ts
  │   ├── HistoryTableProps.ts
  │   └── PaginationProps.ts
  ├── pages/
  │   ├── CoinDetails.tsx
  │   └── Dashboard.tsx
  ├── tests/
  │   ├── CoinDetail.test.tsx
  │   ├── CoinTable.test.tsx
  │   ├── HistoryTable.test.tsx
  │   └── Pagination.test.tsx
  ├── App.css
  ├── App.tsx
  ├── index.tsx
  └── ... (other files)
   ```

## Available Scripts

 the project directory, you can run:

    ```bash
    npm start
    ```
Runs the app in the development mode. Open http://localhost:3000 to view it in your browser.

    ```bash
    npm run build
    ```
Builds the app for production to the build folder.

    ```bash
    npm test
    ```
Launches the test runner in the interactive watch mode. See the section about running tests for more information.

    ```bash
    npm run eject
    ```
If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

## Technologies and Frameworks
- HTML & CSS
- Typescript
- React
- Bootstrap
- Material UI
- Coincap APIs

## Testing
The project uses Jest and React Testing Library for unit testing. Test files are located in the src/tests directory and follow the same structure as the main codebase.

### Running Tests
To run the tests, use the following command:

    ```bash
    npm test
    ```

## Extra Features
- Sorting applied on all the fields of the Coin table.
- Added fields in Coin Details page.
    - A measure of how much of a cryptocurrency was traded in the last 24 hours.
    - The amount of coins that are circulating in the market and are in public hands.
    - Amount of price decreased or increased in last 24 hours.
- Added History Table in Coin Details page.
