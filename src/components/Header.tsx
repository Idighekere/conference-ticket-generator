import logo from "../assets/logo.svg"
import arrowRight from "../assets/arrow-right.svg"

type IHeaderLinks = {
    title: string;
    url: string;
}
const headerLinks: IHeaderLinks[] = [
    {
        title: "Events",
        url: "/"
    },
    {
        title: "My Tickets",
        url: "/my-tickets"
    }, {
        title: "About Project",
        url: "/about-project"
    }
]
const Header = () => {

    const pathname = window.location.pathname
    console.log(pathname);


    return (
        <header className="flex justify-between items-center border-border-green border py-3 px-4 rounded-2xl bg-[#05252c66] sticky top-5 z-50 backdrop-blur-[2px] font-jeju">

            <div><img src={logo} alt="Logo" /></div>
            <nav className="md:flex gap-4 hidden">
                {
                    headerLinks.map((link) => <a href={link.url} className={`${pathname == link.url ? "text-white" : "text-gray"} font-normal text-[1.125rem]`} key={link.title}>{link.title}</a>)
                }
            </nav>
            <div><a href='/my-tickets' className="bg-white px-3 md:px-4 py-2 rounded-md text-base uppercase text-neutral-black flex gap-2"><p className="uppercase">My Tickets</p><img src={arrowRight} alt="arrow right icon" aria-label="arrow right icon" /></a></div>
        </header>
    )
}

export default Header
