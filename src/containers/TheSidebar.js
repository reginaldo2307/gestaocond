import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavItem,
} from '@coreui/react'


// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {

  return (
    <CSidebar>
      <CSidebarNav>
          <img src="/homelogo-bg.png" className="mt-2 mb-3 ml-auto mr-auto" width="70%"/>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
