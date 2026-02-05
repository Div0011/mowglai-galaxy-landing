---
name: Scaffold Template
description: Create a new bespoke template page and register it.
---

# Scaffold Template Skill

This skill scaffolds a new bespoke HTML template for the Mowglai marketplace.

## Usage
Run this workflow to create a new template.

## Steps
1. **Create HTML File**: Create a new file in `public/previews/[id].html`.
   - Use standard HTML5 boilerplate with Tailwind CSS CDN for previewing.
   - Ensure it is standalone.

2. **Register Template**: Update `src/data/templates.ts`.
   - Add a new entry to the `templates` array.
   - key fields: `id`, `title`, `description`, `category`.

3. **Verify**:
   - Open `http://localhost:3000/explore/[id]` to see the template in the wrapper.
   - Open `http://localhost:3000/previews/[id].html` to see the raw template.

## Example Command
You can use the `run_command` tool to create the file and `multi_replace_file_content` to register it.
