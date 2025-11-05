import { SkeletonLoader } from "@/page/Homepage/components/SkeletonAmevis"
import { useState } from "react"

export function ImageProductsFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <SkeletonLoader />}

      {!hasError && (
        <img
          {...props}
          onLoad={handleLoad}
          onError={handleError}
          className={`${props.className} ${isLoading ? 'hidden' : 'block'}`}
        />
      )}

      {hasError && (
        <div className="w-full h-[350px] bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-[#D4AF37] text-sm">Falha ao carregar imagem</span>
        </div>
      )}
    </>
  )
}
