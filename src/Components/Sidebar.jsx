import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { logout } from "../Redux/Auth/action";
import { getData } from "../Utils/localStorage";
import DrawerButtons from "./DrawerButtons";

const user = getData("user");

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsTags = searchParams.getAll("tags");

  const [selectedTags, setSelectedTags] = useState(paramsTags || []);

  const tasks = useSelector((state) => state.app.tasks);
  const personal = tasks.filter((item) => item.tags.includes("Personal"));
  const official = tasks.filter((item) => item.tags.includes("Official"));
  const others = tasks.filter((item) => item.tags.includes("Others"));

  const buttons = [
    { title: "All", color: "green", length: tasks.length },
    { title: "Personal", color: "blue", length: personal.length },
    { title: "Official", color: "teal", length: official.length },
    { title: "Others", color: "orange", length: others.length },
  ];

  const handleTagChange = (tag) => {
    let newSelectedTags = [...selectedTags];
    if (selectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTags) {
      setSearchParams({ tags: selectedTags });
    }
  }, [selectedTags, setSearchParams]);

  const handleLogout = () => {
    onClose();
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Tooltip label="menu" placement="auto">
        <Button ref={btnRef} fontSize="3xl" onClick={onOpen} bg="none">
          <HamburgerIcon />
        </Button>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex direction={"column"}>
              <DrawerHeader>My Profile</DrawerHeader>
              {user && (
                <Flex w="100%" pl="1rem" gap={5} mb="1rem">
                  <Box fontSize={"30px"} colorScheme="blue">
                    <i className="fa-solid fa-user"></i>
                  </Box>
                  <Box>
                    <Text>{user.username}</Text>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                  </Box>
                </Flex>
              )}
              <hr />
              <DrawerHeader>Filter By</DrawerHeader>
              <Box>
                {buttons?.map((item, index) => (
                  <DrawerButtons
                    item={item}
                    key={index}
                    handleTagChange={handleTagChange}
                    selectedTags={selectedTags}
                  />
                ))}
              </Box>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button w="95%" m="auto" colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
