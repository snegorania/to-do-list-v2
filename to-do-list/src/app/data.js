export const Lists = [
  {
    id: "l1",
    title: "Important",
    description: "Some fancy description of something",
    isImportant: true,
    isMyDay: false,
    isTasks: false,
    isUsers: false,
  },
  {
    id: "l2",
    title: "My day",
    description: "Some fancy description of something",
    isImportant: false,
    isMyDay: true,
    isTasks: false,
    isUsers: false,
  },
  {
    id: "l3",
    title: "Tasks",
    description: "Some fancy description of something",
    isImportant: false,
    isMyDay: false,
    isTasks: true,
    isUsers: false,
  },
  {
    id: "l4",
    title: "Some List",
    description: "Some fancy description of something",
    isImportant: false,
    isMyDay: false,
    isTasks: false,
    isUsers: true,
  },
  {
    id: "l5",
    title: "Learn react",
    description: "Tasks that need to be done to make list",
    isImportant: false,
    isMyDay: false,
    isTasks: false,
    isUsers: true,
  },
];

export const Tasks = [
  {
    id: "t1",
    title: "Add new task",
    isDone: false,
    isImportant: true,
    isMyDay: true,
    listId: "l4",
    description: "Add new task function",
    startTime: null,
    endTime: null,
    deadline: "2023-11-14T12:00:00",
    tags: [],
  },
  {
    id: "t2",
    title: "Show existing task",
    isDone: false,
    isImportant: false,
    isMyDay: false,
    listId: "l4",
    description: "Add show task function",
    startTime: "2023-11-13T13:00:00",
    endTime: "2023-11-13T15:00:00",
    deadline: "2023-11-14T12:00:00",
    tags: [],
  },
  {
    id: "t3",
    title: "Delete existing task",
    isDone: false,
    isImportant: false,
    isMyDay: false,
    listId: "l4",
    description: "Delete task function",
    startTime: "2023-11-13T13:00:00",
    endTime: "2023-11-13T15:00:00",
    deadline: "2023-11-14T12:00:00",
    tags: [],
  },
  {
    id: "t4",
    title: "Update existing task",
    isDone: false,
    isImportant: true,
    isMyDay: false,
    listId: "l4",
    description: "Add update task function",
    startTime: "2023-11-13T13:00:00",
    endTime: "2023-11-13T15:00:00",
    deadline: "2023-11-14T12:00:00",
    tags: [],
  },
  {
    id: "t5",
    title: "Add new list",
    isDone: false,
    isImportant: false,
    isMyDay: false,
    listId: null,
    description: "Add adding list function",
    startTime: "2023-11-13T13:00:00",
    endTime: "2023-11-13T15:00:00",
    deadline: "2023-11-14T12:00:00",
    tags: [],
  },
  {
    id: "t6",
    title: "Delete list",
    isDone: false,
    isImportant: true,
    listId: "l5",
    isMyDay: true,
    description: "Add deleting list function",
    startTime: "2023-11-16T13:00:00",
    endTime: "2023-11-16T15:00:00",
    deadline: "2023-11-16T12:00:00",
    tags: [],
  },
  {
    id: "t7",
    title: "Update list",
    isDone: false,
    isImportant: true,
    listId: "l5",
    isMyDay: true,
    description: "Add updating list function",
    startTime: "2023-11-16T13:00:00",
    endTime: "2023-11-16T15:00:00",
    deadline: "2023-11-16T12:00:00",
    tags: [],
  },
  {
    id: "t8",
    title: "Delete list",
    isDone: false,
    isImportant: true,
    isMyDay: false,
    listId: "l5",
    description: "Add deleting list function",
    startTime: "2023-11-13T13:00:00",
    endTime: "2023-11-13T15:00:00",
    deadline: "2023-11-14T12:00:00",
    tags: [],
  }
]

export const Tags = [
  {
    id: 'tag1',
    title: 'new'
  },
  {
    id: 'tag2',
    title: 'In process'
  }
]
