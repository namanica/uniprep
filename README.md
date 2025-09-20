# AI-Powered Platform for Entry Exams Preparation

This project is a web-based platform designed to help high school students prepare for ZNO/NMT exams.
It provides a personalized learning experience through diagnostic testing, adaptive study plans, progress tracking, test generation, and interactive learning tools.

## Key Features

- **User Authentication**: registration and login using email/password or social accounts, with progress data saved in a personal dashboard.
- **Initial diagnostic test**: the user takes a placement test on the selected subjects, and the system analyzes the answers and determines the level of knowledge and problematic topics.
- **Personalized study plan**: based on the results of the placement test, the system generates an individual learning plan: recommended topics, the order of their study, and progress indicators.
- **Progress tracking**: in the personal account, the user sees graphs, progress statistics, score dynamics, number of completed tasks, etc.
- **Subject-based test generation**: the ability to create a control test for any selected subject or topic. The system randomly generates questions from the database.
- **Flashcards for humanities**: flashcards mode for memorizing terms, dates, definitions - convenient for history, literature, foreign language.

## Ideas and plans for future

**1. Open-answered questions with AI evaluation**

Learners will be able to write extended answers instead of only choosing from multiple-choice options. Actually it's going to be applied to complex mathematical problems, which appear in the last section.

An AI model will:
 - analyze the structure and logic of the response
 - give an explanation and solving description in case of a wrong answer
 - provide targeted feedback and hints for improvement
 - highlight user's strengths and weaknesses

This encourages a deeper understanding and critical thinking rather than rote memorization.

**2. Email notifications & smart reminders**

We plan to add a GMail integration to send notifications about summaries of user's weekly progress, reminders about upcoming practice sessions or tests, motivational messages when milestones are achieved.

They keep students engaged and reduce procrastination, while allowing parents or tutors to receive optional reports.

**3. Tamagotchi / pet virtual companion**

A friendly pet that lives in the user’s dashboard and visually reacts to their performance. It may grow healthier or become happier when study goals are met, offer encouraging messages after a streak of successful sessions, look tired or sad if practice is skipped for several days.

- Gain XP and unlock levels as you study
- Earn visual upgrades (new outfits, colors, animations, emotions)

This creates an emotional connection and playful motivation, similar to a Tamagotchi. What partialy dismisses the previously mentioned problem of students' time management and priorities.

***This list probably will be replenished with a lot of new other concepts, which may be implemented in future.***

## Target Audience

- High school students (grades 9–11) preparing for the External Independent Testing (ZNO) / (NMT).
- Tutors who want to track the progress of their students.
- Parents interested in their child’s progress

## Benefits

- Personalized approach: the platform adapts to each student’s knowledge level.
- Progress tracking & analytics to monitor learning outcomes.
- Gamified learning: personal pet, achievements, and rewards.
- Mobility: access from any device.

# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
