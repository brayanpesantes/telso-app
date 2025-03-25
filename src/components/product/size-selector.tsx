import { Size } from "@prisma/client";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onChanged: (size: Size) => void;
}
export const SizeSelector = ({
  availableSizes,
  selectedSize,
  onChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onChanged(size)}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
