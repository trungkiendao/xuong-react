import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "src/api/instance";
import { Category, Product } from "src/types/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "src/context/loading";
import { SubmitHandler} from "react-hook-form";

type Error = {
  message: string;
};

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null)

  const { loading, setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([])


  const { id } = useParams<{ id: string }>()
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    getProduct(id)
  }, [id])

  useEffect(() => {
    getAllProducts();
    getAllCategory()
  }, []);
  //List
  const getAllProducts = useCallback(async () => {
    setLoading(true)
    try {
      await new Promise(r=>setTimeout(r,2000));
      const { data } = await axiosInstance.get(`/product`);
      setProducts(data);
    } catch (err) {
      setError((err as Error)?.message);
      console.log((err as Error)?.message);

    }
    finally{
      setLoading(false)
    }
  }, []);

  const totalProduct = useMemo(() => products.length, [products]);


  //Get one Product


  const getProduct = async (id: string) => {

    try {
      setLoading(true);
      await new Promise(r => setTimeout(r, 2000))
      const { data } = await axiosInstance.get(`/product/${id}`)
      console.log(data);
      
      setProduct(data)
    } catch (error) {

      console.log(error)
      setNotFound(true)

    } finally {
      setLoading(false)
    }
  };




  //Delete Products

  const deleteProduct = useCallback(async (id: string) => {
    try {
      const confirmed: boolean = window.confirm("Bạn có muốn xoá không?");
      if (confirmed) {
        await axiosInstance.delete(`/product/${id}`);
        getAllProducts(); // Re-fetch products after deletion
      }
    } catch (err) {
      setError('Error deleting product');
    }
  }, []);

  //Add product
  const getAllCategory = async () => {
    const { data } = await axiosInstance.get(`/category`);
    // console.log("Alo",data);

    setCategories(data)
   

  }
 
  const handleAddProduct: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/product`, data);
      nav("/admin/products/list");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  //Edit product
  const handleEditProduct: SubmitHandler<Product> = async (data) => {
    try {
      await axiosInstance.put(`/product/${id}`, data);
      nav("/admin/products/list");
    } catch (error) {
      console.error(error); // Log error để xử lý
    }
  };




  return { totalProduct, products, product, loading, error, deleteProduct, getProduct, id, notFound, handleAddProduct,categories,handleEditProduct ,nav};
};

export default useProducts;