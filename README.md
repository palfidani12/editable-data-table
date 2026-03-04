# Editable Data Table

An application for viewing, creating, editing, deleting, and sorting table rows with local persistence.

## Setup and Run Instructions

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Install

```sh
npm install
```

### Run in Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Run Tests

```sh
# Unit tests
npm run test:unit
```

### Lint and Format

```sh
npm run lint
npm run format
```

## Tech Stack Used

- **Frontend:** Vue 3 + TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest,
- **Linting/Formatting:** ESLint, Prettier
- **UI Utilities:** PrimeVue Icons
- **State/Persistence:** Local component state + `localStorage`

## Assumptions and Tradeoffs

- When there are long elements it is hard to read them and I didn't want to truncate the information
- Not all edge cases are not handled (validation, large datasets)
- Most usable with a larger viewport
- Validation could be more specific
- Storage limitations (localStorage)
- Peformace limitations with larger data (as we have all elements loaded at once and sorted)

## What I Would Improve

- Make the website more accessible.
- Add more tests to improve test coverage.
- Improve responsivity of the table for very small screens like phones.
- Store data on a server instead of localStorage
- Pagination
- Search functionality

## Approximate Time Spent

Approximately **3–4 hours** total.
