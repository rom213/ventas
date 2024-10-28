import image from "../../images/Recurso_2.png";

const SectionCards = () => {
    return (
        <div className="h-full w-full p-6 sm:p-16 md:p-28">
            <div className="flex gap-16 flex-col h-full">
                <div className="md:w-[450px] ml-3 flex gap-5 flex-col">
                    <h3 className="text-6xl font-extrabold">Content 1</h3>
                    <span className="text-xl text-[#99a4b6] font-semibold">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua
                    </span>
                </div>
                <div className="w-full h-full grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="grid gap-5">
                        <div>
                            <img src={image.src} alt="" />
                        </div>
                        <span className="text-xl text-[#99a4b6] font-semibold">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt
                            ut labore et dolore magna
                            aliqua
                        </span>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <img src={image.src} alt="" />
                        </div>
                        <span className="text-xl text-[#99a4b6] font-semibold">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt
                            ut labore et dolore magna
                            aliqua
                        </span>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <img src={image.src} alt="" />
                        </div>
                        <span className="text-xl text-[#99a4b6] font-semibold">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt
                            ut labore et dolore magna
                            aliqua
                        </span>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <img src={image.src} alt="" />
                        </div>
                        <span className="text-xl text-[#99a4b6] font-semibold">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt
                            ut labore et dolore magna
                            aliqua
                        </span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SectionCards