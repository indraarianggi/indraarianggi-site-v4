# Next.js Blog with Notion API and Tailwind CSS

## Getting Started

1. Clone this repository

    ```bash
    git clone git@github.com:indraarianggi/indraarianggi-site-v4.git
    ```

2. Install dependencies

    ```bash
    yarn install
    ```

3. Congfigure environment settings

    Create a file with the following name and location `.env.local` and copy the contents from `.env.example` into it. Replace the values with your specific configuration. Don't worry, this file is in the `.gitignore` so it won't get pushed to github.

    ```javascript
    NOTION_ACCESS_TOKEN=<your-notion-integration-token>
    NOTION_BLOG_DATABASE_ID=<your-notion-database-id>
    ```

4. Run development server

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resources

1. [Next.js](https://nextjs.org/)
2. [Tailwindcss](https://tailwindcss.com/)
3. [Notion API](https://developers.notion.com/)
4. [Build a Notion Powered Blog w/ NextJS & TailwindCSS](https://www.youtube.com/watch?v=LFRYYIoiIZg)

## Inspirations
1. [Learn User Interface Design website by Dwinawan](https://www.dwinawan.com/basic-introduction)
2. [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)
