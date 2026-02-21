# Security Policy

## Supported Components

Security fixes are currently applied to the active code in:

- `backend`
- `client`
- `adminpannel`

## Reporting a Vulnerability

If you discover a security issue, please open a private security report (GitHub Security Advisories) or contact the maintainers directly.

When reporting, include:

- affected package/component
- impact and exploitability notes
- reproduction steps (if possible)
- suggested remediation

## Dependency Security Process

This repository uses lockfiles for dependency reproducibility and Dependabot for automated update PRs.

- Dependabot is configured for all three npm projects (`backend`, `client`, `adminpannel`).
- Alert triage is done by severity and exploitability first.
- Critical/High alerts should be patched in the nearest possible release window.

### Current remediation notes

To reduce duplicate vulnerability surfaces from mixed package managers, the repository standardizes on npm lockfiles.
