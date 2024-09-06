import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, LinkIcon, Share2 } from 'lucide-react'
import React from 'react'

function Home() {
  return (
    <div>
      <Header/>
      <div>
      {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" 
      width={1200} height={300} /> */}
      {/* <Header/> */}
     <section className=" z-50">
     <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a 
          href="https://www.linkedin.com/in/shree-raam-vishaal-1b6128263" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center py-1 px-4 mb-10 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">click here</span> 
          <span className="text-sm font-medium">to open My LinkedIn profile</span>
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
          </svg>
        </a>

        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span className='text-primary'> Online CV Builder</span>
        </h1>
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          Powered by <span className='text-customorange'> Gemini 1.5 Flash AI</span>
        </h1>
        <p className="mb-10 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Boost your chances of landing that dream job by creating a perfect resume
        </p>
        <div className="flex flex-col mt-20 mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a 
            href="/dashboard" 
            className="inline-flex justify-center items-center py-4 px-6 text-lg font-medium text-center text-white rounded-lg bg-primary shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
          >
            Get Started
            <svg className="ml-3 -mr-1 w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>


      </div>

</section>
<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">My Professional Profiles</h2>
<h2 className="text-md text-gray-500">Explore my professional development platforms below.</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border bg-white
         border-gray-200 p-8 
         shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
        href="https://github.com/shreeraamvishaal" target="_blank"
      >
       <LinkIcon className='h-8 w-8'/>

        
      
        <img src="https://www.pngarts.com/files/8/Github-Logo-Transparent-Background-PNG.png" alt="GitHub Logo" className="your-custom-class" />

      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
        href="https://www.hackerrank.com/profile/42731073_ai" target="_blank"
      >
      <LinkIcon className='h-8 w-8'/>

        

        <img  src="https://th.bing.com/th/id/OIP.e29lhxIjByuC0QfMjbdmYwHaEO?rs=1&pid=ImgDetMain" alt="hackerrank logo" className="your-custom-class" />

      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
        href="https://leetcode.com/u/Shree_Raam_Vishaal/" target="_blank"
      >
      <LinkIcon className='h-8 w-8'/>

        

        <img  src="https://miro.medium.com/v2/resize:fit:1358/1*OLPzQh0cW-q5jgZ9RNJCVg.png" alt="leetcode Logo" className="your-custom-class" />

      </a>

    
    </div>

    <div className="mt-12 text-center">
    <footer className="bg-gray-100 text-gray-800 py-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-2">Feel free to reach out to me:</p>
        <a href="mailto:shreeraamvishaal@gmail.com"
          className="inline-block bg-gray-800 text-white font-semibold text-xl px-4 py-2 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
          shreeraamvishaal@gmail.com
        </a>
      </div>
    </footer>

    </div>
    </section>
  </div>
 
    </div>
  )
}

export default Home