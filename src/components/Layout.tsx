import { ReactNode } from "react"
import MyAppBar from "./MyAppBar"

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
 return (
   <>
    {children}
    <MyAppBar/>
   </>
 )
}

export default Layout