function ProfileSlider({ sliderOpen, setSliderOpen }) {
  const list = [
    {
      id: 1,
      image: "profileMini.png",
      title: "Edit Account",
      path: "edit",
    },
    {
      id: 2,
      image: "change.png",
      title: "Password",
      path: "change",
    },
    {
      id: 3,
      image: "order.png",
      title: "Orders",
      path: "order",
    },
    {
      id: 4,
      image: "wish.png",
      title: "Saved List",
      path: "wish",
    },
    {
      id: 5,
      image: "payment.png",
      title: "Your Transactions",
      path: "payment",
    },
  ];

  // Product Slide handle
  const handleSlide = (path) => {
    setSliderOpen(path);
    console.log(path);
  };

  return (
    <div className="border-b-2  flex justify-left items-center">
      {list.map((product) => (
        <div
          onClick={() => handleSlide(product.path)}
          className="flex gap-1 px-2 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:text-orange-600 py-4"
          key={product.id}
        >
          <img src={`/images/${product.image}`} alt={product.title} />
          <h1>{`${product.title}`}</h1>
        </div>
      ))}
    </div>
  );
}

export default ProfileSlider;
