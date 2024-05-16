import React, { useEffect, useState } from 'react'
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
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../pages/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,collection,getDocs } from '../pages/firebase';



import 'react-awesome-slider/dist/styles.css';




const AnyReactComponent = ({ text }) => <div>{text}</div>;




function AdsDetails() {

  const [user, loading, error] = useAuthState(auth);
  const [ads, setAds] = useState([]);

  useEffect(() => {
      const fetchAds = async () => {
          try {
              const adsCollectionRef = collection(db, 'categories', 'Properties', 'ads');
              const adsSnapshot = await getDocs(adsCollectionRef);
              const adsData = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              console.log('Fetched ads data:', adsData); // Log fetched data
              setAds(adsData);
          } catch (error) {
              console.error('Error fetching ads:', error); // Log any errors
          }
      };
  
      fetchAds();
  }, []);




  const { id } = useParams(); // Get the ad ID from the URL params
    const [adDetails, setAdDetails] = useState(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const adDocRef = doc(db, 'categories', 'Properties', 'ads', id );
                const adDocSnapshot = await getDoc(adDocRef);
                if (adDocSnapshot.exists()) {
                    setAdDetails({ id: adDocSnapshot.id, ...adDocSnapshot.data() });
                } else {
                    console.log('Ad not found');
                }
            } catch (error) {
                console.error('Error fetching ad details:', error);
            }
        };

        fetchAdDetails();
    }, [id]);


const [sliderIndex, setSliderIndex] = useState(0); // Declaring sliderIndex state

