# Customer and Employee Management App

This is a simple React application built with TypeScript, Material UI, React Hook Form, and Zod. It allows users to create customer accounts, log in, manage employees associated with those accounts. Local storage is used as the "database" for storing customer and employee data.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A statically typed superset of JavaScript.
* **Material UI (@mui/material):** A React UI framework that implements Google's Material Design.
* **React Hook Form:** For form management.
* **Zod:** For schema declaration and validation.
* **React Router DOM:** For client-side routing.
* **Local Storage:** For client-side data storage.
* **Vite:** For development environment.

## Features

* **Sign-Up (Customer Creation):** Users can create customer accounts.
* **Login:** Users can log in with their credentials.
* **Employee Creation:** Users can create employees associated with their customer accounts.
* **View Employees:** Users can view a list of employees associated with their account.
* **Employee Management:** Employee data is stored in local storage under the customer's profile.
* **Route Protection:** Routes are protected so that only logged in users can access employee related pages.
* **Form Validation:** Form validation is implemented using Zod and React Hook Form.

## Setup and Run Locally

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run the Application:**

    ```bash
    npm run dev
    ```

4.  **Open in Browser:**

    * Open your browser and navigate to `http://localhost:5173/` (or the port specified by Vite).