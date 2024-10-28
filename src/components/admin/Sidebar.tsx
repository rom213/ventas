import home from "../../images/Recurso 8.png";
import braily from "../../images/Recurso 9.png";
import rect from "../../images/Recurso 10.png";
import folder from "../../images/Recurso 11.png";
import user from "../../images/Recurso 12.png";
const Sidebar = () => {
  return (
    <div className="h-full w-10 sm:w-16 bg-[#279aff] pt-20">
      <div className="">
        <div className="bg-blue-500 w-full h-16 flex justify-center items-center">
          <img src={home.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={braily.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={rect.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={folder.src} alt="" />
        </div>
        <div className=" w-full h-16 flex justify-center items-center">
          <img src={user.src} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar