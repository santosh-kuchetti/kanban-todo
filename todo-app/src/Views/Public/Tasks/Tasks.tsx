import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AddTodoModal from "./Components/AddTodoModal";
import { TodoType } from "./tasks-type";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../../../API";
import Todo from "./Components/Todo";
import Todoskeleton from "./Components/Todoskeleton";
import { AppContext } from "../../../context";

const Tasks = () => {
  const theme = useTheme();
  const { dispatchCountEvent } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>({
    completed: false,
    id: null,
    todo: "",
    userId: 1,
  });
  const [isAddTodo, setIsAddTodo] = useState<boolean>(true);
  const [pendingTodos, setPendingTodos] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const handleClose = useCallback(() => {
    setEditingTodo({ completed: false, id: null, todo: "", userId: 1 });
    setOpen(!open);
  }, [open]);

  const deleteTodoData = useCallback(async (todoId: number) => {
    try {
      await deleteTodo(todoId);

      setPendingTodos((prevPendingTodos) => {
        const updatedPendingTodos = prevPendingTodos.filter(
          (todo) => todo.id !== todoId
        );
        const updatedPendingCount = updatedPendingTodos.length;

        setCompletedTodos((prevCompletedTodos) => {
          const updatedCompletedTodos = prevCompletedTodos.filter(
            (todo) => todo.id !== todoId
          );
          const updatedCompletedCount = updatedCompletedTodos.length;

          dispatchCountEvent(
            "UPDATE_TASKCOUNT",
            updatedPendingCount + updatedCompletedCount
          );

          return updatedCompletedTodos;
        });

        return updatedPendingTodos;
      });
    } catch (error) {
      console.error("Error while deleting todo:", error);
    }
  }, []);

  const editTodo = useCallback((todo: TodoType) => {
    setIsAddTodo(false);
    setOpen(true);
    setEditingTodo(todo);
  }, []);

  const handleAddTodo = useCallback(
    async (todoData: string) => {
      // ensureing todo text is not empty
      if (todoData.trim()) {
        try {
          const response = await addTodo({
            todo: todoData,
            completed: false,
            userId: 1,
          });

          setPendingTodos((prevPendingTodos) => {
            const updatedPendingTodos = [...prevPendingTodos, response.data];
            const updatedPendingCount = updatedPendingTodos.length;

            setCompletedTodos((prevCompletedTodos) => {
              const updatedCompletedCount = prevCompletedTodos.length;

              dispatchCountEvent(
                "UPDATE_TASKCOUNT",
                updatedPendingCount + updatedCompletedCount
              );

              return prevCompletedTodos;
            });
            return updatedPendingTodos;
          });
        } catch (error) {
          console.error("Error while adding todo:", error);
        }
      }
    },
    [dispatchCountEvent]
  );

  const saveTodoEdit = useCallback(
    async (todoData: TodoType) => {
      // ensureing todo text is not empty
      if (todoData.todo && todoData.todo.trim()) {
        try {
          await updateTodo({
            todo: todoData.todo,
            completed: todoData.completed,
            userId: todoData.userId || 1,
          });

          const updatedTodos = pendingTodos.map((todo) =>
            todo.id === todoData.id ? { ...todo, todo: todoData.todo } : todo
          );
          setPendingTodos(updatedTodos);

          const updatedCompletedTodos = completedTodos.map((todo) =>
            todo.id === todoData.id ? { ...todo, todo: todoData.todo } : todo
          );
          setCompletedTodos(updatedCompletedTodos);

          setEditingTodo(null);
        } catch (error) {
          console.error("Error while editing todo:", error);
        }
      }
    },
    [pendingTodos, completedTodos]
  );

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      const sourceColumn = source.droppableId;
      const destinationColumn = destination.droppableId;

      if (sourceColumn === destinationColumn) {
        // Reordering within the same list
        const items =
          sourceColumn === "pending" ? pendingTodos : completedTodos;
        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, removed);

        sourceColumn === "pending"
          ? setPendingTodos(reorderedItems)
          : setCompletedTodos(reorderedItems);
      } else {
        // Moving between lists
        const sourceItems =
          sourceColumn === "pending" ? pendingTodos : completedTodos;
        const [removed] = sourceItems.splice(source.index, 1);

        const destinationItems =
          destinationColumn === "pending" ? pendingTodos : completedTodos;
        const updatedDestinationItems = [...destinationItems];
        updatedDestinationItems.splice(destination.index, 0, removed);

        if (destinationColumn === "pending") {
          setPendingTodos(updatedDestinationItems);
          setCompletedTodos(sourceItems);
        } else {
          setPendingTodos(sourceItems);
          setCompletedTodos(updatedDestinationItems);
        }

        const completed = destinationColumn === "completed";
        updateTodo(removed, completed);
      }
    },
    [pendingTodos, completedTodos]
  );

  useEffect(() => {
    const getTodosData = async () => {
      setIsLoading(true);
      const response = await getTodos(1);
      const tempData: TodoType[] = response.data.todos;
      dispatchCountEvent("UPDATE_TASKCOUNT", tempData.length);
      setCompletedTodos(tempData.filter((item) => item.completed));
      setPendingTodos(tempData.filter((item) => !item.completed));
      setIsLoading(false);
    };
    getTodosData();
  }, []);

  const addTodoMemoized = useMemo(() => handleAddTodo, [handleAddTodo]);

  const saveTodoEditMemoized = useMemo(() => saveTodoEdit, [saveTodoEdit]);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setIsAddTodo(true);
        }}
        sx={{
          position: "absolute",
          right: 20,
          top: 20,
          backgroundColor: theme.palette.info.main,
        }}
        style={{ border: "none", outline: "none" }}
      >
        <Typography variant="s16w7c500">Add Todo</Typography>
      </Button>
      <Stack sx={{ position: "absolute", left: 400, top: 80 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Stack
            sx={{
              flexDirection: "row",
              height: "100%",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <Stack>
              <Droppable droppableId={"pending"}>
                {(provided) => (
                  <Stack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ gap: 4 }}
                  >
                    <Typography variant="s15w7c500" textAlign="left">
                      Todo
                    </Typography>
                    <Stack>
                      {isLoading
                        ? [...new Array(3)].map((_, index) => (
                            <Todoskeleton key={index} />
                          ))
                        : pendingTodos.map((item, index) => (
                            <Todo
                              key={item.id}
                              todo={item}
                              index={index}
                              editTodo={editTodo}
                              deleteTodo={deleteTodoData}
                            />
                          ))}
                    </Stack>
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Stack>
            <Stack>
              <Droppable droppableId={"completed"}>
                {(provided) => (
                  <Stack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ gap: 4 }}
                  >
                    <Typography variant="s15w7c500" textAlign="left">
                      Done
                    </Typography>
                    <Stack>
                      {isLoading
                        ? [...new Array(3)].map((_, index) => (
                            <Todoskeleton key={index} />
                          ))
                        : completedTodos.map((item, index) => (
                            <Todo
                              key={item.id}
                              todo={item}
                              index={index}
                              editTodo={editTodo}
                              deleteTodo={deleteTodoData}
                            />
                          ))}
                    </Stack>
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </Stack>
          </Stack>
        </DragDropContext>
      </Stack>
      <AddTodoModal
        open={open}
        handleClose={handleClose}
        initForm={editingTodo}
        isAddTodo={isAddTodo}
        saveTodoEdit={saveTodoEditMemoized}
        addTodo={addTodoMemoized}
        setInitForm={setEditingTodo}
      />
    </Box>
  );
};

export default Tasks;
