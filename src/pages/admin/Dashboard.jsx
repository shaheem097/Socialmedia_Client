import React from 'react'
import AdminHeader from '../../Component/admin/AdminHeader';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
} from '@mui/material';



function Dashboard() {
    return (
      <div className="relative w-[320px] h-[1000px] bg-[#051326] rounded-[15px] border-2 border-solid border-[#364563] shadow-[inset_0px_40px_50px_#0d2340]">
      <div className="inline-flex items-start gap-[5px] absolute top-[18px] left-[20px]">
        <div className="relative w-[12px] h-[12px] bg-[#ff5f57] rounded-[7.5px] border border-solid border-[#e13f38]" />
        <div className="relative w-[12px] h-[12px] bg-[#febb2e] rounded-[7.5px] border border-solid border-[#dda13d]" />
        <div className="relative w-[12px] h-[12px] bg-[#2bc840] rounded-[7.5px] border border-solid border-[#3aad40]" />
      </div>
      <div className="flex w-[300px] items-center justify-between absolute top-[68px] left-[18px]">
        <div className="inline-flex items-center gap-[16px] relative flex-[0_0_auto]">
          <div className="relative w-[80px] h-[80px] rounded-[40px]">
            <div className="relative w-[67px] h-[60px] top-[10px] left-[10px]">
              <img
                className="absolute w-[60px] h-[60px] top-0 left-0 object-cover"
                alt="Avatar"
                src="/img/avatar.png"
              />
              <div className="absolute w-[10px] h-[10px] top-[4px] left-[57px] bg-[#16e932] rounded-[7.5px] shadow-[0px_4px_10px_#17e93380]" />
            </div>
          </div>
          <div className="relative w-[88px] h-[46px]">
            <div className="absolute -top-px left-0 font-semibold text-[#d8e1eb] text-[16px] tracking-[0] leading-[normal]">
              Jackson D.
            </div>
            <div className="absolute top-[27px] left-0 font-semibold text-[#7d96b3] text-[12px] tracking-[0] leading-[normal]">
              Manager
            </div>
          </div>
        </div>
        <div className="relative w-[50px] h-[50px] bg-[#50ba68] rounded-[100px_0px_0px_100px] border-2 border-solid border-[#44a95c] shadow-[inset_0px_10px_10px_#0000001a]">
          <img
            className="absolute w-[14px] h-[10px] top-[19px] left-[21px]"
            alt="Arrow left"
            src="/img/arrow-left.png"
          />
        </div>
      </div>
      <div className="absolute w-[260px] h-[189px] top-[559px] left-[28px]">
        <div className="absolute w-[260px] h-[140px] top-[49px] left-0">
          <div className="absolute w-[260px] h-[40px] top-0 left-0">
            <div className="absolute w-[40px] h-[40px] top-0 left-0 rounded-[40px]">
              <div className="relative w-[35px] h-[35px] left-[5px]">
                <img
                  className="absolute w-[30px] h-[30px] top-[5px] left-0 object-cover"
                  alt="Image"
                  src="/img/image.png"
                />
                <div className="absolute w-[10px] h-[10px] top-0 left-[25px] bg-[#16e932] rounded-[7.5px] shadow-[0px_4px_10px_#17e93380]" />
              </div>
            </div>
            <div className="absolute top-0 left-[60px] font-semibold text-[#ced8e5] text-[12px] tracking-[0] leading-[40px] whitespace-nowrap">
              Peter Taylor
            </div>
            <div className="absolute w-[20px] h-[17px] top-[12px] left-[238px]">
              <div className="absolute w-[19px] h-[16px] top-0 left-0">
                <div className="h-[16px]">
                  <div className="relative w-[19px] h-[16px]">
                    <img className="absolute w-[5px] h-[5px] top-[7px] left-[7px]" alt="Path" src="/img/path-5.svg" />
                    <img className="absolute w-[19px] h-[16px] top-0 left-0" alt="Shape" src="/img/shape-10.svg" />
                  </div>
                </div>
              </div>
              <div className="absolute w-[20px] h-[17px] top-0 left-0">
                <div className="h-[17px]">
                  <div className="relative w-[20px] h-[17px]">
                    <img className="absolute w-[8px] h-[8px] top-[5px] left-[6px]" alt="Shape" src="/img/shape-9.svg" />
                    <img className="absolute w-[20px] h-[17px] top-0 left-0" alt="Shape" src="/img/shape-8.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[258px] top-[50px] absolute h-[40px] left-0">
            <div className="absolute w-[40px] h-[40px] top-0 left-0 rounded-[40px]">
              <div className="relative w-[35px] h-[35px] left-[5px]">
                <img
                  className="absolute w-[30px] h-[30px] top-[5px] left-0 object-cover"
                  alt="Base"
                  src="/img/base-1.png"
                />
                <div className="w-[10px] h-[10px] left-[25px] bg-[#e9d616] rounded-[7.5px] shadow-[0px_4px_10px_#e9b91780] absolute top-0" />
              </div>
            </div>
            <div className="absolute top-0 left-[60px] font-semibold text-[#ced8e5] text-[12px] tracking-[0] leading-[40px] whitespace-nowrap">
              Luvleen Lawrence
            </div>
            <div className="absolute w-[20px] h-[14px] top-[14px] left-[238px]">
              <div className="absolute w-[20px] h-[13px] top-0 left-0 bg-[url(/img/shape-7.svg)] bg-[100%_100%]" />
              <div className="absolute w-[20px] h-[14px] top-0 left-0 bg-[url(/img/shape-6.svg)] bg-[100%_100%]" />
            </div>
          </div>
          <div className="w-[257px] top-[100px] absolute h-[40px] left-0">
            <div className="absolute w-[40px] h-[40px] top-0 left-0 rounded-[40px]">
              <div className="relative w-[35px] h-[35px] left-[5px]">
                <img
                  className="absolute w-[30px] h-[30px] top-[5px] left-0 object-cover"
                  alt="Base"
                  src="/img/base.png"
                />
                <div className="w-[10px] h-[10px] left-[25px] bg-[#ff5e61] rounded-[7.5px] shadow-[0px_4px_10px_#e9311780] absolute top-0" />
              </div>
            </div>
            <div className="absolute top-0 left-[60px] font-semibold text-[#ced8e5] text-[12px] tracking-[0] leading-[40px] whitespace-nowrap">
              Su Hua
            </div>
            <div className="absolute w-[18px] h-[15px] top-[13px] left-[238px] bg-[url(/img/shape-5.svg)] bg-[100%_100%]">
              <div className="h-[15px]">
                <div className="w-[18px] h-[15px]">
                  <div className="relative h-[15px]">
                    <img className="absolute w-[3px] h-[3px] top-[5px] left-[4px]" alt="Path" src="/img/path-4.svg" />
                    <img className="absolute w-[3px] h-[3px] top-[5px] left-[8px]" alt="Path" src="/img/path-3.svg" />
                    <img className="absolute w-[3px] h-[3px] top-[5px] left-[12px]" alt="Path" src="/img/path-2.svg" />
                    <img className="absolute w-[18px] h-[15px] top-0 left-0" alt="Shape" src="/img/shape-4.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[257px] h-[20px] top-0 left-0 overflow-hidden">
          <div className="absolute top-0 left-0 font-bold text-[#ebf0f5] text-[14px] tracking-[0] leading-[normal]">
            Teams
          </div>
          <div className="absolute top-[2px] left-[179px] font-bold text-[#f47432] text-[10px] tracking-[0] leading-[normal]">
            VIEW ALL
          </div>
          <div className="absolute w-[20px] h-[14px] top-[3px] left-[238px]">
            <div className="h-[14px]">
              <div className="relative w-[20px] h-[14px]">
                <img className="absolute w-[5px] h-[5px] top-[4px] left-[8px]" alt="Path" src="/img/path-1.svg" />
                <img className="absolute w-[20px] h-[14px] top-0 left-0" alt="Shape" src="/img/shape-3.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[282px] items-start gap-[10px] px-[29px] py-[18px] absolute top-[172px] left-[17px] bg-[#0a1c33] rounded-[28px] border-2 border-solid border-[#162e4c] shadow-[0px_0px_15px_#102540b2,inset_0px_11px_13px_#0b1725]">
        <div className="inline-flex items-start gap-[24px] relative flex-[0_0_auto]">
          <div className="relative w-[18.12px] h-[18.12px] bg-[url(/img/shape-2.svg)] bg-[100%_100%]" />
          <input
            className="relative w-fit mt-[-1.00px] font-bold text-[#7d96b3] text-[12px] tracking-[0] leading-[normal] bg-[transparent] border-[none] p-0"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
      <div className="absolute w-[290px] h-[265px] top-[258px] left-[13px]">
        <div className="absolute w-[290px] h-[55px] top-[45px] left-0 bg-[#0077ff] rounded-[28px] border-2 border-solid border-[#3785dd] shadow-[0px_20px_60px_#0077ff4c,inset_0px_10px_23px_#234f8266]">
          <div className="absolute w-[19px] h-[18px] top-[17px] left-[21px]">
            <div className="h-[18px]">
              <div className="relative w-[19px] h-[18px]">
                <img className="absolute w-[19px] h-[9px] top-0 left-0" alt="Shape" src="/img/shape-1.svg" />
                <img className="absolute w-[19px] h-[9px] top-[9px] left-0" alt="Path" src="/img/path.svg" />
              </div>
            </div>
          </div>
          <div className="absolute top-[13px] left-[73px] font-bold text-[#fafbfc] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
            Tasks
          </div>
          <div className="absolute w-[37px] h-[27px] top-[14px] left-[194px] bg-[#096cdd] rounded-[13px]">
            <div className="absolute w-[15px] top-px left-[11px] font-bold text-[#ffffff] text-[12px] tracking-[0] leading-[25px]">
              32
            </div>
          </div>
          <div className="absolute w-[45px] h-[45px] top-[5px] left-[240px] bg-[#0077ff] rounded-[25px] shadow-[inset_0px_0px_10px_#62abff]">
            <div className="relative w-[17px] h-[17px] top-[14px] left-[14px] bg-[url(/img/shape.svg)] bg-[100%_100%]" />
          </div>
        </div>
        <div className="absolute w-[252px] h-[25px] top-[180px] left-[23px]">
          <div className="absolute w-[25px] h-[25px] top-0 left-[227px] bg-[#0077ff33] rounded-[13px] border-2 border-dashed border-[#0077ff]">
            <img className="absolute w-[12px] h-[12px] top-[5px] left-[5px]" alt="Plus" src="/img/plus.png" />
          </div>
          <div className="absolute top-0 left-[52px] font-semibold text-[#cfd9e6] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
            Messages
          </div>
          <img className="absolute w-[18px] h-[17px] top-[4px] left-0" alt="Comment" src="/img/comment.png" />
        </div>
        <div className="absolute w-[251px] h-[25px] top-0 left-[24px]">
          <div className="absolute top-0 left-[51px] font-semibold text-[#cfd9e6] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
            Dashboard
          </div>
          <img className="absolute w-[16px] h-[19px] top-[4px] left-0" alt="Home" src="/img/home.png" />
          <img
            className="absolute w-[18px] h-[13px] top-[6px] left-[229px]"
            alt="Settings adjust"
            src="/img/settings-adjust.png"
          />
        </div>
        <div className="absolute w-[252px] h-[25px] top-[120px] left-[23px]">
          <div className="absolute top-0 left-[52px] font-semibold text-[#cfd9e6] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
            Notifications
          </div>
          <div className="h-[22px] left-0 absolute w-[22px] top-0">
            <div className="relative w-[24px] h-[24px] top-[-2px]">
              {/* <img className="absolute w-[20px] h-[21px] top-[3px] left-0" alt "Umbrella" src="/img/umbrella.png" /> */}
              <div className="w-[11px] h-[11px] left-[13px] bg-[#ff5e61] rounded-[5.5px] border-2 border-solid border-[#030d1a] absolute top-0" />
            </div>
          </div>
          <div className="absolute w-[25px] h-[25px] top-0 left-[227px] bg-[#162e4c] rounded-[13px]">
            <div className="absolute top-0 left-[8px] font-family:'Poppins',Helvetica font-bold text-[#7d96b3] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
              4
            </div>
          </div>
        </div>
        <div className="absolute w-[255px] h-[25px] top-[240px] left-[20px]">
          <div className="absolute top-0 left-[55px] font-semibold text-[#cfd9e6] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
            Inbox
          </div>
          <div className="absolute w-[25px] h-[25px] top-0 left-[230px] bg-[#162e4c] rounded-[13px]">
            <div className="absolute top-0 left-[8px] font-family:'Poppins',Helvetica font-bold text-[#7d96b3] text-[13px] tracking-[0] leading-[25px] whitespace-nowrap">
              9
            </div>
          </div>
          <div className="h-[20px] left-[3px] absolute w-[22px] top-0">
            <div className="relative w-[24px] h-[22px] top-[-2px]">
              <img className="absolute w-[19px] h-[15px] top-[7px] left-0" alt="Envelope" src="/img/envelope.png" />
              <div className="w-[11px] h-[11px] left-[13px] bg-[#ff5e61] rounded-[5.5px] border-2 border-solid border-[#030d1a] absolute top-0" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-[260px] h-[120px] top-[778px] left-[28px] overflow-hidden">
        <div className="relative w-[262px] h-[122px] -top-px -left-px bg-[#020c19] rounded-[10px] border-2 border-dashed border-[#1f3a59] shadow-[inset_0px_10px_30px_1px_#000000]">
          <img className="absolute w-[16px] h-[18px] top-[28px] left-[121px]" alt="Upload" src="/img/upload.png" />
          <div className="absolute top-[54px] left-[69px] font-bold text-[#3f5d7f] text-[10px] tracking-[0] leading-[40px] whitespace-nowrap">
            Drag-n-Drop to Upload
          </div>
        </div>
      </div>
      <div className="absolute w-[260px] h-[50px] top-[918px] left-[28px] bg-[#020c19] rounded-[25px] overflow-hidden border-2 border-solid border-[#0f253f] shadow-[0px_0px_15px_#102540b2]">
        <div className="absolute w-[128px] h-[40px] top-[5px] left-[5px] bg-[#0f253f] rounded-[20px] border-2 border-solid border-[#162e4c]">
          <div className="absolute top-[-2px] left-[56px] font-bold text-[#f0f3f7] text-[10px] tracking-[0] leading-[40px] whitespace-nowrap">
            Light
          </div>
          <img className="absolute w-[22px] h-[22px] top-[7px] left-[10px]" alt="Sun" src="/img/sun.png" />
        </div>
        <div className="absolute w-[128px] h-[40px] top-[5px] left-[137px] bg-[#0f253f] rounded-[20px] border-2 border-solid border-[#162e4c]">
          <div className="absolute top-[-2px] left-[51px] font-bold text-[#f0f3f7] text-[10px] tracking-[0] leading-[40px] whitespace-nowrap">
            Dark
          </div>
          <img className="absolute w-[22px] h-[22px] top-[7px] left-[10px]" alt="Moon" src="/img/moon.png" />
        </div>
      </div>
    </div>
   
  );
      
    }
    

export default Dashboard
