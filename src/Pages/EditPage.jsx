import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addSubTasks,
  deleteSubTasks,
  getTasks,
  updateTasks,
} from "../Redux/App/action";

const Editpage = () => {
    const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBG = useColorModeValue("white", "black");
  const hoverBG = useColorModeValue("gray.100", "gray.800");

  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.app.tasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [checkbox, setCheckBox] = useState([]);

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTasks,
        {
          subTaskTitle: currentSubTask,
          status: false,
        },
      ];
      dispatch(addSubTasks(id, { subTasks: newSubTasks })).then(() =>
        dispatch(getTasks())
      );
    }
    setCurrentSubTask("");
  };

  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskStatus") {
      dispatch(
        updateTasks(id, {
          task_status: value,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskTags") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasks()));
    }
  };

  const updateSubTaskStatus = (checkBoxValues) => {
    let newData = subTasks.map((item) => {
      if (checkBoxValues.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });
    dispatch(addSubTasks(id, { subTasks: newData })).then(() =>
      dispatch(getTasks())
    );
  };

  const handleDelete = (title) => {
    let newData = subTasks.filter((item) => item.subTaskTitle !== title);
    dispatch(deleteSubTasks(id, { subTasks: newData })).then(() =>
      dispatch(getTasks())
    );
  };

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));
      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);
        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }
  }, [id, tasks]);

  return (
    <Box pb={{ base: "2rem 0.5rem", lg: "2rem 1rem", xl: "2rem" }} bg={bg}>
      <Heading textAlign="center" p="0.5rem" borderBottom="1px solid #A0AEC0">
        Edit It
      </Heading>
      <Box>
        <Button
          float={"right"}
          colorScheme="blue"
          fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
          p={{ base: "1rem 1rem", lg: "1rem 2rem", xl: "1rem 2rem" }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
      <Flex
        p={{ base: "0.5rem 1.6rem", lg: "1rem 3rem", xl: "1rem 5rem" }}
        gap={10}
        justify="center"
        direction={{ base: "column", sm: "column", lg: "row", xl: "row" }}
      >
        {/* task title  & description  */}
        <Box
          bg={cardBG}
          w={{ base: "100%", md: "100%", lg: "70%", xl: "40%" }}
          p="1rem 0.5rem"
          borderTopRadius={10}
          boxShadow="xl"
          direction="column"
        >
          {/* title */}
          <Stack w="95%" m="auto">
            <Input
              autoFocus
              size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
              boxShadow="md"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Textarea
              size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
              boxShadow="md"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Button
              onClick={() => {
                updateHandler("textAndDescription");
              }}
            >
              Update
            </Button>
          </Stack>

          {/* status */}
          <Box p="1rem 0.5rem">
            <Text
              fontSize="xl"
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Status
            </Text>
            <hr />
            <RadioGroup
              pt="0.5rem"
              onChange={(value) => {
                setTaskStatus(value);
                updateHandler("taskStatus", value);
              }}
              value={taskStatus}
            >
              <Stack direction="column">
                <Radio value={"todo"}>Todo</Radio>
                <Radio value={"in-progress"}>In-Progress</Radio>
                <Radio value={"done"}>Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          {/* tags */}
          <Box p="0.6rem 0.5rem">
            <Text
              fontSize="xl"
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Tags
            </Text>
            <hr />
            <CheckboxGroup
              colorScheme="green"
              value={taskTags}
              onChange={(value) => {
                setTaskTags(value);
                updateHandler("taskTags", value);
              }}
            >
              <Stack spacing={[1, 5]} direction={"column"} pt="0.5rem">
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Personal">
                  Personal
                </Checkbox>
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Official">
                  Official
                </Checkbox>
                <Checkbox _hover={{ bg: hoverBG }} p="0.3rem" value="Others">
                  Others
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>

        {/* subtask  */}
        <Box
          w={{ base: "100%", md: "100%", lg: "70%", xl: "40%" }}
          borderTopRadius={10}
          boxShadow="xl"
          p={{ base: "1rem 1rem", lg: "1rem 2rem", xl: "1rem 2rem" }}
          bg={cardBG}
        >
          <FormControl w="100%" m="auto">
            <form onSubmit={addSubTask}>
              <Input
                size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
                boxShadow="md"
                id="subtask"
                type="text"
                placeholder="Add New SubTask"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button
                w="100%"
                mt="0.5rem"
                fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                colorScheme="blue"
                type="submit"
              >
                Add
              </Button>
            </form>
          </FormControl>
          <Flex direction="column" p="1rem 0" gap={2}>
            <Text
              fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
              mb="0.5rem"
              fontWeight={500}
              boxShadow="base"
              p="0.5rem"
            >
              Sub Tasks
            </Text>
            <CheckboxGroup
              value={checkbox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTasks.length &&
                subTasks.map((item, index) => (
                  <Flex
                    key={index}
                    align={"center"}
                    justify="space-between"
                    p="0.5rem"
                    _hover={{ bg: hoverBG }}
                  >
                    <Checkbox
                      textDecoration={
                        checkbox.includes(item.subTaskTitle)
                          ? "line-through"
                          : ""
                      }
                      opacity={checkbox.includes(item.subTaskTitle) ? 0.5 : 1}
                      value={item.subTaskTitle}
                      size={{ base: "md", md: "md", lg: "lg", xl: "lg" }}
                    >
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      _hover={{ transform: "scale(1.2)", transition: "500ms" }}
                      cursor="pointer"
                      fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
                      onClick={() => handleDelete(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>
      </Flex>
      {/* <Box m="1rem 0" w="100%" textAlign="center">
        <Button
          _hover={{ transform: "scale(1.1)", transition: "1s" }}
          w={{ base: "80%", md: "90%", lg: "60%", xl: "50%" }}
          fontSize="xl"
          colorScheme="green"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box> */}
    </Box>
  );
};

export default Editpage;
