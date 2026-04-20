# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Real estate application — `realestate-app`. Repository: https://github.com/aki2228824/realestate-app

## Git Operation Rules

**Push to GitHub on every code change.**

After every meaningful code change (new feature, bug fix, refactor, config update), run:

```bash
git add <changed files>
git commit -m "<descriptive message>"
git push origin main
```

- Always create commits with clear, descriptive messages in the language appropriate to the change.
- Never batch unrelated changes into a single commit.
- Push immediately after each commit — do not accumulate unpushed commits.
- Remote: `https://github.com/aki2228824/realestate-app`
- Default branch: `main`
