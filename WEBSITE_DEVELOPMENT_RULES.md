# Website Development Rules

> **Purpose:** This file defines mandatory engineering, design,
> security, and quality rules for building this website. It contains
> rules only. Project-specific requirements, brand assets, colors,
> references, content, and functionality will be provided separately in
> the prompt.

## 1. Follow the Project Brief

-   Treat the latest user-provided prompt, requirements, and acceptance
    criteria as the source of truth.
-   Use the provided website references for direction, not as permission
    to copy protected assets or reproduce unrelated content.
-   Do not invent requirements, features, pages, integrations, business
    logic, or content that were not requested.
-   If a critical requirement is ambiguous or contradictory, ask a
    concise clarification before making a risky assumption. For minor
    details, choose the simplest consistent solution.
-   Do not silently remove, weaken, or change existing functionality to
    make implementation easier.
-   Before editing an existing project, inspect its structure,
    framework, dependencies, conventions, routes, data flow, and current
    implementation.

## 2. No Fake, Dummy, or Misleading Data

-   Never use fake, fabricated, placeholder, or randomly generated
    business data in production-facing UI.
-   Do not invent users, testimonials, reviews, ratings, customer logos,
    statistics, sales figures, analytics, addresses, contact details,
    products, prices, inventory, transactions, or success metrics.
-   Do not make a UI look functional by hardcoding sample records or
    fabricated API responses.
-   Use real data from the approved API, database, CMS, or user-provided
    source.
-   If required data is unavailable, handle the empty, loading, or error
    state honestly. Do not disguise missing data as real data.
-   Use clearly labeled placeholders only when explicitly requested for
    a prototype, and ensure they cannot be mistaken for production data.
-   Never seed or alter production data without explicit authorization.
-   Do not claim an action succeeded unless the underlying operation
    actually succeeded.

## 3. No Vibe-Coded or Superficial Components

-   Do not add generic, repetitive, decorative, or unnecessary
    components merely to make the site look impressive.
-   Avoid common AI-generated design clichés: excessive gradients,
    glowing borders, glassmorphism everywhere, floating blobs, random
    abstract shapes, oversized rounded cards, meaningless badges, and
    gratuitous animations.
-   Do not add sections, cards, charts, counters, testimonials, feature
    grids, or decorative UI without a clear product or user need.
-   Every component must serve a defined purpose and fit the product's
    information architecture.
-   Avoid overengineering, unnecessary abstractions, duplicate
    components, and needless dependencies.
-   Prefer clean, maintainable, reusable components over rushed one-off
    implementations, but do not abstract simple UI without a reason.
-   Do not create fake interactivity. Every visible control must work as
    expected or be clearly presented as unavailable/disabled.

## 4. Brand Colors and Visual Identity

-   Use only the brand colors, typography, logo, and design tokens
    provided by the user or already defined in the project.
-   Do not invent, replace, or introduce a new brand palette.
-   Do not use arbitrary colors for backgrounds, text, borders,
    gradients, shadows, charts, or interactive states.
-   If a required state has no supplied token, derive a restrained,
    accessible variation from the approved palette or ask for guidance
    when the choice materially affects the brand.
-   Never stretch, distort, recolor, or recreate a supplied logo unless
    explicitly instructed.
-   Keep visual choices consistent across pages and components.
-   Centralize repeated design values in theme variables, CSS custom
    properties, or the project's existing token system instead of
    scattering hardcoded values.
-   Do not introduce a dark background or any other strong visual
    treatment unless the supplied brand direction supports it.

## 5. Icons and Visual Assets

-   Never use emojis as interface icons, buttons, navigation symbols,
    status indicators, or decorative replacements for proper icons.
-   Use a consistent professional icon library such as **Lucide**
    (`lucide-react` when using React), or the project's already-approved
    icon library.
-   Do not mix unrelated icon styles, weights, or sizes.
-   Use icons with clear meaning. Add accessible labels where an
    icon-only control would otherwise be unclear.
