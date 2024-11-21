const Title = ({title, subTitle}) => {
  return (
    <div className="text-center md:w-1/2 lg:w-5/12 mx-auto pt-16">
      <p className="text-lg md:text-xl font-medium italic themeColor mb-4">
        --- {subTitle} ---
      </p>
      <h2 className="dark1 titleFont font-semibold border-y-2 py-5 text-3xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
};

Title.propTypes = {};

export default Title;
