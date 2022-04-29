import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://r2solution.com.br" target="_blank" rel="noopener noreferrer">Sistema de Gerenciamento de Condomínio</a>
        <span className="ml-1">&copy; 2021 .</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Desenvolvido por </span>
        <a href="https://r2solution.com.br" target="_blank" rel="noopener noreferrer">R2 Solution Brasil</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
