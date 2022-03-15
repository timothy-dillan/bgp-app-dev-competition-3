import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Flex, Heading, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useToast } from '@chakra-ui/react'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = () => {
        console.log( {username, password})
        api.post('login', {username, password})
            .then(res => {
                if (res.status == 200) {
                    navigate('/product', {replace: true})
                    return
                }
            }).catch(res => {
                toast({
                    title: 'Error',
                    description: res.data.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            })
    }

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
                <Heading color="">Login</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            boxShadow="md"
                        >
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={event => setUsername(event.currentTarget.value)}
                                    />
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
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Don't have an account yet?{" "}
                <Link color="orange.500" to="/signup">
                    Sign Up
                </Link>
            </Box>
        </Flex>
    );
};

export default LoginPage