-   Do not use Unicode symbols as substitutes for interface icons.
-   Prefer supplied assets or approved, properly licensed assets. Do not
    hotlink random images or use assets without checking their source
    and usage rights.
-   Do not use broken image URLs, unrelated stock imagery, or generated
    imagery as a substitute for required real product assets.
-   Provide useful alt text for meaningful images; use empty alt text
    for purely decorative images.

## 6. Modern, High-Quality UI

-   Build a polished, modern, product-appropriate interface with clear
    hierarchy, deliberate spacing, readable typography, and consistent
    alignment.
-   Prioritize clarity, usability, visual consistency, and task
    completion over visual novelty.
-   Use a coherent spacing scale, type scale, border treatment,
    elevation system, and responsive layout.
-   Avoid clutter, excessive card nesting, unnecessary separators,
    inconsistent radii, and overuse of shadows.
-   Ensure text and controls have sufficient contrast and remain legible
    across supported themes.
-   Design all important states: default, hover, focus, active,
    disabled, loading, empty, success, and error, where applicable.
-   Use animation sparingly and only when it improves feedback or
    comprehension. Respect reduced-motion preferences.
-   Avoid layout shifts when data loads, images appear, or validation
    messages are displayed.
-   Do not add a component or effect solely because it is fashionable.

## 7. Responsive Design

-   Support mobile, tablet, laptop, and large desktop layouts.
-   Do not design only for a desktop screenshot and then squeeze it onto
    mobile.
-   Prevent horizontal overflow, clipped content, overlapping elements,
    and inaccessible controls.
-   Use responsive layouts and sensible breakpoints consistent with the
    project.
-   Ensure navigation, forms, tables, dialogs, menus, and complex
    sections remain usable on touch devices.
-   Test narrow viewports as well as common desktop sizes.

## 8. Accessibility

-   Use semantic HTML and the correct elements for links, buttons,
    headings, forms, navigation, and landmarks.
-   Ensure the site can be navigated with a keyboard and has visible
    focus indicators.
-   Associate form controls with accessible labels and provide
    understandable validation messages.
-   Do not communicate status or meaning through color alone.
-   Provide accessible names for icon-only controls and suitable ARIA
    attributes only when needed.
-   Maintain logical heading order, sufficient contrast, and appropriate
    image alternatives.
-   Ensure dialogs, dropdowns, menus, and other interactive components
    support keyboard and assistive technology use.
-   Respect reduced-motion preferences and avoid flashing or
    disorienting effects.

## 9. Production-Grade Security

-   Treat the application as production software, not a demo.
-   Never expose secrets, API keys, private tokens, passwords,
    service-role keys, or sensitive environment variables in client-side
    code, source control, logs, URLs, or error messages.
-   Keep server-only credentials and privileged operations on the
    server. Use public environment-variable prefixes only for values
    explicitly safe to expose.
-   Validate and normalize all untrusted input on the server, even if
    client-side validation exists.
-   Enforce authorization and ownership checks on the server for every
    protected resource and mutation. Hiding a button is not
    authorization.
-   Use parameterized database queries or a safe ORM. Never concatenate
    untrusted input into SQL or other executable commands.
-   Prevent common vulnerabilities, including injection, cross-site
    scripting (XSS), cross-site request forgery (CSRF) where applicable,
    insecure direct object references, broken access control, open
    redirects, and unsafe file uploads.
-   Sanitize or safely render user-generated content. Do not render
    arbitrary HTML or use unsafe HTML APIs without a justified, reviewed
    sanitization strategy.
-   Apply secure authentication and session practices appropriate to the
    chosen stack. Do not invent a custom cryptographic or authentication
    system.
-   Use least-privilege permissions, secure defaults, and server-side
    rate limiting for sensitive or abuse-prone endpoints.
-   Validate upload type, size, content, and access rules. Do not trust
    a file's extension or client-supplied MIME type alone.
-   Do not disable TLS verification, bypass access controls, weaken
    security headers, or turn off security checks to make a feature
    work.
-   Never log passwords, tokens, session identifiers, payment details,
    or unnecessary personal information.
