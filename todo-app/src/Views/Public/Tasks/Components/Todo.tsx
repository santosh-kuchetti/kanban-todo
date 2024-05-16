import { Draggable } from "react-beautiful-dnd";
import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { TodoType } from "../tasks-type";
import linkicon from "../../../../assets/SVG/linkicon.svg";
import attachfileicon from "../../../../assets/SVG/attachfileicon.svg";
import commenticon from "../../../../assets/SVG/commenticon.svg";

type TodoPropType = {
  todo: TodoType;
  index: number;
  editTodo?: (todo: TodoType) => void;
  deleteTodo?: (id: number) => void;
};

const Todo = ({ todo, index, editTodo, deleteTodo }: TodoPropType) => {
  const theme = useTheme();
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <Stack
          sx={{
            height: "auto",
            width: "320px",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 2,
            px: "20px",
            py: "20px",
            my: 1,
            gap: 1,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack>
            <Typography variant="s20w7c800" sx={{ textAlign: "left" }}>
              {todo.todo}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="s14w7c400" sx={{ textAlign: "left" }}>
              16th May | Created by{" "}
              <span style={{ color: "#667085" }}>Santosh</span>
            </Typography>
          </Stack>
          <Stack direction="row" gap={2}>
            <Stack direction="row" alignItems="center">
              <img
                src={linkicon}
                height="13.5px"
                width="13.5px"
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              />
              <Typography variant="s15w5c400">dribbble.com/...</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <img
                src={attachfileicon}
                height="13.5px"
                width="13.5px"
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              />
              <Typography variant="s15w5c400">main.psd</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={1}>
              <img
                src={commenticon}
                height="16px"
                width="18px"
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              />
              <Typography variant="s15w5c400">1</Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => editTodo(todo)}>
                <Edit sx={{ fontSize: "20px" }} />
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo?.id)}>
                <Delete sx={{ fontSize: "20px" }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};

export default Todo;
