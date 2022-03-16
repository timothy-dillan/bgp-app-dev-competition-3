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
import {RangeDatepicker} from 'chakra-dayzed-datepicker'
import api from '../utils/api';
import { useToast } from '@chakra-ui/react'

  const ProductAdd = () => {
    const toast = useToast()
    const [Img, SetImage] = useState({})
    const [Src, SetSrc] = useState("")
    const [Name, SetName] = useState("")
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("")
    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
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
       let payload = {"id":0, "original_owner":0, "owner": 0, "name": Name, "image": Src, "description": desc, "price_determinant": parseInt(price), "start_time": selectedDates[0], "end_time": selectedDates[1] }
       api.post('product/add',payload)
        .then(res => {
          toast({
            title: 'Success',
            description: res.data.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }).catch(res => {
          console.log(res)
        })
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
        <FormControl id="productDesc" isRequired>
          <FormLabel>Product Description</FormLabel>
          <Input
            placeholder="Product Description"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={desc}
            onChange={event => { setdesc(event.currentTarget.value)}}
          />
        </FormControl>
        <FormControl id="productPrice" isRequired>
          <FormLabel>Product Price</FormLabel>
          <NumberInput value={price} onChange={event => {setprice(event)}} >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl id="StartTime" isRequired>
          <FormLabel>Bid Start Time</FormLabel>
          <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
          />
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