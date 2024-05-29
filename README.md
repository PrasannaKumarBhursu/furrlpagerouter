# Furrl Assignment

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Technologies Used](#technologies-used)AC


## Installation

To get started, follow these steps:

1. Clone the repository:

    ```bash
    https://github.com/PrasannaKumarBhursu/furrlpagerouter.git
    ```

2. Install dependencies:

    ```bash
    cd furrlpagerouter
    npm install
    ```

## Usage

To run the project locally:

```bash
npm run dev
```

## Features 

- **Static Generation with `getStaticProps`**: Utilize Next.js's `getStaticProps` to fetch data at build time for each product page. This ensures fast load times and better SEO by pre-rendering pages with static content .

- **Infinite Scroll**: Implement a feature where new product pages are loaded automatically as users scroll down the page.
  
- **Product Click**: Clicking on a product should redirect the user to the corresponding product details page.
  
- **Share Button**: Include a share button on each product item that, when clicked, opens a generic share component containing the link to the product details page. [Adapatable to both Mobile devices and Desktop ]

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)


