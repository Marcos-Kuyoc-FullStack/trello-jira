import { useContext } from "react";
import { Drawer, Typography, Box, ListItem, List, ListItemIcon, ListItemText, Divider } from "@mui/material"

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from "../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
  const {sideMenuOpen, closeSideMenu} = useContext(UIContext)

  return (
    <Drawer
      anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{width: 250}}>
        <Box sx={{padding: '5px 10px'}}>
          <Typography>Menú</Typography>
        </Box>
        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </ListItem>
            ))
          }
        </List>
        <Divider></Divider>
      </Box>
    </Drawer>
  )
}
