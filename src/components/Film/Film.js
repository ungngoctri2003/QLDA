import React from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import "./Film.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DOMAIN_STATIC_FILE } from "../../utils/Settings/config";
import { OPEN_MODAL_TRAILER } from "../../redux/Types/ModalType";
import { history } from "../../App";
export default function Film(props) {
  const { phim } = props;
  const dispatch = useDispatch();
  return (
    <div className="parent " style={{ height: "100%", minHeight: "500px" }}>
      <div className="flex flex-col  h-full m-3 p-5  rounded-md bg-white  dark:bg-slate-800  ring-1 ring-slate-900/5 shadow-2xl hover:-translate-y-4 hover:ease-in-out hover:duration-700">
        <div
          style={{
            backgroundImage: `url(${DOMAIN_STATIC_FILE}${phim.imgFilm})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <img
            src={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
            className="opacity-0 w-full"
            style={{ height: 300 }}
            alt={`${DOMAIN_STATIC_FILE}${phim.imgFilm}`}
          />
          <div
            className="w-full playVideo"
            style={{
              top: 0,
              height: 300,
              position: "absolute",
              backgroundColor: "rgba(0,0,0,.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({
                type: OPEN_MODAL_TRAILER,
                data: {
                  trailer: phim.trailer,
                  tenPhim: phim.nameFilm,
                },
              });
            }}
          >
            <div className="rounded-full cursor-pointer">
              <button>
                <PlayCircleOutlined
                  style={{ fontSize: "50px", color: "#fff", opacity: 0.7 }}
                />
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            history.push(`/DetailsFilm/${phim.id}`);
          }}
          className="cursor-pointer"
        >
          <div className="mt-6 mb-2">
            <h2 className="text-xl h-16 font-semibold tracking-wide dark:text-white">
              {phim.nameFilm}
            </h2>
          </div>
          <p className="moTa text-coolGray-800 dark:text-white">
            {_.truncate(phim.description, { length: 80, separator: "" })}
          </p>
        </div>
      </div>
      <div className="child flex justify-center ">
        <button className="px-10 py-2 text-xl  rounded bg-red-500 text-white animate-bounce">
          <NavLink
            className="text-white "
            activeStyle={{ color: "white" }}
            to={`/DetailsFilm/${phim.id}`}
          >
            Đặt vé
          </NavLink>
        </button>
      </div>
    </div>
  );
}
