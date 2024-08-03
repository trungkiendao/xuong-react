import { Alert, Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom";
import Loading from "src/components/Loading";
import useProducts from "src/hooks/useProducts";
// import AlertDialog from "src/components/AlertDialog";

const AdminList = () => {
  const { products, loading, error, deleteProduct ,totalProduct} = useProducts();

 




  return (

    <>
    <Loading isShow={loading}/>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID - {totalProduct}</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">IsShow</TableCell>

              <TableCell align="right" >
                <Link to={'/admin/products/add'}>
                  <Button variant="contained" color="success">Thêm</Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product._id}
                </TableCell>
                <TableCell align="right">{product.title}</TableCell>
                <TableCell align="right">
                  {
                    product.categoryId.name
                  }
                </TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">
                  {/* <img src={product.image} alt="" /> */}
                  <Box
                    src={product.image}
                    component="img"
                    sx={{
                      width: 200,  // Chiều rộng
                      height: 'auto',  // Chiều cao tự động dựa vào tỷ lệ khung hình
                      borderRadius: 4,  // Bo góc
                      boxShadow: 3,  // Đổ bóng
                      border: '1px solid #000',  // Đường viền
                    }}
                  />

                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell component="th" scope="row">
                  {product.isShow ? "True" : "False"}
                </TableCell>
                <TableCell align="right">
                  <Stack direction={'row'} gap={3} justifyContent={'center'}>
                    <Link to={`/admin/products/edit/${product._id}`}><Button variant="contained">Edit</Button></Link>
                    {/* <Button variant="contained" sx={{bgcolor:"red"}} onClick={()=>handleDialogOpen()}>Delete</Button> */}
                    <Button variant="contained" sx={{ bgcolor: "red" }} onClick={() => deleteProduct(product._id)}>Delete</Button>

                  </Stack>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <AlertDialog 
          openState={dialogOpen}
          handleCloseDialog={handleCloseDialog}
          onAgree={handleDelete}
          /> */}
      </TableContainer>

    </>
  )
}

export default AdminList