-   Use safe error handling: provide useful user-facing messages without
    leaking stack traces, database details, internal paths, or secrets.
-   Do not add analytics, tracking, third-party scripts, external APIs,
    or data collection without a clear requirement and appropriate
    privacy consideration.
-   Do not claim the app is secure merely because it builds or runs.
    Flag meaningful risks and unresolved security work.

## 10. Data, Database, and API Integrity

-   Follow the existing database schema, validation rules, access
    policies, and API contracts unless a change is explicitly required.
-   Do not change schemas, permissions, migrations, row-level security
    policies, or production records casually.
-   Make database changes deliberate, reviewable, and reversible where
    practical. Include safe migrations when required.
-   Do not bypass row-level security or authorization rules to make data
    appear.
-   Handle network failures, timeouts, invalid responses, missing
    fields, and partial failures.
-   Validate server responses before relying on them in critical flows.
-   Avoid duplicate submissions and duplicate mutations; use idempotency
    or transaction patterns where appropriate.
-   Keep data consistency in mind for multi-step operations and use
    transactions when needed.
-   Do not silently swallow errors or return success-shaped responses
    for failed operations.
-   Never expose private records through client queries, public
    endpoints, or overly broad database policies.

## 11. Dependencies and Code Quality

-   Inspect existing dependencies and project conventions before adding
    packages.
-   Prefer the framework and libraries already present when they meet
    the requirement.
-   Add a dependency only when it provides meaningful value; avoid
    redundant packages and abandoned or suspicious packages.
-   Never install a package from an untrusted source or run unknown
    scripts without review.
-   Do not upgrade major dependencies, change frameworks, or rewrite
    project configuration without a clear reason and appropriate checks.
-   Keep code modular, readable, typed where the project supports
    typing, and consistent with existing conventions.
-   Avoid duplicated business logic, giant components, unexplained magic
    values, unnecessary effects, and fragile state synchronization.
-   Do not suppress TypeScript errors, lint rules, test failures, or
    compiler warnings merely to force a successful build.
-   Remove dead code and unused imports introduced by the change, but do
    not delete unrelated code without a reason.
-   Do not rewrite unrelated files or reformat the entire project for a
    small task.

## 12. Functional Correctness and UX States

-   Every link, button, form, menu, filter, search field, tab, modal,
    pagination control, and other interactive element must behave
    correctly.
-   Use real routes and real actions. Do not use `href="#"`, empty
    handlers, fake success toasts, or controls that do nothing.
-   Forms must validate inputs, show clear errors, preserve user-entered
    values where appropriate, and provide a genuine success state only
    after the operation succeeds.
-   Prevent accidental duplicate actions while a request is pending
    where appropriate.
-   Include loading, empty, error, and retry states for data-driven
    features.
-   Do not silently discard user input or hide failed requests.
-   Use confirmation steps for destructive or irreversible actions when
    appropriate.
-   Make destructive actions explicit and protect against accidental
    activation.
-   Ensure dates, numbers, currency, and time zones are formatted
    consistently with the product requirements.

## 13. Performance

-   Avoid unnecessary client-side JavaScript, oversized bundles,
    repeated network calls, and avoidable re-renders.
-   Use server rendering, static rendering, lazy loading, code
    splitting, caching, and image optimization when appropriate for the
    existing stack.
-   Do not fetch the same data repeatedly when it can safely be reused.
-   Avoid loading large libraries for small tasks.
-   Prevent N+1 queries and inefficient database access where relevant.
-   Reserve image dimensions or aspect ratios to reduce layout shifts.
-   Do not sacrifice security, correctness, or accessibility for a
    marginal performance gain.
-   Measure or identify the likely bottleneck before introducing complex
    optimization.

## 14. SEO and Metadata

-   Use meaningful page titles, descriptions, canonical URLs, and social
    metadata where relevant to the page.
-   Use semantic headings and descriptive link text.
-   Ensure public pages are indexable only when intended; protect
    private or authenticated pages appropriately.
