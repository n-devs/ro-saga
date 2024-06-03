import React from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import InstallDialogAction from "./InstallDialogAction";

export default function InstallDialog(props:any) {
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{props.title || "ติดตั้ง Web App"}</DialogTitle>
      <DialogContent dividers={true}>
        <Box display="flex" alignItems="flex-start">
          {!!props.logo && (
            <Box mr={1}>
              <img src={props.logo} alt="logo" style={{width:"55px"}}  />
            </Box>
          )}
          {!!props.features && (
            <Box>
              <Typography variant="subtitle1">คุณสมบัติที่สำคัญ:</Typography>
              <Typography variant="body2" component="div">
                {props.features}
              </Typography>
            </Box>
          )}
        </Box>
        {!!props.description && (
          <>
            <Typography variant="subtitle1">คำอธิบาย:</Typography>
            <Typography variant="body2" component="div">
              {props.description}
            </Typography>
          </>
        )}
      </DialogContent>
      <InstallDialogAction platform={props.platform} onSubmit={props.onSubmit} onClose={props.onClose} />
    </Dialog>
  );
}