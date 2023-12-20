import React from "react";
import "./App.css";
import "./app/i18n";
import RootLayout from "./pages/Layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddListPage from "./pages/AddListPage";
import EditListPage from "./pages/EditListPage";
import AddTaskPage from "./pages/AddTaskPage";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";
import DeleteListPage from "./pages/DeleteListPage";
import DeleteTaskPage from "./pages/DeleteTaskPage";
import AllListsPage from "./pages/AllListsPage";
import EditTaskPage from "./pages/EditTaskPage";
import TagFilter from './components/Tasks/TagFilter/TagFilter'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/lists",
        element: <AllListsPage />,
        children: [
          {
            path: "delete-list",
            element: <DeleteListPage />,
          },
          {
            path: "add-list",
            element: <AddListPage />,
          },
          {
            path: "edit-list",
            element: <EditListPage />,
          },
        ]
      },
      {
        path: "/lists/tag-filter",
        element: <TagFilter/>,
        children: [
          {
            path: "delete-list",
            element: <DeleteListPage />,
          },
          {
            path: "add-list",
            element: <AddListPage />,
          },
          {
            path: "edit-list",
            element: <EditListPage />,
          },
          {
            path: "delete-task",
            element: <DeleteTaskPage />,
          },
          {
            path: "edit-task",
            element: <EditTaskPage />,
          },
          {
            path: ":taskId",
            element: <TaskPage isFilter={true} />,
          },
        ]

      },
      {
        path: "/lists/:listId",
        element: <ListPage />,
        children: [
          {
            path: "tasks",
            element: <TasksPage />,
            children: [
              {
                path: "add-task",
                element: <AddTaskPage />,
              },
              {
                path: "delete-task",
                element: <DeleteTaskPage />,
              },
              {
                path: "edit-task",
                element: <EditTaskPage />,
              },
              {
                path: ":taskId",
                element: <TaskPage isFilter={false} />,
              },
              {
                path: "delete-list",
                element: <DeleteListPage />,
              },
              {
                path: "add-list",
                element: <AddListPage />,
              },
              {
                path: "edit-list",
                element: <EditListPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
