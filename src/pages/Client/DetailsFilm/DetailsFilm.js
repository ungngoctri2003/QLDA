import React, { useEffect, useState } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../../components/CircleRating/CircleRating.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Rate, Button, Tabs } from "antd";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { layChiTietPhimAction } from "./../../../redux/Actions/QuanLyPhimAction";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import { lichChieuTheoHeThongRap } from "../../../redux/Actions/QuanLyLichChieuAction";
export default function DetailsFilm(props) {
  const dispatch = useDispatch();
  const { phimEdit } = useSelector((state) => state.QuanLyPhimReducer);
  const { showTime } = useSelector((state) => state.QuanLyLichChieuReducer);
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(layChiTietPhimAction(id));
    dispatch(lichChieuTheoHeThongRap(id));
  }, []);
  const { TabPane } = Tabs;
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${DOMAIN_STATIC_FILE}${phimEdit.imgFilm})`,
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "100vh" }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={15} // default blur value is 10px
        borderRadius={0}
      >
        <div className="grid grid-cols-12 ">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3">
              <img
                style={{ width: "100%", height: "100%" }}
                src={`${DOMAIN_STATIC_FILE}${phimEdit.imgFilm}`}
                alt={`${phimEdit.imgFilm}`}
              />
              <div className="flex flex-col  justify-center ml-5 col-span-2">
                <p className="text-3xl font-bold dark:text-black">
                  {phimEdit.nameFilm}
                </p>
                <p className="dark:text-black">{phimEdit.description}</p>
                <p className="dark:text-black">
                  {moment(phimEdit.showtime).format("DD-MM-YYYY hh:mm")}
                </p>
              </div>
            </div>
          </div>
          <div className="grid col-start-10 col-span-4 ">
            <div className={`c100 p${phimEdit?.rate * 10} big`}>
              <span className="dark:text-black">{phimEdit?.rate}</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
              <div className="w-full text-center ">
                <Rate allowHalf value={phimEdit?.rate / 2} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="bg-white  rounded py-10  mt-20 dark:bg-slate-800">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Lịch chiếu" key="1">
                <Tabs tabPosition="left">
                  {showTime?.map((rapChieu, index) => {
                    return (
                      <TabPane
                        className="my-3"
                        key={index}
                        tab={
                          <div>
                            <img
                              style={{ width: 50, height: 50 }}
                              src={`${DOMAIN_STATIC_FILE}${rapChieu.logo}`}
                              alt={rapChieu.logo}
                            />
                            <p className="text-base pt-2 dark:text-white">{`${rapChieu.groupName}`}</p>
                          </div>
                        }
                      >
                        <Tabs tabPosition="left">
                          {rapChieu.listRap?.map((rap, index) => {
                            return (
                              <TabPane
                                key={index}
                                tab={
                                  <div
                                    style={{ width: 300 }}
                                    className="flex flex-wrap"
                                  >
                                    <img
                                      style={{ width: 60, height: 60 }}
                                      src={`${DOMAIN_STATIC_FILE}${rap.logo}`}
                                      alt={`${rap.logo}`}
                                    />

                                    <div className="text-black text-left ml-3 dark:text-white">
                                      <p>
                                        {_.truncate(rap.name, {
                                          length: 30,
                                          separator: ".",
                                        })}
                                      </p>
                                      <p>
                                        {_.truncate(rap.address, {
                                          length: 30,
                                          separator: ".",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                }
                              >
                                {_.head(rap.listFilm)?.lstShowDate?.map(
                                  (lichChieu, index) => {
                                    return (
                                      <Button
                                        className="rounded m-2 py-2.5 px-4 h-3 border height_button_film dark:bg-slate-700 shadow-xl"
                                        key={index}
                                      >
                                        <NavLink
                                          to={`/checkout/${lichChieu.id}`}
                                        >
                                          {moment(lichChieu.showDate).format(
                                            "hh:mm A"
                                          )}
                                        </NavLink>
                                        <p className="m-0 text-xs  dark:text-black">
                                          {moment(lichChieu.showDate).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </p>
                                      </Button>
                                    );
                                  }
                                )}
                              </TabPane>
                            );
                          })}
                        </Tabs>
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane tab="Chi tiết" key="2">
                <div className="col-span-5 col-start-3">
                  <div className="grid grid-cols-3 px-5">
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`${DOMAIN_STATIC_FILE}${phimEdit.imgFilm}`}
                      alt={`${phimEdit.imgFilm}`}
                    />
                    <div className="flex flex-col  justify-center ml-5 col-span-2">
                      <p className="text-2xl font-bold dark:text-white">
                        {phimEdit.nameFilm}
                      </p>
                      <p className="text-2xl font-bold dark:text-white">
                        Đánh giá: {phimEdit.rate} sao
                      </p>
                      <p className="text-2xl font-bold dark:text-white">
                        Tác giả: {phimEdit.actor}
                      </p>

                      <p className="text-2xl dark:text-white">
                        {phimEdit.description}
                      </p>
                      <p className="text-xl dark:text-white">
                        {moment(phimEdit.showtime).format("DD-MM-YYYY hh:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Liên hệ" key="3">
                <h2 className="text-xl mx-5 dark:text-white">
                  Nếu Quý khách có gặp bất cứ vấn đề nào liên quan tới việc đặt
                  vé online, vui lòng liên hệ fanpage Facebook của Beta Cinemas
                  hoặc gọi điện tới hotline 0934 632 682 để được hỗ trợ nhanh
                  nhất.
                </h2>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
