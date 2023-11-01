function Footer() {
  return (
    <div className=" p-4 bg-sky-950 mt-6">
      <div className="grid grid-cols-3 gap-10 max-w-screen-xl mx-auto border-b-2 py-8">
        <div className="flex flex-col gap-6 ">
          <h1 className="text-white text-xl tracking-wider">SUPPORT</h1>
          <div className="flex gap-2 p-2 border-2 rounded-full">
            <h1 className="border-r-2 px-2">📞</h1>
            <div>
              <p className="text-white">10AM - 7PM</p>
              <h1 className="text-orange-600 font-semibold text-xl">16290</h1>
            </div>
          </div>
          <div className="flex gap-2 p-2 border-2 rounded-full">
            <h1 className="border-r-2 px-2">🗺</h1>
            <div>
              <p className="text-white">Store Locator</p>
              <h1 className="text-orange-600 font-semibold text-xl">
                Find Our Stores
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col ">
          <h1 className="text-white text-xl tracking-wider">ABOUT US</h1>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <p className="text-gray-400 text-sm">EMI TERMS</p>
            <p className="text-gray-400 text-sm">Privacy Policy</p>
            <p className="text-gray-400 text-sm">Star Point Policy</p>
            <p className="text-gray-400 text-sm">Brands</p>
            <p className="text-gray-400 text-sm">About Us</p>
            <p className="text-gray-400 text-sm">Terms and Conditions</p>
            <p className="text-gray-400 text-sm">Blog</p>
            <p className="text-gray-400 text-sm">Online Service Support</p>
            <p className="text-gray-400 text-sm">Online Delivery</p>
            <p className="text-gray-400 text-sm">Refund and Return Policy</p>
            <p className="text-gray-400 text-sm">Contact Us</p>
            <p className="text-gray-400 text-sm">Complain / Advice</p>
          </div>
        </div>

        <div className="flex flex-col ">
          <h1 className="text-white text-xl tracking-wider">STAY CONNECTED</h1>
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

      <div className="flex justify-between items-center max-w-screen-xl mx-auto py-4">
        <p className="text-gray-400 text-sm">
          © 2023 Smart Tech | All rights reserved
        </p>
        <p className="text-gray-400 text-sm">Powered By: Smart Tech</p>
      </div>
    </div>
  );
}

export default Footer;