const [sliderData, setSliderData] = useState(0);
const handleClick = (index) => {
  console.log(index);
  setSliderIndex(index);
};


  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

    // Function to handle reporting abuse
    const handleReportAbuse = () => {
      // Implement your logic to report abuse here
      alert('Report abuse functionality triggered!');
    };



  // for sharing button logic
    
    // Function to handle sharing via WhatsApp
    const shareViaWhatsApp = () => {
      // Construct the WhatsApp share URL
      const shareUrl = `whatsapp://send?text=${encodeURIComponent('Check out this ad: ' + window.location.href)}`;
      // Open the WhatsApp share URL
      window.open(shareUrl);
    };
  
    // Function to handle sharing via Facebook
    const shareViaFacebook = () => {
      // Construct the Facebook share URL
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      // Open the Facebook share URL
      window.open(shareUrl);
    };
  
    // Function to handle sharing via Twitter
    const shareViaTwitter = () => {
      // Construct the Twitter share URL
      const shareUrl = `https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out this ad')}`;
      // Open the Twitter share URL
      window.open(shareUrl);
    };
  
    // Function to handle sharing via LinkedIn
    const shareViaLinkedIn = () => {
      // Construct the LinkedIn share URL
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      // Open the LinkedIn share URL
      window.open(shareUrl);
    };
  
    // Function to handle sharing via Pinterest
    const shareViaPinterest = () => {
      // Construct the Pinterest share URL
      const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}`;
      // Open the Pinterest share URL
      window.open(shareUrl);
    };
  
    // Function to copy the link
    const copyLink = () => {
      // Copy the URL to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard'))
        .catch(error => console.error('Error copying link: ', error));
    };







    const postOwnerNumber = adDetails&&adDetails.phoneNumber; // Replace this with the actual phone number of the post owner

    const handleSendMessage = () => {
      const message = "Hi, I'm interested in your post. Can you provide more details about this Ads? <br>";
      const whatsappUrl = `https://wa.me/${postOwnerNumber}?text=${encodeURIComponent(message + window.location.href)}`;
      window.open(whatsappUrl, '_blank');
    };











  return (
    <div  className='w-full h-max flex flex-col my-4 m-auto md:pl-8 md:pr-4'>
      {/* upper part */}
      <div className=' flex flex-col md:flex-row mx-auto w-11/12 h-max gap-4 border-b-2'>
        {/* left side */}
          <div className='md:w-3/4 w-full'>
            <div className='w-full h-12 flex flex-row gap-2 md:gap-4 my-4 items-center '>
              <div className='w-28 h-10 bg-[#FFF2CC] text-orange-700 rounded-2xl flex items-center justify-center font-semibold'>Featured</div>
              <div className='w-40 h-10 bg-[#E4F9E0] text-green-900 rounded-2xl flex items-center justify-center gap-2 font-semibold p-1'><FaCheckCircle className='text-[#27C200]'/>Verified Seller</div>
            </div>
            {/* heading section */}
            <div className='md:flex flex-col my-3'>
              <h1 className='text-2xl font-bold'>{adDetails&&adDetails.adName}</h1>
              <div className='flex flex-row justify-start items-center my-4 gap-24 text-md'>
                <div>{adDetails && adDetails.userAddress}</div>
                <div>{adDetails && adDetails.timestamp && new Date(adDetails.timestamp.seconds * 1000).toLocaleString('en-US', {  day: 'numeric', year: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</div>
                <div className='hidden md:block'> Viewed</div>
              </div>
            </div>
            {/* photo section */}
            <div className='w-full flex flex-col'>
              <div className='w-full p-2 bg-[#EBEEF7] mb-2'>
              <img src={adDetails && adDetails.images && adDetails.images[sliderIndex]} alt='images' className='object-cover m-auto h-[380px] md:h-[640px] w-[648px]' />

                {/* <img src={main_photo} alt='photo' className='object-contain'/> */}
              </div>
              {/* <AwesomeSlider > */}
              <div className='flex flex-row gap-2'>
              {adDetails && adDetails.images && adDetails.images.map((image, i) => (
              <img key={i} src={image} onClick={() => { handleClick(i) }} className={`h-20 w-20 md:h-28 md:w-28 object-cover ${i === sliderIndex ? 'border-2 border-blue-500' : ''}`} alt='images' />
            ))}

              </div>
              {/* </AwesomeSlider> */}
              
            </div>

            {/* description */}
            <div>
              <h1 className='text-2xl font-bold my-4'>Descriptions</h1>
              <p className='text-[#767E94] text-sm'>{adDetails && adDetails.description}</p>
            </div>

            {/* feacture section */}
            <div className='my-4 text-[#464D61]'>
              <h1 className='text-2xl font-bold my-2'>Detailed </h1>
              <div className='flex md:flex-row flex-col items-start justify-between w-full '>
                <ul className='leading-loose '>
                  <li className='flex flex-row gap-2'><img src={checkmark}  alt='checkmark' className='object-contain'/> <span className='font-semibold'>Type :</span> {adDetails && adDetails.category} </li>
                  <li className='flex flex-row gap-2'><img src={checkmark}  alt='checkmark' className='object-contain'/> <span className='font-semibold'>Sub-Type :</span> {adDetails && adDetails.subcategory} </li>
                  <li className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/><span className='font-semibold'>Floors : </span>{adDetails && adDetails.totalFloors}</li>
                </ul>
                <ul className='leading-loose w-[50%]'>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/><spam className='font-semibold'>Conditons :</spam></li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/><span className='font-semibold'>Negotiable :</span> {adDetails && adDetails.negotiable} </li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/><span className='font-semibold'>BHK:</span> {adDetails && adDetails.bhk}</li>
                  <li  className='flex flex-row gap-2'><img src={checkmark} alt='checkmark' className='object-contain'/><span className='font-semibold'>Car Parking : </span>{adDetails && adDetails.carParking}</li>

                </ul>
              </div>
            </div>

          </div>

        {/* right side */}
        <div className='lg:w-1/4 md:w-[35%] w-full my-12 h-max flex flex-col gap-4'>
          <div className='w-full border-2 rounded-lg shadow-sm'>
            <div className='flex flex-row justify-between p-4 md:p-8 h-24 md:h-28 items-center border-b-2'>
              <div className='text-3xl'>RS.{adDetails&&adDetails.price}</div>
              <button className='w-12 h-12 bg-[#E8F7FF] outline-2 outline-blue-900 rounded-md flex items-center justify-center'> <img src={heart} alt='heart' className='' /></button>
            </div>

            <div className='w-full h-[280px] p-7 border-b-2 flex flex-col gap-3'> 
            <div className='bg-[#F5F7FA] h-28 w-full flex flex-col gap-2 p-6 items-start'> 
                <div className='flex flex-row justify-center gap-2 items-center m-auto'><FiPhoneCall className='text-green-500 items-center text-xl' />(808) 5XX-XXXX</div>
                <button className='text-[#636A80]'>Click here to reveal phone number.</button>
              </div>
              <div className='h-12 w-full bg-[#00AAFF] flex flex-row gap-2 justify-center items-center text-white text-md rounded-sm'> <AiOutlineMessage />Send Message</div>
              <div className='h-12 w-full bg-[#2DD54B] flex flex-row gap-2 justify-center items-center text-white text-md rounded-sm' onClick={handleSendMessage}><FaWhatsapp />Message Via Whatsapp</div>
             {/* <div className='h-12 w-full bg-[#EBEEF7] flex flex-row gap-2 justify-center items-center text-[#191F33] text-md rounded-sm'><MdOutlineEmail />Message Via email</div> */}
            </div>

            <div className='w-full h-72 sm:h-80 md:h-[280px] xl:h-72 border-b-2 flex flex-col gap-6 p-7'>
              <div className='flex flex-wrap justify-between '>
                <div className='flex flex-row justify-start gap-3'> 
                {user && user.photoURL && <img src={user.photoURL} alt='profile_img' className='rounded-xl' loading='lazy'/>}
                  <div className='flex flex-col gap-1'><span className='text-[#767E94] text-sm'>Added by</span><span className='flex flex-row justify-center items-center  font-bold'>{adDetails&&adDetails.name}<FaRegCheckCircle className='text-green-500'/></span></div>
                </div>
              </div>
              <button className='text-[#00AAFF] text-sm text-left w-full'>View Profile</button>

              <div>
                <ul className='leading-6'>
                  <li className='flex flex-row justify-items-start my-2 items-center text-[#636A80]'><MdOutlineEmail className='text-[#27C200] text-lg' />{adDetails&&adDetails.email}</li>
                  <li className='flex flex-row justify-items-start my-2 items-center text-[#636A80]'><CiLocationOn className='text-[#27C200] text-lg'/>{adDetails&&adDetails.userAddress}</li>
                  {/* <li className='flex flex-row justify-items-start gap-3 items-center text-[#636A80]'><RiGlobalLine className='text-[#27C200] text-lg'/>www.kevin.com</li> */}
                </ul>
              </div>
            </div>

            <div className='w-full h-[400px]  border-b-2 flex flex-col p-5 gap-5'>
            <h1 className='text-xl text-[#191F33]'>Ads Location</h1>
            <div className='w-full h-[348px]'>
            <GoogleMapReact
            bootstrapURLKeys={{ key:'' }}
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
          <div className='h-[320px] w-full border-2 rounded-lg shadow-sm p-6 flex flex-col gap-4'>
            <div className=' flex flex-col gap-5 h-[180px] w-full border-b-2'>
              <h1 className='text-xl font-semibold'>Overview</h1>
              <div className='flex flex-col h-max gap-3 text-sm '>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Conditons:</span><span className='text-[#636A80]'>Used</span></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'> BHK:</span><span className='text-[#636A80]'> {adDetails && adDetails.bhk}</span ></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Car Parking :</span><span className='text-[#636A80]'> {adDetails && adDetails.parking}</span></div>
                <div className='flex flex-row justify-between'><span className='font-semibold'>Negotiable:</span><span className='text-[#636A80]'>{adDetails && adDetails.negotiable}</span></div>
              </div>
            </div>

            <div className='flex flex-col'>
      <div className='flex flex-row gap-3 text-md justify-start items-center'>
        <GoShareAndroid  /> Share Ads
      </div>
      
        <div className='flex flex-row gap-1 sm:gap-2 my-3'>
          <button className='w-9 h-9 bg-[#25D366] rounded-full flex justify-center items-center text-xl text-white'
            onClick={shareViaWhatsApp}><FaWhatsapp /></button>

          <button
            className='w-9 h-9 bg-[#3B5998] rounded-full flex justify-center items-center text-xl text-white'
            onClick={shareViaFacebook}><FaFacebookF /></button>
          
          <button
            className='w-9 h-9 bg-[#1DA1F2] rounded-full flex justify-center items-center text-xl text-white'
            onClick={shareViaTwitter}><CiTwitter /></button>
          
          <button className='w-9 h-9 bg-[#0077B5] rounded-full flex justify-center items-center text-xl text-white'
            onClick={shareViaLinkedIn}>
            <FaLinkedinIn /></button>

          <button className='w-9 h-9 bg-[#CB2027] rounded-full flex justify-center items-center text-xl text-white' onClick={shareViaPinterest}>
            <FaPinterestP /></button>

          <button className='w-9 h-9 bg-[#636A80] rounded-full flex justify-center items-center text-xl text-white'
            onClick={copyLink}><FaLink /></button>

        </div>
    </div>
          </div>
          <button className='w-full text-right font-semibold' onClick={handleReportAbuse}>Report This Ad</button>

        </div>

      </div>

      {/* related ads */}
      <div className='w-full h-max sm:h-[680px] lg:pl-24 lg:pr-24 pt-6 pb-6'>
        <div className='flex  flex-row justify-between items-center'>
        <h1 className='text-2xl md:text-3xl font-semibold my-8'>Related Ads</h1>
        <div className='sm:flex flex-row gap-4  hidden'>
          <button className='w-12 h-12 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowLeft/></button>
          <button className='w-12 h-12 text-[#00AAFF] bg-[#E8F7FF] text-xl flex justify-center items-center'><FaArrowRight/></button>
        </div>
        </div>
        <div className='flex flex-row gap-6 h-96  overflow-y-scroll no-scroll '>
        {ads.map(ad => (
                <Link to={`/properties-details/${ad.id}`} key={ad.id}> {/* Wrap card in Link */}
                <div className="border-2 rounded-md overflow-hidden h-full  w-[260px] xl:w-80">
                        {ad.promoted && (
                            <span className="bg-yellow-500 text-white py-1 px-2 absolute top-0 right-0 rounded-bl-md">
                                Promoted
                            </span>
                        )}
                        {ad.images && ad.images.length > 0 && (
                            <img src={ad.images[0]} alt="Ad" className="w-full h-52 object-cover" />
                        )}
                        <div className="p-3">
                        <p className="font-semibold text-black text-2xl">Rs {ad.price} </p>
                        <p className="text-gray-800 mb-2 text-xl">{ad.adName}</p>
                        <hr></hr>
                            
                            
                            <div className="flex flex-col ">
                               
                                <p className="text-sm text-gray-500">{ad.userAddress}</p>
                                {/* Assuming address is also available in ad data */}

                                <p className="text-xs text-gray-500 items-end mt-4  self-end">
                                <div>{ad && ad.timestamp && new Date(ad.timestamp.seconds * 1000).toLocaleString('en-US', {  day: 'numeric', year: 'numeric', month: 'long',}).toUpperCase()}</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
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