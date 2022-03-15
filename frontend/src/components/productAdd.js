import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Center,
    Image,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

  const ProductAdd = () => {
    const [Img, SetImage] = useState({})
    const [Src, SetSrc] = useState("")
    const [Name, SetName] = useState("")
    const [Price, SetPrice] = useState(0)
    const [Rate, SetRate] = useState(0)
    useEffect(() => {
      SetSrc(createImageURL(Img)) 
    }, [Img])

    const createImageURL = (img) => {
      try{
       return window.URL.createObjectURL(img)
      } catch{
        return ""
      }
     }

     const Submit = () => {
      alert(Name + Rate + Price + Img)
     }
    return (
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        Create New Item
        </Heading>
        <FormControl id="image">
          <FormLabel>Image</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <input id="imgholder" type="file" style={{display:"none"}} onChange={event => SetImage(event.currentTarget.files[0])} />
              <Image boxSize='200px' src={Src} onClick={ () => document.getElementById("imgholder").click()} />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="productName" isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input
            placeholder="ProductName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={Name}
            onChange={event => { SetName(event.currentTarget.value)}}
          />
        </FormControl>
        <FormControl id="productPrice" isRequired>
          <FormLabel>Product Price</FormLabel>
          <NumberInput value={Price} onChange={event => {SetPrice(event)}} >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl id="productRate" isRequired>
          <FormLabel>Product Price Rate</FormLabel>
          <NumberInput defaultValue={15} min={10} max={200} value={Rate} onChange={event => SetRate(event)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={Submit}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    )
  }
  
  export default ProductAdd