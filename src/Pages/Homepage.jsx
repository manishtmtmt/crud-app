import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const pr = {
        base: "0.8rem 1rem",
        sm: "0.8rem 1.2rem",
        lg: "0.8rem 1.5rem",
        xl: "1rem 2rem",
        "2xl": "1rem 3rem",
      }

      const handleClick = () => {
        navigate("/todoapp")
      }
  return (
    <Flex
      justifyContent={"center"}
      direction="column"
      alignItems="center"
      h={"60vh"}
    >
      <Heading p={pr}>CRUD APP</Heading>
      <Button p={pr} colorScheme="blue" onClick={handleClick}>Go to Todo App</Button>
    </Flex>
  );
};

export default Homepage;
