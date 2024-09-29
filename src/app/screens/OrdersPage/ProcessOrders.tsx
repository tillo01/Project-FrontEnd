/** @format */
import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import moment from "moment";

import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";

import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { Messages, serverApi } from "../../../libs/config";
import { T } from "../../../libs/types/common";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/orders";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { Product } from "../../../libs/types/product";

const pausedOrdersRetriver = createSelector(
   retrieveProcessOrders,
   (processOrders) => ({ processOrders }),
);

interface ProcessOrdersProps {
   setValue: (input: string) => void;
}
export default function ProcessOrders(props: ProcessOrdersProps) {
   const { processOrders } = useSelector(pausedOrdersRetriver);
   const { setValue } = props;
   const { authMember, setOrderBuilder } = useGlobals();

   const finishedOrdersHandler = async (e: T) => {
      try {
         if (!authMember) throw new Error(Messages.error2);
         const orderId = e.target.value;
         const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.FINISH,
         };
         const confirmation = window.confirm("Have you recived your order");
         if (confirmation) {
            const order = new OrderService();
            await order.updateOrder(input);
            setOrderBuilder(new Date());
         }
         setValue("3");
      } catch (err) {
         console.log("Error on cancelling orders");
         sweetErrorHandling(err).then();
         throw err;
      }
   };

   return (
      <TabPanel value="2">
         <Stack gap={4}>
            {processOrders?.map((order: Order) => {
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
                           <p className="data-moment">
                              {moment().format("YY-MM-DD HH:mm")}
                           </p>
                        </Box>

                        <Button
                           onClick={finishedOrdersHandler}
                           value={order._id}
                           variant="contained"
                           style={{ background: "#3A87CB", color: "#fff" }}
                           className="cancel-button">
                           VERIFY TO FULFILL
                        </Button>
                     </Box>
                  </Box>
               );
            })}

            {!processOrders ||
               (processOrders.length === 0 && (
                  <Box
                     display={"flex"}
                     flexDirection={"row"}
                     justifyContent={"center"}>
                     <img
                        src={"/icons/noimage-list.svg"}
                        style={{ width: "300px", height: "300px" }}
                     />
                  </Box>
               ))}
         </Stack>
      </TabPanel>
   );
}
