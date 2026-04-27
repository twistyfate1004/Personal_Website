"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import type { MediaItem } from "@/lib/data";

interface MediaGalleryProps {
  mediaList: MediaItem[];
  title: string;
}

export function MediaGallery({ mediaList, title }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);

  return (
    <>
      {/* Media grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {mediaList.map((media, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedMedia(media)}
          >
            {media.type === "image" ? (
              <Image
                src={media.url}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <video
                src={media.url}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
              />
            )}

            {media.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for full-size media */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedMedia(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "image" ? (
              <Image
                src={selectedMedia.url}
                alt="Full size"
                width={1920}
                height={1080}
                className="w-full h-auto object-contain"
                unoptimized
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full max-h-[90vh]"
              >
                您的浏览器不支持视频播放。
              </video>
            )}
          </div>
        </div>
      )}
    </>
  );
}
