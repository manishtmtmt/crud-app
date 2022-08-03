import { Button, Flex, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  let isAuth = useSelector((state) => state.auth.isAuth);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      boxShadow="xs"
      p={{
        base: "0.8rem 1rem",
        sm: "0.8rem 1.2rem",
        lg: "0.8rem 1.5rem",
        xl: "1rem 2rem",
        "2xl": "1rem 3rem",
      }}
      justify="space-between"
      align="center"
      mb={5}
    >
      {isAuth && <Sidebar />}
      <Text
        style={{ fontFamily: "Freehand, cursive" }}
        fontSize={{ base: "3xl", sm: "3xl", lg: "4xl", xl: "5xl" }}
        lineHeight={5}
      >
        <Link to={"/"}>CRUD APP</Link>
      </Text>

      <Tooltip label="Color Mode" placement="auto">
        <Button onClick={toggleColorMode} fontSize="2xl" bg="none">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Navbar;
