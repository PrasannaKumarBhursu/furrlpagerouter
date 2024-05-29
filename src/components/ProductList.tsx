"use client";

import { FC, useCallback, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import ShareButton from "./ShareButton";
import Spinner from "./uiAssests/Spinnner/Spinner";
import { useRouter } from 'next/navigation';
import { useProduct } from "./ContextState";
import FilterList from "./FilterList/FilterList";

type ProductListProps = {
  title: string;
  initialProducts: any[];
  initialFilters: any[];
  initialBannerImage: string;
  totalProducts: number;
};

const ProductList: FC<ProductListProps> = ({ title, initialProducts, initialFilters, initialBannerImage, totalProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bannerImage, setBannerImage] = useState(initialBannerImage);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("all");
  const [totalProdcuts, setTotalProducts] = useState(totalProducts);
  const [filteredData, setFilteredData] = useState(initialFilters);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async (page: number, filters: any[] = [], isAppending: boolean = false) => {
    setLoading(true);
    const requestBody = {
      input: {
        page,
        pageSize: 10,
        filters,
        id: "#HomeHunts",
        entity: "vibe",
      },
    };

    try {
      const response = await fetch(
        "https://api.furrl.in/api/v2/listing/getListingProducts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        setError("Network response was not ok");
        return;
      }

      const data = await response.json();
      if ("code" in data) {
        setError(data.message);
      } else {
        if (isAppending) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...data.data.getListingProducts.products,
          ]);
        } else {
          setProducts(data.data.getListingProducts.products);
        }
        setTotalProducts(data.data.getListingProducts.totalProducts);
        setHasMore(data.data.getListingProducts.products.length > 0);
        setError("");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page, selectedFilter === "all" ? [] : [{ id: selectedFilter, type: "CATEGORY" }], page > 1);
  }, [page, fetchProducts, selectedFilter]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const seventyPercentHeight = 0.7 * totalHeight;
    if (scrollPosition >= seventyPercentHeight && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleFilterClick = async (uniqueId: string) => {
    setSelectedFilter(uniqueId);
    setPage(1);
    const filters = uniqueId === "all" ? [] : [{ id: uniqueId, type: "CATEGORY" }];
    await fetchProducts(1, filters, false);
  };

  const router = useRouter();

  const contextValue = useProduct();
  const { Product, setProduct } = contextValue;

  const redirectToProductDetail = (product: any) => {
    setProduct(product);
    if (typeof window !== 'undefined') {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
    }
    router.push(`/productDetail?id=${product.id}`);
  };

  return (
    <div>
      <div>
        <img src={bannerImage} className={styles.bannerImage} alt="Banner Image" />
      </div>
      {products?.length > 0 && (
        <div className={styles.productsCountTextContainer}>
          <p className={styles.productsCountTextContainerText}>Shop Products</p>
          <div className={styles.productsCountTextContainerDot}></div>
          <p className={styles.productsCountTextContainerCount}>
            {`${totalProdcuts} Products`}
          </p>
        </div>
      )}
      <div>
        <FilterList filters={filteredData} selectedFilter={selectedFilter} onFilterClick={handleFilterClick} />
      </div>
      <div className={styles.productsListContainer}>
        {products.map((each, index) => (
          <div
            key={index}
            className={`${styles.Productcontainer} ${(index - 2) % 5 === 0 ? "width-98" : "width-48"}`}
            onClick={() => redirectToProductDetail(each)}
          >
            <div
              style={{ backgroundImage: `url(${each.images[0].src})` }}
              className={`${styles.productImage} ${(index - 2) % 5 === 0 ? "height-300" : "height-181"}`}
            >
              <div onClick={(event) => event.stopPropagation()}>
                <ShareButton
                  shareData={{
                    url: each.id,
                    title: each.title,
                  }}
                />
              </div>
            </div>
            <div className={styles.productListContent}>
              <p className={styles.productListContentTitle}>{each.brand[0].name}</p>
              <p className={styles.productListContentName}>{each.title}</p>
              <div className={styles.productListContentPricingContainer}>
                {`Rs. ${each.price.value}`}
                <span className={styles.productListContentMRP}>{`Rs. ${each.MRP.value}`}</span>
                <p className={styles.productListContentDiscount}>{`${each.discountPercent}%`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <Spinner />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductList;
