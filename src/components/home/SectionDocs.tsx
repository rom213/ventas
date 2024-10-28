import bagraund from "../../images/Recurso_6.png";
import doc from "../../images/Recurso 4.png";
import docBlue from "../../images/Recurso 5.png";




const SectionDocs = () => {
    return (
        <div className="relative p-8 md:p-28 md:pt-36">
            <div className="relative grid md:gap-16">
                <div className="flex justify-end">
                    <div className=" w-[380px] flex gap-3 flex-col">
                        <h4 className="text-5xl font-extrabold text-end">Content 2</h4>
                        <div>
                            <p className="text-right">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-16">
                    <div>
                        <img src={doc.src} alt="" />
                    </div>
                    <div>
                        <img src={docBlue.src} alt="" />

                    </div>
                    <div>
                        <img src={doc.src} alt="" />

                    </div>
                </div>
            </div>
            <div className="absolute w-full top-0 right-0 -z-10">
                <img src={bagraund.src} alt="" />
            </div>
        </div>
    )
}

export default SectionDocs