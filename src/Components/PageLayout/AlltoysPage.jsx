import React, { useEffect, useState } from 'react';
import LoadingData from '../ShareableComponents/LoadingData';
import SingleToy from '../ShareableComponents/Homepagecomponent/SingleToy';
import PageTitle from '../PageTitle';

const AlltoysPage = () => {
    const [toys, setToys] = useState(null);
    
    useEffect(()=>{
            fetch('https://playcarzone-server.vercel.app/alltoysdata').then(res=>res.json())
            .then(data=> setToys(data));
    },[]);

    if(!toys){
        return <LoadingData/>;
    };

    const searchtoys = event =>{
        event.preventDefault();
        const searchtext = event.target.search.value;
        fetch(`https://playcarzone-server.vercel.app/searchalltoys/${searchtext}`).then(res=> res.json())
        .then(data=>setToys(data));
    };

    return (
        <div className="overflow-x-auto w-full my-10">
            <PageTitle>All Toy</PageTitle>
            <div className='my-5 text-center'>
                <form onSubmit={searchtoys}>
                    <input className='border px-5 py-2 border-secound border-opacity-25 rounded-s-md text-sm outline-none text-secound opacity-70'  type="text" name="search" id="search" placeholder='Search Toys'/>
                    <input className='px-5 py-2 bg-button rounded-e-md text-sm border border-secound border-opacity-30' type="submit" value="search" />
                </form>
            </div>
            <div className='w-full overflow-x-auto'>
                <table className="table w-full">
                    <tbody>
                        {
                            toys && toys.map(toy=> <SingleToy key={toy._id} toys={toy}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlltoysPage;