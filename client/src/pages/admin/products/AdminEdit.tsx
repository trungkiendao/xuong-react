/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm,  Controller } from "react-hook-form";
import Loading from "src/components/Loading";
import {  Product } from "src/types/Product";
import useProducts from "src/hooks/useProducts";


const AdminEdit = () => {
 
const {categories,handleEditProduct,loading,product} = useProducts();


  const {
    register,
    handleSubmit,
    setValue,
    control,
   
    formState: { errors },
  } = useForm<Product>();



  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("image", product.image);
      setValue("categoryId", product.categoryId);
    }
  }, [product, setValue]);


  return (
    <>
      <Loading isShow={loading} />

      <Container>
        <Typography variant="h2" textAlign={"center"} mb={2}>
          Sửa sản phẩm
        </Typography>
        <form onSubmit={handleSubmit(handleEditProduct)}>
          <Stack gap={2}>

            <TextField
              label="Title"
              {...register("title", {
                required: "title is required",
              })}
              error={!!errors?.title?.message}
              helperText={errors?.title?.message}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", {
                required: "price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than or equal to 0",
                },
                valueAsNumber: true, 
              })}
              error={!!errors?.price?.message}
              helperText={errors?.price?.message}
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
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
              InputLabelProps={{ shrink: true }}
            />
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
            <Controller
              control={control}
              name="categoryId"
              defaultValue={{ _id: '', name: '', description: '' }}
              rules={{required: "Category is required"}}
              
              render={({ field }) => (
                <Select label="Category" {...field} >
                  {
                    categories.map(cate => (
                      <MenuItem value={cate._id}>{cate.name}</MenuItem>
                    ))
                  }
                </Select>
              )}
            />
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

export default AdminEdit;