import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Input,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { TodoType } from "../tasks-type";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "30vw", xs: "90vw", lg: "40vw" },

  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow:
    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
  borderRadius: 5,
  padding: 3,
  backgroundColor: "#f0f0f0",
};

interface AddInstructions {
  isAddTodo: boolean;
  open: boolean;
  handleClose: () => void;
  saveTodoEdit: (todoData: TodoType) => void;
  addTodo: (todoData: string) => void;
  initForm: TodoType | null;
  setInitForm: (Todo: TodoType) => void;
}

const AddTodoModal = ({
  isAddTodo,
  open,
  handleClose,
  initForm,
  setInitForm,
  saveTodoEdit,
  addTodo,
}: AddInstructions) => {
  const theme = useTheme();
  const [form, setForm] = useState<TodoType | null>(
    isAddTodo ? null : initForm
  );
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: any) {
    const name = e.target.name;
    let value = e.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setIsFormChanged(true);
  }

  const addTodoData = async () => {
    setIsLoading(true);
    if (isAddTodo) {
      addTodo(form.todo || "");
    } else {
      const changedTodo: TodoType = {
        id: initForm.id,
        todo: form.todo,
        completed: form?.completed,
        userId: form?.userId,
      };
      saveTodoEdit(changedTodo);
    }
    setInitForm({ completed: false, id: null, todo: "", userId: 1 });
    setIsLoading(false);
    handleClose();
  };

  const handleCloseModel = () => {
    setForm({ completed: false, id: null, todo: "", userId: 1 });
    setInitForm({ completed: false, id: null, todo: "", userId: 1 });
    handleClose();
  };

  return (
    <Stack>
      <Modal
        open={open}
        onClose={handleCloseModel}
        aria-labelledby="modal-instruction"
        aria-describedby="modal-modal-instruction"
      >
        <Box sx={style}>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: "15px",
            }}
          >
            <Typography variant="s20w7c800">
              {isAddTodo ? "Add Todo" : "Edit Todo"}
            </Typography>
            <IconButton
              onClick={handleCloseModel}
              style={{ border: "none", outline: "none", boxShadow: "none" }}
            >
              <CloseOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              cursor: "pointer",
              width: "95%",
            }}
          >
            <Stack>
              <Grid container gap={1}>
                <Grid item xs={12} xl={12} lg={12}>
                  <Input
                    id="todo"
                    name="todo"
                    placeholder="Enter title"
                    onChange={handleChange}
                    value={form?.todo || initForm?.todo}
                    fullWidth
                    disableUnderline
                    autoFocus
                    size="small"
                    sx={{
                      textAlign: "center",
                      fontFamily: "Karla",
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
              onClick={addTodoData}
              loading={isLoading}
              sx={{
                backgroundColor: theme.palette.info.main,
              }}
              style={{ border: "none", outline: "none" }}
              disabled={!isFormChanged}
            >
              <Typography variant="s16w7c500">Save</Typography>
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default AddTodoModal;
