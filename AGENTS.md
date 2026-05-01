<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Rules

## Design System (Chakra UI) Rules
- **Component Library:** Use Chakra UI components for all UI elements.
  - **Colors:** Use the provided color palette from `src/styles/theme.ts`.
  - **Spacing:** Use `space.md`, `space.lg`, etc., instead of fixed values.
  - **Breakpoints:** Use `breakpoints.sm`, `breakpoints.md`, etc.
  - **Theming:** All components should be theme-aware.
- **Design Tokens:** Reference tokens from `src/styles/theme.ts`. Do not use magic numbers or arbitrary values.

## File Naming & Location Rules
- **Components:** Place all components in `src/components`. Keep the structure organized.
- **Hooks:** Place custom hooks in `src/hooks`.
- **Type Definitions:** Place TypeScript types/interfaces in `src/types` or alongside the components/hooks.
- **Constants:** Place constants in `src/constants`.
- **Utils:** Place utility functions in `src/utils`.
- **Config:** Configuration files should be in `src/config`.
- **Services:** API services should be in `src/services`.
- **Styling:** Ensure `styles.css` is used or properly imported in `App.tsx`. Avoid creating stray style files in random component folders unless absolutely necessary.
- **Pages:** Keep pages in `src/pages`. Maintain logical grouping.
- **Storybook:** Ensure story files are located alongside their components (e.g., `MyComponent.tsx`, `MyComponent.stories.tsx`).
- **Next.js Conventions:** Follow Next.js conventions for pages, layouts, and API routes.

## Code Quality Rules
- **TypeScript:** Use TypeScript for all new code. Provide type definitions for props and state where applicable.
- **React Practices:**
  - Use functional components with Hooks (`useState`, `useEffect`, etc.).
  - Avoid direct DOM manipulation.
  - Use `key` props for list rendering.
- **Accessibility:**
  - Use semantic HTML (`<button>`, `<nav>`, `<main>`).
  - Include `alt` text for images.
  - Ensure keyboard navigation support.
  - Use ARIA labels where appropriate.
- **File Structure:**
  - Keep files focused on a single responsibility.
  - Avoid deeply nested folder structures (max 3-4 levels).

## Testing Rules
- **Test Location:** Keep test files alongside the component/hook they are testing (e.g., `src/components/MyComponent/MyComponent.test.tsx`).
- **Unit Tests:** Prefer writing unit tests using `@testing-library/react` and `jest`.
- **Storybook:** Create Storybook stories for all UI components. Keep them in the same folder as the component.

## General Architecture Rules
- **Modularity:** Break down large components into smaller, reusable ones.
- **State Management:** Use `useState` and `useContext` for local and shared state respectively. Avoid Redux unless strictly necessary.
- **Performance:**
  - Use `React.memo` for expensive components.
  - Use `useCallback` and `useMemo` where appropriate.
- **Error Handling:** Implement proper error boundaries and handle API failures gracefully.
- **Configuration:** Use `src/config.ts` for environment-specific constants and API URLs.
- **Environment Variables:** Use `process.env.NEXT_PUBLIC_...` for environment variables. Define all required variables in `.env.local`.

## Component Rules
- **Reusability:** Design components to be reusable across the application.
- **Props:**
  - Use descriptive names.
  - Use `children` prop for content injection where appropriate.
  - Use TypeScript interfaces for props.
- **Styling:**
  -prefer Chakra UI props over custom CSS.
  - Use `sx` prop for one-off style overrides.
  - Use CSS Modules for component-specific styles only when necessary.

## Git Rules
- **Branch Naming:** Use kebab-case for branch names (e.g., `feat/user-authentication`).
- **Commit Messages:** Write clear, concise commit messages following Conventional Commits standard.
- **Pull Requests:** Create PRs for all changes and link to relevant issues.

## Dependency Rules
- **Avoid Breaking Changes:** Be cautious when updating dependencies. Check release notes for breaking changes.
- **Security:** Regularly run `npm audit` to check for security vulnerabilities.
- **Optimization:** Use `npm install --legacy-peer-deps` if needed to resolve peer dependency issues during development.

## Testing Rules (UI)
- **Component Tests:** Create component tests using `@testing-library/react`.
- **Test File Location:** Place test files in a `__tests__` directory alongside the component or in `src/__tests__`.
- **Mocking:** Mock external dependencies (API calls, etc.) using `jest.mock`.

## Performance Rules
- **Lazy Loading:** Use `next/dynamic` for route-based code splitting.
- **Image Optimization:** Use `next/image` for all images.
- **Memoization:** Use `React.memo`, `useCallback`, and `useMemo` to optimize re-renders.
