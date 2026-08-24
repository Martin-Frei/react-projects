import React,{useState,useEffect} from 'react'


function Jobsearch() {

    const [keyword, setKeyword]= useState(''); // State for jobtitle 
    const [location, setLocation]= useState(''); // for location
    const [jobs, setJobs]= useState ([]); // job resul
    const [loading, setLoading]= useState(false); //loading by deafault false

    const APP_ID ='caeaf059';
    const APP_KEY ='18e35e4cd641d2da2785cbbc41fad38e';

    useEffect(()=>{
        fetchJobs("developer", "");
    }, []);


    const fetchJobs = async (searchKeyword, searchLocation)=>{

        setLoading(true);
        try{
            const url=`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${searchKeyword}&where=${searchLocation}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data)


        }catch(error){
            console.log(error, 'Error fetsching Data..');
            alert('Failed to fetch Jobs')
        }
        setLoading(false);
    };

    // search Button 
    const handleSearch= ()=>{
        if(!keyword){
            alert('Please enter Job Title...');
            return;
        }
        fetchJobs(keyword, location);
    }

  return (
    <>
        <div className='bg-linear-to-r from-sky-500 to-indigo-500  py-14 text-center'>
            <h1 className='text-4xl text-bold '>Find your Job</h1>
            <p className='text-lg mt-2 '>Search real Jobs Worldwide</p>
        
        </div>

        <div>
            {jobs.map((job=>{
                <div key={job.id}>
                <h2>{job.title}</h2>
                </div>
            }))}
        </div>
        <input type="text" className='' />
    </>
  )
}

export default Jobsearch