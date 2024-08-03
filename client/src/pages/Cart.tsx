import { Button, Container, Stack, styled, Typography } from "@mui/material"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { CartItem } from "src/types/Product";
import { useCart } from "src/context/cart";
import { Link } from "react-router-dom";

const labels = ['Product', 'Price', 'Quantity', 'Subtotal', '']

const Cart = () => {
    const { setCart } = useCart()

    const cartsStorage = localStorage.getItem('carts') || '[]'
    const carts = JSON.parse(cartsStorage)
    let bills = 0
    carts.forEach((item:CartItem) => {
        const bill = item.product.price * item.quantity;
        bills += bill; // Cộng thêm bill vào bills
    });
    console.log(bills);
    
    // console.log(carts);
    setCart(carts.length)

    const Wrapper = styled(Stack)({
        padding: 72,
    })
    const LabelWrapper = styled(Stack)(({ theme }) => ({
        background: theme.palette.customColor.main,
    }))
    return (
        <>

            <Container></Container>
            <Wrapper>
                <LabelWrapper mb={5} direction={'row'} height={55} alignItems={'center'} justifyContent={'space-around'}>
                    {labels.map((label, index) => (
                        <Typography fontWeight={500} key={index}>{label}</Typography>
                    ))}
                </LabelWrapper>
                {carts.map((cart: CartItem, index: number) => (
                    <Stack key={index} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <img src='./item1.png' />
                            <Typography fontWeight={500}>{cart.product.title}</Typography>
                        </Stack>
                        <Typography fontWeight={500}>{cart.product.price}</Typography>
                        <Typography fontWeight={500}>{cart.quantity}</Typography>
                        <Typography fontWeight={500}>{cart.quantity*cart.product.price}</Typography>
                        <DeleteOutlinedIcon />

                    </Stack>
                ))}
                    <Stack  direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            
                        </Stack>
                        <Typography fontWeight={500}></Typography>
                        <Typography fontWeight={500}>Tổng tiền</Typography>
                        <Typography fontWeight={500}>{bills}</Typography>
                        <DeleteOutlinedIcon />

                    </Stack>
                
                    <Link to={'/products'}>
            <Button color="success" variant="contained">Tiếp tục mua hàng</Button>
            </Link>

            </Wrapper>
            
        </>

    



    )
}

export default Cart