import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

type CoverImage = {
  src: string;
};

function getCoverImages(): CoverImage[] {
  const imagesDirectory = path.join(process.cwd(), "public", "images");

  return fs
    .readdirSync(imagesDirectory)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((fileName) => ({
      src: `/images/${encodeURIComponent(fileName)}`,
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

function TeruTeruLogo() {
  return (
    <svg
      className="cover-brand-logo"
      viewBox="0 0 88 104"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M44 13V4"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M21 53C15.6 60.3 11.3 74.1 8.4 91.4C17 88.9 23 90.7 28.3 95.1C33 99 39 98.3 44 91.8C49 98.3 55 99 59.7 95.1C65 90.7 71 88.9 79.6 91.4C76.7 74.1 72.4 60.3 67 53"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 55.7C33.8 61.3 54.2 61.3 64.5 55.7"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        opacity="0.72"
      />
      <circle
        cx="44"
        cy="35"
        r="27"
        stroke="currentColor"
        strokeWidth="3.6"
      />
      <path
        d="M34 32.8H34.2"
        stroke="currentColor"
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <path
        d="M53.8 32.8H54"
        stroke="currentColor"
        strokeWidth="5.4"
        strokeLinecap="round"
      />
      <path
        d="M34.2 44.3C37 48.5 40.2 50.3 44 50.3C47.8 50.3 51 48.5 53.8 44.3"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M62.2 69.8C64.4 75 65.8 80.2 66.6 85.4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.46"
      />
    </svg>
  );
}

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
            <TeruTeruLogo />
          </div>
          <p className="cover-name mb-5">
            江博源 / Tristan Byron
          </p>
          <p className="cover-body mx-auto mb-3 max-w-xl text-base leading-8 sm:mx-0 sm:text-lg">
            四川大学 ➡️ Waseda University  
          </p>
          <p className="cover-body mx-auto mb-5 max-w-xl text-base leading-8 sm:mx-0 sm:text-lg">
            海鸥跟随渔船是因为他们相信沙丁鱼会被扔进大海
          </p>
      

          <Link href="/home" className="cover-enter-button">
            <span>Enter Archive</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
