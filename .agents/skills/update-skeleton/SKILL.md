---
name: update-skeleton
description: Sync recent commits from "laravel/laravel" into the boilerplate craftcms/craft application.
---

The `craftcms/craft` repository contains the base application for new Craft CMS sites.

It is very similar to `laravel/laravel`, the base application for new Laravel apps. Our version changes some of the defaults to better suit Craft's approach and provides a starter boilerplate.

To avoid `craftcms/craft` becoming stale, we need to regularly review it for necessary changes. This skill details that process.

Before you begin, checkout the `6.x` branch and pull down any changes.

## 1. Sync with `laravel/laravel`

1. Find the latest "Sync with `laravel/laravel`" PR:

  ```
  gh pr list --state merged --search "Sync with `laravel/laravel`" --limit 1
  ```

2. Take note of the last commit message on that PR:

  ```
  gh pr view <PR_NUMBER> --json commits --jq '.commits[].messageHeadline'
  ```

3. Fetch the latest commits from `laravel/laravel`. Filter out the last commit we synced (and any older ones). Filter out any `Update CHANGELOG` or `Merge pull request ...` commits too.

  ```
  gh api "repos/laravel/laravel/commits" --jq '.[] | "\(.sha[0:7]) \(.commit.message | split("\n")[0])"
  ```

When there isn't anything new to sync, move onto Section 2.

4. Create a new branch called `sync-laravel-laravel`. If one already exists, delete it and create a new one.

5. For each `laravel/laravel` commit:

- Copy the changes from the `laravel/laravel` commit into this codebase.
- Create a commit with the same message as the original, WITHOUT any references to PRs/Issues/Authors.

6. Once you've worked through the commits, push up the branch and open a pull request using the `gh` CLI. Please use the provided title and description (DO NOT change it).

**Pull request title:** "Sync with `laravel/laravel`"
**Pull request description:**
  ```
  This pull request syncs recent changes from [`laravel/laravel`](https://github.com/laravel/laravel/commits/13.x) to `statamic/statamic`.
  ```
