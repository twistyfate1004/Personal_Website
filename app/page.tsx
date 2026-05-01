import Image from "next/image";
import fs from "fs";
import path from "path";
import { EnterArchiveLink } from "@/components/ui/EnterArchiveLink";
import { BrandMark } from "@/components/ui/BrandMark";

const imageExtensions = new Set([".svg"]);

type CoverImage = {
  src: string;
};

function getCoverImages(): CoverImage[] {
  const imagesDirectory = path.join(process.cwd(), "public", "placeholders");

  return fs
    .readdirSync(imagesDirectory)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((fileName) => ({
      src: `/placeholders/${encodeURIComponent(fileName)}`,
    }));
}

function createCoverColumns(images: CoverImage[], columnCount = 5) {
  if (images.length === 0) {
    return [];
  }

  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const columnLength = Math.max(6, Math.ceil(images.length / columnCount) + 2);

    return Array.from({ length: columnLength }, (_, imageIndex) => {
      const imagePosition = (columnIndex * columnLength + imageIndex) % images.length;
      return images[imagePosition];
    });
  });
}

const coverColumns = createCoverColumns(getCoverImages());

export default function CoverPage() {
  return (
    <div className="cover-page min-h-screen overflow-hidden">
      <div className="cover-image-wall" aria-hidden="true">
        {coverColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`cover-marquee-column cover-marquee-column-${columnIndex + 1}`}
          >
            {[...column, ...column].map((image, imageIndex) => (
              <div
                className="cover-photo-frame"
                key={`${image.src}-${imageIndex}`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 18vw"
                  priority={columnIndex < 2 && imageIndex < 2}
                  unoptimized
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="cover-copy w-full max-w-3xl text-center sm:text-left">
          <div className="cover-brand mb-7" aria-label="Growing Margins">
            <h1>Growing Margins</h1>
            <BrandMark className="cover-brand-logo" />
          </div>
          <p className="cover-name mb-5">
            Sample Name / X X
          </p>
          <p className="cover-body mx-auto mb-3 max-w-xl text-base leading-8 sm:mx-0 sm:text-lg">
            Sample School A {"->"} Sample School B
          </p>
          <p className="cover-body mx-auto mb-5 max-w-xl text-base leading-8 sm:mx-0 sm:text-lg">
            This is placeholder cover copy for the public repository.
          </p>
      
          <EnterArchiveLink />
        </div>
      </section>
    </div>
  );
}
