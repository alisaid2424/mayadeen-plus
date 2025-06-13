import { Link } from "@/i18n/navigation";
import routes from "@/utils/routes";

const NotFoundPage = () => {
  return (
    <section className="absolute inset-0 flex items-center justify-center flex-col">
      <h1 className="text-7xl text-gray-800 font-bold">404</h1>
      <p className="text-xl text-gray-500 mt-3 mb-5 w-96 text-center max-w-full">
        Page not found. Please check the URL and try again.
      </p>
      <Link
        href={routes.home}
        className="text-lg text-white bg-primary py-2 px-4 rounded-full"
      >
        Back Home Page &rarr;
      </Link>
    </section>
  );
};

export default NotFoundPage;
