### Live link [https://gradesway-saurav.netlify.app/](https://gradesway-saurav.netlify.app/)

### Live Demo [https://drive.google.com/file/d/1Y6e6oJ6QWOmn8Rf5JvtGCjc9wITeVB_Z/view?usp=sharing](https://drive.google.com/file/d/1Y6e6oJ6QWOmn8Rf5JvtGCjc9wITeVB_Z/view?usp=sharing)

# Gradesway (demo) - Quiz Management System

Gradesway(demo) is a **quiz management system** built using the **MERN stack** ( Express, React, Node.js) with MySQL for database operations. It allows teachers to create, edit, and delete quizzes efficiently.

## 🚀 Features

-  **User Authentication**: Supports login/logout functionality with localStorage.
-  **Create Quizzes**: Teachers can create new quizzes with a title and description.
-  **Edit Quizzes**: Update quiz details through a ShadCN-based dialog.
-  **Delete Quizzes**: Remove quizzes with a confirmation prompt.
-  **Dashboard View**: Displays all created quizzes in a responsive grid layout.
-  **Dynamic UI Updates**: Fetches updated quiz data after every CRUD operation.

## 🛠️ Tech Stack

-  **Frontend**: React (TypeScript) with ShadCN UI components
-  **Backend**: Node.js + Express + TypeScript
-  **Database**: MySQL
-  **API Requests**: Axios
-  **State Management**: React Hooks

---

## 📌 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/SauravChaudhary26/Gradesway-project
cd Gradesway-project
```

### 2️⃣ Install Dependencies

#### **Frontend**

```sh
npm install
```

#### **Backend**

```sh
cd ../backend
npm install
```

### 3️⃣ Configure the Environment

Create a **.env** file in the backend directory with the following details:

```env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=aurasphere
```

### 4️⃣ Start the Project

#### **Start the Backend**

```sh
cd backend
npm start
```

#### **Start the Frontend**

```sh
cd ..
npm run dev
```

### 5️⃣ Open in Browser

Navigate to:

```
http://localhost:5173
```

---

## 📜 API Endpoints

### 🔹 **Quiz Endpoints**

You have to be logged in to use these apis.

| Method   | Endpoint        | Description       |
| -------- | --------------- | ----------------- |
| `GET`    | `/api/quiz`     | Fetch all quizzes |
| `POST`   | `/api/quiz`     | Create a new quiz |
| `PUT`    | `/api/quiz/:id` | Update a quiz     |
| `DELETE` | `/api/quiz/`    | Delete a quiz     |

---

## 📌 Contribution

Feel free to contribute to the project!

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch and create a PR.

---

## 📞 Contact

For any issues or feature requests, please open an **issue** on GitHub or contact **sauravchaudhary2609@gmail.com** or ping me at [LinkedIn](https://www.linkedin.com/in/sauravchaudhary26/).

🚀 Happy Coding!
