import { Footer } from "flowbite-react";

const MyFooter = () => {


    return (
        <>
            <Footer container className="bg-secondary rounded-none p-3 h-fit fixed bottom-0 left-0">
                <Footer.Copyright className="text-white" href="https://github.com/JorgeMarles" by="Jorge Marles" year={new Date().getFullYear()} />

            </Footer>
        </>
    )
}

export default MyFooter;
