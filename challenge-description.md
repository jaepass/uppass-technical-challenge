# UpPass Frontend Developer: Technical Assignment 2025

Objective: Create a Form Renderer + Mini-Form Builder

This challenge is designed to simulate a challenge we face every day: creating a UI that's not only functional, but also easy to use, beautiful, and feels great. We're looking to demonstrate your problem-solving skills, creativity, and attention to detail in UX/UI.

The Challenge: Create a Dynamic Form Page from JSON Schema
You will need to create a web application page that can retrieve JSON Schema data from the API Endpoint we provide and render it into a form page.

This is called a "schema." It's used to render web forms. The web itself is divided into two parts.

1. Builder: This is the admin UI, allowing you to add, subtract, toggle, and set settings (such as allow_decimal, label, and visible) to create the schema.

2. Form: The user UI is the form rendered from the schema. It can be filled out, submitted, dragged, and configured.

TASKS:

1. Analyze the schema to determine if it's well-designed. If you feel any changes, additions, or deletions need to be made, you can make those changes as you see fit (but don't remove features).

2. Create a Form Builder page to create this schema, allowing you to:
  a) add and remove items;
  b) drag and reorder items;
  c) edit individual item configurations (based on the schema);
  d) save or export the schema for viewing.


3. Create a form page that can
  a) Load or Improve Schema and render.
  b) Displays the results according to the schema.
  c) Users can actually take action on each item.
  d)There's a Submit button at the bottom, simulating sending to the Save Backend.
  e) Customers cannot click Inspect HTML to view the schema.
  f)Deploy projects to make them available online (e.g. Vercel, Netlify, Cloudlfare Pages, GitLab Pages).

# RESTRICTIONS:

- You can code with any version of Vue. You can use any UI Framework, Components, and Styling.
- Bundle with Vue.
- Item must have at least three types:
  - Text Input
  - Number Input
  - Select Input (Single Choice)
- Each type must have its own component file(s). Do not combine all logic/content in a single file.
- Each configuration should be pre-defined. A more complex example would be:
  - Rule: This criteria is used to validate whether an error occurs upon submission.
  - Visible: This item will be displayed only if the item's rules meet the criteria.
  

# BONUS TASKS:

1. Create a directory that makes sense for projects that prioritize scalability.
2. Optimize Vite Configuration (whichever you think is best, based on your personal opinion).
3. Develop a builder that provides a user-friendly UX/UI for non-tech users.
Add item types or configurations for each type as needed.


# Tech Stack:
- Framework: Vue.js (v3)
- Styling: Tailwind CSS
- Language: TypeScript


# Bonus Points (optional):
- Performing Form Validation (e.g., checking if is_required is true)
- Managing Complex State with a State Management Library (e.g., Pinia)
- Creating Components for Date Input


# Submission:
- Please provide a link to the GitHub/GitLab repository containing all of your source code, including a link to your deployed website.
- In the README.md file, please describe your design concepts, key technical decisions, and how your project will run.

# Evaluation Criteria:
- We will evaluate your submission on several dimensions:
- Code Quality: Cleanliness, organization, and maintainability of the code
- UX/UI Implementation: Aesthetics, attention to detail, and, most importantly, the fluidity of animations and transitions
- Problem-Solving: Problem-solving approach and application structure
- Completion: Ability to meet all requirements