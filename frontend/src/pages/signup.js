import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Flex, Heading, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    return (
        <Flex
            flexDirection="column"
            width="100vw"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="">Sign Up</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            boxShadow="md"
                        >
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={event => setUsername(event.currentTarget.value)}
                                />
                            </FormControl>
                            <FormControl>  
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={event => setName(event.currentTarget.value)}
                                    />
                                  
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<CFaUserAlt color="gray.300" />}
                                />
                                <Input placeholder="Username" />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={event => setPassword(event.currentTarget.value)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={0}
                                variant="solid"
                                colorScheme="orange"
                                width="full"
                                onClick={() => alert(name + username + password)}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link color="orange.500" to="/login">
                    Login
                </Link>
            </Box>
        </Flex>
    );
};

export default SignupPage