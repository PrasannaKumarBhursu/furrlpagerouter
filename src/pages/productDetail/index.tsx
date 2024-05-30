import { useEffect, useState } from "react";
import { useProduct } from "@/components/ContextState";
import Navbar from "@/components/Navbar";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import styles from "../../styles/page.module.css";
import ShareButton from "@/components/ShareButton";

const ProductDetail = () => {
  const { Product: contextProduct }:any = useProduct();
  const [product, setProduct] = useState(contextProduct || null);

  useEffect(() => {
    if (!contextProduct || Object.keys(contextProduct).length===0) {
      const storedProduct = JSON.parse(localStorage.getItem("selectedProduct") || "{}");
      setProduct(storedProduct);
    }
  }, []);

  // If product is still null or invalid, return null or some fallback UI
  if (!product || typeof product !== "object") {
    return <div>Loading...</div>;
  }

  const { title, MRP, price, discountPercent, images, id } = product;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.bgContainer}>
          <Navbar />
          <div className={styles.productDetail}>
            <ImageCarousel images={images} />
            <div className={styles.imageDetailsContainer}>
              <div>
                <h1 className={styles.productDetailHeading}>{title}</h1>
                <div className={styles.productDetailPrices}>
                  <p className={styles.productDetailPrice}>${price?.value}</p>
                  <p className={styles.productDetailActualPrice}>${MRP?.value}</p>
                  <p className={styles.productDetailDiscount}>{discountPercent}%</p>
                </div>
              </div>
              <div>
                <ShareButton
                  shareData={{
                    url: id,
                    title: title,
                  }}
                />
              </div>
            </div>
            <div className={styles.productDescriptionContainer}>
              <h1 className={styles.productDescriptionTitle}>Product Description</h1>
              <p className={styles.productDescriptionText}>
                <b>" *  This is a hardcoded Text  "</b> New-age consumers aren't boring and basic, so why should they shop boring and basic?
                At Furrl, we are opening up the world of new independent brands to today's savvy consumer. One who wants to browse, be inspired and shop - all in a few clicks and hassle-free.
                We are masters of tech and e-commerce, who love beautiful things. And we have used our tech superpowers to design a discovery experience like no other. We have big ambitions and are leading the massive next wave of e-commerce. India is just the beginning. Want to join our tribe?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;


