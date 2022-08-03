import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import NewTask from "../Components/NewTask";
import TaskCard from "../Components/TaskCard";
import { deleteTask, getTasks } from "../Redux/App/action";

const TodoApp = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.app.tasks);

  const getTasksHandler = useCallback(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const filterByParamTags = (task) => {
    const paramsTags = searchParams.getAll("tags");
    if (paramsTags.includes("All") || paramsTags.length === 0) {
      return task;
    }
    const data = task.tags.filter((tag) => {
      if (paramsTags.includes(tag)) return true;
      return false;
    });
    if (data.length) return task;
    return false;
  };

  const hanldeTaskDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(getTasks());
    });
  };

  const todo = tasks
    .filter((ele) => ele.task_status === "todo")
    .filter(filterByParamTags);
  const inProgress = tasks
    .filter((ele) => ele.task_status === "in-progress")
    .filter(filterByParamTags);
  const done = tasks
    .filter((ele) => ele.task_status === "done")
    .filter(filterByParamTags);

  useEffect(() => {
    if (tasks.length === 0) {
      getTasksHandler();
    }
  }, [tasks]);
  return (
    <>
      <Box
        p={{
          base: "0 2.4rem",
          md: "0 2rem",
          lg: "0 3rem",
          xl: "0 4rem",
        }}
      >
        <NewTask />
      </Box>
      <Flex
        p={{
          base: "1rem 0.5rem",
          md: "1rem 2.5rem",
          lg: "1rem 2rem",
          xl: "1 5rem",
        }}
        gap={{ base: 10, sm: 10, lg: 5, xl: 8 }}
        justify="center"
        direction={{ base: "column", sm: "column", lg: "row", xl: "row" }}
      >
        <Flex
          boxShadow="md"
          borderTopRadius={10}
          w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
          margin={{ base: "auto", lg: "0" }}
          direction="column"
        >
          <Heading
            size="md"
            borderTopRadius={10}
            w="100%"
            align="center"
            p="0.5rem"
            bg="cyan.500"
          >
            TODO
          </Heading>
          <Box>
            {todo?.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                colorScheme={"green"}
                hanldeTaskDelete={hanldeTaskDelete}
              />
            ))}
          </Box>
        </Flex>

        <Flex
          boxShadow="md"
          borderTopRadius={10}
          w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
          margin={{ base: "auto", lg: "0" }}
          direction="column"
        >
          <Heading
            size="md"
            borderTopRadius={10}
            w="100%"
            align="center"
            p="0.5rem"
            bg="yellow.500"
          >
            IN-PROGRESS
          </Heading>
          <Box>
            {inProgress?.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                colorScheme={"yellow"}
                hanldeTaskDelete={hanldeTaskDelete}
              />
            ))}
          </Box>
        </Flex>

        <Flex
          boxShadow="md"
          borderTopRadius={10}
          w={{ base: "80%", md: "70%", lg: "30%", xl: "30%" }}
          margin={{ base: "auto", lg: "0" }}
          direction="column"
        >
          <Heading
            size="md"
            borderTopRadius={10}
            w="100%"
            align="center"
            p="0.5rem"
            bg="red.500"
          >
            DONE
          </Heading>
          <Box>
            {done?.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                colorScheme={"blue"}
                hanldeTaskDelete={hanldeTaskDelete}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default TodoApp;
