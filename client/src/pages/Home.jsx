import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link ,useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaSearch } from 'react-icons/fa';

import bgimage from '../images/bg.jpg'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  
  SwiperCore.use([Navigation]);
  // console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=10');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-full mx-auto  ' 
      style={{backgroundImage:`url(${bgimage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize:'cover'
      
      }}>
        
        <h1 className='text-white font-bold text-3xl mx-auto lg:text-6xl'>
          Find your next <span className='text-white'>perfect</span>
          <br />
          place with ease
        </h1>
        {/* <div className='text-white text-xs mx-auto sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div> */}
        <Link
          to={'/search'}
          className='text-xs sm:text-sm mx-auto text-white font-bold hover:underline'
        >
          Let's get started...
        </Link>
        <form 
          onSubmit={handleSubmit}
         className='bg-slate-100 p-3 mx-auto rounded-lg flex items-center w-full sm:w-[50%]'
        >
          <input
            type='text'
            placeholder='Click search or enter city,neighbourhood,address,unit...'
            className='bg-transparent focus:outline-none w-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           
           
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
      </div>

      {/* swiper */}
        {/* <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[500px]'
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper> */}
                {/* <Swiper navigation>
          {rentListings &&
            rentListings.length > 0 &&
            rentListings.map((listing) => (
              <SwiperSlide>
                <div>
                <div className='flex flex-wrap justify-center gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper> */}

      {/* listing results for offer, sale and rent */}

      <div className='max-w-full mx-auto p-3 flex flex-col gap-8 my-10'>
      {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-4xl text-center font-semibold text-slate-600'>Recent places for rent</h2>
              <p className='text-right'>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
                </p>
            </div>
            <div className='flex flex-wrap justify-center gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            
          </div>
        )}
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-4xl font-semibold text-center text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap justify-center gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
