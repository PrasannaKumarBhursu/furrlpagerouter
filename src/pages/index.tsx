import { GetStaticProps } from 'next';
import styles from "../styles/page.module.css";
import ProductList from "../components/ProductList";
import Navbar from '../components/Navbar';

type HomeProps = {
  initialProducts: any[];
  initialFilters: any[];
  initialBannerImage: string;
  totalProducts: number;
};

const Home: React.FC<HomeProps> = ({ initialProducts, initialFilters, initialBannerImage, totalProducts }) => {
  return (
    <main className={styles.main}>
      <div className={styles.bgContainer}>
        <Navbar />
        <ProductList
          title="Product List"
          initialProducts={initialProducts}
          initialFilters={initialFilters}
          initialBannerImage={initialBannerImage}
          totalProducts={totalProducts}
        />
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch initial products
  const requestBody = {
    input: {
      page: 1,
      pageSize: 10,
      filters: [],
      id: "#HomeHunts",
      entity: "vibe",
    },
  };

  const productResponse = await fetch(
    "https://api.furrl.in/api/v2/listing/getListingProducts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const productData = await productResponse.json();
  const initialProducts = productData.data.getListingProducts.products;
  const totalProducts = productData.data.getListingProducts.totalProducts;

  // Fetch filters
  const filterRequestBody = {
    id: "#HomeHunts",
    entity: "vibe",
  };
  const filterResponse = await fetch(
    "https://api.furrl.in/api/v2/listing/getListingFilters",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterRequestBody),
    }
  );

  const filterData = await filterResponse.json();
  let filters = filterData?.data?.getListingFilters?.easyFilters || [];
  const allFilter = {
    name: "All",
    uniqueId: "all",
    contentType: "CATEGORY",
  };
  filters = [allFilter, ...filters];

  // Fetch banner image
  const bannerRequestBody = {
    name: "#HomeHunts",
  };
  const bannerResponse = await fetch(
    "https://api.furrl.in/api/v2/listing/getVibeByName",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bannerRequestBody),
    }
  );

  const bannerData = await bannerResponse.json();
  const bannerImage = bannerData.data.getVibeByName.imageUrl;

  return {
    props: {
      initialProducts,
      initialFilters: filters,
      initialBannerImage: bannerImage,
      totalProducts,
    },
  };
};

export default Home;
