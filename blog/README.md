# 📘 DevOps Blog Operator's Manual

This directory contains the autonomous, terminal-themed DevOps blog system.

## 🚀 Posting a New Challenge (Step-by-Step)

### 1. Assets
Place any architecture diagrams in the `/assets/` folder.

### 2. Generate Code
Open `blog/admin.html` in your browser. Fill the form and click **POST CHALLENGE**. Copy the generated code.

### 3. Update Data
Paste the code block into the top of the `blogPosts` array in `blog/posts.js`.

### 4. Deploy
Run the following commands:
```bash
git add .
git commit -m "Add new blog post: [Title]"
git push origin main
```

## 📂 File Structure
- `index.html`: The main blog view (Full-screen True Tone).
- `posts.js`: The central data store for all blog content.
- `admin.html`: The tool used to generate post data.
- `style.css`: The "True Tone" design system.

---
*Maintained by Antigravity AI for Piyush Chaudhari*
