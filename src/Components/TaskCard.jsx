import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks, updateSubTasksStatus } from "../Redux/App/action";

const TaskCard = ({
  id,
  title,
  description,
  tags,
  subTasks,
  colorScheme = "green",
  hanldeTaskDelete
}) => {
  const dispatch = useDispatch();
  const [checkbox, setCheckBox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

  const handleOnchange = (value) => {
    setCheckBox(value);
    const data = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return { ...item, status: true };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubTasksStatus(id, { subTasks: data })).then(() =>
      dispatch(getTasks())
    );
  };

  return (
    <Box boxShadow="md" p="0.5rem 1rem" mb="0.8rem">
      <Flex justify="space-between" align="center">
        <Text fontSize={{ base: "xl", xl: "2xl" }} fontWeight={600}>
          {title}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<i className="fa-solid fa-ellipsis-vertical"></i>}
            variant="outline"
          />
          <MenuList size="lg">
            <Link to={`/todoapp/task/${id}`}>
              <MenuItem icon={<EditIcon />}>Edit</MenuItem>
            </Link>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => hanldeTaskDelete(id)}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <hr />
      <Box>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            colorScheme={colorScheme}
            mr="1em"
            p="0.1rem 0.5rem"
            borderRadius="10px"
          >
            {tag}
          </Badge>
        ))}
      </Box>
      <Text
        fontSize={{ base: "lg", lg: "lg", xl: "xl" }}
        m="5px 0 10px 0"
        // color={desBg}
      >
        {description}
      </Text>
      <Flex
        direction="column"
        p="0.5rem 0.2rem 0.5rem 1rem"
        gap={2}
        // bg={subTaskBG}
        borderRadius="6px"
      >
        <CheckboxGroup
          value={checkbox}
          onChange={(value) => handleOnchange(value)}
        >
          {subTasks?.map((subtask, index) => (
            <Checkbox
              textDecoration={
                checkbox.includes(subtask.subTaskTitle) ? "line-through" : ""
              }
              opacity={checkbox.includes(subtask.subTaskTitle) ? 0.5 : 1}
              key={index}
              fontWeight={500}
              value={subtask.subTaskTitle}
              colorScheme="green"
            >
              {subtask.subTaskTitle}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Flex>
      {/* <Text fontSize="xs" textAlign="end" opacity={0.6}>
        {date}
      </Text> */}
    </Box>
  );
};

export default TaskCard;
