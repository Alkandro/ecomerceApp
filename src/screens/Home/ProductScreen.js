import { useState, useEffect } from "react";
import { View } from "react-native";
import { forEach } from "lodash";
import { productCtrl } from "../../api";
import { Layout } from "../../layouts";
import { LoadingScreen, Separator } from "../../components/Shared";
import { Product } from "../../components/Product";

export function ProductScreen(props) {
  const {
    route: { params },
  } = props;
  const { slug } = params;  // Ahora recibimos slug en lugar de productId
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getProduct();
  }, [slug]);

  const getProduct = async () => {
    try {
      const response = await productCtrl.getBySlug(slug);
      if (!response.data || response.data.length === 0) {
        console.error("Producto no encontrado para el slug:", slug);
        return;
      }
      const productData = response.data[0].attributes
        ? response.data[0].attributes
        : response.data[0];
      const finalProduct = { ...productData, id: response.data[0].id || productData.id };
      setProduct(finalProduct);
  
      // Extrae la imagen principal:
      const mainImage =
        finalProduct.main_image?.data?.attributes?.url ||
        (typeof finalProduct.main_image === "object" ? finalProduct.main_image.url : finalProduct.main_image);
      
      // Extrae imágenes adicionales (si existen)
      const imagesArray = finalProduct.images?.data || [];
      const arrayImages = [];
      if (mainImage) {
        arrayImages.push(mainImage);
      }
      forEach(imagesArray, (image) => {
        // Extraer la URL de cada imagen
        const url =
          image.attributes?.url ||
          (typeof image === "object" ? image.url : image);
        if (url) {
          arrayImages.push(url);
        }
      });
      setImages(arrayImages);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };
  

  return (
    <>
      <Layout.Basic>
        {!product ? (
          <LoadingScreen text="Cargando producto" size="large" />
        ) : (
          <>
            <Product.Title text={product.title} />
            <Product.CarouselImages images={images} />

            <View style={{ padding: 10 }}>
              <Product.Price price={product.price} discount={product.discount} />
              <Separator height={30} />
              <Product.Characteristics text={product.characteristics} />
              <Separator height={70} />
            </View>
          </>
        )}
      </Layout.Basic>

      {product && <Product.BottomBar productId={product.id} slug={product.slug} />}
    </>
  );
}
