# Release Guide

## Create a release

1. Go to **Actions** > **Release**.
2. Click **Run workflow**.
3. Enter a version tag like `v1.0.0`.
4. Run the workflow.

The workflow will:
- install dependencies in `client`
- build the production bundle
- package `client/dist`
- create a GitHub Release with the built artifact attached

## Notes

- Use semantic versioning where possible (`vMAJOR.MINOR.PATCH`).
- Ensure `client` builds cleanly before triggering a release.
