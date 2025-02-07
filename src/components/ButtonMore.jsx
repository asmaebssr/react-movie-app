const ButtonMore = ({handlePages}) => {
  return (
    <div className="flex justify-center pb-20">
     <button
       onClick={handlePages}
       className="px-6 py-3 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
     >
       More
     </button>
   </div>
  )
}

export default ButtonMore