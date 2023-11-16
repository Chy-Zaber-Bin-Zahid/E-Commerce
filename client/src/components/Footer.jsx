function Footer() {
  return (
    <div className=" p-4 bg-sky-950 mt-10">
      <div className="grid grid-cols-3 gap-10 max-w-screen-xl mx-auto border-b-2 py-8 max-[1050px]:grid-cols-1">
        <div className="flex flex-col gap-6 max-[1050px]:items-center">
          <h1 className="text-white text-xl tracking-wider max-[1050px]:text-base">
            SUPPORT
          </h1>
          <div className="flex gap-2 p-2 border-2 rounded-full max-[1050px]:w-96 max-[500px]:w-72">
            <h1 className="border-r-2 px-2">📞</h1>
            <div>
              <p className="text-white max-[1050px]:text-sm">10AM - 7PM</p>
              <h1 className="text-orange-600 font-semibold text-xl">16290</h1>
            </div>
          </div>
          <div className="flex gap-2 p-2 border-2 rounded-full max-[1050px]:w-96 max-[500px]:w-72 ">
            <h1 className="border-r-2 px-2">🗺</h1>
            <div>
              <p className="text-white max-[1050px]:text-sm">Store Locator</p>
              <h1 className="text-orange-600 font-semibold text-xl">
                Find Our Stores
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <h1 className="text-white text-xl tracking-wider max-[1050px]:text-base max-[1050px]:text-center">
            ABOUT US
          </h1>
          <div className="grid grid-cols-3 gap-6 pt-4 max-[1050px]:text-center ">
            <p className="text-gray-400 text-sm max-[500px]:text-xs">EMI TERMS</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Privacy Policy</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Star Point Policy</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Brands</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">About Us</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Terms and Conditions</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Blog</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Online Service Support</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Online Delivery</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Refund and Return Policy</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Contact Us</p>
            <p className="text-gray-400 text-sm max-[500px]:text-xs">Complain / Advice</p>
          </div>
        </div>

        <div className="flex flex-col max-[1050px]:text-center">
          <h1 className="text-white text-xl tracking-wider max-[1050px]:text-base">
            STAY CONNECTED
          </h1>
          <div className="flex flex-col gap-4 pt-4">
            <h1 className="text-white text-sm">Smart Tach</h1>
            <p className="text-gray-400 text-sm">
              Head Office: 28 Kazi Nazrul Islam Ave,Navana Zohura Square, Dhaka
              1000
            </p>
            <p className="text-gray-400 text-sm">Email:</p>
            <p className="text-orange-600">webteam@smarttechbd.com</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center max-w-screen-xl mx-auto py-4 gap-6">
        <p className="text-gray-400 text-sm max-[500px]:text-xs">
          {`© ${new Date().getFullYear()} Smart Tech | All rights reserved`}
        </p>
        <p className="text-gray-400 text-sm max-[500px]:text-xs">Powered By: Smart Tech</p>
      </div>
    </div>
  );
}

export default Footer;
