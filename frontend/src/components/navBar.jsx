import React from 'react'
import { useState } from 'react'
import MenuIcon from '@rsuite/icons/Menu';
import { Drawer,  Button, Placeholder, Pagination, TagPicker,  Table } from 'rsuite';
function NavBar() {
    const [open, setOpen] = useState(false);
  return (
    <div>
        <Button onClick={() => setOpen(true)}><MenuIcon/></Button>
      <Drawer open={open} onClose={() => setOpen(false)} placement='left'>
        <Drawer.Body>
          <Placeholder.Paragraph />
        </Drawer.Body>
      </Drawer>
    </div>
  )
}

export default NavBar