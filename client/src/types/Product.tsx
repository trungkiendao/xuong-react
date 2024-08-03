export type Product = {
    _id: string,
    title: string,
    price: number,
    image: string,
    description: string,
    categoryId: Category,
    isShow: boolean

}

export type Category = {
    _id: string;
    name: string;
    description: string;
  };

export interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
// export type ConfirmDialogProps = {
//     open:boolean,
//     onClose:()=>void,
//     onConfirm:()=>void
// }

export type CartItem = {
    product: Product,
    quantity: number
  }