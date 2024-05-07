import React, { useState } from 'react'
import main_photo from '../assets/addetail_photo1.png'
import checkmark from '../assets/Vector.png'
import heart from '../assets/Heart.png'
import { FiPhoneCall,FiAlertTriangle } from "react-icons/fi";
import { FaWhatsapp,FaRegCheckCircle,FaFacebookF,FaLinkedinIn,FaPinterestP,FaArrowLeft,FaArrowRight,FaCheckCircle } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn,CiTwitter } from "react-icons/ci";
import { RiGlobalLine } from "react-icons/ri";
import profile from "../assets/Images.png";
import GoogleMapReact from 'google-map-react';
import { GoShareAndroid } from "react-icons/go";
import { FaLink } from "react-icons/fa6";
import Cards from './Cards';


import 'react-awesome-slider/dist/styles.css';




const AnyReactComponent = ({ text }) => <div>{text}</div>;




function AdsDetails() {
  
const imgs=[
  {id:0,value:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76AbHZ-49mGo_ar4DFAaTIXw9WU1NVR2DH-DafLuW_k9umdYANDUO3BaW4eIuSnf0MxQ&usqp=CAU"},
  {id:1,value:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76AbHZ-49mGo_ar4DFAaTIXw9WU1NVR2DH-DafLuW_k9umdYANDUO3BaW4eIuSnf0MxQ&usqp=CAU"},
  {id:2,value:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWFfaSXMF_E7HU-ybBWNe9b7SDTFVqZkwt6Zq-o2JbtQ&s"},
  {id:3,value:"https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/vivo-y22-phones.jpg"},
  {id:4,value:main_photo}
]

const [sliderData, setSliderData] = useState(imgs[0]);

  const handleClick=(index)=>{
    console.log(index);
    const slider = imgs[index];
    setSliderData(slider);
  }
  

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };



  return (
    <div  className='w-full h-max flex flex-col my-4 m-auto pl-8 pr-4'>
      {/* upper part */}
      <div className=' flex flex-row mx-auto w-11/12 h-max gap-4 border-b-2'>
        {/* left side */}
          <div className='w-3/4'>
            <div className='w-full h-12 flex flex-row gap-4 my-4 items-center '>
              <div className='w-28 h-9 bg-[#FFF2CC] text-orange-700 rounded-2xl flex items-center justify-center font-semibold'>Featured</div>
              <div className='w-36 h-9 bg-[#E4F9E0] text-green-900 rounded-2xl flex items-center justify-center gap-2 font-semibold p-1'><FaCheckCircle className='text-[#27C200]'/>Verified Seller</div>
            </div>
            {/* heading section */}
            <div className='flex flex-col my-3'>
              <h1 className='text-2xl font-bold'>Apple iPhone 7 Plus (32 GB) ↗️ Hot price (Used)</h1>
              <div className='flex flex-row justify-start items-center my-4 gap-24 text-md'>
                <div>4517 New York. Manchester, Kentucky 394</div>
                <div>29 Jun 10:21 PM</div>
                <div>69,656 Viewed</div>
              </div>
            </div>
            {/* photo section */}
            <div className='w-full flex flex-col'>
              <div className='w-full p-2 bg-[#EBEEF7] mb-2'>
                <img src={sliderData.value} alt='images' className='object-cover m-auto h-[640px] w-[648px]'/>

                {/* <img src={main_photo} alt='photo' className='object-contain'/> */}
              </div>
              {/* <AwesomeSlider > */}
              <div className='flex flex-row gap-2'>
                {
                  imgs.map((data,i)=>
                  <img key={data.id} src={data.value} onClick={()=>{handleClick(i)}} className='h-28 w-28 object-cover' alt='images' />
                  )
                }
              </div>
              {/* </AwesomeSlider> */}
              
            </div>

            {/* description */}
            <div>
              <h1 className='text-2xl font-bold my-4'>Descriptions</h1>
              <p className='text-[#767E94] text-sm'>Sed elementum pellentesque nibh, auctor varius felis ornare euismod. Etiam in purus ac ipsum placerat imperdiet eu lacinia quam. Aliquam vel scelerisque quam. In suscipit massa non elementum commodo. Nullam id mi pellentesque, tempus mauris quis, egestas arcu. In condimentum mollis purus vitae egestas. Donec consectetur, felis et semper fermentum, eros orci egestas mauris, at imperdiet justo erat vel quam. Aliquam at risus nec augue molestie consectetur eget sit amet mauris. Mauris a lectus varius, dignissim nulla quis, commodo justo. Donec ornare condimentum arcu sit amet feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec venenatis mauris at sapien ultricies, sit amet pellentesque arcu imperdiet. Nulla venenatis vel lectus interdum elementum.
              <br/><br/><br/>Suspendisse cursus sodales placerat. Morbi eu lacinia ex. Curabitur blandit justo urna, id porttitor est dignissim nec. Pellentesque scelerisque hendrerit posuere. Sed at dolor quis nisi rutrum accumsan et sagittis massa. Aliquam aliquam accumsan lectus quis auctor. Curabitur rutrum massa at volutpat placerat. Duis sagittis vehicula fermentum. Integer eu vulputate justo. Aenean pretium odio vel tempor sodales. Suspendisse eu fringilla leo, non aliquet sem.</p>
            </div>

            {/* feacture section */}
            <div className='my-4 text-[#464D61]'>
              <h1 className='text-2xl font-bold my-2'>Feature </h1>
              <div className='flex flex-row items-start justify-between '>
                <ul className='leading-loose '>
                  <li className='flex flex-row gap-2'><img src={checkmark}  alt='checkmark' className='object-contain'/> 128GB internal memory with 8GB RAM</li>
                  <li className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>Fingerprint (under display, optical), accelerometer.</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>Android 11, Funtouch 11.1 Operating System</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>Glass front, plastic frame, plastic back</li>
                </ul>
                <ul className='leading-loose'>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>LED flash, HDR, panorama</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>Li-Po 4000 mAh, non-removable battery</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>Fast charging 33W, 63% in 30 min (advertised)</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/>1 Year international warranty</li>
                </ul>
              </div>
            </div>

          </div>

        {/* right side */}
        <div className='w-1/4 my-12 h-max flex flex-col gap-4'>
          <div className='w-full border-2 rounded-lg shadow-sm'>
            <div className='flex flex-row justify-between p-8 h-28 items-center border-b-2'>
              <div className='text-3xl'>RS. 8,234</div>
              <button className='w-12 h-12 bg-[#E8F7FF] outline-2 outline-blue-900 rounded-md flex items-center justify-center'> <img src={heart} alt='heart' className='' /></button>
            </div>

            <div className='w-full h-[366px] p-8 border-b-2 flex flex-col gap-3'> 
            <div className='bg-[#F5F7FA] h-28 w-full flex flex-col gap-3 p-7 items-start'> 
                <div className='flex flex-row justify-start gap-2 items-baseline'><FiPhoneCall className='text-green-500 items-center text-xl' />(808) 5XX-XXXX</div>
                <button className='text-[#636A80]'>Click here to reveal phone number.</button>
              </div>
              <div className='h-12 w-full bg-[#00AAFF] flex flex-row gap-2 justify-center items-center text-white text-md rounded-sm'> <AiOutlineMessage />Send Message</div>
              <div className='h-12 w-full bg-[#2DD54B] flex flex-row gap-2 justify-center items-center text-white text-md rounded-sm'><FaWhatsapp />Message Via Whatsapp</div>
             <div className='h-12 w-full bg-[#EBEEF7] flex flex-row gap-2 justify-center items-center text-[#191F33] text-md rounded-sm'><MdOutlineEmail />Message Via email</div>
            </div>

            <div className='w-full h-60  border-b-2 flex flex-col gap-6 p-7'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-start gap-4'> 
                  <img src={profile} alt='profile_img' loading='lazy'/>
                  <div className='flex flex-col gap-2'><span className='text-[#767E94] text-sm'>Added by</span><span className='flex flex-row justify-center items-center gap-2 font-bold'>Kevin Gilbert <FaRegCheckCircle className='text-green-500'/></span></div>
                </div>
                <button className='text-[#00AAFF] text-sm '>View Profile</button>
              </div>
              <div>
                <ul className='leading-6'>
                  <li className='flex flex-row justify-items-start gap-3 items-center text-[#636A80]'><MdOutlineEmail className='text-[#27C200] text-lg' />kevin.gilbert@gmail.com</li>
                  <li className='flex flex-row justify-items-start gap-3 items-center text-[#636A80]'><CiLocationOn className='text-[#27C200] text-lg'/>4517 New York. Manchester, Kentucky</li>
                  <li className='flex flex-row justify-items-start gap-3 items-center text-[#636A80]'><RiGlobalLine className='text-[#27C200] text-lg'/>www.kevin.com</li>
                </ul>
              </div>
            </div>

            <div className='w-full h-[462px]  border-b-2 flex flex-col p-7 gap-5'>
            <h1 className='text-xl text-[#191F33]'>Ads Location</h1>
            <div className='w-full h-[348px]'>
            <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}>
            <AnyReactComponent
             lat={59.955413}
              lng={30.337844}
              text="My Marker"/>
            </GoogleMapReact>
            </div>

          </div>

          </div>

          {/* right bottom side  */}
          <div className='h-[460px] w-full border-2 rounded-lg shadow-sm p-6 flex flex-col gap-4'>
            <div className=' flex flex-col gap-5 h-[244px] w-full border-b-2'>
              <h1 className='text-xl font-semibold'>Overview</h1>
              <div className='flex flex-col h-44 gap-3 text-sm '>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Conditons:</span><span className='text-[#636A80]'>Used</span></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Brand:</span><span className='text-[#636A80]'>Vivo</span ></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Model:</span><span className='text-[#636A80]'>V2066</span></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Model Year:</span><span className='text-[#636A80]'>2021</span></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Authenticity:</span><span className='text-[#636A80]'>Original</span></div>
              </div>
            </div>
            
            <button className='w-full flex flex-row items-baseline justify-start text-md gap-4 border-b-2 h-10'>
              <FiAlertTriangle/>Report Abuse
            </button>

            <div className='flex flex-col'>
              <div className='flex flex-row gap-3 text-md justify-start items-center'><GoShareAndroid/>Share Ads</div>
              <div className='flex flex-row gap-2 my-3'>
                <button className='w-10 h-10 bg-[#25D366] rounded-full flex justify-center items-center text-xl text-white'><FaWhatsapp/></button>
                <button className='w-10 h-10 bg-[#3B5998] rounded-full flex justify-center items-center text-xl text-white'><FaFacebookF/></button>
                <button className='w-10 h-10 bg-[#1DA1F2] rounded-full flex justify-center items-center text-xl text-white'><CiTwitter/></button>
                <button className='w-10 h-10 bg-[#0077B5] rounded-full flex justify-center items-center text-xl text-white'><FaLinkedinIn/></button>
                <button className='w-10 h-10 bg-[#CB2027] rounded-full flex justify-center items-center text-xl text-white'><FaPinterestP/></button>
                <button className='w-10 h-10 bg-[#636A80] rounded-full flex justify-center items-center text-xl text-white'><FaLink/></button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* related ads */}
      <div className='w-full h-max sm:h-[690px] lg:pl-24 lg:pr-24 pt-6 pb-6'>
        <div className='flex  flex-row justify-between items-center'>
        <h1 className='text-2xl md:text-3xl font-semibold my-8'>Related Ads</h1>
        <div className='sm:flex flex-row gap-4  hidden'>
          <button className='w-12 h-12 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowLeft/></button>
          <button className='w-12 h-12 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowRight/></button>
        </div>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
        </div>
        <div className='flex flex-row gap-4 justify-between  sm:hidden my-2 m-auto'>
          <button className='w-10 h-10 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowLeft/></button>
          <button className='w-10 h-10 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowRight/></button>
        </div>

      </div>
      
    </div>
  )
}

export default AdsDetails