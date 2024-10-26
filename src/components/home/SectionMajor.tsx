import image from '../../images/Recurso_3.png'


const SectionMajor = () => {
    return (
        <>
            <div className="p-36">
                <div className="space-y-20">
                    <div className="flex flex-col space-y-8">
                        <h2 className="text-6xl font-extrabold">
                            <span>Lorem, ipsum</span>
                            <span className="block">Design.</span>
                        </h2>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua</span>
                    </div>
                    <button className="bg-[#279aff] text-white p-3 px-6 rounded-sm text-3xl font-bold hover:scale-110 transition-all">LOGIN</button>
                </div>
            </div>
            <div>
                <img className="absolute w-2/3 top-0 right-0 -z-10" src={image.src} />

            </div>
        </>
    )
}

export default SectionMajor