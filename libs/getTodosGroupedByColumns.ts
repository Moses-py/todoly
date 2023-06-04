import { database } from "@/appwrite";

export const getTodosGroupedByColumn = async () => {
  // Fetch our todos from appwrite
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TODOS_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });
    return acc;
  }, new Map<TypedColumn, Column>());

  //   If the columns have no inprogress todos, add them with empty todos

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }
  //   Sort columns by columnType

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (inital, final) =>
        columnTypes.indexOf(inital[0]) - columnTypes.indexOf(final[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
