# React Integration Setup Guide

This guide explains how to integrate the interactive `WavePath` and `Demo` components into your React / Next.js / Vite application.

## 1. Install Dependencies

These components use Tailwind CSS and standard helper utility `cn` (built with `clsx` and `tailwind-merge`). Install them in your project:

```bash
npm install clsx tailwind-merge
```

## 2. Set Up Utility Helper

Create or verify the existence of your class merge utility (usually in `@/lib/utils.ts` or `@/lib/utils.js`):

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 3. Add the Components

The components have been created in the `./components/ui/` directory:
- [wave-path.tsx](file:///C:/Users/Home/.gemini/antigravity/scratch/furniture/components/ui/wave-path.tsx)
- [demo.tsx](file:///C:/Users/Home/.gemini/antigravity/scratch/furniture/components/ui/demo.tsx)

Copy these files into your project's components directory (e.g. `src/components/ui/` or `components/ui/`).

## 4. Import and Render

Simply import the `Demo` component or import the `WavePath` component directly into any page:

```tsx
import Demo from '@/components/ui/demo';

export default function Page() {
  return (
    <main>
      <Demo />
    </main>
  );
}
```
