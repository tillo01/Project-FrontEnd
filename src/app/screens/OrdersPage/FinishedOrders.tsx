/** @format */
import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import moment from "moment";

import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobals";
import { Messages, serverApi } from "../../../libs/config";
import { T } from "../../../libs/types/common";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/orders";
import { OrderStatus } from "../../../libs/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { Product } from "../../../libs/types/product";

const FinishedOrdersRetriver = createSelector(
   retrieveFinishedOrders,
   (finishedOrders) => ({ finishedOrders }),
);

interface finishedOrdersProps {
   setValue: (input: string) => void;
}

export default function FinishedOrders(props: finishedOrdersProps) {
   const { finishedOrders } = useSelector(FinishedOrdersRetriver);
   const { authMember, setOrderBuilder } = useGlobals();

   const { setValue } = props;

   const deleteOrderHandler = async (e: T) => {
      try {
         if (!authMember) throw new Error(Messages.error2);
         const orderId = e.target.value;
         const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.DELETE,
         };
         const confirmation = window.confirm("Do you want to delete order");
         if (confirmation) {
            const order = new OrderService();
            await order.updateOrder(input);
            setOrderBuilder(new Date());
         }
      } catch (err) {
         console.log("Error on cancelling orders");
         sweetErrorHandling(err).then();
         throw err;
      }
   };

   return (
      <TabPanel value="3">
         <Stack gap={4}>
            {finishedOrders?.map((order: Order) => {
               return (
                  <Box
                     key={order._id}
                     className="order-main-box">
                     {order?.orderItems?.map((item: OrderItem) => {
                        const product: Product = order.productData.filter(
                           (ele: Product) => item.productId === ele._id,
                        )[0];
                        const imagePath = `${serverApi}/${product.productImages[0]}`;

                        return (
                           <Box
                              key={item._id}
                              className="order-name-price">
                              <Box className="order-first-box">
                                 <img
                                    src={imagePath}
                                    className="orders-dish-img"
                                    alt="Dish"
                                 />
                                 <p className="title-dish">
                                    {product.productName}
                                 </p>
                              </Box>

                              <Box className="price-box">
                                 <p>${item.itemPrice}</p>
                                 <img
                                    src="/icons/close.svg"
                                    alt="Close"
                                 />
                                 <p>{item.itemQuantity}</p>

                                 <img
                                    src="/icons/pause.svg"
                                    alt="Pause"
                                 />
                                 <p style={{ marginLeft: "15px" }}>
                                    ${item.itemQuantity * item.itemPrice}
                                 </p>
                              </Box>
                           </Box>
                        );
                     })}
                     <Box className="total-price-box">
                        <Box
                           className="box-total"
                           display="flex"
                           alignItems="center">
                           <p>Product Price</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderTotal - order.orderDelivery}
                           </p>
                           <img
                              src="/icons/plus.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Plus"
                           />
                           <p>Delivery cost</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderDelivery}
                           </p>
                           <img
                              src="/icons/pause.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Pause"
                           />
                           <p>Total</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderTotal}
                           </p>
                        </Box>
                     </Box>
                     <Button
                        value={order._id}
                        variant="contained"
                        color="secondary"
                        className="cancel-button"
                        onClick={deleteOrderHandler}>
                        Delete Orders History
                     </Button>
                  </Box>
               );
            })}

            {false && (
               <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}>
                  <img
                     src={"/icons/noimage-list.svg"}
                     style={{ width: "300px", height: "300px" }}
                  />
               </Box>
            )}
         </Stack>
      </TabPanel>
   );
}
