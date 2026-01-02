# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests with Vitest
npm run setup        # Install deps + generate Prisma client + run migrations
npm run db:reset     # Reset database (destructive)
```

Run a single test file:
```bash
npx vitest src/lib/__tests__/file-system.test.ts
```

## Architecture

UIGen is an AI-powered React component generator. Users describe components in a chat interface, Claude generates code, and a live preview renders the result in real-time using a virtual file system (no files written to disk).

### Core Flow

1. **Chat API** (`src/app/api/chat/route.ts`) - Handles AI conversations using Vercel AI SDK. Uses `getLanguageModel()` which returns real Claude API or a mock provider if no API key is set.

2. **AI Tools** - The AI uses two tools to manipulate the virtual file system:
   - `str_replace_editor` (`src/lib/tools/str-replace.ts`) - Create files, string replace, insert text
   - `file_manager` (`src/lib/tools/file-manager.ts`) - Rename, delete files

3. **Virtual File System** (`src/lib/file-system.ts`) - In-memory file system that stores all generated code. The `VirtualFileSystem` class handles file operations and serialization for persistence.

4. **Live Preview** - Files are transformed client-side:
   - `src/lib/transform/jsx-transformer.ts` - Transforms JSX/TSX using Babel standalone, creates blob URLs, and builds an import map for browser-native ES modules
   - `src/components/preview/PreviewFrame.tsx` - Renders preview in sandboxed iframe with Tailwind CSS loaded from CDN

### State Management

- **FileSystemContext** (`src/lib/contexts/file-system-context.tsx`) - Manages virtual file system state client-side, handles tool calls from AI responses
- **ChatContext** - Manages chat messages and streaming state

### Data Persistence

- SQLite database via Prisma for registered users
- Database schema defined in `prisma/schema.prisma`
- Projects store serialized messages and file system state as JSON
- Anonymous users can work without persistence

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json and components.json for shadcn/ui)

## Code Style

- Use comments sparingly. Only comment complex code.

## Tech Stack Notes

- Next.js 15 App Router with Turbopack
- React 19
- Tailwind CSS v4
- shadcn/ui (new-york style) for UI components
- Vitest + Testing Library for tests
- Jose for JWT authentication