-   Do not add fabricated structured data, ratings, reviews,
    organization details, or product claims.
-   Avoid duplicate titles, misleading metadata, and unnecessary keyword
    stuffing.

## 15. Privacy and Compliance

-   Collect only data necessary for the stated feature.
-   Do not expose personal or confidential information in page source,
    client state, analytics, logs, or public API responses.
-   Follow the project's stated consent, retention, and deletion
    requirements.
-   Use HTTPS for network communication and avoid sending sensitive data
    to unapproved third parties.
-   Do not add tracking or cookies without considering applicable
    consent and privacy requirements.
-   Make privacy-relevant behavior explicit rather than hidden.

## 16. Testing and Verification

-   Review the existing project and identify the relevant test, lint,
    type-check, and build commands before making changes.
-   Test the changed functionality, not just whether the page renders.
-   Verify the main success path, validation failures, empty data,
    network errors, and permission-denied behavior where relevant.
-   Check responsive behavior and keyboard accessibility for the changed
    UI.
-   Run available tests, linting, type checks, and production build when
    practical.
-   Never claim that tests passed unless they were actually run and
    passed.
-   If a check cannot be run, state that limitation and identify what
    remains unverified.
-   Do not remove or weaken tests to make the project pass.

## 17. Respect the Existing Project

-   Do not replace the framework, styling system, router, state manager,
    database client, authentication provider, or architecture unless
    explicitly requested or technically necessary.
-   Preserve existing routes, APIs, contracts, integrations, and working
    behavior unless the task requires a deliberate change.
-   Follow established naming, file organization, formatting, and
    component conventions.
-   Inspect existing shared components before creating replacements.
-   Avoid changing global styles when a scoped component-level change is
    sufficient.
-   Do not overwrite user work, secrets, environment files, migrations,
    or configuration without understanding the impact.
-   If a requested change could break compatibility or affect production
    data, explain the risk and choose a safe approach.

## 18. Required Workflow

1.  Read the full prompt and this rules file before implementation.
2.  Inspect the relevant code and existing design system before changing
    files.
3.  Identify the exact requirements, affected files, data sources,
    security implications, and acceptance criteria.
4.  Implement the smallest complete solution that satisfies the request.
5.  Reuse existing components and tokens where appropriate; add no
    unnecessary UI or dependencies.
6.  Verify the implementation with available checks and targeted
    testing.
7.  Review the final changes for fake data, nonfunctional controls,
    brand inconsistencies, emoji icons, security issues, accessibility
    problems, and unrelated modifications.
8.  Report what changed, important implementation decisions, checks
    actually run, and any remaining limitations.

## 19. Final Acceptance Checklist

Before considering work complete, confirm:

-   [ ] No fabricated or misleading production data was added.
-   [ ] No unnecessary or generic "vibe-coded" components were added.
-   [ ] Only user-provided or existing approved brand colors and design
    tokens were used.
-   [ ] No emojis or Unicode symbols were used as interface icons.
-   [ ] Icons follow one consistent approved library, preferably Lucide
    when compatible.
-   [ ] All visible interactive controls have real, appropriate
    behavior.
-   [ ] Loading, empty, success, and error states are handled where
    applicable.
-   [ ] Layout works across mobile, tablet, and desktop.
-   [ ] Semantic HTML, keyboard access, focus states, and contrast were
    considered.
-   [ ] No secrets or privileged operations are exposed to the client.
-   [ ] Server-side validation, authorization, and data access rules are
    preserved.
-   [ ] No unsafe database, file-upload, HTML-rendering, or redirect
    behavior was introduced.
-   [ ] Existing functionality and project conventions were preserved.
-   [ ] Tests and checks are reported accurately.
-   [ ] No unrelated files, features, or configuration were changed
    unnecessarily.

------------------------------------------------------------------------

**Rule priority:** Security, data integrity, and explicit user
requirements take precedence over visual polish or implementation
convenience. If a requirement cannot be met safely or honestly, explain
the limitation rather than faking the behavior.
