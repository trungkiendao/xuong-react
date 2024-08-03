
/* eslint-disable no-empty */
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Loading from "src/components/Loading";
import useProducts from "src/hooks/useProducts";
import { Product } from "src/types/Product";



const AdminAdd = () => {
 
  const {handleAddProduct,categories,loading} = useProducts();





  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();




  return (
    <>
      <Loading isShow={loading} />

      <Container>
        <Typography variant="h2" textAlign={"center"} mb={2}>
          Thêm sản phẩm
        </Typography>
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <Stack gap={2}>

            <TextField
              
              label="Title"
              {...register("title", {
                required: "title is required",
              })}
              error={!!errors?.title?.message}
              helperText={errors?.title?.message}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", {
                required: "price is required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Giá phải lớn hơn 0",
                },
              })}
              error={!!errors?.price?.message}
              helperText={errors?.price?.message}
            />

            <TextField
              label="Image"
              {...register("image", {
                required: "image is required",
                minLength: {
                  value: 6,
                  message: "image is min length 6 characters",
                },
              })}
              error={!!errors?.image?.message}
              helperText={errors?.image?.message}
            />
            <TextField
              label="Description"
              {...register("description", {
                required: "description is required",
                minLength: {
                  value: 6,
                  message: "description is min length 6 characters",
                },
              })}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
            />
            {/* <TextField
              label="Category"
              {...register("category", {
                required: "category is required"
              
              })}
              error={!!errors?.category?.message}
              helperText={errors?.category?.message}
            /> */}
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select label="Category" {
                ...register('categoryId', {
                  required: "Category is required"
                })
              }>
                {
                  categories.map(cate => (
                    <MenuItem value={cate._id}>{cate.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="isShow-label">IsShow</InputLabel>
              <Select label="isShow" {
                ...register('isShow', {
                  required: "IsShow is required"
                })
              }>
               
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                 
              </Select>
            </FormControl>




            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default AdminAdd;