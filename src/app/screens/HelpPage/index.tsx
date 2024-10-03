/** @format */

import React, { useEffect, useState } from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { terms } from "../../../libs/data/terms";
import { faq } from "../../../libs/data/faq";
import axios from "axios";
import { T } from "../../../libs/types/common";
import { serverApi } from "../../../libs/config";
import { sweetTopSuccessAlert } from "../../../libs/sweetAlert";

export default function HelpPage() {
   const [value, setValue] = React.useState("1");

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [subject, setSubject] = useState("");
   const sendEmail = async (e: T) => {
      e.preventDefault();
      const url = `${serverApi}/order/send-message`;

      const data = {
         name,
         email,
         subject: "Contact from Help Page",
         message,
      };

      try {
         const result = await axios.post(url, data);
         if (result) {
            console.log("Message sent successfully:", result);
            sweetTopSuccessAlert("Email send succesfully");
            setName("");
            setEmail("");
            setMessage("");
            setSubject("");
            sessionStorage.setItem("activeTab", "3");
            window.location.reload();
         } else {
            console.log("Failed to send message");
         }
      } catch (error) {
         console.error("An error occurred while sending the message:", error);
      }
   };
   useEffect(() => {
      const storedTab = sessionStorage.getItem("activeTab");
      if (storedTab) {
         setValue(storedTab);
         sessionStorage.removeItem("activeTab");
      }
   }, []);
   /** HANDLERS **/
   const handleChange = (e: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };

   const emailHandler = (e: T) => {
      setEmail(e.target.value);
   };

   const messageHandler = (e: T) => {
      setMessage(e.target.value);
   };

   const subjectHandler = (e: T) => {
      setSubject(e.target.value);
   };

   const nameHandler = (e: T) => {
      setName(e.target.value);
   };

   // Handle form submission

   return (
      <div className={"help-page"}>
         <Container className={"help-container"}>
            <TabContext value={value}>
               <Box className={"help-menu"}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                     <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        className={"table_list"}>
                        <Tab
                           label="TERMS"
                           value={"1"}
                        />
                        <Tab
                           label="FAQ"
                           value={"2"}
                        />
                        <Tab
                           label="CONTACT"
                           value={"3"}
                        />
                     </Tabs>
                  </Box>
               </Box>
               <Stack>
                  <Stack className={"help-main-content"}>
                     <TabPanel value={"1"}>
                        <Stack className={"rules-box"}>
                           <Box className={"rules-frame"}>
                              {terms.map((value, number) => {
                                 return <p key={number}>{value}</p>;
                              })}
                           </Box>
                        </Stack>
                     </TabPanel>
                     <TabPanel value={"2"}>
                        <Stack className={"accordion-menu"}>
                           {faq.map((value, number) => {
                              return (
                                 <Accordion key={number}>
                                    <AccordionSummary
                                       expandIcon={<ExpandMoreIcon />}
                                       aria-controls="panel1a-content"
                                       id="panel1a-header">
                                       <Typography>{value.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <Typography>{value.answer}</Typography>
                                    </AccordionDetails>
                                 </Accordion>
                              );
                           })}
                        </Stack>
                     </TabPanel>
                     <TabPanel value={"3"}>
                        <Stack className={"admin-letter-box"}>
                           <Stack className={"admin-letter-container"}>
                              <Box className={"admin-letter-frame"}>
                                 <span>Contact us!</span>
                                 <p>Fill out below form to send a message!</p>
                              </Box>
                              <form
                                 onSubmit={sendEmail} // Handle form submission
                                 className={"admin-letter-frame"}>
                                 <div className={"admin-input-box"}>
                                    <label>Your name</label>
                                    <input
                                       type={"text"}
                                       name={"memberNick"}
                                       placeholder={"Type your name here"}
                                       onChange={nameHandler}
                                    />
                                 </div>
                                 <div className={"admin-input-box"}>
                                    <label>Your email</label>
                                    <input
                                       type={"text"}
                                       name={"memberEmail"}
                                       placeholder={"Type your email here"}
                                       onChange={emailHandler}
                                    />
                                 </div>
                                 <div className={"admin-input-box"}>
                                    <label>Message</label>
                                    <textarea
                                       name={"memberMsg"}
                                       onChange={messageHandler}
                                       placeholder={"Your message"}></textarea>
                                 </div>
                                 <Box
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                    sx={{ mt: "30px" }}>
                                    <Button
                                       type={"submit"}
                                       variant="contained">
                                       Send
                                    </Button>
                                 </Box>
                              </form>
                           </Stack>
                        </Stack>
                     </TabPanel>
                  </Stack>
               </Stack>
            </TabContext>
         </Container>
      </div>
   );
}
