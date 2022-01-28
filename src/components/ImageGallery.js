import React, { useState, useCallback } from "react";
//import { css } from 'styled-components/macro';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const ImageGallery = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = data.map((i) => {
    return {
      src: i.url,
      width: i.width,
      height: i.height,
      sizes: ["(min-width: 480px) 30vw,(min-width: 1024px) 33.3vw,100vw"],
    };
  });

  return (
    <div
      css={`
        padding: 0;
        img {
          object-fit: cover !important;
        }
      `}
    >
      <Gallery photos={photos} onClick={openLightbox} targetRowHeight="200" />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default ImageGallery;
