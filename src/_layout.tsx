
import Header from './components/Header'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (

        <div className='background-gradient min-h-screen p-5 md:px-20 md:py-10'>
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout
